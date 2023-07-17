import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { createCollection, getCollections } from "../../actions/collection";
import CollectionCard from "../CollectionCard/CollectionCard";
import { collectionOptions } from "../../utils/CollectionOptions";
import ReactMarkdown from "react-markdown";
import "./Collection.css";

export default function Collection() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [theme, setTheme] = useState("");
  const [image, setImage] = useState("");
  const [itemFieldName1, setItemFieldName1] = useState("");
  const [itemFieldName2, setItemFieldName2] = useState("");
  const [itemFieldName3, setItemFieldName3] = useState("");
  const [itemFieldType1, setItemFieldType1] = useState("");
  const [itemFieldType2, setItemFieldType2] = useState("");
  const [itemFieldType3, setItemFieldType3] = useState("");
  const [collections, setCollections] = useState([]);

  const userId = useSelector((state) => state.user.currentUser.id);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await getCollections(userId);
        setCollections(response);
      } catch (error) {
        console.error("Error fetching collections:", error.message);
      }
    };

    fetchCollections();

    const interval = setInterval(fetchCollections, 5000);
    return () => clearInterval(interval);
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(
        createCollection({
          name,
          description,
          theme,
          image,
          itemFieldName1,
          itemFieldName2,
          itemFieldName3,
          itemFieldType1,
          itemFieldType2,
          itemFieldType3,
          userId,
        })
      );
      setName("");
      setDescription("");
      setTheme("");
      setImage("");
      setItemFieldName1("");
      setItemFieldName2("");
      setItemFieldName3("");
      setItemFieldType1("");
      setItemFieldType2("");
      setItemFieldType3("");
    } catch (error) {
      console.error("Error creating collection:", error.message);
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
    <div className="collection-container">
      <h2>Create Collection</h2>
      <form onSubmit={handleSubmit}>
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
            required
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
            required
          />
        </div>

        <h2>Item fields</h2>

        <div className="mb-3">
          <p>Additional item fields:</p>
          <div className="d-flex">
            <div className="me-3">
              <label className="form-label">
                Field 1 Name:
                <input
                  type="text"
                  className="form-control"
                  value={itemFieldName1}
                  onChange={(e) => setItemFieldName1(e.target.value)}
                />
              </label>
            </div>
            <div>
              <label className="form-label">
                Field 1 Type:
                <select
                  className="form-select"
                  value={itemFieldType1}
                  onChange={(e) => setItemFieldType1(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    Choose type...
                  </option>
                  <option value="string">String</option>
                  <option value="number">Number</option>
                  <option value="text">Text</option>
                  <option value="boolean">Boolean</option>
                  <option value="date">Date</option>
                </select>
              </label>
            </div>
          </div>
          <div className="d-flex">
            <div className="me-3">
              <label className="form-label">
                Field 2 Name:
                <input
                  type="text"
                  className="form-control"
                  value={itemFieldName2}
                  onChange={(e) => setItemFieldName2(e.target.value)}
                />
              </label>
            </div>
            <div>
              <label className="form-label">
                Field 2 Type:
                <select
                  className="form-select"
                  value={itemFieldType2}
                  onChange={(e) => setItemFieldType2(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    Choose type...
                  </option>
                  <option value="string">String</option>
                  <option value="number">Number</option>
                  <option value="text">Text</option>
                  <option value="boolean">Boolean</option>
                  <option value="date">Date</option>
                </select>
              </label>
            </div>
          </div>
          <div className="d-flex">
            <div className="me-3">
              <label className="form-label">
                Field 3 Name:
                <input
                  type="text"
                  className="form-control"
                  value={itemFieldName3}
                  onChange={(e) => setItemFieldName3(e.target.value)}
                />
              </label>
            </div>
            <div>
              <label className="form-label">
                Field 3 Type:
                <select
                  className="form-select"
                  value={itemFieldType3}
                  onChange={(e) => setItemFieldType3(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    Choose type...
                  </option>
                  <option value="string">String</option>
                  <option value="number">Number</option>
                  <option value="text">Text</option>
                  <option value="boolean">Boolean</option>
                  <option value="date">Date</option>
                </select>
              </label>
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          <FontAwesomeIcon icon={faPlus} /> Create
        </button>
      </form>

      <h2>Collections: </h2>
      {collections.length === 0 ||
      collections === undefined ||
      collections === "Network Error" ? (
        <p>No Collections</p>
      ) : (
        <div className="collections-container">
          {collections.map((collection) => (
            <CollectionCard key={collection._id} collection={collection} />
          ))}
        </div>
      )}
    </div>
  );
}
