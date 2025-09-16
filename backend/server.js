require("dotenv").config();
// console.log("Gemini Key from ENV:", process.env.GEMINI_API_KEY);

const express = require("express");
const path = require("path");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const sessionRoutes = require("./routes/sessionRoutes")
const questionRoutes = require("./routes/questionRoutes");
const { protect } = require("./middlewares/authMiddleware");
const { generateConceptExplanation, generateInterviewQuestions } = require("./controllers/aiController")


const app = express();

//Middlerware to handle Cors
app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

connectDB();

//Middlerware
app.use(express.json());

//Routes
app.use("/api/auth",authRoutes)
app.use("/api/session", sessionRoutes);
app.use("/api/questions", questionRoutes);

app.use("/api/ai/generate-questions", protect, generateInterviewQuestions);
app.use("/api/ai/generate-explanation", protect, generateConceptExplanation);


//server uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads"),{}));

//start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>console.log(`Server is running on port ${PORT}`));