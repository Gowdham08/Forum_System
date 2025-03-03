const dotenv = require("dotenv");
const express = require("express");
const mdb = require("mongoose");
const signup_Schema = require("./models/signup_Schema");
const Story = require('./models/stories_Schema');
const bcrypt = require("bcrypt");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3001;

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"]
}));

mdb.connect(process.env.MONGODB_URL)
.then(() => {
    console.log("MDB Connection Successful");
}).catch((err) => {
    console.log("Check your Connection", err);
});

app.get("/", (req, res) => {
    res.send("<h1><i>Server Started Successfully!</i></h1>");
});

app.post("/signup", async (req, res) => {
    try {
        console.log(req.body);
        const { firstName, lastName, email, password, phoneNumber } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newSignup = new signup_Schema({
            firstName,
            lastName,
            email,
            phoneNumber,
            password: hashedPassword
        });
        await newSignup.save();
        console.log("SIGNUP SUCCESS");
        res.status(201).json({ message: "SIGNUP DONE", isSignup: true });

    } catch (error) {
        console.log("ERROR", error);
        res.status(500).json({ message: "SIGNUP FAILED", isSignup: false });
    }
});

app.post("/stories", async (req, res) => {
    try {
        const { title, category, content, author } = req.body;
        
        if (!title || !content || !author) {
            return res.status(400).json({ error: "Title, content, and author are required" });
        }

        const newStory = new Story({
            title,
            category: category || "Uncategorized",
            content,
            author
        });

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
        console.error("Error fetching stories:", error);
        res.status(500).json({ error: "Failed to fetch stories" });
    }
});

app.get("/stories/search", async (req, res) => {
    try {
        const { title } = req.query;
        if (!title) {
            return res.status(400).json({ error: "Title query parameter is required" });
        }
        const stories = await Story.find({ title: new RegExp(title, "i") });
        res.status(200).json(stories);
    } catch (error) {
        console.error("Error searching stories:", error);
        res.status(500).json({ error: "Failed to search stories" });
    }
});
app.get("/stories/:id",async (req,res)=>{
    try{
        const story=await Story.findById(req.params.id);
        if(!story){
            return res.status(404).json({error:"Story not found"});
        }
        res.status(200).json(story);

    }
    catch(err){
        console.error("error fetching");
        res.status(500).json({error:"failed"});
    }
});
app.put("/stories/:id", async (req, res) => {
    try {
        const { title, category, content, author } = req.body;
        const story = await Story.findById(req.params.id);

        if (!story) {
            return res.status(404).json({ error: "Story not found" });
        }
        
        if (story.author !== author) {
            return res.status(403).json({ error: "Unauthorized to edit this story" });
        }

        story.title = title;
        story.category = category;
        story.content = content;

        await story.save();
        res.status(200).json(story);
    } catch (error) {
        console.error("Error updating story:", error);
        res.status(500).json({ error: "Failed to update story" });
    }
});

app.post("/stories/:id/comments", async (req, res) => {
    try {
        const { user, text } = req.body;
        const story = await Story.findById(req.params.id);

        if (!story) {
            return res.status(404).json({ error: "Story not found" });
        }

        story.comments.push({ user, text });
        await story.save();

        res.status(201).json(story);
    } catch (error) {
        console.error("Error adding comment:", error);
        res.status(500).json({ error: "Failed to add comment" });
    }
});


app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
