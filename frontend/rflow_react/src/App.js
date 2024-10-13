// built-in modules
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

// Custom components
import DiagramTable from './components/DiagramTable';
import DiagramRenderer from './components/DiagramRenderer';
import AddEditDiagramModal from './components/modals/AddEditDiagramModal';
import UserOptionsModal from './components/modals/UserOptionsModal';
import HelpModal from './components/modals/HelpModal';
import ConfirmationModal from './components/modals/ConfirmationModal';
import LoginForm from './components/forms/LoginForm';
import ResolutionTool from './components/ResolutionTool';

// Custom icons
import { AppLogoIcon } from './assets/app/AppLogoIcon.jsx';
import { ChooseSchemaIconButton } from './assets/ui/ChooseSchemaIcon.jsx';
import { AddNewDiagramIconButton } from './assets/ui/AddNewDiagramIcon.jsx';
import { UserIconButton } from './assets/ui/UserIcon.jsx';
import { HelpIconButton } from './assets/ui/HelpIcon.jsx';

// Custom services
import {
    fetchDiagrams,
    deleteDiagram,
    downloadFile,
    addDiagram,
    editDiagram,
    visualizeDiagram,
    viewFile,
} from './services/DiagramService';

// CSS
import 'react-toastify/dist/ReactToastify.css';
import './styles/App.css';

const App = () => {
    const [diagrams, setDiagrams] = useState([]);
    const [activeItem, setActiveItem] = useState({ name: '', file: '' });
    const [originalItem, setOriginalItem] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [modalType, setModalType] = useState('');
    const [isModalOpen, setIsModalOpen] = useState({
        helpModal: false,
        userOptionsModal: false,
        confirmationModal: false,
        addEditDiagramModal: false,
    });
    const [itemToDelete, setItemToDelete] = useState(null);

    const navigate = useNavigate();

    // Lifecycle methods
    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            setIsAuthenticated(true);
            loadDiagrams();
        }
    }, []);

    // Modal methods
    const openModal = (modalName) => {
        setIsModalOpen((prevState) => ({
            ...prevState,
            [modalName]: true,
        }));
    };

    const closeModal = (modalName) => {
        setIsModalOpen((prevState) => ({
            ...prevState,
            [modalName]: false,
        }));
    };

    // Service methods
    const loadDiagrams = async () => {
        try {
            const data = await fetchDiagrams();
            setDiagrams(data);
        } catch (error) {
            console.error('Error loading diagrams:', error);
            toast.error('Error loading diagrams');
        }
    };

    // Event handlers
    const handleLogin = () => {
        setIsAuthenticated(true);
        loadDiagrams();
    };

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setIsAuthenticated(false);
        setIsModalOpen({
            helpModal: false,
            userOptionsModal: false,
            confirmationModal: false,
            addEditDiagramModal: false,
        });
        navigate('/');
    };

    const handleAddNewDiagram = () => {
        const item = { name: '', file: '' };
        setActiveItem(item);
        setModalType('add');
        setOriginalItem(null);
        openModal('addEditDiagramModal');
    };

    const handleChooseSchema = async () => {
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
        closeModal('confirmationModal');
    };

    const handleConfirmDelete = (item) => {
        setItemToDelete(item);
        openModal('confirmationModal');
    };

    const handleEdit = (item) => {
        setActiveItem(item);
        setModalType('edit');
        setOriginalItem({ ...item });
        openModal('addEditDiagramModal');
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

    const handleSubmitDiagram = async (item) => {
        try {
            if (modalType === 'add') {
                await addDiagram(item);
                toast.success('Diagram added successfully');
            } else if (modalType === 'edit') {
                await editDiagram(item);
                toast.success('Diagram edited successfully');
            }
            closeModal('addEditDiagramModal');
            loadDiagrams();
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Unknown error while processing diagram';
            toast.error(errorMessage);
        }
    };

    const handleVisualizeDiagram = async (item) => {
        try {
            const data = await visualizeDiagram(item.id);
            navigate(`/visualize/${item.id}`, { state: { diagramId: item.id, diagramData: data, diagramName: item.name } });
        } catch (error) {
            console.error('Error fetching diagram data', error);
            console.log('Error response data:', error.response?.data);
    
            const initialItemText = await viewFile(item.id);
            const errorMessage = error.response?.data?.error || error.response?.data?.message || 'Error fetching diagram data';
            const errorLine = error.response?.data?.line || 0;
            const errorColumn = error.response?.data?.column || 0;
            const duplicatedIds = error.response?.data?.duplicatedIds || [];
            navigate(`/resolve/${item.id}`, 
                { state: { itemName: item.name, itemId: item.id, initialItemText, 
                    errorMessage, errorLine, errorColumn, 
                    duplicatedIds } });
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
                                    onClick={handleAddNewDiagram}
                                    className="app-header-button"
                                />
                                <ChooseSchemaIconButton
                                    width="40"
                                    height="40"
                                    onClick={handleChooseSchema}
                                    className="app-header-button"
                                />
                                <HelpIconButton
                                    width="40"
                                    height="40"
                                    onClick={() => openModal('helpModal')}
                                    className="app-header-button"
                                />
                                <UserIconButton
                                    width="40"
                                    height="40"
                                    onClick={() => openModal('userOptionsModal')}
                                    className="app-header-button"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="app-diagram-table-container">
                        <DiagramTable
                            diagrams={diagrams}
                            editItem={handleEdit}
                            deleteItem={handleConfirmDelete}
                            downloadFile={handleDownload}
                            visualizeDiagram={handleVisualizeDiagram}
                        />
                    </div>
                    <AddEditDiagramModal
                        modal={isModalOpen.addEditDiagramModal}
                        toggle={() => closeModal('addEditDiagramModal')}
                        modalType={modalType}
                        handleDiagramAdd={handleSubmitDiagram}
                        handleDiagramEdit={handleSubmitDiagram}
                        activeItem={activeItem}
                        originalItem={originalItem}
                        handleFormChange={handleFormChange}
                    />
                    <HelpModal
                        isOpen={isModalOpen.helpModal}
                        toggle={() => closeModal('helpModal')}
                    />
                    <UserOptionsModal
                        isOpen={isModalOpen.userOptionsModal}
                        toggle={() => closeModal('userOptionsModal')}
                        handleLogout={handleLogout}
                    />
                    <ConfirmationModal
                        isOpen={isModalOpen.confirmationModal}
                        toggle={() => closeModal('confirmationModal')}
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
            <Route path="/resolve/:id" element={<ResolutionTool />} />
        </Routes>
    </Router>
);

export default WrappedApp;