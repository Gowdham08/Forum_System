import React from "react";
import { useNavigate } from "react-router-dom";
import "./Category.css";
const categories = [
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
];

function Category() {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/stories?category=${encodeURIComponent(category)}`);
  };

  return (
    <div className="container">
      <h1>Select a Topic to Explore</h1>
      <table>
        <thead>
          <tr>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => (
            <tr key={index} onClick={() => handleCategoryClick(category)}>
              <td>{category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Category;
