import React from "react";
import { useNavigate } from "react-router-dom";
import { deleteItemById } from "../../actions/item";

export default function ItemCard({ item, collection }) {
  const navigate = useNavigate();

  const handleItemClick = () => {
    navigate(`/collections/${collection._id}/${item._id}`, {
      state: { collectionId: collection._id, itemId: item._id },
    });
  };

  const handleDeletionClick = async () => {
    try {
      await deleteItemById(item._id);
    } catch (error) {
      console.error("Error fetching collections:", error.message);
    }
  };

  return (
    <div className="item-card" key={item._id}>
      <h3>Item Name: {item.name}</h3>
      <p>
        {collection.itemFieldName1} : {item.fieldValue1}
      </p>
      <p>
        {collection.itemFieldName2} : {item.fieldValue2}
      </p>
      <p>
        {collection.itemFieldName3} : {item.fieldValue3}
      </p>
      <button onClick={handleDeletionClick}>Delete</button>
    </div>
  );
}
