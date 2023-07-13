import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import ReactMarkdown from "react-markdown";
import { WithContext as ReactTags } from "react-tag-input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { getCollectionById } from "../../actions/collection";
import { createItem, getItems } from "../../actions/item";
import ItemCard from "../ItemCard/ItemCard";
import "./CollectionDetails.css";

export default function CollectionDetails() {
  const { collectionId } = useParams();
  const [collection, setCollection] = useState(null);
  const [name, setName] = useState("");
  const [tags, setTags] = useState([]);
  const [newItemValues, setNewItemValues] = useState({
    itemValue1: "",
    itemValue2: "",
    itemValue3: "",
  });
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
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
          name: name,
          tags: tags,
          fieldValue1: newItemValues.itemValue1,
          fieldValue2: newItemValues.itemValue2,
          fieldValue3: newItemValues.itemValue3,
          collectionId: collectionId,
          userId: collection.userId,
        })
      );
      setName("");
      setTags([]);
      setNewItemValues({
        itemValue1: "",
        itemValue2: "",
        itemValue3: "",
      });
    } catch (error) {
      console.error("Error creating collection:", error.message);
    }
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSortOrderChange = () => {
    setSortOrder((prevSortOrder) => (prevSortOrder === "asc" ? "desc" : "asc"));
  };

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(filter.toLowerCase())
  );

  const sortedItems = filteredItems.sort((a, b) => {
    if (sortOrder === "asc") {
      return a.name.localeCompare(b.name);
    } else {
      return b.name.localeCompare(a.name);
    }
  });

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
      <h3>Name: {collection.name}</h3>
      <div className="card-text">
        Description: <ReactMarkdown>{collection.description}</ReactMarkdown>
      </div>
      <p>Theme: {collection.theme}</p>
      <p>Image: {collection.image}</p>

      <h3>Add Item</h3>
      <form onSubmit={handleAddItem}>
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
          <label htmlFor="tags" className="form-label">
            Tags:
          </label>
          <ReactTags
            tags={tags.map((tag, index) => ({ id: tag, text: tag }))}
            handleDelete={(index) => {
              const newTags = tags.filter((_, i) => i !== index);
              setTags(newTags);
            }}
            handleAddition={(tag) => {
              setTags([...tags, tag.text]);
            }}
            handleInputChange={() => {}}
            placeholder="Add tags"
            allowDragDrop={false}
            autofocus={false}
          />
        </div>

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
          <FontAwesomeIcon icon={faPlus} /> Create
        </button>
      </form>

      <h3>Items</h3>
      {items.length === 0 ||
      items === undefined ||
      (items === "Network Error") === 0 ? (
        <p>No items</p>
      ) : (
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Tags</th>
                <th>{collection.itemFieldName1}</th>
                <th>{collection.itemFieldName2}</th>
                <th>{collection.itemFieldName3}</th>
                <th>
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="sortOrder"
                      checked={sortOrder === "desc"}
                      onChange={handleSortOrderChange}
                    />
                    <label className="form-check-label" htmlFor="sortOrder">
                      Sort {sortOrder === "asc" ? "Descending" : "Ascending"}
                    </label>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="6">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Filter by name"
                    value={filter}
                    onChange={handleFilterChange}
                  />
                </td>
              </tr>
              {sortedItems.length === 0 ? (
                <tr>
                  <td colSpan="6">No items</td>
                </tr>
              ) : (
                sortedItems.map((item) => (
                  <ItemCard key={item._id} item={item} />
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
