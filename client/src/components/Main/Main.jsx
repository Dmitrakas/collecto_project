import React, { useState, useEffect } from "react";
import { getLargestCollections } from "../../actions/collection";
import { getRecentItems } from "../../actions/item";
import { Link } from "react-router-dom";
import "./Main.css";

export default function Main() {
  const [collections, setCollections] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await getLargestCollections();

        setCollections(response);
      } catch (error) {
        console.error("Error fetching collections:", error.message);
      }
    };
    fetchCollections();

    const interval = setInterval(fetchCollections, 5000);
    return () => clearInterval(interval);
  }, [collections]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await await getRecentItems();

        setItems(response);
      } catch (error) {
        console.error("Error fetching Items:", error.message);
      }
    };
    fetchItems();

    const interval = setInterval(fetchItems, 5000);
    return () => clearInterval(interval);
  }, [items]);

  return (
    <div className="main-container">
      <h2>5 largest collections:</h2>
      {collections.length === 0 ||
      collections === undefined ||
      collections === "Network Error" ? (
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

      <h2>Recent 10 Items:</h2>
      {items.length === 0 ||
      items === undefined ||
      items === "Network Error" ? (
        <p>No recent items</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Tags</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id}>
                <td>
                  <Link
                    to={`/collections/${item.collectionId}/${item._id}`}
                    state={{ collectionId: item.collectionId, itemId: item._id }}
                  >
                    {item.name}
                  </Link>
                </td>
                <td>
                  {item.tags.map((tag, index) => (
                    <div key={index} className="tag-circle">
                      <button className="btn btn-primary">{tag}</button>
                    </div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
