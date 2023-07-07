import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCollectionById } from "../../actions/collection";
import "./CollectionDetails.css";

export default function CollectionDetails() {
  const { collectionId } = useParams();
  const [collection, setCollection] = useState(null);

  useEffect(() => {
    const fetchCollectionDetails = async () => {
      try {
        const response = await getCollectionById(collectionId);
        setCollection(response);
      } catch (error) {
        console.error("Error fetching collection details:", error.message);
      }
    };

    fetchCollectionDetails();
  }, [collectionId]);

  if (!collection) {
    return <p>Loading collection details...</p>;
  }

  return (
    <div className="collection-details">
      <h2>Collection Details</h2>
      <p>Collection ID: {collectionId}</p>
      <p>Name: {collection.name}</p>
      <p>Description: {collection.description}</p>
      <p>Theme: {collection.theme}</p>
      <p>Image: {collection.image}</p>
      <p>User ID: {collection.userId}</p>
    </div>
  );
}
