import axiosInstance from './axiosInstance';

/**
 * Fetches all diagrams.
 * 
 * @returns {Promise<Object[]>} The list of diagrams.
 * @throws Will throw an error if the fetch operation fails.
 */
async function fetchDiagrams() {
    try {
        const response = await axiosInstance.get('/api/diagrams/');
        return response.data;
    } catch (error) {
        console.error('Error fetching diagrams:', error);
        throw error;
    }
}

/**
 * Deletes a diagram by ID.
 * 
 * @param {string} id - The ID of the diagram to delete.
 * @throws Will throw an error if the delete operation fails.
 */
async function deleteDiagram(id) {
    try {
        await axiosInstance.delete(`/api/diagrams/${id}/`);
    } catch (error) {
        console.error('Error deleting diagram:', error);
        throw error;
    }
}

/**
 * Downloads a file associated with a diagram by ID.
 * 
 * @param {string} id - The ID of the diagram whose file to download.
 * @throws Will throw an error if the download operation fails.
 */
async function downloadFile(id) {
    try {
        const response = await axiosInstance.get(`/api/diagrams/${id}/view_file/`, {
            responseType: 'blob',
        });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${id}.xml`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        console.error('Error downloading file:', error);
        throw error;
    }
}

/**
 * Adds a new diagram.
 * 
 * @param {Object} item - The diagram item to add.
 * @param {string} item.name - The name of the diagram.
 * @param {File} [item.file] - The file associated with the diagram.
 * @throws Will throw an error if the add operation fails.
 */
async function addDiagram(item) {
    const formData = new FormData();
    formData.append('name', item.name);

    if (item.file && item.file instanceof File) {
        formData.append('file', item.file);
    }

    try {
        await axiosInstance.post('/api/diagrams/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    } catch (error) {
        console.error('Error adding diagram:', error);
        throw error;
    }
}

/**
 * Edits an existing diagram.
 * 
 * @param {Object} item - The diagram item to edit.
 * @param {string} item.id - The ID of the diagram.
 * @param {string} item.name - The name of the diagram.
 * @param {File} [item.file] - The file associated with the diagram.
 * @throws Will throw an error if the edit operation fails.
 */
async function editDiagram(item) {
    const formData = new FormData();
    formData.append('name', item.name);

    if (item.file && item.file instanceof File) {
        formData.append('file', item.file);
    }

    try {
        await axiosInstance.put(`/api/diagrams/${item.id}/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    } catch (error) {
        console.error('Error updating diagram:', error);
        throw error;
    }
}

/**
 * Visualizes a diagram by ID.
 * 
 * @param {string} id - The ID of the diagram to visualize.
 * @returns {Promise<Object>} The visualization data.
 * @throws Will throw an error if the visualization operation fails.
 */
async function visualizeDiagram(id) {
    try {
        const response = await axiosInstance.get(`/api/diagrams/${id}/visualize/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching diagram data:', error);
        throw error;
    }
}

/**
 * Updates the content of a file associated with a diagram by ID.
 * 
 * @param {string} id - The ID of the diagram.
 * @param {string} content - The new content for the file.
 * @returns {Promise<Object>} The updated file content.
 * @throws Will throw an error if the update operation fails.
 */
async function updateFileContent(id, content) {
    try {
        const response = await axiosInstance.put(`/api/diagrams/${id}/update_file_content/`, {
            content: content,
        });
        return response.data;
    } catch (error) {
        console.error('Error updating file content:', error);
        throw error;
    }
}

/**
 * Views the content of a file associated with a diagram by ID.
 * 
 * @param {string} id - The ID of the diagram.
 * @returns {Promise<string>} The file content as text.
 * @throws Will throw an error if the view operation fails.
 */
async function viewFile(id) {
    try {
        const response = await axiosInstance.get(`/api/diagrams/${id}/view_file/`, {
            responseType: 'blob',
        });
        const text = await response.data.text();
        return text;
    } catch (error) {
        console.error('Error viewing file text:', error);
        throw error;
    }
}

export {
    fetchDiagrams,
    deleteDiagram,
    downloadFile,
    addDiagram,
    editDiagram,
    visualizeDiagram,
    viewFile,
    updateFileContent,
};
