import axios from 'axios';

const fetchDiagrams = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/diagrams/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching diagrams:', error);
        throw error;
    }
};

const deleteDiagram = async (id) => {
    try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/api/diagrams/${id}/`);
    } catch (error) {
        console.error('Error deleting diagram:', error);
        throw error;
    }
};

const downloadFile = async (id) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/diagrams/${id}/view_file/`, {
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
        await axios.post(`${process.env.REACT_APP_API_URL}/api/diagrams/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
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
        await axios.put(`${process.env.REACT_APP_API_URL}/api/diagrams/${item.id}/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

    } catch (error) {
        console.error('Error updating diagram:', error);
        throw error;
    }
};

const visualizeDiagram = async (id) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/diagrams/${id}/visualize/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching diagram data:', error);
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
};