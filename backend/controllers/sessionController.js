const Session = require("../models/Session")
const Question = require("../models/Question")


//@desc Create a new session and linked Questions
//@routs  POST/api/session/create
// @access Private
exports.createSession = async (req, res) => {
    try {
        const{ role, experience, topicToFocus, description,questions } =
         req.body;

        const userId = req.user.id; // assuming you have a middleware setting req.user
        // Create a new session
        const session = await Session.create({
            user: userId,
            role,
            experience,
            topicToFocus,
            description
        });

        // Create linked questions
        const questionDocs = await Promise.all(
            questions.map(async (q) => {
                const question = await Question.create({
                    session: session._id,
                    question: q.question,
                    answer: q.answer
                });
                return question._id;
            })
        );
        session.questions = questionDocs;
        await session.save();
        res.status(201).json({ success: true, session });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "server Error" })
    }
}
// exports.createSession = async (req, res) => {
//     try {
//         console.log("Request Body:", req.body);
//         const { role, experience, topicToFocus, description, questions } = req.body;

//         // Make sure user is set by auth middleware
//         if (!req.user || !req.user._id) {
//             return res.status(401).json({ success: false, message: "Not authorized" });
//         }

//         // Validate questions
//         if (!Array.isArray(questions)) {
//             return res.status(400).json({ success: false, message: "Questions must be an array" });
//         }

//         // Create a new session
//         const session = await Session.create({
//             user: req.user._id,
//             role,
//             experience,
//             topicToFocus,
//             description
//         });

//         // Create linked questions
//         const questionDocs = await Promise.all(
//             questions.map(async (q) => {
//                 const question = await Question.create({
//                     session: session._id,
//                     question: q.question,
//                     answer: q.answer
//                 });
//                 return question._id;
//             })
//         );

//         // Link questions to session
//         session.questions = questionDocs;
//         await session.save();

//         res.status(201).json({ success: true, session });
//     } catch (error) {
//         console.error("Error creating session:", error.message);
//         res.status(500).json({ success: false, message: error.message });
//     }
// };
//@desc Get all session for the logged-in user
// @route GET/api/session/my-sessions
// @aceess private
exports.getMySessions = async (req, res) => {
    try {
        const sessions = await Session.find({ user: req.user.id })
        .sort({ createdAt: -1 }) // Sort by createdAt in descending order
        .populate("questions");
        res.status(200).json(sessions);
    }
    catch (error) {
        res.status(500).json({ success: false, message: "server Error" })
    }
}

// @desc get a session by ID with populated question
// @route GET/api/session/:id
// @access Private

exports.getSessionById = async (req, res) => {
    try {
        const session = await Session.findById(req.params.id)
        .populate({
            path: "questions",
            options: { sort: { isPinned: -1, createdAt: 1 } },
        })
        .exec();
        if(!session){
            return res
            .status(404)
            .json({ success: false, message: "Session not found" });
        }
        res.status(200).json({ success: true, session });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "server Error" })
    }
}

// @desc Delete a session and its question
// @route DELETE /api/session/:id
// @access private
exports.deleteSession = async(req, res) =>{
     try {
        const session = await Session.findById(req.params.id);
        if(!session){
        return res.status(404).json({ message: "Session not found" });
    }
    //check if the logged-in user owns this session
    if(session.user.toString() !== req.user.id) {
        return res
        .status(401)
        .json({ message: "Not authorized to delete this session" });
    }

    //first, delet all question linked to this session
    await Question.deleteMany({ session:session._id })

    //Then,delete the session
    await session.deleteOne();

    res.status(200).json({ message: "Session deleted successfully " });
    } catch (error) {
        res.status(500).json({ success: false, message: "server Error" })
    }
}
