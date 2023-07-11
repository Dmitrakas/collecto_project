import React from "react";

export default function ItemCard({ item }) {
  return (
    <div className="item-card">
      <h3>Collection Name: {item.name}</h3>-
      <p>Description: {item.tags}</p>
      <p>fieldName1: {item.fieldName1}</p>
      <p>fieldValue1: {item.fieldValue1}</p>
    </div>
  );
}
