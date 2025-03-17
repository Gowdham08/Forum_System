import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./StoryDetails.css"; 

const StoryDetails = () => {
    const { id } = useParams();
    const [story, setStory] = useState(null);
    const [comment, setComment] = useState("");
    const [author, setAuthor] = useState("Guest");
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        fetchStory();
    }, [id]);

    const fetchStory = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/stories/${id}`);
            console.log(" Fetched Story:", response.data); 
            setStory({ ...response.data }); 
        } catch (error) {
            console.error(" Error fetching story:", error);
        }
    };

    const handleCommentSubmit = async () => {
        if (!comment.trim()) {
            alert(" Comment cannot be empty!");
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await axios.post(`http://localhost:3001/stories/${id}/comments`, {
                user: author,
                text: comment,
            });

            console.log(" Comment added:", response.data);

            setComment("");
            fetchStory();
        } catch (error) {
            console.error(" Error adding comment:", error.response?.data || error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="story-container">
            {story ? (
                <div className="story-content">
                    <h1 className="story-title">{story.title}</h1>
                    <p className="story-author">By {story.author}</p>
                    <p className="story-body">{story.content}</p>

                    <h3 className="comments-header">Comments</h3>
                    <div className="comments-section">
                        {story.comments?.length > 0 ? (
                            story.comments.map((c, index) => (
                                <div key={index} className="comment">
                                    <p><strong>{c.user}:</strong> {c.text}</p> 
                                </div>
                            ))
                        ) : (
                            <p>No comments yet</p>
                        )}
                    </div>
                    <div className="comment-box">
                        <input
                            type="text"
                            placeholder="Your name"
                            className="comment-author-input"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                        />
                        <textarea
                            placeholder="Add a comment..."
                            className="comment-box"
                            
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <button
                            className="comment-submit-button"
                            onClick={handleCommentSubmit}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Submitting..." : "Submit"}
                        </button>
                    </div>
        
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default StoryDetails;
