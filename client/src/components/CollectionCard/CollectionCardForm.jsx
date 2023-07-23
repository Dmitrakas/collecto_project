import React from "react";
import ReactMarkdown from "react-markdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTimes } from "@fortawesome/free-solid-svg-icons";

const CollectionCardForm = ({
  name,
  description,
  theme,
  image,
  setName,
  setDescription,
  setTheme,
  setImage,
  handleSaveClick,
  handleCancelClick,
  handleImage,
  collectionOptions,
}) => {
  return (
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
        <ReactMarkdown className="markdown-preview">{description}</ReactMarkdown>
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
  );
};

export default CollectionCardForm;
