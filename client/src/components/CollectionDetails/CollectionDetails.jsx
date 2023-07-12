import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCollectionById } from "../../actions/collection";
import { useDispatch } from "react-redux";
import { createItem, getItems } from "../../actions/item";
import "./CollectionDetails.css";
import ItemCard from "../ItemCard/ItemCard";

export default function CollectionDetails() {
  const { collectionId } = useParams();
  const [collection, setCollection] = useState(null);
  const [newItemValues, setNewItemValues] = useState({
    itemValue1: "",
    itemValue2: "",
    itemValue3: "",
  });
  const [items, setItems] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCollectionDetails = async () => {
      try {
        const response = await getCollectionById(collectionId);
        setCollection(response);
      } catch (error) {
        console.error("Error fetching collection details:", error.message);
      }
    };

    const fetchItems = async () => {
      try {
        const response = await getItems(collectionId);
        setItems(response);
      } catch (error) {
        console.error("Error fetching items:", error.message);
      }
    };

    fetchCollectionDetails();
    fetchItems();

    const interval = setInterval(() => {
      fetchCollectionDetails();
      fetchItems();
    }, 5000);

    return () => clearInterval(interval);
  }, [collectionId]);

  const handleAddItem = (e) => {
    e.preventDefault();
    try {
      dispatch(
        createItem({
          name: collection.itemName,
          tags: collection.tags,
          fieldValue1: newItemValues.itemValue1,
          fieldValue2: newItemValues.itemValue2,
          fieldValue3: newItemValues.itemValue3,
          collectionId: collectionId,
          userId: collection.userId,
        })
      );
      setNewItemValues({
        itemValue1: "",
        itemValue2: "",
        itemValue3: "",
      });
    } catch (error) {
      console.error("Error creating collection:", error.message);
    }
  };

  if (!collection) {
    return <p>Loading collection details...</p>;
  }

  const renderInputField = (fieldName, fieldValue, fieldType, onChange) => {
    if (fieldType === "string") {
      return (
        <input
          type="text"
          className="form-control"
          value={fieldValue}
          onChange={(e) => onChange(fieldName, e.target.value)}
          required
        />
      );
    } else if (fieldType === "number") {
      return (
        <input
          type="number"
          className="form-control"
          value={fieldValue}
          onChange={(e) => onChange(fieldName, e.target.value)}
          required
        />
      );
    } else if (fieldType === "text") {
      return (
        <textarea
          className="form-control"
          value={fieldValue}
          onChange={(e) => onChange(fieldName, e.target.value)}
          required
        />
      );
    } else if (fieldType === "boolean") {
      return (
        <select
          className="form-select"
          value={fieldValue}
          onChange={(e) => onChange(fieldName, e.target.value)}
          required
        >
          <option value="">Select</option>
          <option value="true">True</option>
          <option value="false">False</option>
        </select>
      );
    } else if (fieldType === "date") {
      return (
        <input
          type="date"
          className="form-control"
          value={fieldValue}
          onChange={(e) => onChange(fieldName, e.target.value)}
          required
        />
      );
    } else {
      return null;
    }
  };

  const handleFieldValueChange = (fieldName, fieldValue) => {
    setNewItemValues((prevValues) => ({
      ...prevValues,
      [fieldName]: fieldValue,
    }));
  };

  return (
    <div className="collection-details">
      <h2>Collection Details</h2>
      <p>Collection ID: {collectionId}</p>
      <p>Name: {collection.name}</p>
      <p>Description: {collection.description}</p>
      <p>Theme: {collection.theme}</p>
      <p>Image: {collection.image}</p>
      <p>Item Name: {collection.itemName}</p>
      <p>Item Tags: {collection.tags}</p>
      <p>Item Field Name 1: {collection.itemFieldName1}</p>
      <p>Item Field Name 2: {collection.itemFieldName2}</p>
      <p>Item Field Name 3: {collection.itemFieldName3}</p>
      <p>Item Field Type 1: {collection.itemFieldType1}</p>
      <p>Item Field Type 2: {collection.itemFieldType2}</p>
      <p>Item Field Type 3: {collection.itemFieldType3}</p>

      <h3>Add Item</h3>
      <form onSubmit={handleAddItem}>
        <div className="mb-3">
          <label className="form-label">{collection.itemFieldName1}:</label>
          {renderInputField(
            "itemValue1",
            newItemValues.itemValue1,
            collection.itemFieldType1,
            handleFieldValueChange
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">{collection.itemFieldName2}:</label>
          {renderInputField(
            "itemValue2",
            newItemValues.itemValue2,
            collection.itemFieldType2,
            handleFieldValueChange
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">{collection.itemFieldName3}:</label>
          {renderInputField(
            "itemValue3",
            newItemValues.itemValue3,
            collection.itemFieldType3,
            handleFieldValueChange
          )}
        </div>

        <button type="submit" className="btn btn-primary">
          Add
        </button>
      </form>

      <h3>Items</h3>
      {items.length === 0 ||
      items === undefined ||
      (items === "Network Error") === 0 ? (
        <p>No items</p>
      ) : (
        <div className="collections-container">
          {items.map((item) => (
            <ItemCard item={item} collection={collection} />
          ))}
        </div>
      )}
    </div>
  );
}
