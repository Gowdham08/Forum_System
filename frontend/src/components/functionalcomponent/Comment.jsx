import React from "react";
import { useNavigate } from "react-router-dom";

const Comment = () => {
  const navigate = useNavigate();

  return (
    <div className="Comment-container">
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
  );
};

export default Comment;
