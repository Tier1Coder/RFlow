import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

import { updateFileContent, visualizeDiagram } from '../services/DiagramService';
import '../styles/components/ResolutionTool.css';

import MonacoEditorWrapper from './MonacoEditorWrapper';

import useDebouncedResizeObserver from '../hooks/useDebouncedResizeObserver';
import useMonacoMarkers from '../hooks/useMonacoMarkers';

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
        errorMessage: initialErrorMessage = '',
        errorLine: initialErrorLine = null,
        errorColumn: initialErrorColumn = null,
        duplicatedIds: initialDuplicatedIds = [],
    } = location.state || {};
    const [itemText, setItemText] = useState(initialItemText);
    const [errorMessage, setErrorMessage] = useState(initialErrorMessage);
    const [errorLine, setErrorLine] = useState(initialErrorLine);
    const [errorColumn, setErrorColumn] = useState(initialErrorColumn);
    const [duplicatedIds, setDuplicatedIds] = useState(initialDuplicatedIds);
    const [isSaving, setIsSaving] = useState(false);
    const editorRef = useRef(null);
    const monacoRef = useRef(null);
    useDebouncedResizeObserver(20);

    /**
     * Constructs the current error object based on errorMessage, errorLine, and duplicatedIds.
     * 
     * @returns {Object|null} The current error object or null if no errors.
     */
    const getCurrentError = () => {
        if (errorMessage && errorLine) {
            return {
                message: errorMessage,
                line: errorLine,
                column: errorColumn || 1,
            };
        } else if (duplicatedIds && duplicatedIds.length > 0) {
            const dup = duplicatedIds[0];
            return {
                message: `Duplicated ID: ${dup.id}`,
                line: dup.line,
                column: 1,
            };
        } else {
            return null;
        }
    };

    const currentError = getCurrentError();

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
            navigate(`/visualize/${itemId}`, {
                state: {
                    diagramId: itemId,
                    diagramData: updatedDiagramData,
                    diagramName: itemName,
                },
            });
            toast.success('Diagram updated successfully');
        } catch (error) {
            if (error.response && error.response.data) {
                const errorData = error.response.data;
                setErrorMessage(errorData.error || 'An unknown error occurred');
                setErrorLine(errorData.line || null);
                setErrorColumn(errorData.column || null);
                setDuplicatedIds(errorData.duplicatedIds || []);
                toast.warn('Error occurred while saving the file. Please resolve the error(s) and try again.');
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
        if (editorRef.current && currentError && currentError.line) {
            const editor = editorRef.current;
            editor.revealLineInCenter(currentError.line);
            editor.setPosition({
                lineNumber: currentError.line,
                column: currentError.column || 1,
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

        if (currentError && currentError.line) {
            setTimeout(() => {
                focusOnError();
            }, 100);
        }
    };

    /**
     * Handles setting markers based on the current error.
     */
    const setMarkers = useCallback(() => {
        if (monacoRef.current) {
            const monaco = monacoRef.current;
            const markers = [];

            if (currentError && currentError.line) {
                markers.push({
                    severity: monaco.MarkerSeverity.Error,
                    message: currentError.message,
                    startLineNumber: currentError.line,
                    startColumn: currentError.column || 1,
                    endLineNumber: currentError.line,
                    endColumn: currentError.column ? currentError.column + 1 : 1,
                });
            }

            const model = editorRef.current.getModel();
            if (model) {
                monaco.editor.setModelMarkers(model, 'owner', markers);
            }
        }
    }, [currentError]);

    // Use the custom hook to manage Monaco Editor markers
    useMonacoMarkers(currentError, editorRef, monacoRef);

    useEffect(() => {
        if (currentError && editorRef.current) {
            focusOnError();
        }
    }, [itemText, currentError, focusOnError]);

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
