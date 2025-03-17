const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const cors = require("cors");

const signup_Schema = require("./models/signup_Schema");
const Story = require("./models/stories_Schema");

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 3001;

app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type"],
    })
);


mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log(" MongoDB Connected Successfully"))
    .catch((err) => console.error(" Database Connection Failed:", err));


app.get("/", (req, res) => {
    res.send("<h1>Server is Running!</h1>");
});


app.post("/signup", async (req, res) => {
    try {
        const { firstName, lastName, email, password, phoneNumber } = req.body;

        if (!firstName || !lastName || !email || !password || !phoneNumber) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await signup_Schema.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new signup_Schema({
            firstName,
            lastName,
            email,
            phoneNumber,
            password: hashedPassword,
        });

        await newUser.save();
        res.status(201).json({ message: " Signup successful", isSignup: true });
    } catch (error) {
        console.error(" Signup error:", error);
        res.status(500).json({ message: "Signup failed", isSignup: false });
    }
});


app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await signup_Schema.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        res.json({
            message: "Login successful",
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phoneNumber: user.phoneNumber,
            },
        });
    } catch (error) {
        console.error(" Login error:", error);
        res.status(500).json({ message: "Server error" });
    }
});


app.post("/stories", async (req, res) => {
    try {
        const { title, category, content, author } = req.body;
        if (!title || !content || !author) {
            return res.status(400).json({ error: "Title, content, and author are required" });
        }

        const newStory = new Story({ title, category: category || "Uncategorized", content, author });
        await newStory.save();
        res.status(201).json(newStory);
    } catch (error) {
        console.error("Error creating story:", error);
        res.status(500).json({ error: "Failed to create story" });
    }
});


app.get("/stories", async (req, res) => {
    try {
        const stories = await Story.find().sort({ createdAt: -1 });
        res.status(200).json(stories);
    } catch (error) {
        console.error(" Error fetching stories:", error);
        res.status(500).json({ error: "Failed to fetch stories" });
    }
});


app.get("/stories/:id", async (req, res) => {
    try {
        const story = await Story.findById(req.params.id);
        if (!story) {
            return res.status(404).json({ error: "Story not found" });
        }
        res.status(200).json(story);
    } catch (err) {
        console.error(" Error fetching story:", err);
        res.status(500).json({ error: "Failed to fetch story" });
    }
});


app.post("/stories/:storyId/comments", async (req, res) => {
    try {
        const { storyId } = req.params;
        const { user, text } = req.body;

        if (!user || !text) {
            return res.status(400).json({ error: "User and text are required" });
        }

        const story = await Story.findById(storyId);
        if (!story) {
            return res.status(404).json({ error: "Story not found" });
        }

        story.comments.push({ user, text });
        await story.save();

        res.status(201).json({ message: " Comment added successfully", story });
    } catch (error) {
        console.error(" Error adding comment:", error);
        res.status(500).json({ error: "Failed to add comment" });
    }
});

app.delete("/stories/:id", async (req, res) => {
    try {
        const deletedStory = await Story.findByIdAndDelete(req.params.id);
        if (!deletedStory) {
            return res.status(404).json({ message: "Story not found" });
        }
        res.status(200).json({ message: " Story deleted successfully" });
    } catch (error) {
        console.error(" Error deleting story:", error);
        res.status(500).json({ message: "Failed to delete story" });
    }
});

// Start Server
app.listen(PORT, () => console.log(` Server started on port ${PORT}`));
