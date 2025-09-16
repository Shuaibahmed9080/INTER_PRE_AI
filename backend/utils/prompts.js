const Question = require("../models/Question");

const questionAnswerPrompt = (role, experience, topicToFocus, numberOfQuestions) => `
  You are an AI trained to generate technical interview questions and answers.
  - Role: ${role}
  - Candidate Experience: ${experience} years
  - Focus Topics: ${topicToFocus}
  - Write exactly ${numberOfQuestions} interview questions.
  - For each question, generate a detailed but beginner-friendly answer.
  - If the answer needs a code example, include a small code block inside.
  - Keep formatting very clean.
  - Return ONLY a pure JSON array, like:
  [
    {
      "question": "What is React?",
      "answer": "React is a JavaScript library for building user interfaces..."
    }
  ]
  Important: Do NOT add any extra text, explanations, or markdown. Only return valid JSON.
`;

const conceptExplainPrompt = (questions) => `
  You are an AI trained to generate explanations for a given interview question.

  Task:
  - Explain the following interview question and its concept in depth as if you're teaching a beginner developer.
  - Question: "${questions}"
  - After the explanation, provide a short and clear title that summarizes the concept.
  - If the explanation includes a code example, include a small code block.
  - Keep the formatting clean and clear.
  - Return the result ONLY as valid JSON in the following format:
  {
    "title": "Short title here",
    "explanation": "Explanation here"
  }
  Important: Do NOT include any extra text outside the JSON format. Only return valid JSON.
`;

module.exports = { questionAnswerPrompt, conceptExplainPrompt };

// const Question = require("../models/Question")

// const questionAnswerPrompt = (role, experience, topicsToFocus, numberOfQuestions)=>
//     `
//      you are an AI tained to generate technical interview question and answers.
//     -Role: ${role}
//     -Candidate Experience: ${experience} years
//     -Focus Topics: ${topicsToFocus}
//     -Write ${numberOfQuestions} interview questions.
//     -For each question, generate a detailed but beginner-friendly answer.
//     -if the answer needs a code example, add a small code block inside.
//     -Keep formatting very clean.
//     -Return a pure JSON array like:
//     [
//     {
//      "question":"Question here?",
//       "answer": "Answer here"
//       },
//     ]
//       Important: Do NOT add any extra text. Only return valid JSON.  
//     `;

//     const conceptExplainPrompt = (question) => `
//     you are an AI trained to generate explnations for a given interview question.

//     Task:
//     -Explain the following interview question and its concept in depth as if you're teaching a beginner developer.
//     -Question: "${question}"
//     -After the explanation,provide a short and clear tittle that summarizes the concept for the article or page header.
//     -If the explanation includes a code example, provide a small code block.
//     -keep the formatting very clean and clear.
//     -Return the result as a valid Json object in the following format:
//     {
//       "title":"Short title here?",
//       "eplanation":"Explanation here"
//     }
//       important : Do Not any extra text outside the JSON format. only return valid JSON.
//       `;
// module.exports = { questionAnswerPrompt, conceptExplainPrompt}
