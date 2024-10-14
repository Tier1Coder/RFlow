import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { DiffEditor } from '@monaco-editor/react';
import ResolutionToolShowErrorsModal from '../components/modals/ResolutionToolShowErrorsModal';
import '../styles/components/ResolutionTool.css';

const ResolutionTool = () => {
    const location = useLocation();
    const { itemName, itemId, initialItemText, 
        errorMessage, 
        errorLine, errorColumn, 
        duplicatedIds } = location.state;
    
    const [itemText, setItemText] = useState(initialItemText);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editorInstance, setEditorInstance] = useState(null);
    
    const monacoRef = useRef(null);

    const handleEditorChange = (value) => {
        setItemText(value);
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setItemText(initialItemText);
    };

    const handleSave = () => {
        console.log('Save button clicked');
    };

    const setMarkers = useCallback((editor, monacoInstance) => {
        const markers = [];

        // handling single error message
        if (errorMessage && errorLine) {
            markers.push({
                severity: monacoInstance.MarkerSeverity.Error,
                message: errorMessage,
                startLineNumber: errorLine,
                startColumn: errorColumn,
                endLineNumber: errorLine,
                endColumn: errorColumn + 1,
            });
        }

        // handling duplicated IDs multiple error messages
        if (duplicatedIds && duplicatedIds.length > 0) {
            duplicatedIds.forEach((dup) => {
                markers.push({
                    severity: monacoInstance.MarkerSeverity.Error,
                    message: `Duplicated ID: ${dup.id}`,
                    startLineNumber: dup.line,
                    startColumn: 1,
                    endLineNumber: dup.line,
                    endColumn: 1,
                });
            });
        }

        const model = editor.getModel().modified;
        if (model) {
            monacoInstance.editor.setModelMarkers(model, 'owner', markers);
        }
    }, [errorMessage, errorLine, errorColumn, duplicatedIds]);

    const handleEditorDidMount = (editor, monacoInstance) => {
        setEditorInstance(editor);
        monacoRef.current = monacoInstance;
        setMarkers(editor, monacoInstance);
    };

    useEffect(() => {
        if (editorInstance && monacoRef.current) {
            setMarkers(editorInstance, monacoRef.current);
        }
    }, [itemText, editorInstance, setMarkers]);

    return (
        <div className="resolution-tool-container">
            <div className="resolution-tool-header">
                <div className="resolution-tool-title">
                    Found errors in: {itemName} file, ID: {itemId}.
                </div>
            </div>
            <div className="resolution-tool-diff-editor-container">
                <DiffEditor
                    height="70vh"
                    original={initialItemText}
                    modified={itemText}
                    onChange={handleEditorChange}
                    language="xml"
                    options={{
                        renderValidationDecorations: 'on',
                    }}
                    onMount={handleEditorDidMount}
                    theme="vs-dark"
                />
            </div>
            <div className="resolution-tool-footer">
                <button className="resolution-tool-show-errors-button" onClick={handleOpenModal}>
                    Show Errors
                </button>
                <button className="resolution-tool-cancel-button" onClick={handleCancel}>
                    Cancel
                </button>
                <button className="resolution-tool-save-button" onClick={handleSave}>
                    Save
                </button>
            </div>
            <ResolutionToolShowErrorsModal isOpen={isModalOpen} onClose={handleCloseModal}>
                <h2>Errors</h2>
                <ul>
                    {errorMessage.error ? (
                        <li>
                            <strong>Error:</strong> {errorMessage.error} at line {errorMessage.line}, column {errorMessage.column}
                        </li>
                    ) : (
                        <li>
                            <strong>Error:</strong> {errorMessage} at line {errorLine}, column {errorColumn}
                        </li>

                    )}
                    {duplicatedIds && duplicatedIds.length > 0 && duplicatedIds.map((dup, index) => (
                        <li key={index}>
                            <strong>Duplicated ID:</strong> {dup.id} at line {dup.line}
                        </li>
                    ))}
                </ul>
            </ResolutionToolShowErrorsModal>
        </div>
    );
};

export default ResolutionTool;