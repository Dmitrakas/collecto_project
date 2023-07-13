import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrashAlt,
  faSave,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { deleteItemById, updateItem } from "../../actions/item";
import "./ItemCard.css";

export default function ItemCard({ item }) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(item.name);
  const [tags, setTags] = useState(item.tags);
  const [fieldValue1, setFieldValue1] = useState(item.fieldValue1);
  const [fieldValue2, setFieldValue2] = useState(item.fieldValue2);
  const [fieldValue3, setFieldValue3] = useState(item.fieldValue3);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    const data = {
      name,
      tags,
      fieldValue1,
      fieldValue2,
      fieldValue3,
    };

    dispatch(updateItem({ id: item._id, data }));

    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setName(item.name);
    setTags(item.tags);
    setFieldValue1(item.fieldValue1);
    setFieldValue2(item.fieldValue2);
    setFieldValue3(item.fieldValue3);
  };

  const handleDeletionClick = async () => {
    try {
      await deleteItemById(item._id);
    } catch (error) {
      console.error("Error deleting item:", error.message);
    }
  };

  const handleTagChange = (index, value) => {
    const updatedTags = [...tags];
    updatedTags[index] = value;
    setTags(updatedTags);
  };

  return (
    <tr key={item._id}>
      <td>
        {isEditing ? (
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        ) : (
          <Link
            to={`/collections/${item.collectionId}/${item._id}`}
            state={{ collectionId: item.collectionId, itemId: item._id }}
          >
            {item.name}
          </Link>
        )}
      </td>
      <td>
        {isEditing ? (
          <>
            {item.tags.map((tag, index) => (
              <div key={index} className="tag-circle">
                <input
                  type="text"
                  className="form-control"
                  value={tags[index]}
                  onChange={(e) => handleTagChange(index, e.target.value)}
                />
              </div>
            ))}
          </>
        ) : (
          <>
            {item.tags.map((tag, index) => (
              <div key={index} className="tag-circle">
                <button className="btn btn-primary">{tag}</button>
              </div>
            ))}
          </>
        )}
      </td>
      <td>
        {isEditing ? (
          <input
            type="text"
            className="form-control"
            value={fieldValue1}
            onChange={(e) => setFieldValue1(e.target.value)}
          />
        ) : (
          item.fieldValue1
        )}
      </td>
      <td>
        {isEditing ? (
          <input
            type="text"
            className="form-control"
            value={fieldValue2}
            onChange={(e) => setFieldValue2(e.target.value)}
          />
        ) : (
          item.fieldValue2
        )}
      </td>
      <td>
        {isEditing ? (
          <input
            type="text"
            className="form-control"
            value={fieldValue3}
            onChange={(e) => setFieldValue3(e.target.value)}
          />
        ) : (
          item.fieldValue3
        )}
      </td>
      <td>
        {isEditing ? (
          <>
            <button className="btn btn-primary me-2" onClick={handleSaveClick}>
              <FontAwesomeIcon icon={faSave} />
            </button>

            <button className="btn btn-secondary" onClick={handleCancelClick}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </>
        ) : (
          <>
            <button className="btn btn-primary me-2" onClick={handleEditClick}>
              <FontAwesomeIcon icon={faEdit} />
            </button>
            <button className="btn btn-danger" onClick={handleDeletionClick}>
              <FontAwesomeIcon icon={faTrashAlt} />
            </button>
          </>
        )}
      </td>
    </tr>
  );
}
