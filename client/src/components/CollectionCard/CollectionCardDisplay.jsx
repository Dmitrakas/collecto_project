import React from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const CollectionCardDisplay = ({ collection, handleEditClick, handleDeletionClick }) => {
  return (
    <>
      <Link to={`/collections/${collection._id}`} state={{ collectionId: collection._id }} className="card-link">
        <h3 className="card-title">Collection Name: {collection.name}</h3>
      </Link>
      <div className="card-text">
        <div className="card-description">
          Description: <ReactMarkdown>{collection.description}</ReactMarkdown>
        </div>
        <p className="card-theme">Theme: {collection.theme}</p>
        <div className="card-image-container">
          <img src={collection.image} alt="Collection" className="card-image img-fluid" />
        </div>
      </div>
      <div className="card-actions">
        <button className="btn btn-primary card-action" onClick={handleEditClick}>
          <FontAwesomeIcon icon={faEdit} />
        </button>
        <button className="btn btn-danger card-action" onClick={handleDeletionClick}>
          <FontAwesomeIcon icon={faTrashAlt} />
        </button>
      </div>
    </>
  );
};

export default CollectionCardDisplay;
