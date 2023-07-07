import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { createCollection, getCollections } from "../../actions/collection";
import { createItem } from "../../actions/item";
import CollectionCard from "../CollectionCard/CollectionCard";
import "./Collection.css";

export default function Collection() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [theme, setTheme] = useState("");
  const [image, setImage] = useState("");

  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [tags, setTags] = useState("");

  const [field1Name, setField1Name] = useState("");
  const [field1Type, setField1Type] = useState("");
  const [field2Name, setField2Name] = useState("");
  const [field2Type, setField2Type] = useState("");
  const [field3Name, setField3Name] = useState("");
  const [field3Type, setField3Type] = useState("");
  const [collections, setCollections] = useState([]);
  const userId = useSelector((state) => state.user.currentUser.id);
  const collectionId = useSelector((state) => state.collection.collectionId);
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

    const interval = setInterval(fetchCollections, 2000);
    return () => clearInterval(interval);
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(createCollection({ name, description, theme, image, userId }));
      await createItem({
        name: itemName,
        description: itemDescription,
        tags,
        fieldName1: field1Name,
        fieldName2: field2Name,
        fieldName3: field3Name,
        fieldType1: field1Type,
        fieldType2: field2Type,
        fieldType3: field3Type,
        collectionId,
        userId,
      });
      setName("");
      setDescription("");
      setTheme("");
      setImage("");
      setItemName("");
      setItemDescription("");
      setTags("");
      setField1Name("");
      setField1Type("");
      setField2Name("");
      setField2Type("");
      setField3Name("");
      setField3Type("");
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

        <h2>Поля у Item</h2>
        <div className="mb-3">
          <label htmlFor="itemName" className="form-label">
            Name:
          </label>
          <input
            type="text"
            className="form-control"
            id="itemName"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="itemDescription" className="form-label">
            Description:
          </label>
          <input
            type="text"
            className="form-control"
            id="itemDescription"
            value={itemDescription}
            onChange={(e) => setItemDescription(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tags" className="form-label">
            Tags:
          </label>
          <input
            type="text"
            className="form-control"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <p>Additional item fields:</p>
          <div className="row">
            <div className="col">
              <label className="form-label">
                Field 1 Name:
                <input
                  type="text"
                  className="form-control"
                  value={field1Name}
                  onChange={(e) => setField1Name(e.target.value)}
                />
              </label>
            </div>
            <div className="col">
              <label className="form-label">
                Field 1 Type:
                <select
                  className="form-select"
                  value={field1Type}
                  onChange={(e) => setField1Type(e.target.value)}
                  required
                >
                  <option value="">Select Type</option>
                  <option value="String">String</option>
                  <option value="Number">Number</option>
                  <option value="Text">Text</option>
                  <option value="Boolean">Boolean</option>
                  <option value="Date">Date</option>
                </select>
              </label>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label className="form-label">
                Field 2 Name:
                <input
                  type="text"
                  className="form-control"
                  value={field2Name}
                  onChange={(e) => setField2Name(e.target.value)}
                />
              </label>
            </div>
            <div className="col">
              <label className="form-label">
                Field 2 Type:
                <select
                  className="form-select"
                  value={field2Type}
                  onChange={(e) => setField2Type(e.target.value)}
                  required
                >
                  <option value="">Select Type</option>
                  <option value="String">String</option>
                  <option value="Number">Number</option>
                  <option value="Text">Text</option>
                  <option value="Boolean">Boolean</option>
                  <option value="Date">Date</option>
                </select>
              </label>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label className="form-label">
                Field 3 Name:
                <input
                  type="text"
                  className="form-control"
                  value={field3Name}
                  onChange={(e) => setField3Name(e.target.value)}
                />
              </label>
            </div>
            <div className="col">
              <label className="form-label">
                Field 3 Type:
                <select
                  className="form-select"
                  value={field3Type}
                  onChange={(e) => setField3Type(e.target.value)}
                  required
                >
                  <option value="">Select Type</option>
                  <option value="String">String</option>
                  <option value="Number">Number</option>
                  <option value="Text">Text</option>
                  <option value="Boolean">Boolean</option>
                  <option value="Date">Date</option>
                </select>
              </label>
            </div>
          </div>
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
            <Link
              to={`/collections/${collection._id}`}
              key={collection._id}
              className="collection-card-link"
            >
              <CollectionCard collection={collection} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
