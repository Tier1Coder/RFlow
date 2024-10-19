import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Editor } from '@monaco-editor/react';
import { updateFileContent, visualizeDiagram } from '../services/DiagramService';
import '../styles/components/ResolutionTool.css';

const ResolutionTool = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const {
        itemName,
        itemId,
        initialItemText,
    } = location.state;

    const [itemText, setItemText] = useState(initialItemText);
    const [errorMessage, setErrorMessage] = useState(location.state.errorMessage);
    const [errorLine, setErrorLine] = useState(location.state.errorLine);
    const [errorColumn, setErrorColumn] = useState(location.state.errorColumn);
    const [duplicatedIds, setDuplicatedIds] = useState(location.state.duplicatedIds);
    const [isSaving, setIsSaving] = useState(false);
    const editorRef = useRef(null);
    const monacoRef = useRef(null);

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

    const handleCancel = () => {
        navigate('/');
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await updateFileContent(itemId, itemText);
            const updatedDiagramData = await visualizeDiagram(itemId);
            navigate(`/visualize/${itemId}`, { state: { diagramId: itemId, diagramData: updatedDiagramData, diagramName: itemName } });
        } catch (error) {
            if (error.response && error.response.data) {
                const errorData = error.response.data;
                setErrorMessage(errorData.error || 'An unknown error occurred');
                setErrorLine(errorData.line || null);
                setErrorColumn(errorData.column || null);
                setDuplicatedIds(errorData.duplicatedIds || []);
            } else {
                alert('An error occurred while saving the file: ' + error.message);
            }
        } finally {
            setIsSaving(false);
        }
    };

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

    const setMarkers = useCallback(() => {
        if (editorRef.current && monacoRef.current) {
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

    useEffect(() => {
        setMarkers();
        if (currentError && editorRef.current) {
            focusOnError();
        }
    }, [itemText, errorMessage, errorLine, errorColumn, duplicatedIds, setMarkers, currentError, focusOnError]);

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
            <div className="resolution-tool-editor-container">
                <Editor
                    height="70vh"
                    value={itemText}
                    language="xml"
                    options={{
                        renderValidationDecorations: 'on',
                        scrollBeyondLastLine: false,
                        automaticLayout: true,
                    }}
                    onMount={handleEditorDidMount}
                    onChange={(value) => setItemText(value)}
                    theme="vs-dark"
                />
            </div>
            <div className="resolution-tool-footer">
                <button className="resolution-tool-cancel-button" onClick={handleCancel} disabled={isSaving}>
                    Cancel
                </button>
                <button className="resolution-tool-save-button" onClick={handleSave} disabled={isSaving}>
                    Save
                </button>
            </div>
        </div>
    );
};

export default ResolutionTool;
