export const BASE_URL = "http://localhost:8000";

export const API_PATHS = {
    AUTH: {
        REGISTER : "/api/auth/register",//signup
        LOGIN : "/api/auth/login", // Authenticate user & return JWT token
        // PROFILE : "/api/auth/",
    },
    // imag

    AI: {
        GENERATE_QUESTIONS: "/api/ai/generate-questions", //generate interview questions and answers using Gemini
        GENERATE_EXPLANATION: "/api/ai/generate-explanation", //generate a concept explanation using Gemini
    },

    SESSION: {
        CREATE: "/api/session/create", //CREATE A NEW INTERVIEW SESSION WITH QUESTION
        GET_ALL: "/api/session/my-sessions", //GET ALL USER SESSIONS
        GET_ONE: (id) => `/api/session/${id}`, // GET SESSION DETAILS WITH QUESTIONS
        DELETE: (id) => `/api/session/${id}`, //DELETE A SESSION
    },

    QUESTION: {
        ADD_TO_SESSION : "/api/questions/add",// add more questions to a session
        PIN: (id) => `/api/questions/${id}/pin`, // pin or unpin a question
        UPDATE_NOTE: (id) => `/api/questions/${id}/note`, // update/add a note to a question
    },
};