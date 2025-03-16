const mongoose = require("mongoose");

const storySchema = new mongoose.Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    comments: [
        {
            user: { type: String, required: true },
            text: { type: String, required: true },
            createdAt: { type: Date, default: Date.now }
        }
    ]
}, { timestamps: true });

const Story = mongoose.model("Story", storySchema);
module.exports = Story;
