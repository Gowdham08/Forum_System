import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import "./Story.css";

const Story = () => {
  const [stories, setStories] = useState([]);
  const [isWriting, setIsWriting] = useState(false);
  const [newStory, setNewStory] = useState({ title: "", category: "", content: "", author: "" });
  const [searchTerm, setSearchTerm] = useState("");

  // Get category from URL
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedCategory = queryParams.get("category");

  useEffect(() => {
    fetchStories();
  }, [selectedCategory]); // Re-fetch stories when category changes

  const fetchStories = async () => {
    try {
      const response = await axios.get("http://localhost:3001/stories");
      let filteredStories = response.data;

      // Filter stories if a category is selected
      if (selectedCategory) {
        filteredStories = filteredStories.filter((story) => story.category === selectedCategory);
      }

      setStories(filteredStories);
    } catch (error) {
      console.error("Error fetching stories:", error);
    }
  };

  const handleWrite = () => setIsWriting(true);

  const handlePublish = async () => {
    if (!newStory.title || !newStory.category || !newStory.content || !newStory.author) {
      console.warn("Please fill all fields before publishing!");
      return;
    }

    try {
      await axios.post("http://localhost:3001/stories", newStory, {
        headers: { "Content-Type": "application/json" },
      });
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

  const handleRemoveStory = async (storyId) => {
    try {
      await axios.delete(`http://localhost:3001/stories/${storyId}`);
      setStories(stories.filter((story) => story._id !== storyId));
      console.log("✅ Story deleted successfully");
    } catch (error) {
      console.error("❌ Error deleting story:", error);
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
        <select
          className="editor-category"
          value={newStory.category}
          onChange={(e) => setNewStory({ ...newStory, category: e.target.value })}
        >
          <option value="">Select a Category</option>
          {[
            "Technology",
            "Social Media",
            "Culture",
            "History",
            "Philosophy",
            "Climate",
            "Mental Health",
            "Politics",
            "Economy",
            "Art",
            "Space Exploration",
            "Education",
            "Sports",
            "Business",
            "AI and Ethics",
            "Health",
            "Public Opinion",
            "Science",
          ].map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>
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
        <button className="publish-button" onClick={handlePublish}>Publish</button>
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
        <button className="search-button" onClick={handleSearch}>Search</button>
        <button className="write-button" onClick={handleWrite}>Write</button>
      </header>

      <main className="story-main">
        {selectedCategory && <h2 className="filtered-category">Showing stories for: {selectedCategory}</h2>}
        <div className="story-feed">
          {stories.length === 0 ? (
            <p className="no-stories">No stories yet. Start writing!</p>
          ) : (
            stories.map((story) => (
              <div key={story._id} className="story-card">
                <Link to={`/stories/${story._id}`} className="story-link">
                  <h2 className="story-title">{story.title}</h2>
                  <p className="story-snippet">{story.content.substring(0, 120)}...</p>
                  <div className="story-meta">
                    <span className="story-category">{story.category}</span>
                    <span className="story-author">By {story.author}</span>
                    <span className="story-date">
                      {story.createdAt ? new Date(story.createdAt).toDateString() : "No Date Available"}
                    </span>
                  </div>
                </Link>
                <button className="delete-button" onClick={() => handleRemoveStory(story._id)}>🗑 Remove</button>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default Story;
