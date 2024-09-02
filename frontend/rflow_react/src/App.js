// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DiagramTable from './components/DiagramTable';
import DiagramRenderer from './components/DiagramRenderer';
import AddEditDiagramModal from './components/modals/AddEditDiagramModal';
import UserOptionsModal from './components/modals/UserOptionsModal';
import { AppLogoIcon } from './assets/icons/AppLogoIcon';
import { ChooseSchemaIconButton } from './assets/icons/ChooseSchemaIcon';
import { AddNewDiagramIconButton } from './assets/icons/AddNewDiagramIcon';
import { UserIconButton } from './assets/icons/UserIcon';
import {
    fetchDiagrams,
    deleteDiagram,
    downloadFile,
    addDiagram,
    editDiagram,
    visualizeDiagram,
} from './services/DiagramService';
import LoginForm from './components/forms/LoginForm';
import './styles/App.css';
import { InfoIconButton } from './assets/icons/InfoIcon';
import InfoModal from './components/modals/InfoModal';

const App = () => {
    const [diagrams, setDiagrams] = useState([]);
    const [modal, setModal] = useState(false);
    const [modalType, setModalType] = useState('');
    const [activeItem, setActiveItem] = useState({ name: '', file: '' });
    const [originalItem, setOriginalItem] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUserOptionsModalOpen, setIsUserOptionsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            setIsAuthenticated(true);
            loadDiagrams();
        }
    }, []);

    const handleLogin = (token) => {
        setIsAuthenticated(true);
        loadDiagrams();
    };

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setIsAuthenticated(false);
        navigate('/');
    };

    const toggleUserOptionsModal = () => {
        setIsUserOptionsModalOpen(!isUserOptionsModalOpen);
    };

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
            {!isAuthenticated ? (
                <LoginForm onLogin={handleLogin} />
            ) : (
                <>
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
                                <InfoIconButton
                                    width="40"
                                    height="40"
                                    onClick={openModal}
                                    className="item"
                                />
                                <div className="user-icon-container">
                                    <UserIconButton
                                        width="40"
                                        height="40"
                                        onClick={toggleUserOptionsModal}
                                        className="item"
                                    />
                                </div>
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
                    <InfoModal isOpen={isModalOpen} toggle={closeModal} />
                    <UserOptionsModal
                        isOpen={isUserOptionsModalOpen}
                        toggle={toggleUserOptionsModal}
                        handleLogout={handleLogout}
                    />
                </>
            )}
        </div>
    );
};

const WrappedApp = () => (
    <Router>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/visualize/:id" element={<DiagramRenderer />} />
        </Routes>
    </Router>
);

export default WrappedApp;