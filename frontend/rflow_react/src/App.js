import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DiagramTable from './components/DiagramTable';
import DiagramRenderer from './components/DiagramRenderer';
import AddEditDiagramModal from './components/modals/AddEditDiagramModal';
import { AppLogoIcon } from './assets/icons/AppLogoIcon';
import { ChooseSchemaIconButton } from './assets/icons/ChooseSchemaIcon';
import { AddNewDiagramIconButton } from './assets/icons/AddNewDiagramIcon';
import {
    fetchDiagrams,
    deleteDiagram,
    downloadFile,
    addDiagram,
    editDiagram,
    visualizeDiagram,
} from './services/DiagramService';
import './styles/App.css';

const App = () => {
    const [diagrams, setDiagrams] = useState([]);
    const [modal, setModal] = useState(false);
    const [modalType, setModalType] = useState('');
    const [activeItem, setActiveItem] = useState({ name: '', file: '' });
    const [originalItem, setOriginalItem] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        loadDiagrams();
    }, []);

    const toggle = () => {
        setModal(!modal);
    };

    const loadDiagrams = async () => {
        try {
            const data = await fetchDiagrams();
            setDiagrams(data);
        } catch (error) {
            console.error('Error loading diagrams:', error);
            toast.error('Error loading diagrams');
        }
    };

    const addNewDiagram = () => {
        const item = { name: '', file: '' };
        setActiveItem(item);
        setModalType('add');
        setOriginalItem(null);
        toggle();
    };

    const chooseSchema = async () => {
        //TODO
    };

    const handleDelete = async (item) => {
        try {
            await deleteDiagram(item.id);
            loadDiagrams();
            toast.success('Diagram deleted successfully');
        } catch (error) {
            console.error('Error deleting diagram:', error);
            toast.error('Error deleting diagram');
        }
    };

    const handleEdit = (item) => {
        setActiveItem(item);
        setModalType('edit');
        setOriginalItem({ ...item });
        toggle();
    };

    const handleDownload = async (item) => {
        try {
            await downloadFile(item.id);
            toast.success('Diagram downloaded successfully');
        } catch (error) {
            console.error('Error downloading file:', error);
            toast.error('Error downloading file');
        }
    };

    const handleDiagramAdd = async (item) => {
        try {
            await addDiagram(item);
            toggle();
            loadDiagrams();
            toast.success('Diagram added successfully');
        } catch (error) {
            console.error('Error while adding diagram:', error); // DEBUG
            const errorMessage = error.response?.data?.message || 'Unknown error while adding diagram';
            toast.error(errorMessage);
        }
    };
    

    const handleDiagramEdit = async (item) => {
        try {
            await editDiagram(item);
            toggle();
            loadDiagrams();
            toast.success('Diagram edited successfully');
        } catch (error) {
            console.error('Error while updating diagram:', error); // DEBUG
            const errorMessage = error.response?.data?.message || 'Unknown error while adding diagram';
            toast.error(errorMessage);
        }
    };

    const handleVisualizeDiagram = async (item) => {
        try {
            const data = await visualizeDiagram(item.id);
            navigate(`/visualize/${item.id}`, { state: { diagramData: data, diagramName: item.name } });
        } catch (error) {
            console.error('Error fetching diagram data', error);
            const errorMessage = error.response?.data?.error || 'Error fetching diagram data';
            toast.error(errorMessage);
        }
    };

    const handleFormChange = (e) => {
        const { name, value, files } = e.target;
        setActiveItem((prevItem) => ({
            ...prevItem,
            [name]: files ? files[0] : value
        }));
    };

    return (
        <div>
            <ToastContainer />
            <div className="header">
                <div className="header-icons">
                    <div className="header-logo">
                        <AppLogoIcon width="80" height="80" />
                    </div>
                    <div className="header-buttons">
                        <AddNewDiagramIconButton
                            width="40"
                            height="40"
                            onClick={addNewDiagram}
                            className="item"
                        />
                        <ChooseSchemaIconButton
                            width="40"
                            height="40"
                            onClick={chooseSchema}
                            className="item"
                        />
                    </div>
                </div>
            </div>
            <div className="table-container">
                <DiagramTable
                    diagrams={diagrams}
                    editItem={handleEdit}
                    deleteItem={handleDelete}
                    downloadFile={handleDownload}
                    visualizeDiagram={handleVisualizeDiagram}
                />
            </div>
            <AddEditDiagramModal
                modal={modal}
                toggle={toggle}
                modalType={modalType}
                handleDiagramAdd={handleDiagramAdd}
                handleDiagramEdit={handleDiagramEdit}
                activeItem={activeItem}
                originalItem={originalItem}
                handleFormChange={handleFormChange}
            />
        </div>
    );
};

const WrappedApp = () => (
    <Router>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/visualize/:id" element={<DiagramRenderer/>} />
        </Routes>
    </Router>
);

export default WrappedApp;
