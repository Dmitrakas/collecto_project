import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createCollection, getCollections } from "../../actions/collection";
import CollectionForm from "../../components/Collection/CollectionForm";
import CollectionList from "../../components/Collection/CollectionList";
import "./Collection.css";

const Collection = () => {
  const [collections, setCollections] = useState([]);

  const userId = useSelector((state) => state.user.currentUser.id);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await getCollections(userId);
        setCollections(response);
      } catch (error) {
        console.error("Error fetching collections:", error.message);
      }
    };

    fetchCollections();

    const interval = setInterval(fetchCollections, 5000);
    return () => clearInterval(interval);
  }, [userId]);

  const handleCreateCollection = async (formData) => {
    try {
      dispatch(createCollection({ ...formData, userId }));
    } catch (error) {
      console.error("Error creating collection:", error.message);
    }
  };

  return (
    <div className="collection-info">
      <h2 className="card-title">Create Collection</h2>
      <CollectionForm onCreateCollection={handleCreateCollection} />
      <h2 className="card-title">Collections: </h2>
      <CollectionList collections={collections} />
    </div>
  );
};

export default Collection;
