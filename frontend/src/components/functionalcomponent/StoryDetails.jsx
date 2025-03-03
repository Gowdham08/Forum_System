import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";



const StoryDetails = () => {
    const { id } = useParams();
    const [story, setStory] = useState(null);
    const [comment, setComment] = useState("");
    const [author, setAuthor] = useState("Guest"); // Change this as per authentication

    useEffect(() => {
        fetchStory();
    }, []);

    const fetchStory = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/stories/${id}`);
            setStory(response.data);
        } catch (error) {
            console.error("Error fetching story:", error);
        }
    };

    const handleCommentSubmit = async () => {
        if (!comment.trim()) return;

        try {
            await axios.post(`http://localhost:3001/stories/${id}/comments`, { user: author, text: comment });
            setComment("");
            fetchStory();
        } catch (error) {
            console.error("Error adding comment:", error);
        }
    };

    return (
        <div>
            {story ? (
                <div>
                    <h1>{story.title}</h1>
                    <p>{story.content}</p>
                    <p>By: {story.author}</p>
                    <h3>Comments</h3>
                    {story.comments.length > 0 ? (
                        story.comments.map((c, index) => (
                            <p key={index}><strong>{c.user}:</strong> {c.text}</p>
                        ))
                    ) : (
                        <p>No comments yet</p>
                    )}
                    <input
                        type="text"
                        placeholder="Add a comment..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <button onClick={handleCommentSubmit}>Submit</button>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default StoryDetails;
