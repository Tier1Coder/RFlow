import { useEffect, useCallback } from 'react';

/**
 * Custom hook to manage Monaco Editor markers based on error states.
 * 
 * @param {Object|null} error - The current error object containing message, line, and column.
 * @param {Object} editorRef - Reference to the Monaco Editor instance.
 * @param {Object} monacoRef - Reference to the Monaco instance.
 */
const useMonacoMarkers = (error, editorRef, monacoRef) => {
    const setMarkers = useCallback(() => {
        if (editorRef.current && monacoRef.current) {
            const monaco = monacoRef.current;
            const markers = [];

            if (error && error.line) {
                markers.push({
                    severity: monaco.MarkerSeverity.Error,
                    message: error.message,
                    startLineNumber: error.line,
                    startColumn: error.column || 1,
                    endLineNumber: error.line,
                    endColumn: error.column ? error.column + 1 : 1,
                });
            }

            const model = editorRef.current.getModel();
            if (model) {
                monaco.editor.setModelMarkers(model, 'owner', markers);
            }
        }
    }, [error, editorRef, monacoRef]);

    useEffect(() => {
        setMarkers();
    }, [setMarkers]);
};

export default useMonacoMarkers;
