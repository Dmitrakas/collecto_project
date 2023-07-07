import React, { useState, useEffect } from "react";
import { getAllCollections } from "../../actions/collection";
import './Main.css'

export default function Main() {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await getAllCollections();
        setCollections(response);
      } catch (error) {
        console.error("Error fetching collections:", error.message);
      }
    };

    fetchCollections();

    const interval = setInterval(fetchCollections, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="main-container">
      <h2>All Collections</h2>
      {collections.length === 0 ? (
        <p>Коллекций нет</p>
      ) : (
        <div className="main-container-collections">
          {collections.map((collection) => (
            <div key={collection._id} className="collection-card-main">
              <h3>{collection.name}</h3>
              <p>{collection.description}</p>
              <p>{collection.theme}</p>
              <p>{collection.image}</p>
              <p>{collection.userId}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
