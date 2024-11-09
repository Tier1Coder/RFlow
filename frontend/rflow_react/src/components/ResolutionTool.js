import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { updateFileContent, visualizeDiagram } from '../services/DiagramService';
import '../styles/components/ResolutionTool.css';

import MonacoEditorWrapper from './MonacoEditorWrapper';
import useDebouncedResizeObserver from '../hooks/useDebouncedResizeObserver';

/**
 * ResolutionTool Component
 *
 * Provides an interface for resolving errors within a diagram's XML content using the Monaco Editor.
 */
const ResolutionTool = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    itemName = 'Unnamed Item',
    itemId = '',
    initialItemText = '',
    errorResponseData = {},
  } = location.state || {};

  const {
    errorType: initialErrorType = '',
    errorMessage: initialErrorMessage = '',
    errorLine: initialErrorLine = 0,
    errorColumn: initialErrorColumn = 0,
    duplicatedIdsArray: initialDuplicatedIdsArray = [],
  } = errorResponseData;

  // State variables
  const [itemText, setItemText] = useState(initialItemText);
  const [errorType, setErrorType] = useState(initialErrorType);
  const [errorMessage, setErrorMessage] = useState(initialErrorMessage);
  const [errorLine, setErrorLine] = useState(initialErrorLine);
  const [errorColumn, setErrorColumn] = useState(initialErrorColumn);
  const [duplicatedIdsArray, setDuplicatedIdsArray] = useState(initialDuplicatedIdsArray);
  const [isSaving, setIsSaving] = useState(false);

  const editorRef = useRef(null);
  const monacoRef = useRef(null);
  useDebouncedResizeObserver(20);

  /**
   * Constructs the current error object based on the error state.
   *
   * @returns {Object|null} The current error object or null if no errors.
   */
  const currentError = useMemo(() => {
    if (errorType === 'XMLSyntaxError' || errorType === 'DocumentInvalidError') {
      return {
        errorType,
        errorMessage,
        errorLine,
        errorColumn,
      };
    } else if (errorType === 'ElementIdDuplicatedError' && duplicatedIdsArray.length > 0) {
      const dup = duplicatedIdsArray[0];
      return {
        errorType,
        errorMessage: `Duplicated ID: ${dup.id}`,
        errorLine: dup.line,
        errorColumn: 1,
        duplicatedIdsArray: [dup],
      };
    } else {
      return null;
    }
  }, [errorType, errorMessage, errorLine, errorColumn, duplicatedIdsArray]);

  /**
   * Handles navigation to the home page (Cancel action).
   */
  const handleCancel = () => {
    navigate('/');
  };

  /**
   * Handles saving the updated XML content.
   *
   * @async
   * @returns {Promise<void>}
   */
  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateFileContent(itemId, itemText);
      const updatedDiagramData = await visualizeDiagram(itemId);
      const updatedDuplicatedIds = updatedDiagramData.duplicatedIdsArray || [];

      if (updatedDuplicatedIds.length > 0) {
        navigate(`/resolve/${itemId}`, {
          state: {
            itemName,
            itemId,
            initialItemText: itemText,
            errorResponseData: {
              errorType,
              duplicatedIdsArray: updatedDuplicatedIds,
            },
          },
        });
      } else {
        navigate(`/visualize/${itemId}`, {
          state: {
            diagramId: itemId,
            diagramData: updatedDiagramData,
            diagramName: itemName,
          },
        });
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const errorData = error.response.data;
        setErrorType(errorData.errorType || '');
        setErrorMessage(errorData.errorMessage || 'An unknown error occurred');
        setErrorLine(errorData.errorLine || null);
        setErrorColumn(errorData.errorColumn || null);
        setDuplicatedIdsArray(errorData.duplicatedIdsArray || []);

        toast.warn('Error resolved successfully, but new error(s) were found.');
      } else {
        toast.error('An unexpected error occurred while saving the file.');
      }
    } finally {
      setIsSaving(false);
    }
  };

  /**
   * Focuses the Monaco Editor on the error location.
   */
  const focusOnError = useCallback(() => {
    if (editorRef.current && currentError && currentError.errorLine) {
      const editor = editorRef.current;
      editor.revealLineInCenter(currentError.errorLine);
      editor.setPosition({
        lineNumber: currentError.errorLine,
        column: currentError.errorColumn || 1,
      });
      editor.focus();
    }
  }, [currentError]);

  /**
   * Initializes the Monaco Editor and sets markers upon mounting.
   *
   * @param {Object} editor - The Monaco Editor instance.
   * @param {Object} monaco - The Monaco namespace.
   */
  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;
    setMarkers();

    if (currentError && currentError.errorLine) {
      setTimeout(() => {
        focusOnError();
      }, 100);
    }
  };

  /**
   * Handles setting markers based on the current error.
   */
  const setMarkers = useCallback(() => {
    if (monacoRef.current && editorRef.current) {
      const monaco = monacoRef.current;
      const model = editorRef.current.getModel();
      if (!model) return;

      const markers = [];

      if (
        currentError &&
        (currentError.errorType === 'XMLSyntaxError' ||
          currentError.errorType === 'DocumentInvalidError')
      ) {
        markers.push({
          severity: monaco.MarkerSeverity.Error,
          message: currentError.errorMessage,
          startLineNumber: currentError.errorLine,
          startColumn: currentError.errorColumn || 1,
          endLineNumber: currentError.errorLine,
          endColumn: currentError.errorColumn ? currentError.errorColumn + 1 : 1,
        });
      } else if (
        currentError &&
        currentError.errorType === 'ElementIdDuplicatedError' &&
        currentError.duplicatedIdsArray.length > 0
      ) {
        const dup = currentError.duplicatedIdsArray[0];
        const lineNumber = dup.line;
        const lineContent = model.getLineContent(lineNumber);
        const idToFind = dup.id;
        const idIndex = lineContent.indexOf(idToFind);

        if (idIndex !== -1) {
          const startColumn = idIndex + 1; // Monaco columns are 1-based
          const endColumn = startColumn + idToFind.length;

          markers.push({
            severity: monaco.MarkerSeverity.Error,
            message: `Duplicated ID: ${dup.id}`,
            startLineNumber: lineNumber,
            startColumn: startColumn,
            endLineNumber: lineNumber,
            endColumn: endColumn,
          });
        } else {
          // If ID not found in the line, mark the entire line
          markers.push({
            severity: monaco.MarkerSeverity.Error,
            message: `Duplicated ID: ${dup.id}`,
            startLineNumber: lineNumber,
            startColumn: 1,
            endLineNumber: lineNumber,
            endColumn: lineContent.length + 1,
          });
        }
      }

      monaco.editor.setModelMarkers(model, 'owner', markers);
    }
  }, [currentError]);

  useEffect(() => {
    setMarkers();
  }, [currentError, setMarkers]);

  useEffect(() => {
    if (currentError && editorRef.current) {
      focusOnError();
    }
  }, [currentError, focusOnError]);

  return (
    <div className="resolution-tool-container">
      <div className="resolution-tool-header">
        <div className="resolution-tool-title">
          {errorMessage
            ? `Resolve the error in ${itemName} (ID: ${itemId})`
            : `Editing ${itemName} (ID: ${itemId})`}
        </div>
        {isSaving && <div className="saving-indicator">Processing...</div>}
      </div>
      <ToastContainer />
      <div className="resolution-tool-editor-container">
        <MonacoEditorWrapper
          value={itemText}
          onChange={(value) => setItemText(value)}
          onMount={handleEditorDidMount}
        />
      </div>
      <div className="resolution-tool-footer">
        <button
          className="resolution-tool-cancel-button"
          onClick={handleCancel}
          disabled={isSaving}
          aria-label="Cancel editing"
        >
          Cancel
        </button>
        <button
          className="resolution-tool-save-button"
          onClick={handleSave}
          disabled={isSaving}
          aria-label="Save changes"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default ResolutionTool;
