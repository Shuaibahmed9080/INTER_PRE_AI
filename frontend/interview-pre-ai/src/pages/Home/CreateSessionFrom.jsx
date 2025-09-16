import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/input';
import SpinnerLoader from '../../components/loader/SpinnerLoader';
import { X } from 'lucide-react';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';

const CreateSessionForm = ({ onClose }) => {
    const [formData, setFormData] = useState({
        role: "",
        experience: "",
        topicsToFocus: "",
        description: "",
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleChange = (key, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [key]: value,
        }));
    };

    const handleCreateSession = async (e) => {
        e.preventDefault();

        const { role, experience, topicsToFocus, description } = formData;

        if (!role || !experience || !topicsToFocus) {
            setError("Please fill in all required fields.");
            return;
        }

        setError("");
        setIsLoading(true);

        try {
            // 1️⃣ CALL AI API TO GENERATE QUESTIONS
            const aiResponse = await axiosInstance.post(
                API_PATHS.AI.GENERATE_QUESTIONS,
                {
                    role,
                    experience,
                    topicsToFocus,
                    numberOfQuestions: 20,
                }
            );

            let generatedQuestions = aiResponse.data;

            // Ensure questions are in array format backend expects
            if (!generatedQuestions || !Array.isArray(generatedQuestions) || generatedQuestions.length === 0) {
                setError("Failed to generate questions. Please try again.");
                setIsLoading(false);
                return;
            }

            // Map to backend's expected structure
            generatedQuestions = generatedQuestions.map((q) => ({
                question: q.question,
                answer: q.answer,
            }));

            console.log("Generated Questions:", generatedQuestions);

            // 2️⃣ CREATE SESSION WITH GENERATED QUESTIONS
            const response = await axiosInstance.post(API_PATHS.SESSION.CREATE, {
                role,
                experience,
                description,
                topicToFocus: topicsToFocus, // backend expects this key
                questions: generatedQuestions, // backend expects this key
            });

            console.log("Session Creation Response:", response.data);

            if (response.data?.session?._id) {
                navigate(`/interview-prep/${response.data.session._id}`);
            }
        } catch (error) {
            console.error("Full API Error:", error.response || error);
            setError(error.response?.data?.message || "Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative w-full max-w-lg mx-auto bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-xl p-8">
            {/* Close Button */}
            <button
                type="button"
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            >
                <X size={24} />
            </button>

            <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">
                🚀 Start Your Interview Journey
            </h3>
            <p className="text-sm text-gray-600 mb-8 text-center">
                Enter a few quick details to unlock your personalized set of interview questions!
            </p>

            <form onSubmit={handleCreateSession} className="space-y-6">
                {/* Role */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        🎯 Target Role
                    </label>
                    <Input
                        value={formData.role}
                        onChange={({ target }) => handleChange("role", target.value)}
                        placeholder="e.g. Frontend Developer, UI/UX Designer"
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl 
                                   focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    />
                </div>

                {/* Experience */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        ⏳ Years of Experience
                    </label>
                    <Input
                        value={formData.experience}
                        onChange={({ target }) => handleChange("experience", target.value)}
                        placeholder="e.g., 1 year, 3 years, 5 years"
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl 
                                   focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    />
                </div>

                {/* Topics */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        📚 Topics to Focus On
                    </label>
                    <Input
                        value={formData.topicsToFocus}
                        onChange={({ target }) => handleChange("topicsToFocus", target.value)}
                        placeholder="e.g., React, Node.js, MongoDB"
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl 
                                   focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        📝 Description
                    </label>
                    <Input
                        value={formData.description}
                        onChange={({ target }) => handleChange("description", target.value)}
                        placeholder="Any specific goals or notes for this session?"
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl 
                                   focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    />
                </div>

                {/* Error */}
                {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

                {/* Submit Button */}
                <button
                    type="submit"
                    className={`w-full py-3 text-white text-base font-semibold rounded-xl 
                                bg-gradient-to-r from-blue-600 to-indigo-600 
                                hover:from-blue-700 hover:to-indigo-700 
                                transition-all duration-200 shadow-md 
                                ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <div className="flex items-center justify-center gap-2">
                            <SpinnerLoader /> Creating...
                        </div>
                    ) : (
                        "Create Session"
                    )}
                </button>
            </form>
        </div>
    );
};

export default CreateSessionForm;

// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Input from '../../components/Inputs/input';
// import SpinnerLoader from '../../components/loader/SpinnerLoader';
// import { X } from 'lucide-react';
// import axiosInstance from '../../utils/axiosInstance';
// import { API_PATHS } from '../../utils/apiPaths';

// const CreateSessionForm = ({ onClose }) => {
//     const [formData, setFormData] = useState({
//         role: "",
//         experience: "",
//         topicsToFocus: "",
//         description: "",
//     });

//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState(null);

//     const navigate = useNavigate();

//     const handleChange = (key, value) => {
//         setFormData((prevData) => ({
//             ...prevData,
//             [key]: value,
//         }));
//     };

//     const handleCreateSession = async (e) => {
//         e.preventDefault();

//         const { role, experience, topicsToFocus } = formData;

//         if (!role || !experience || !topicsToFocus) {
//             setError("Please fill in all required fields.");
//             return;
//         }

//         setError("");
//         setIsLoading(true);

//         try {
//             // CALL AI API TO GENERATE QUESTIONS
//             const aiResponse = await axiosInstance.post(
//                 API_PATHS.AI.GENERATE_QUESTIONS,
//                 {
//                     role,
//                     experience,
//                     topicsToFocus: topicsToFocus,
//                     numberOfQuestions: 10,
//                 }
//             );

//             const generatedQuestions = aiResponse.data;

//             // CREATE SESSION WITH GENERATED QUESTIONS
//             const response = await axiosInstance.post(API_PATHS.SESSION.CREATE, {
//                 ...formData,
//                 generatedQuestions,
//             });
//             console.log("Generated Questions:", generatedQuestions);


//             if (response.data?.session?._id) {
//                 navigate(`/interview-prep/${response.data.session._id}`);
//             }
//         } catch (error) {
//             if (error.response?.data?.message) {
//                 setError(error.response.data.message);
//             } else {
//                 setError("Something went wrong. Please try again.");
//             }
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return (
//         <div className="relative w-full max-w-lg mx-auto bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-xl p-8">
      
//       {/* Close Button */}
//       <button
//         type="button"
//         onClick={onClose}   // 👈 call modal close
//         className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
//       >
//         <X size={24} />
//       </button>
//             <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">
//                 🚀 Start Your Interview Journey
//             </h3>
//             <p className="text-sm text-gray-600 mb-8 text-center">
//                 Enter a few quick details to unlock your personalized set of interview questions!
//             </p>

//             <form onSubmit={handleCreateSession} className="space-y-6">
//                 {/* Target Role */}
//                 <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-2">
//                         🎯 Target Role
//                     </label>
//                     <Input
//                         value={formData.role}
//                         onChange={({ target }) => handleChange("role", target.value)}
//                         placeholder="e.g. Frontend Developer, UI/UX Designer"
//                         type="text"
//                         className="w-full px-4 py-3 border border-gray-300 rounded-xl 
//                                    focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
//                     />
//                 </div>

//                 {/* Years of Experience */}
//                 <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-2">
//                         ⏳ Years of Experience
//                     </label>
//                     <Input
//                         value={formData.experience}
//                         onChange={({ target }) => handleChange("experience", target.value)}
//                         placeholder="e.g., 1 year, 3 years, 5 years"
//                         type="text"
//                         className="w-full px-4 py-3 border border-gray-300 rounded-xl 
//                                    focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
//                     />
//                 </div>

//                 {/* Topics to Focus On */}
//                 <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-2">
//                         📚 Topics to Focus On
//                     </label>
//                     <Input
//                         value={formData.topicsToFocus}
//                         onChange={({ target }) => handleChange("topicsToFocus", target.value)}
//                         placeholder="e.g., React, Node.js, MongoDB"
//                         type="text"
//                         className="w-full px-4 py-3 border border-gray-300 rounded-xl 
//                                    focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
//                     />
//                 </div>

//                 {/* Description */}
//                 <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-2">
//                         📝 Description
//                     </label>
//                     <Input
//                         value={formData.description}
//                         onChange={({ target }) => handleChange("description", target.value)}
//                         placeholder="Any specific goals or notes for this session?"
//                         type="text"
//                         className="w-full px-4 py-3 border border-gray-300 rounded-xl 
//                                    focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
//                     />
//                 </div>

//                 {/* Error Message */}
//                 {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

//                 {/* Button */}
//                 <button
//                     type="submit"
//                     className={`w-full py-3 text-white text-base font-semibold rounded-xl 
//                                 bg-gradient-to-r from-blue-600 to-indigo-600 
//                                 hover:from-blue-700 hover:to-indigo-700 
//                                 transition-all duration-200 shadow-md 
//                                 ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
//                     disabled={isLoading}
//                 >
//                     {isLoading ? (
//                         <div className="flex items-center justify-center gap-2">
//                             <SpinnerLoader /> Creating...
//                         </div>
//                     ) : (
//                         "Create Session"
//                     )}
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default CreateSessionForm;
