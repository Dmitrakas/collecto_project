import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";
import { WithContext as ReactTags } from "react-tag-input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { getCollectionById } from "../../actions/collection";
import { createItem, getItems, getTopTags } from "../../actions/item";
import { renderInputField } from "../../utils/formUtils";
import ItemCard from "../../components/ItemCard/ItemCard";
import "./CollectionDetails.css";
import "./TagAutocomplete.css";

export default function CollectionDetails() {
  const { collectionId } = useParams();
  const [collection, setCollection] = useState(null);
  const [name, setName] = useState("");
  const [tags, setTags] = useState([]);
  const [autocompleteTags, setAutocompleteTags] = useState([]);
  const [newItemValues, setNewItemValues] = useState({
    itemValue1: "",
    itemValue2: "",
    itemValue3: "",
  });
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [itemsError, setItemsError] = useState(null);
  const isAdmin = useSelector((state) => state.user?.currentUser?.isAdmin);
  const userId = useSelector((state) => state?.user?.currentUser?.id);

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
        setItemsError(null);
      } catch (error) {
        setItemsError("Error fetching items. Please try again later.");
      }
    };
    fetchCollectionDetails();
    fetchItems();

    const interval = setInterval(() => {
      fetchItems();
    }, 5000);

    return () => clearInterval(interval);
  }, [collectionId]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const tags = await getTopTags();
        setAutocompleteTags(tags || []);
      } catch (error) {
        console.error("Error fetching tags:", error.message);
      }
    };

    fetchTags();
  }, []);

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

  const filteredItems = Array.isArray(items)
    ? items.filter((item) =>
        item.name.toLowerCase().includes(filter.toLowerCase())
      )
    : [];

  const sortedItems = filteredItems.sort((a, b) => {
    if (sortOrder === "asc") {
      return a.name.localeCompare(b.name);
    } else {
      return b.name.localeCompare(a.name);
    }
  });

  const suggestions = Array.isArray(autocompleteTags)
    ? autocompleteTags.map((tag) => ({ id: tag, text: tag }))
    : [];

  if (!collection || collection === "Network Error") {
    return <p>Loading collection details...</p>;
  }

  const handleFieldValueChange = (fieldName, fieldValue) => {
    setNewItemValues((prevValues) => ({
      ...prevValues,
      [fieldName]: fieldValue,
    }));
  };

  return (
    <div className="collection-details">
      <h2 className="card-title">Collection Details</h2>
      <h3 className="title">Collection Name: {collection.name}</h3>
      <div className="card-description">
        Description: <ReactMarkdown>{collection.description}</ReactMarkdown>
      </div>
      <p className="card-theme">Theme: {collection.theme}</p>
      <div className="card-image-container">
        <img
          src={collection.image}
          alt="Collection"
          className="card-image img-fluid"
        />
      </div>

      {(isAdmin || userId === collection.userId) && (
        <>
        <h2 className="card-title">Create Item</h2>
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
                suggestions={suggestions}
                minQueryLength={1}
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
        </>
      )}

      <h3 className="card-title my-4">Items</h3>
      {itemsError ? (
        <p>{itemsError}</p>
      ) : !Array.isArray(items) || items.length === 0 ? (
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
                  <ItemCard
                    key={item._id}
                    item={item}
                    isAdmin={isAdmin}
                    userId={userId}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
