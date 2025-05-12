import React, { useState, useEffect } from 'react';
import { useUserContext } from '../UserContext';
import { useParams, useNavigate } from "react-router-dom";
import ApiService from '../ApiSevice';
import styles from './Posts.module.css';
import NavigationButtons from '../NavigationButtons';

function ViewComments() {
    const navigate = useNavigate();
    const { postId } = useParams();
    const [comments, setComments] = useState([]);
    const [userDetails, setUserDetails] = useState({ userEmail: "", userName: "" });
    const [newCommentBody, setNewCommentBody] = useState("");
    const [editedCommentIndex, setEditedCommentIndex] = useState(null);
    const [editedCommentBody, setEditedCommentBody] = useState("");
    const { userData, isInitialized } = useUserContext();
    const username = userData.username;
    const apiService = new ApiService();

    useEffect(() => {
        if (isInitialized) {
            fetchComments(postId);
            findUserDetails();
        }
    }, [isInitialized]);

    const fetchComments = async (postId) => {
        try {
            const data = await apiService.fetch(`http://localhost:3000/comments?postId=${postId}`);
            setComments(data);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    const findUserDetails = async () => {
        try {
            const data = await apiService.fetch(`http://localhost:3000/users?username=${username}`);
            if (data)
                setUserDetails({ userEmail: data[0].email, userName: data[0].name });
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };

    const handleAddComment = async (postId, commentBody) => {
        if (commentBody.trim()) {
            const newComment = {
                postId,
                name: userDetails.userName,
                email: userDetails.userEmail,
                body: commentBody,
            };

            try {
                const comment = await apiService.post('http://localhost:3000/comments', newComment)
                setComments([...comments, comment]);
                setNewCommentBody("")
            } catch (error) {
                console.error('Error adding comment:', error);
            }
        }
    };

    const handleDeleteComment = async (index) => {
        const commentId = comments[index].id;
        try {
            await apiService.delete(`http://localhost:3000/comments/${commentId}`);
            const updatedComments = [...comments];
            updatedComments.splice(index, 1);
            setComments(updatedComments);
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    };

    const handleEditComment = async (index, newBody) => {
        if (newBody.trim()) {
            const commentId = comments[index].id;
            const updatedComment = {
                ...comments[index],
                body: newBody,
            };

            try {
                const response = await apiService.patch(`http://localhost:3000/comments/${commentId}`, updatedComment);
                    const updatedComments = [...comments];
                    updatedComments[index] = updatedComment;
                    setComments(updatedComments);
                    setEditedCommentIndex(null);
                    setEditedCommentBody("");
            } catch (error) {
                console.error('Error editing comment:', error);
            }
        }
    };

    return (
        <div className={styles.container}>
            <NavigationButtons />
            <button className={styles.back} onClick={() => { navigate(`/user/${userData.username}/posts`) }}>Back To Posts</button>
            <h4 className={styles.title}>Comments</h4>
            <ul className={styles.commentList}>
                {comments.map((comment, index) => (
                    <li key={comment.id} className={styles.commentItem}>
                        <p><strong>Name:</strong> {comment.name}</p>
                        <p><strong>Email:</strong> {comment.email}</p>
                        <p><strong>Comment:</strong> {comment.body}</p>
                        {comment.email === userDetails.userEmail && (
                            <div className={styles.actions}>
                                <span
                                    className={styles.deleteButton}
                                    onClick={() => handleDeleteComment(index)}
                                >
                                </span>
                                <button
                                    className={styles.editButton}
                                    onClick={() => {
                                        setEditedCommentIndex(index);
                                        setEditedCommentBody(comment.body);
                                    }}
                                >
                                    Edit
                                </button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>

            {editedCommentIndex !== null && (
                <div className={styles.editSection}>
                    <h4>Edit Comment</h4>
                    <textarea
                        className={styles.textarea}
                        value={editedCommentBody}
                        onChange={(e) => setEditedCommentBody(e.target.value)}
                    />
                    <button
                        className={styles.saveButton}
                        onClick={() => handleEditComment(editedCommentIndex, editedCommentBody)}
                    >
                        Save
                    </button>
                </div>
            )}

            <div className={styles.addCommentSection}>
                <textarea
                    className={styles.textarea}
                    placeholder="Add a comment"
                    value={newCommentBody}
                    onChange={(e) => setNewCommentBody(e.target.value)}
                />
                <button
                    className={styles.addButton}
                    onClick={() => handleAddComment(postId, newCommentBody)}
                >
                    Add Comment
                </button>
            </div>
        </div>
    );
}

export default ViewComments;
