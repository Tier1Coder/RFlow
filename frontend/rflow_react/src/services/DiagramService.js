import axiosInstance from './axiosInstance';

const fetchDiagrams = async () => {
    try {
        const response = await axiosInstance.get('/api/diagrams/');
        return response.data;
    } catch (error) {
        console.error('Error fetching diagrams:', error);
        throw error;
    }
};

const deleteDiagram = async (id) => {
    try {
        await axiosInstance.delete(`/api/diagrams/${id}/`);
    } catch (error) {
        console.error('Error deleting diagram:', error);
        throw error;
    }
};

const downloadFile = async (id) => {
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
        document.body.removeChild(link); // Clean up and remove the link
    } catch (error) {
        console.error('Error downloading file:', error);
        throw error;
    }
};

const addDiagram = async (item) => {
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
};

const editDiagram = async (item) => {
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
};

const visualizeDiagram = async (id) => {
    try {
        const response = await axiosInstance.get(`/api/diagrams/${id}/visualize/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching diagram data:', error);
        throw error;
    }
};

const viewFile = async (id) => {
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
};

export {
    fetchDiagrams,
    deleteDiagram,
    downloadFile,
    addDiagram,
    editDiagram,
    visualizeDiagram,
    viewFile,
};
