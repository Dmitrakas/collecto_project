import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteCollectionById, updateCollection } from "../../actions/collection";
import { collectionOptions } from "../../utils/CollectionOptions";
import CollectionCardForm from "./CollectionCardForm";
import CollectionCardDisplay from "./CollectionCardDisplay";

const CollectionCard = ({ collection }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(collection.name);
  const [description, setDescription] = useState(collection.description);
  const [theme, setTheme] = useState(collection.theme);
  const [image, setImage] = useState(collection.image);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    const data = {
      name,
      description,
      theme,
      image,
    };
    dispatch(updateCollection({ id: collection._id, userId: collection.userId, data }));
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setName(collection.name);
    setDescription(collection.description);
    setTheme(collection.theme);
    setImage(collection.image);
  };

  const handleDeletionClick = async () => {
    try {
      dispatch(deleteCollectionById({ id: collection._id, userId: collection.userId }));
    } catch (error) {
      console.error("Error fetching collections:", error.message);
    }
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setFileToBase(file);
  };

  const setFileToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage(reader.result);
    };
  };

  return (
    <div className="card collection-card" key={collection._id}>
      <div className="card-body">
        {isEditing ? (
          <CollectionCardForm
            name={name}
            description={description}
            theme={theme}
            image={image}
            setName={setName}
            setDescription={setDescription}
            setTheme={setTheme}
            setImage={setImage}
            handleSaveClick={handleSaveClick}
            handleCancelClick={handleCancelClick}
            handleImage={handleImage}
            collectionOptions={collectionOptions}
          />
        ) : (
          <CollectionCardDisplay
            collection={collection}
            handleEditClick={handleEditClick}
            handleDeletionClick={handleDeletionClick}
          />
        )}
      </div>
    </div>
  );
};

export default CollectionCard;
