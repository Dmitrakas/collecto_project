import React from "react";
import CollectionCard from "../CollectionCard/CollectionCard";

const CollectionList = ({ collections }) => {
  if (collections.length === 0 || collections === undefined || collections === "Network Error") {
    return <p>No Collections</p>;
  }

  return (
    <div className="collection-list">
      {collections.map((collection) => (
        <CollectionCard key={collection._id} collection={collection} />
      ))}
    </div>
  );
};

export default CollectionList;
