import React from "react";
import { useNavigate } from "react-router-dom";

export default function CollectionCard({ collection }) {
  const navigate = useNavigate();

  const handleCollectionClick = () => {
    navigate(`/collections/${collection._id}`, {
      state: { collectionId: collection.id },
    });
  };

  return (
    <div className="collection-card-link" onClick={handleCollectionClick}>
      <div className="collection-card">
        <h3>Collection Name: {collection.name}</h3>
        <p>Description: {collection.description}</p>
        <p>Theme: {collection.theme}</p>
        <p>Image: {collection.image}</p>
        <p>Item Name: {collection.itemName}</p>
        <p>Item Tags: {collection.tags}</p>
      </div>
    </div>
  );
}
