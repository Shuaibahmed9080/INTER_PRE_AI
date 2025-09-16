const { GoogleGenerativeAI } = require("@google/generative-ai");
const { conceptExplainPrompt, questionAnswerPrompt } = require("../utils/prompts");

const ai = new GoogleGenerativeAI( process.env.GEMINI_API_KEY );

// @desc Generate interview questions and answers using Gemini
// @route POST /api/ai/generate-questions
// @access Private

const generateInterviewQuestions = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, numberOfQuestions } = req.body;

    if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const prompt = questionAnswerPrompt(role, experience, topicsToFocus, numberOfQuestions);

    // ✅ Use the latest stable Gemini model
    const model = ai.getGenerativeModel({ model: "gemini-2.0-flash-lite" });
    const response = await model.generateContent(prompt);

    let rawText = response.response.text().trim();
//     console.log("🔥 Raw Gemini:", rawText);

//     // TEMPORARY: send raw AI output to browser
// res.status(200).json({ rawAI: rawText });

    // ✅ Clean markdown fences
    let cleanedText = rawText
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    // ✅ Extract array if extra explanation exists
    const firstBracket = cleanedText.indexOf("[");
    const lastBracket = cleanedText.lastIndexOf("]");
    if (firstBracket !== -1 && lastBracket !== -1) {
      cleanedText = cleanedText.substring(firstBracket, lastBracket + 1);
    }

    let data;
    try {
      data = JSON.parse(cleanedText);
    } catch (err) {
      console.error("❌ JSON parse error:", err, "Raw response:", rawText);
      return res.status(500).json({ message: "Invalid response format from AI" });
    }

    res.status(200).json(data);

  } catch (error) {
    console.error("❌ Error generating questions:", error);
    res.status(500).json({
      message: "Failed to generate Questions",
      error: error.message,
    });
  }
};


// @desc Generate explanation for an interview question
// @route POST /api/ai/generate-explanation
// @access Private
const generateConceptExplanation = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const prompt = conceptExplainPrompt(question);

    // ✅ Correct way to call Gemini
    const model = ai.getGenerativeModel({ model: "gemini-2.0-flash-lite" });
    const response = await model.generateContent(prompt);

    let rawText = response.response.text().trim();

    // ✅ Clean JSON fences
    let cleanedText = rawText
      .replace(/^```json\s*/, "")
      .replace(/```$/, "")
      .trim();

    // ✅ Extract only JSON object between { ... }
    const firstBrace = cleanedText.indexOf("{");
    const lastBrace = cleanedText.lastIndexOf("}");
    if (firstBrace !== -1 && lastBrace !== -1) {
      cleanedText = cleanedText.substring(firstBrace, lastBrace + 1);
    }

    const data = JSON.parse(cleanedText);

    res.status(200).json(data);

  } catch (error) {
    res.status(500).json({
      message: "Failed to generate explanation",
      error: error.message,
    });
  }
};
module.exports = { generateInterviewQuestions, generateConceptExplanation };


// const generateInterviewQuestions = async (req, res) => {
//   try {
//     const { role, experience, topicsToFocus, numberOfQuestions } = req.body;

//     if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
//       return res.status(400).json({ message: "Missing required fields" });
//     }

//     const prompt = questionAnswerPrompt(role, experience, topicsToFocus, numberOfQuestions);

//     const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
//     const response = await model.generateContent(prompt);

//     let rawText = response.response.text().trim();

// // Remove markdown ```json ... ``` if present
// let cleanedText = rawText
//   .replace(/^```json\s*/, "")
//   .replace(/```$/, "")
//   .trim();

// // Extract only JSON array between [ ... ]
// const firstBracket = cleanedText.indexOf("[");
// const lastBracket = cleanedText.lastIndexOf("]");
// if (firstBracket !== -1 && lastBracket !== -1) {
//   cleanedText = cleanedText.substring(firstBracket, lastBracket + 1);
// }

// const data = JSON.parse(cleanedText);

//     res.status(200).json(data);

//   } catch (error) {
//     res.status(500).json({
//       message: "Failed to generate Questions",
//       error: error.message,
//     });
//   }
// };






// const { GoogleGenerativeAI } = require("@google/generative-ai"); // ✅ correct

// const { conceptExplainPrompt, questionAnswerPrompt } = require("../utils/prompts");
// const { model } = require("mongoose");

// const ai = new GoogleGenerativeAI({ apiKey: process.env.GEMINI_API_KEY })

// // @desc Generete interview questions and anwser using Gemini
// // @route POST / api/ai/generete-questions
// // @access Private

// const generateInterviewQuestions = async(req, res)=>{
//     try{
//         const { role, experience, topicsToFocus, numberOfQuestions } = req.body;
    
//     if(!role || !experience || !topicsToFocus || !numberOfQuestions ){
//         return res.status(400).json({ message: "Missing required fields" });
//     }
//     const prompt = questionAnswerPrompt(role, experience, topicsToFocus, numberOfQuestions);

//     const response= await ai.models.generateContent({
//         model: "gemini-2.0-flash-lite",
//         contents:prompt,
//     });

//     let rawText = response.text;

//     //clean it:Remove ```json and ``` from beginning and end
//     const cleanedText = rawText
//     .replace(/^```json/, "") //remove starting ```json
//     .replace(/```$/, "")  //remove ending ```
//     .trim(); //remove any extra spaces

//     //now safe to parse
//     const data= JSON.parse(cleanedText);
//     res.status(200).json(data);

//     }catch(error){
//         res.status(500).json({
//             message: "Failed to generate Questions",
//             error:error.message,
//         });
//     }
// }

// // @desc Generete explain a interview questions 
// // @route POST / api/ai/generete-explanation
// // @access Private

// const generateConceptExplanation = async (req, res) =>{};

// module.exports = { generateInterviewQuestions,generateConceptExplanation }
