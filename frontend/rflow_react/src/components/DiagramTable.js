import React, { useState, useRef, useEffect } from 'react';
import { ShowVisualizationIconButton } from '../assets/ui/ShowVisualizationIcon.jsx';
import { DeleteCircleIconButton } from '../assets/ui/DeleteCircleIcon.jsx';
import { DownloadFileIconButton } from '../assets/ui/DownloadFileIcon.jsx';
import { EditIconButton } from '../assets/ui/EditIcon.jsx';
import { FilterIconButton } from '../assets/ui/FilterIcon.jsx';
import { SearchIconButton } from '../assets/ui/SearchIcon.jsx';
import '../styles/components/DiagramTable.css';

const DiagramTable = ({
  diagrams,
  editItem,
  deleteItem,
  downloadFile,
  visualizeDiagram,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState({ column: 'name', order: 'asc' });
  const [showSortOptions, setShowSortOptions] = useState(false);
  const diagramsPerPage = 10;

  const filterButtonRef = useRef(null);
  const sortOptionsRef = useRef(null);

  useEffect(() => {
    if (showSortOptions) {
      const handleClickOutside = (event) => {
        if (
          sortOptionsRef.current &&
          !sortOptionsRef.current.contains(event.target) &&
          filterButtonRef.current &&
          !filterButtonRef.current.contains(event.target)
        ) {
          setShowSortOptions(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [showSortOptions]);

  const filteredDiagrams = diagrams.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedDiagrams = filteredDiagrams.sort((a, b) => {
    const aValue = a[sortOrder.column].toLowerCase();
    const bValue = b[sortOrder.column].toLowerCase();

    if (aValue < bValue) {
      return sortOrder.order === 'asc' ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortOrder.order === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const indexOfLastDiagram = currentPage * diagramsPerPage;
  const indexOfFirstDiagram = indexOfLastDiagram - diagramsPerPage;
  const currentDiagrams = sortedDiagrams.slice(
    indexOfFirstDiagram,
    indexOfLastDiagram
  );
  const totalPages = Math.ceil(sortedDiagrams.length / diagramsPerPage);

  // Event handlers

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleSort = (column, order) => {
    setSortOrder({ column, order });
    setShowSortOptions(false);
  };

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
      <div className="diagram-table-search-sort-container">
        <div className="diagram-table-search-bar">
          <SearchIconButton width="24" height="24" />
          <input
            id="diagram-table-search-input"
            type="text"
            placeholder="Search diagrams..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <div className="diagram-table-filter-button">
          <div ref={filterButtonRef}>
            <FilterIconButton
              width="24"
              height="24"
              onClick={() => setShowSortOptions(!showSortOptions)}
              title="Sort Options"
            />
          </div>
          {showSortOptions && (
            <div className="diagram-table-sort-options" ref={sortOptionsRef}>
              <button onClick={() => handleSort('name', 'asc')}>A-Z</button>
              <button onClick={() => handleSort('name', 'desc')}>Z-A</button>
              <button onClick={() => handleSort('creation_date', 'desc')}>
                Newest
              </button>
              <button onClick={() => handleSort('creation_date', 'asc')}>
                Oldest
              </button>
            </div>
          )}
        </div>
      </div>
      <table className="diagram-table">
        <thead className="diagram-table-columns">
          <tr>
            <th className="diagram-table-column-name">Name</th>
            <th className="diagram-table-column-file">File</th>
            <th className="diagram-table-column-options">Options</th>
          </tr>
        </thead>
        <tbody>
          {currentDiagrams.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.file}</td>
              <td className="diagram-table-button-group">
                <div
                  className="diagram-table-button-group-item"
                  id={`${item.name}-download-file-button`}
                >
                  <DownloadFileIconButton
                    width="24"
                    height="24"
                    onClick={() => downloadFile(item)}
                  />
                </div>
                <div
                  className="diagram-table-button-group-item"
                  id={`${item.name}-visualize-diagram-button`}
                >
                  <ShowVisualizationIconButton
                    width="24"
                    height="24"
                    onClick={() => visualizeDiagram(item)}
                  />
                </div>
                <div
                  className="diagram-table-button-group-item"
                  id={`${item.name}-edit-diagram-button`}
                >
                  <EditIconButton
                    width="24"
                    height="24"
                    onClick={() => editItem(item)}
                  />
                </div>
                <div
                  className="diagram-table-button-group-item"
                  id={`${item.name}-delete-diagram-button`}
                >
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

      <div className="diagram-table-pagination-container">
        <button onClick={handlePrevious} disabled={currentPage === 1}>
          Previous
        </button>
        <input
          id="diagram-table-page-input"
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
