import React from 'react';
import { ShowVisualizationIconButton } from '../assets/icons/ShowVisualizationIcon';
import { DeleteCircleIconButton } from '../assets/icons/DeleteCircleIcon';
import { DownloadFileIconButton } from '../assets/icons/DownloadFileIcon';
import { EditIconButton } from '../assets/icons/EditIcon';
import '../styles/DiagramTable.css';

const DiagramTable = ({ diagrams, editItem, deleteItem, downloadFile, visualizeDiagram }) => {


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
          {diagrams.map((item) => (
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
    </div>
  );
};

export default DiagramTable;
