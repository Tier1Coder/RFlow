/*
TODO: Currently Monaco Editor is throwing an error when used Offline due to CDN not being available. Probably CRACO should be used to fix this issue.
*/

import React, { forwardRef } from 'react';
import { Editor } from '@monaco-editor/react';

/**
 * MonacoEditorWrapper Component
 * 
 * A wrapper around the Monaco Editor to handle mounting and event management.
 * 
 * @param {Object} props - Component props.
 * @param {string} props.value - The current value of the editor.
 * @param {string} props.language - The language mode for the editor.
 * @param {Object} props.options - Additional editor options.
 * @param {Function} props.onChange - Handler for content change.
 * @param {Function} props.onMount - Handler for editor mount.
 * @param {Function} props.onError - Handler for editor errors.
 * @returns {JSX.Element} The Monaco Editor component.
 */
const MonacoEditorWrapper = forwardRef(({
    value,
    language = 'xml',
    options = {
        renderValidationDecorations: 'on',
        scrollBeyondLastLine: false,
        automaticLayout: true,
    },
    onChange = () => {},
    onMount = () => {},
    onError = () => {}
}, ref) => (
    <Editor
        height="70vh"
        value={value}
        language={language}
        options={options}
        onChange={onChange}
        onMount={onMount}
        onError={onError}
        theme="vs-dark"
    />
));

export default MonacoEditorWrapper;
