import React, { useState, useEffect } from "react";
import {
  getLargestCollections,
  getCollectionById,
} from "../../actions/collection";
import { getRecentItems } from "../../actions/item";
import { getUserUsernameById } from "../../actions/user";
import { Link } from "react-router-dom";
import "./Main.css";

export default function Main() {
  const [collections, setCollections] = useState([]);
  const [items, setItems] = useState([]);
  const [collectionsLoading, setCollectionsLoading] = useState(true);
  const [itemsLoading, setItemsLoading] = useState(true);
  const [collectionsError, setCollectionsError] = useState(null);
  const [itemsError, setItemsError] = useState(null);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await getLargestCollections();
        if (!Array.isArray(response)) {
          setCollectionsError("Invalid response - expected an array");
          return;
        }
        setCollections(response);
      } catch (error) {
        setCollectionsError("Error collections: " + error.message);
      } finally {
        setCollectionsLoading(false);
      }
    };

    const fetchItems = async () => {
      try {
        const response = await getRecentItems();
        const resolvedItems = await Promise.all(
          response.map(async (item) => {
            const collection = await getCollectionById(item.collectionId);
            const author = await getUserUsernameById(item.userId);
            return {
              ...item,
              collectionName: collection.name,
              author: author,
            };
          })
        );
        setItems(resolvedItems);
      } catch (error) {
        setItemsError("Error fetching items: " + error.message);
      } finally {
        setItemsLoading(false);
      }
    };

    fetchCollections();
    fetchItems();
  }, []);

  return (
    <div className="main-container">
      <h2>Recent 10 Items:</h2>
      {itemsLoading ? (
        <p>Loading items...</p>
      ) : itemsError ? (
        <p>{itemsError}</p>
      ) : items.length === 0 ? (
        <p>No recent items</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Collection</th>
              <th>Author</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id}>
                <td>
                  <Link
                    to={`/collections/${item.collectionId}/${item._id}`}
                    state={{
                      collectionId: item.collectionId,
                      itemId: item._id,
                    }}
                  >
                    {item.name}
                  </Link>
                </td>
                <td>{item.collectionName}</td>
                <td>{item.author}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <h2>5 largest collections:</h2>
      {collectionsLoading ? (
        <p>Loading collections...</p>
      ) : collectionsError ? (
        <p>{collectionsError}</p>
      ) : collections.length === 0 ? (
        <p>No collections</p>
      ) : (
        <div className="collections-container">
          {collections.map((collection) => (
            <div className="collection" key={collection._id}>
              <Link
                to={`/collections/${collection._id}`}
                state={{ collectionId: collection._id }}
              >
                <h3 className="card-title">
                  Collection Name: {collection.name}
                </h3>
              </Link>
              <p className="card-theme">Theme: {collection.theme}</p>
              <div className="card-image-container">
                <img
                  src={collection.image}
                  alt="Collection"
                  className="card-image img-fluid"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
