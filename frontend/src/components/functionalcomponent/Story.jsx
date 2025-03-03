import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Story.css";
import { Link } from "react-router-dom";

const Story = () => {
  const [stories, setStories] = useState([]);
  const [isWriting, setIsWriting] = useState(false);
  const [newStory, setNewStory] = useState({ title: "", category: "", content: "", author: "" });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchStories();
  }, []);

  const handleWrite = () => {
    setIsWriting(true);
  };

  const fetchStories = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/stories`);
      console.log("Fetched Stories:", response.data);
      setStories(response.data);
    } catch (error) {
      console.error("Error fetching stories:", error);
    }
  };

  const handlePublish = async () => {
    if (!newStory.title || !newStory.category || !newStory.content || !newStory.author) {
      console.warn("Please fill all fields before publishing!");
      return;
    }

    try {
      const response = await axios.post(`http://localhost:3001/stories`, newStory, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("Story Published Successfully:", response.data);
      fetchStories();
      setNewStory({ title: "", category: "", content: "", author: "" });
      setIsWriting(false);
    } catch (error) {
      console.error("Error publishing story:", error.response ? error.response.data : error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/stories/search?title=${searchTerm}`);
      setStories(response.data);
    } catch (error) {
      console.error("Error searching stories:", error);
    }
  };

  if (isWriting) {
    return (
      <div className="editor-container">
        <input
          type="text"
          placeholder="Title"
          className="editor-title"
          value={newStory.title}
          onChange={(e) => setNewStory({ ...newStory, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Category"
          className="editor-category"
          value={newStory.category}
          onChange={(e) => setNewStory({ ...newStory, category: e.target.value })}
        />
        <input
          type="text"
          placeholder="Author"
          className="editor-author"
          value={newStory.author}
          onChange={(e) => setNewStory({ ...newStory, author: e.target.value })}
        />
        <textarea
          placeholder="Tell your story..."
          className="editor-content"
          value={newStory.content}
          onChange={(e) => setNewStory({ ...newStory, content: e.target.value })}
        />
        <button className="publish-button" onClick={handlePublish}>
          Publish
        </button>
      </div>
    );
  }

  return (
    <div className="story-container">
      <header className="story-header">
        <input
          type="text"
          placeholder="Search by title"
          className="story-search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        <button className="write-button" onClick={handleWrite}>Write</button>
      </header>
      <main className="story-main">
        <div className="story-feed">
          {stories.length === 0 ? (
            <p>No stories yet. Start writing!</p>
          ) : (
            stories.map((story, index) => (
              <Link to ={'/stories/${story_id}'}key={index} className="story-card">
    
                <h2>{story.title}</h2>
                <p>{story.content.substring(0,100)}</p>
                <span>Category: {story.category}</span>
                <span>By {story.author} - {story.createdAt ? new Date(story.createdAt).toDateString() : "No Date Available"}</span>
            </Link>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default Story;
