import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DiagramTable from './components/DiagramTable';
import DiagramRenderer from './components/DiagramRenderer';
import AddEditDiagramModal from './components/modals/AddEditDiagramModal';
import UserOptionsModal from './components/modals/UserOptionsModal';
import LoginForm from './components/forms/LoginForm';
import HelpModal from './components/modals/HelpModal';
import ConfirmationModal from './components/modals/ConfirmationModal';
import { AppLogoIcon } from './assets/icons/app/AppLogoIcon';
import { ChooseSchemaIconButton } from './assets/icons/ui/ChooseSchemaIcon';
import { AddNewDiagramIconButton } from './assets/icons/ui/AddNewDiagramIcon';
import { UserIconButton } from './assets/icons/ui/UserIcon';
import { HelpIconButton } from './assets/icons/ui/HelpIcon';
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
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUserOptionsModalOpen, setIsUserOptionsModalOpen] = useState(false);
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

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
        //TODO: Implement schema selection
    };

    const handleDelete = async () => {
        try {
            await deleteDiagram(itemToDelete.id);
            loadDiagrams();
            toast.success('Diagram deleted successfully');
        } catch (error) {
            console.error('Error deleting diagram:', error);
            toast.error('Error deleting diagram');
        }
        setIsConfirmationModalOpen(false);
    };

    const confirmDelete = (item) => {
        setItemToDelete(item);
        setIsConfirmationModalOpen(true);
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
            const errorMessage = error.response?.data?.message || 'Unknown error while adding diagram';
            toast.error(errorMessage);
        }
    };

    const handleVisualizeDiagram = async (item) => {
        try {
            const data = await visualizeDiagram(item.id);
            navigate(`/visualize/${item.id}`, { state: { diagramId: item.id, diagramData: data, diagramName: item.name } });
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
                    <div className="app-header">
                        <div className="app-header-icons">
                            <div className="app-header-logo">
                                <AppLogoIcon width="80" height="80" />
                            </div>
                            <div className="app-header-buttons">
                                <AddNewDiagramIconButton
                                    width="40"
                                    height="40"
                                    onClick={addNewDiagram}
                                    className="app-header-button"
                                />
                                <ChooseSchemaIconButton
                                    width="40"
                                    height="40"
                                    onClick={chooseSchema}
                                    className="app-header-button"
                                />
                                <HelpIconButton
                                    width="40"
                                    height="40"
                                    onClick={openModal}
                                    className="app-header-button"
                                />
                                <UserIconButton
                                    width="40"
                                    height="40"
                                    onClick={toggleUserOptionsModal}
                                    className="app-header-button"
                                />

                            </div>
                        </div>
                    </div>
                    <div className="app-diagram-table-container">
                        <DiagramTable
                            diagrams={diagrams}
                            editItem={handleEdit}
                            deleteItem={confirmDelete}
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
                    <HelpModal isOpen={isModalOpen} toggle={closeModal} />
                    <UserOptionsModal
                        isOpen={isUserOptionsModalOpen}
                        toggle={toggleUserOptionsModal}
                        handleLogout={handleLogout}
                    />
                    <ConfirmationModal
                        isOpen={isConfirmationModalOpen}
                        toggle={() => setIsConfirmationModalOpen(false)}
                        onConfirm={handleDelete}
                        message="Are you sure you want to delete this diagram?"
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
