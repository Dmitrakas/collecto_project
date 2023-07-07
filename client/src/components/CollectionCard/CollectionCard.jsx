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
        <h3>Collection name: {collection.name}</h3>
        <p>description: {collection.description}</p>
        <p>theme: {collection.theme}</p>
        <p>image: {collection.image}</p>
        <p>userId: {collection.userId}</p>
      </div>
    </div>
  );
}
