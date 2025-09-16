import { useEffect, useState } from 'react';
import {useParams } from 'react-router-dom';
import moment from 'moment';
import { AnimatePresence, motion } from 'framer-motion';
import SpinnerLoader from '../../components/loader/SpinnerLoader';
import { toast } from 'react-hot-toast';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import RoleInfoHeader from './components/RoleInfoHeader';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import QuestionCard from '../../components/Cards/QuestionCard';
import { LucideCircleAlert, LucideListCollapse } from 'lucide-react';
import AIResponsePreview from './components/AIResponsePreview';
import Drawer from '../../components/Drawer';
// import { set } from 'mongoose';
import SkeletonLoader from '../../components/loader/SkeletonLoader';

const InterviewPrep = () => {
  const{ sessionId } = useParams();

  // const [error, setError] = useState(null);

  const [sessionData, setSessionData] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const [openLearnMoreDrawer, setOpenLearnMoreDrawer] = useState(false);
  const [explanation, setExplanation] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isUpdateLoader, setIsUpdateLoader] = useState(false);

  // Fetch session data by session id
  const fetchSessionDetailsById = async () => {
    try{
      const response = await axiosInstance.get(
        API_PATHS.SESSION.GET_ONE(sessionId)
      );

      if(response.data && response.data.session){
         console.log("🔥 Full session data:", response.data.session);
        setSessionData(response.data.session);
      }
    }catch (error){
      console.log("Error:",error)
    }
  };

  // Generate Concept Explanation
  const generateConceptExplanation = async (question) => {
    try{
      setErrorMsg("");
      setExplanation(null);

      setIsLoading(true);
      setOpenLearnMoreDrawer(true);

      const response = await axiosInstance.post(
        API_PATHS.AI.GENERATE_EXPLANATION,
        { 
          question,
         }
      );

      if (response.data) {
        setExplanation(response.data);
      }
    } catch(error) {
      setExplanation(null);
      setErrorMsg("Failed to generate explanation , Try again later");
      console.error("Error generating explanation:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleQuestionPinStatus = async (questionId) => {
    console.log("Toggling pin for question:", questionId);

    // Optimistically toggle pin in UI
    setSessionData((prev) => ({
      ...prev,
      questions: prev.questions.map((q) =>
        q._id === questionId ? { ...q, isPinned: !q.isPinned } : q
      ),
    }));

    try {
      const response = await axiosInstance.post(
        API_PATHS.QUESTION.PIN(questionId)
      );
      console.log("Pin response:", response.data);

      if (response.data?.question) {
        // Sync UI with server response
        setSessionData((prev) => ({
          ...prev,
          questions: prev.questions.map((q) =>
            q._id === questionId ? response.data.question : q
          ),
        }));
        toast.success("Pin status updated!");
      }
    } catch (error) {
      console.error("Error pinning question:", error.response || error);
      toast.error("Failed to update pin status");

      // Revert pin if API fails
      setSessionData((prev) => ({
        ...prev,
        questions: prev.questions.map((q) =>
          q._id === questionId ? { ...q, isPinned: !q.isPinned } : q
        ),
      }));
    }
  };

  // Sort questions: pinned first, then unpinned
  const sortedQuestions = sessionData?.questions ? 
    [...sessionData.questions].sort((a, b) => {
      // If both are pinned or both are unpinned, maintain original order
      if (a.isPinned === b.isPinned) return 0;
      // If 'a' is pinned and 'b' is not, 'a' comes first
      if (a.isPinned && !b.isPinned) return -1;
      // If 'b' is pinned and 'a' is not, 'b' comes first
      if (!a.isPinned && b.isPinned) return 1;
      return 0;
    }) : [];

  //Add more Question to a session
  const uploadMoreQuestions = async () => {
    try{
      setIsUpdateLoader(true);

      // call Ai api to generate questions
      const aiResponse = await axiosInstance.post(
        API_PATHS.AI.GENERATE_QUESTIONS,
        {
          role:sessionData?.role,
          experience: sessionData?.experience,
          topicsToFocus: sessionData?.topicToFocus,
          numberOfQuestions:10,
        }
      );
      // should be array like [[question, answer],....]
      const generatedQuestions = aiResponse.data;

      const response = await axiosInstance.post(
        API_PATHS.QUESTION.ADD_TO_SESSION,
        {
          sessionId,
          questions : generatedQuestions,
        }
      );

      if(response.data){
        toast.success("Added More Q&A!!");
        fetchSessionDetailsById()
      }
    }catch (error) {
        if(error.response && error.response.data.message){
          setErrorMsg(error.response.data.message);
        } else {
          setErrorMsg("Something went wrong. please try again")
        }
    } finally{
      setIsUpdateLoader(false);
    }
  }; 

  useEffect(() =>{
    if(sessionId){
      fetchSessionDetailsById()
    }
    return () =>{}
  }, [])

  return (
    <DashboardLayout>
      <RoleInfoHeader
        role={sessionData?.role || ""}
        topicToFocus={sessionData?.topicToFocus || ""}
        experience={sessionData?.experience || ""}
        questions={sessionData?.questions?.length || ""}
        description={sessionData?.description || ""}
        lastUpdated={
          sessionData?.updatedAt
          ? moment(sessionData.updatedAt).format("DD MM YYYY")
          :""
        }
      />
      
      {/* InterviewPrep */}
      <div className='container mx-auto pt-4 pb-4 px-4 md:px-0'>
        <h2 className='text-lg font-semibold color-black'>Interview Q & A</h2>

        <div className='grid grid-cols-12 gap-4 mt-5 mb-10'>
          {/* Questions Column - Give it more space and min-width */}
          <div className={`col-span-12 ${
            openLearnMoreDrawer ? "lg:col-span-7 xl:col-span-8": "lg:col-span-10 xl:col-span-9"
          } min-w-0`}>
            <div className="w-full">
              <AnimatePresence>
                {sortedQuestions.map((data, index) => {
                  return (
                    <motion.div
                      key={data._id || index}
                      initial={{ opacity:0, y: -20 }}
                      animate={{ opacity:1, y:0 }}
                      exit={{ opacity:0, y: -20 }}
                      transition={{ 
                        duration: 0.4,
                        type: "spring",
                        stiffness: 100,
                        delay: index * 0.05, // Reduced delay for smoother animation
                        damping:15,
                      }}
                      layout
                      layoutId={`question-${data._id || index}`}
                      className="w-full min-w-0" // Ensure full width and proper min-width
                    >
                      <QuestionCard
                        question={data?.question}
                        answer={data?.answer}
                        onLearnMore={() => generateConceptExplanation(data?.question)}
                        isPinned={data?.isPinned}
                        onTogglePin={() => toggleQuestionPinStatus(data?._id)}
                      />
                      {!isLoading &&
                        sessionData?.questions?.length == index + 1 && (
                          <div className="flex justify-center mt-6">
                            <button
                              className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white text-sm font-medium rounded-md shadow hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                              disabled={isLoading || isUpdateLoader}
                              onClick={uploadMoreQuestions}
                            >
                              {isUpdateLoader ? (
                                <SpinnerLoader />
                              ) : (
                                <LucideListCollapse className="w-5 h-5" />
                              )}
                              Load More
                            </button>
                          </div>
                        )}

                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
          
          {/* Drawer/Side Content */}
          {openLearnMoreDrawer && (
            <div className="col-span-12 lg:col-span-5 xl:col-span-4">
              {/* Your drawer content here */}
            </div>
          )}
        </div>
        <Drawer
          isOpen={openLearnMoreDrawer}
          onClose={() => setOpenLearnMoreDrawer(false)}
          title={!isLoading && explanation ?.title}

          >
            {errorMsg && (
              <p className='flex  gap-2 text-sm text-amber-600 font-medium'>
                <LucideCircleAlert className='mt-1'/> {errorMsg}
              </p>
              )}
              {isLoading && <SkeletonLoader />}
              {!isLoading && explanation && (
                <AIResponsePreview content={explanation?.explanation} />
                
            )} 
          {/* Your drawer content here */}
        </Drawer>
      </div>
    </DashboardLayout>
  );
}

export default InterviewPrep;

// import { useEffect, useState } from 'react';
// import {useParams } from 'react-router-dom';
// import moment from 'moment';
// import { AnimatePresence, motion } from 'framer-motion';
// import SpinnerLoader from '../../components/loader/SpinnerLoader';
// import { toast } from 'react-hot-toast';
// import DashboardLayout from '../../components/layouts/DashboardLayout';
// import RoleInfoHeader from './components/RoleInfoHeader';
// import axiosInstance from '../../utils/axiosInstance';
// import { API_PATHS } from '../../utils/apiPaths';
// import QuestionCard from '../../components/Cards/QuestionCard';

// const InterviewPrep = () => {
//   const{ sessionId } = useParams();

//   const [sessionData, setSessionData] = useState(null);
//   const [errorMsg, setErrorMsg] = useState("");

//   const [openLearnMoreDrawer, setOpenLearnMoreDrawer] = useState(false);
//   const [explanation, setExplanation] = useState(null);

//   const [isLoading, setIsLoading] = useState(false);
//   const [isUpdateLoader, setIsUpdateLoader] = useState(false);

//   // Fetch session data by session id
//   const fetchSessionDetailsById = async () => {
//     try{
//       const response = await axiosInstance.get(
//         API_PATHS.SESSION.GET_ONE(sessionId)
//       );

//       if(response.data && response.data.session){
//          console.log("🔥 Full session data:", response.data.session);
//         setSessionData(response.data.session);
//       }
//     }catch (error){
//       console.log("Error:",error)
//     }
//   };

//   // Generate Concept Explanation
//   const generateConceptExplanation = async (question) => {};

//   const toggleQuestionPinStatus = async (questionId) => {
//   console.log("Toggling pin for question:", questionId);

//   // Optimistically toggle pin in UI
//   setSessionData((prev) => ({
//     ...prev,
//     questions: prev.questions.map((q) =>
//       q._id === questionId ? { ...q, isPinned: !q.isPinned } : q
//     ),
//   }));

//   try {
//     const response = await axiosInstance.post(
//       API_PATHS.QUESTION.PIN(questionId)
//     );
//     console.log("Pin response:", response.data);

//     if (response.data?.question) {
//       // Sync UI with server response
//       setSessionData((prev) => ({
//         ...prev,
//         questions: prev.questions.map((q) =>
//           q._id === questionId ? response.data.question : q
//         ),
//       }));
//       toast.success("Pin status updated!");
//     }
//   } catch (error) {
//     console.error("Error pinning question:", error.response || error);
//     toast.error("Failed to update pin status");

//     // Revert pin if API fails
//     setSessionData((prev) => ({
//       ...prev,
//       questions: prev.questions.map((q) =>
//         q._id === questionId ? { ...q, isPinned: !q.isPinned } : q
//       ),
//     }));
//   }
// };

// //Add more Question to a session
//   const uploadMoreQuestions = async () => {}; 

//   useEffect(() =>{
//     if(sessionId){
//       fetchSessionDetailsById()
//     }
//     return () =>{}
//   }, [])

//   return (
//     <DashboardLayout>
//       <RoleInfoHeader
//         role={sessionData?.role || ""}
//         topicToFocus={sessionData?.topicToFocus || ""}
//         experience={sessionData?.experience || ""}
//         questions={sessionData?.questions?.length || ""}
//         description={sessionData?.description || ""}
//         lastUpdated={
//           sessionData?.updatedAt
//           ? moment(sessionData.updatedAt).format("DD MM YYYY")
//           :""
//         }
//       />
      
//       {/* InterviewPrep */}
//       <div className='container mx-auto pt-4 pb-4 px-4 md:px-0'>
//         <h2 className='text-lg font-semibold color-black'>Interview Q & A</h2>

//         <div className='grid grid-cols-12 gap-4 mt-5 mb-10'>
//           {/* Questions Column - Give it more space and min-width */}
//           <div className={`col-span-12 ${
//             openLearnMoreDrawer ? "lg:col-span-7 xl:col-span-8": "lg:col-span-10 xl:col-span-9"
//           } min-w-0`}>
//             <div className="w-full">
//               <AnimatePresence>
//                 {sessionData?.questions?.map((data, index) => {
//                   return (
//                     <motion.div
//                       key={data._id || index}
//                       initial={{ opacity:0, y: -20 }}
//                       animate={{ opacity:1, y:0 }}
//                       exit={{ opacity:0, y: 0.95 }}
//                       transition={{ 
//                         duration: 0.4,
//                         type: "spring",
//                         stiffness: 100,
//                         delay: index * 0.1,
//                         damping:15,
//                       }}
//                       layout
//                       layoutId={`question-${data._id || index}`}
//                       className="w-full min-w-0" // Ensure full width and proper min-width
//                     >
//                       <QuestionCard
//                         question={data?.question}
//                         answer={data?.answer}
//                         onLearnMore={() => 
//                           generateConceptExplanation(data?.question)
//                         }
//                         isPinned={data?.isPinned}
//                         onTogglePin={() => toggleQuestionPinStatus(data?._id)}
//                       />
//                     </motion.div>
//                   );
//                 })}
//               </AnimatePresence>
//             </div>
//           </div>
          
//           {/* Drawer/Side Content */}
//           {openLearnMoreDrawer && (
//             <div className="col-span-12 lg:col-span-5 xl:col-span-4">
//               {/* Your drawer content here */}
//             </div>
//           )}
//         </div>
//       </div>
//     </DashboardLayout>
//   );
// }

// export default InterviewPrep;
