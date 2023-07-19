import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getItemById } from "../../actions/item";
import { getCollectionById } from "../../actions/collection";
import { getUserUsernameById } from "../../actions/user";
import {
  createComment,
  getCommentsByItemId,
  deleteCommentById,
  updateComment,
} from "../../actions/comment";
import "./ItemDetails.css";

export default function ItemDetails() {
  const { collectionId, itemId } = useParams();
  const [item, setItem] = useState({});
  const [collection, setCollection] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [comments, setComments] = useState([]);
  const [newCommentText, setNewCommentText] = useState("");
  const [editedCommentId, setEditedCommentId] = useState(null);
  const [editedCommentText, setEditedCommentText] = useState("");
  const userId = useSelector((state) => state.user?.currentUser?.id);
  const isAuth = useSelector((state) => state.user.isAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const response = await getItemById(itemId);
        setItem(response);
      } catch (error) {
        console.error("Error fetching Item details:", error.message);
      }
    };

    const fetchCollectionDetails = async () => {
      try {
        const response = await getCollectionById(collectionId);
        setCollection(response);
      } catch (error) {
        console.error("Error fetching Item details:", error.message);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await getCommentsByItemId(itemId);

        const commentsWithUsername = await Promise.all(
          response.map(async (comment) => {
            const username = await getUserUsernameById(comment.author);
            return { ...comment, username };
          })
        );

        setComments(commentsWithUsername);
      } catch (error) {
        console.error("Error fetching comments:", error.message);
      }
    };

    const loadData = async () => {
      setIsLoading(true);
      await Promise.all([
        fetchItemDetails(),
        fetchCollectionDetails(),
        fetchComments(),
      ]);
      setIsLoading(false);
    };

    loadData();

    const interval = setInterval(fetchComments, 5000);
    return () => clearInterval(interval);
  }, [collectionId, itemId]);

  const handleNewCommentSubmit = async (event) => {
    event.preventDefault();

    try {
      const commentData = {
        text: newCommentText,
        author: userId,
        itemId: itemId,
      };

      const createdComment = dispatch(createComment(commentData));
      const { author } = createdComment;

      if (author) {
        const username = await getUserUsernameById(author);

        const commentWithUsername = { ...createdComment, username };

        setComments((prevComments) => [...prevComments, commentWithUsername]);

        setNewCommentText("");
      }
    } catch (error) {
      console.error("Error creating comment:", error.message);
    } finally {
      setNewCommentText("");
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      dispatch(deleteCommentById(commentId));

      setComments((prevComments) =>
        prevComments.filter((comment) => comment._id !== commentId)
      );
    } catch (error) {
      console.error("Error deleting comment:", error.message);
    }
  };

  const handleEditComment = (commentId, commentText) => {
    setEditedCommentId(commentId);
    setEditedCommentText(commentText);
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedCommentId(null);
    setEditedCommentText("");
    console.log(isEditing);
  };

  const handleUpdateComment = async (event, commentId) => {
    event.preventDefault();

    try {
      const updatedCommentData = {
        text: editedCommentText,
      };

      const updatedComment = dispatch(
        updateComment({ id: commentId, data: updatedCommentData })
      );

      const updatedComments = comments.map((comment) =>
        comment._id === commentId ? updatedComment : comment
      );

      setComments(updatedComments);

      setEditedCommentId(null);
      setEditedCommentText("");
    } catch (error) {
      console.error("Error updating comment:", error.message);
    }
  };

  return (
    <div className="container item-details">
      <h2>Item Details</h2>
      <h3>Item Name: {item.name}</h3>
      {isLoading || item.tags === undefined || item.tags.length === 0 ? (
        <div className="loader">Loading...</div>
      ) : (
        <div>
          <div className="tags">
            <h4>Tags:</h4>
            <div className="tag-container">
              {item.tags.map((tag, index) => (
                <div key={index} className="tag btn btn-primary">
                  {tag}
                </div>
              ))}
            </div>
          </div>
          <p>
            {collection.itemFieldName1}: {item.fieldValue1}
          </p>
          <p>
            {collection.itemFieldName2}: {item.fieldValue2}
          </p>
          <p>
            {collection.itemFieldName3}: {item.fieldValue3}
          </p>

          <div className="comments">
            <h4>Comments:</h4>
            {comments.length === 0 ? (
              <p>No comments yet.</p>
            ) : (
              comments.map((comment) => (
                <div key={comment._id + comment.text} className="comment">
                  <p className="comment-author">
                    Commented by: {comment.username}
                  </p>
                  {comment._id === editedCommentId && isAuth ? (
                    <form
                      onSubmit={(event) =>
                        handleUpdateComment(event, comment._id)
                      }
                    >
                      <input
                        type="text"
                        value={editedCommentText}
                        onChange={(e) => setEditedCommentText(e.target.value)}
                        className="form-control"
                      />
                      <div>
                        <button type="submit" className="btn btn-primary">
                          Save
                        </button>
                        <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={handleCancelEdit}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <p>{comment.text}</p>
                  )}

                  {comment.author === userId && (
                    <div>
                      {isAuth && comment.author === userId && (
                        <button
                          className="edit-comment-button btn btn-secondary"
                          onClick={() =>
                            handleEditComment(comment._id, comment.text)
                          }
                        >
                          Edit
                        </button>
                      )}
                      <button
                        className="delete-comment-button btn btn-danger"
                        onClick={() => handleDeleteComment(comment._id)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}

            {isAuth && (
              <form onSubmit={handleNewCommentSubmit}>
                <input
                  type="text"
                  placeholder="Enter your comment"
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  className="form-control"
                />
                <button type="submit" className="btn btn-primary">
                  Add Comment
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
