const Question = require("../models/Question")
const Session = require("../models/Session")

//@desc Add addtional question to an existing session
//@router Post /api/questions/add
//@access private
exports.addQuestionToSession = async(req, res) =>{
    try{
        //  console.log("Request body:", req.body);
         console.log("Content-Type:", req.get('Content-Type'));

        const { sessionId, questions  } = req.body;

    if(!sessionId || !questions || !Array.isArray(questions) ){
        return res.status(400).json({ message: "Invalid input data"})
    }
    const session = await Session.findById(sessionId);

    if(!session){
        return res.status(404).json({ message: "session not found" });
    }

    // create new question
    const createdQuestions = await Question.insertMany(
        questions.map((q) =>({
            session: sessionId,
            question: q.question,
            answer: q.answer,
        }))
    );

    // update session to include new question IDs
    session.questions.push(...createdQuestions.map((q) => q._id));
    await session.save();

    res.status(201).json(createdQuestions);
    }catch(error){
        // console.error("Error in addQuestionToSession:", error);
        res.status(500).json({message: "Server Error"})
    }
}

//@desc Pin or unpin a question
//@router Post /api/questions/:id/pin
//@access private
exports.togglePinQuestion = async(req, res) =>{
    try{
        const question = await Question.findById(req.params.id);

        if(!question) {
            return res
            .status(404)
            .json({ success:false, message: "Question not found" })
        }

        question.isPinned = !question.isPinned;
        await question.save();

        res.status(200).json({ success:true, question });
    }catch( error ){
        // console.error("Error togging question", error,message)
        res.status(500).json({message:"server Error" })
    }

};

//@desc update a note for a question
//@router Post /api/questions/:id/note
//@access private
exports.updateQuestionNote = async(req, res) =>{
    try{
    const { note } = req.body;
    const question = await Question.findById(req.params.id);

        if(!question) {
            return res
            .status(404)
            .json({ success: false, message: "Question not found" })
        }

        question.note = note || "";
        await question.save();

        res.status(200).json({ success: true, question });
    }catch(error){
        res.status(500).json({ messsage: "Server Error" })
    }
};
