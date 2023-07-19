import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import ReactMarkdown from "react-markdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrashAlt,
  faSave,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import {
  deleteCollectionById,
  updateCollection,
} from "../../actions/collection";
import { collectionOptions } from "../../utils/CollectionOptions";
import "./CollectionCard.css";

export default function CollectionCard({ collection }) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(collection.name);
  const [description, setDescription] = useState(collection.description);
  const [theme, setTheme] = useState(collection.theme);
  const [image, setImage] = useState(collection.image);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    const data = {
      name,
      description,
      theme,
      image,
    };
    dispatch(
      updateCollection({ id: collection._id, userId: collection.userId, data })
    );

    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setName(collection.name);
    setDescription(collection.description);
    setTheme(collection.theme);
    setImage(collection.image);
  };

  const handleDeletionClick = async () => {
    try {
      
      dispatch(
        deleteCollectionById({
          id: collection._id,
          userId: collection.userId,
        })
      );
    } catch (error) {
      console.error("Error fetching collections:", error.message);
    }
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setFileToBase(file);
  };

  const setFileToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage(reader.result);
    };
  };

  return (
    <div className="card collection-card" key={collection._id}>
      <div className="card-body">
        {isEditing ? (
          <>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name:
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description:
              </label>
              <textarea
                className="form-control"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
              <ReactMarkdown className="markdown-preview">
                {description}
              </ReactMarkdown>
            </div>
            <div className="mb-3">
              <label htmlFor="theme" className="form-label">
                Theme:
              </label>
              <select
                className="form-select"
                id="theme"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                required
              >
                {collectionOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="image" className="form-label">
                Image:
              </label>
              <input
                type="file"
                className="form-control"
                id="image"
                accept="image/*"
                onChange={handleImage}
              />
            </div>

            <button className="btn btn-primary me-2" onClick={handleSaveClick}>
              <FontAwesomeIcon icon={faSave} />
            </button>

            <button className="btn btn-secondary" onClick={handleCancelClick}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </>
        ) : (
          <>
            <Link
              to={`/collections/${collection._id}`}
              state={{ collectionId: collection._id }}
              className="card-link"
            >
              <h3 className="card-title">Collection Name: {collection.name}</h3>
            </Link>
            <div className="card-text">
              <div className="card-description">
                Description:{" "}
                <ReactMarkdown>{collection.description}</ReactMarkdown>
              </div>
              <p className="card-theme">Theme: {collection.theme}</p>
              <div className="card-image-container">
                <img
                  src={collection.image}
                  alt="Collection"
                  className="card-image img-fluid"
                />
              </div>
            </div>

            <div className="card-actions">
              <button
                className="btn btn-primary card-action"
                onClick={handleEditClick}
              >
                <FontAwesomeIcon icon={faEdit} />
              </button>
              <button
                className="btn btn-danger card-action"
                onClick={handleDeletionClick}
              >
                <FontAwesomeIcon icon={faTrashAlt} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
