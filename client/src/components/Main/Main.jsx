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

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await getLargestCollections();
        setCollections(response);
      } catch (error) {
        console.error("Error fetching collections:", error.message);
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
        console.error("Error fetching Items:", error.message);
      } finally {
        setItemsLoading(false);
      }
    };

    const interval = setInterval(() => {
      fetchCollections();
      fetchItems();
    }, 5000);

    fetchCollections();
    fetchItems();

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="main-container">
      <h2>Recent 10 Items:</h2>
      {itemsLoading ? (
        <p>Loading items...</p>
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
                <h3>Name: {collection.name}</h3>
              </Link>
              <p>Theme: {collection.theme}</p>
              <p>Image: {collection.image}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
