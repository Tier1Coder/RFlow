import React, { useState } from 'react';
import { ShowVisualizationIconButton } from '../assets/icons/ShowVisualizationIcon';
import { DeleteCircleIconButton } from '../assets/icons/DeleteCircleIcon';
import { DownloadFileIconButton } from '../assets/icons/DownloadFileIcon';
import { EditIconButton } from '../assets/icons/EditIcon';
import '../styles/DiagramTable.css';

const DiagramTable = ({ diagrams, editItem, deleteItem, downloadFile, visualizeDiagram }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const diagramsPerPage = 10;

    const indexOfLastDiagram = currentPage * diagramsPerPage;
    const indexOfFirstDiagram = indexOfLastDiagram - diagramsPerPage;
    const currentDiagrams = diagrams.slice(indexOfFirstDiagram, indexOfLastDiagram);
    const totalPages = Math.ceil(diagrams.length / diagramsPerPage);

    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    const handleInputChange = (e) => {
        const pageNumber = parseInt(e.target.value, 10);
        if (!isNaN(pageNumber)) {
            handlePageChange(pageNumber);
        }
    };

    const handlePrevious = () => {
        if (currentPage > 1) {
            handlePageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            handlePageChange(currentPage + 1);
        }
    };

    return (
        <div className="diagram-table-container">
            <table className="diagram-table">
                <thead className="diagram-table-columns">
                    <tr>
                        <th className="column-name">Name</th>
                        <th className="column-file">File</th>
                        <th className="column-options">Options</th>
                    </tr>
                </thead>
                <tbody>
                    {currentDiagrams.map((item) => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.file}</td>
                            <td className="button-group">
                                <div className="item" id={`${item.name}-download-file-button`}>
                                    <DownloadFileIconButton
                                        width="24"
                                        height="24"
                                        onClick={() => downloadFile(item)}
                                    />
                                </div>
                                <div className="item" id={`${item.name}-visualize-diagram-button`}>
                                    <ShowVisualizationIconButton
                                        width="24"
                                        height="24"
                                        onClick={() => visualizeDiagram(item)}
                                    />
                                </div>
                                <div className="item" id={`${item.name}-edit-diagram-button`}>
                                    <EditIconButton
                                        width="24"
                                        height="24"
                                        onClick={() => editItem(item)}
                                    />
                                </div>
                                <div className="item" id={`${item.name}-delete-diagram-button`}>
                                    <DeleteCircleIconButton
                                        width="24"
                                        height="24"
                                        onClick={() => deleteItem(item)}
                                    />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="pagination-container">
                <button onClick={handlePrevious} disabled={currentPage === 1}>
                    Previous
                </button>
                <input
                    type="number"
                    value={currentPage}
                    onChange={handleInputChange}
                    min="1"
                    max={totalPages}
                />
                <span>out of {totalPages}</span>
                <button onClick={handleNext} disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default DiagramTable;