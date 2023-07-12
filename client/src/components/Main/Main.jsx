import React, { useState, useEffect } from "react";
import { getLargestCollections } from "../../actions/collection";
import "./Main.css";
import CollectionCard from "../CollectionCard/CollectionCard";

export default function Main() {
  const [collections, setCollections] = useState([]);

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

    const interval = setInterval(fetchCollections, 2000);
    return () => clearInterval(interval);
  }, [collections]);

  return (
    <div className="main-container">
      <h2>5 largest collections:</h2>
      {(collections.length === 0 || collections === undefined || collections === 'Network Error') ? (
        <p>Коллекций нет</p>
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
