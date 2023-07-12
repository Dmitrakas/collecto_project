import React from "react";
import { useNavigate } from "react-router-dom";
import { deleteCollectionById } from "../../actions/collection";

export default function CollectionCard({ collection }) {
  const navigate = useNavigate();

  const handleCollectionClick = () => {
    navigate(`/collections/${collection._id}`, {
      state: { collectionId: collection._id },
    });
  };

  const handleDeletionClick = async () => {
    try {
      await deleteCollectionById(collection._id);
    } catch (error) {
      console.error("Error fetching collections:", error.message);
    }
  };

  return (
    <div className="collection-card" key={collection._id}>
      <h3 onClick={handleCollectionClick}>
        Collection Name: {collection.name}
      </h3>
      <p>Description: {collection.description}</p>
      <p>Theme: {collection.theme}</p>
      <p>Image: {collection.image}</p>
      <p>Item Name: {collection.itemName}</p>
      <p>Item Tags: {collection.tags}</p>
      <button onClick={handleDeletionClick}>Delete</button>
    </div>
  );
}
