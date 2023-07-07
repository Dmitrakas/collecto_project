import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { createCollection, getCollections } from "../../actions/collection";
import './Collection.css';

export default function Collection() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [theme, setTheme] = useState("");
  const [image, setImage] = useState("");
  const userId = useSelector((state) => state.user.currentUser.id);
  const dispatch = useDispatch();
  const [collections, setCollections] = useState([]);

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
  }, []);
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(userId);
      dispatch(createCollection({ name, description, theme, image, userId }));
      setName("");
      setDescription("");
      setTheme("");
      setImage("");
    } catch (error) {
      console.error("Error creating collection:", error.message);
    }
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
          <input
            type="text"
            className="form-control"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="theme" className="form-label">
            Theme:
          </label>
          <input
            type="text"
            className="form-control"
            id="theme"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Image:
          </label>
          <input
            type="text"
            className="form-control"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Create
        </button>
      </form>

      <h2>Collections</h2>
      {collections.length === 0 ? (
        <p>Коллекций нет</p>
      ) : (
        <div className="collections-container">
          {collections.map((collection) => (
            <div key={collection._id} className="collection-card">
              <h3>{collection.name}</h3>
              <p>{collection.description}</p>
              <p>{collection.theme}</p>
              <p>{collection.image}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
