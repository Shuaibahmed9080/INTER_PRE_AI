import React, { useEffect, useRef, useState } from 'react'
import { ChevronDown, Pin, PinOff, Sparkles } from "lucide-react";
import AIResponsePreview from '../../pages/InterviewPrep/components/AIResponsePreview';

const QuestionCard = ({
    question,
    answer,
    onLearnMore,
    isPinned,
    onTogglePin,
}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [height, setHeight] = useState(0);

    const contentRef = useRef(null);

    useEffect(() => {
        if (isExpanded) {
            const contentHeight = contentRef.current.scrollHeight;
            setHeight(contentHeight + 20);
        } else {
            setHeight(0);
        }
    }, [isExpanded]);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="group bg-gray-100 rounded-lg p-4 ml-2 mb-4 hover:bg-gray-200 transition-colors duration-200">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                    <span className="flex-shrink-0 w-6 h-6 bg-gray-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                        Q
                    </span>
                    <h3 className="text-gray-800 font-normal text-base leading-relaxed flex-1 truncate">
                        {question}
                    </h3>
                </div>
                
                <div className="flex items-center gap-2 ml-4">
                    <div className={`items-center gap-2 ${
                        isExpanded ? 'flex' : 'hidden group-hover:flex'
                    }`}>
                        <button
  className="p-1.5 hover:bg-gray-300 rounded-md transition-colors duration-150 text-gray-600"
  onClick={onTogglePin}
>
  {isPinned ? <PinOff className="w-4 h-4" /> : <Pin className="w-4 h-4" />}
</button>


                        <button 
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-150 text-sm" 
                            onClick={() => {
                                setIsExpanded(true)
                                onLearnMore()
                            }}
                        >
                            <Sparkles className="w-4 h-4 text-teal-600" />
                            <span className="hidden md:block">
                                Learn More
                            </span>
                        </button>
                    </div>
                    
                    <button 
                        className=" hover:text-gray-500  cursor-pointer text-gray-400"
                        onClick={toggleExpand}
                    >
                        <ChevronDown
                            size={20}
                            className={`transform transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                        />
                    </button>
                </div>
            </div>

            {/* Answer Section */}
            <div 
                className="overflow-hidden transition-all duration-300 ease-in-out"
                style={{ maxHeight: `${height}px` }}
            >
                <div
                    ref={contentRef}
                    className="mt-4 text-gray-700 bg-gray-50 px-5 py-3 rounded-lg"
                >
                    <AIResponsePreview content={answer} />
                    {/* {isExpanded && answer && (
                        <div className="text-gray-700 leading-relaxed text-sm">
                            {answer}
                        </div>
                    )} */}
                </div>
            </div>
        </div>
    );
};

export default QuestionCard;

// import React, { useEffect, useRef, useState } from 'react'
// import { ChevronDown, Pin, PinOff, Sparkles } from "lucide-react";

// const QuestionCard = ({
//     question,
//     answer,
//     onLearnMore,
//     isPinned,
//     onTogglePin,
// }) => {
//     const [isExpanded, setIsExpanded] = useState(false);
//     const [height, setHeight] = useState(0);

//     const contentRef = useRef(null);

//     useEffect(() => {
//         if (isExpanded) {
//             const contentHeight = contentRef.current.scrollHeight;
//             setHeight(contentHeight + 20);
//         } else {
//             setHeight(0);
//         }
//     }, [isExpanded]);

//     const toggleExpand = () => {
//         setIsExpanded(!isExpanded);
//     };

//     return (
//         <div className="group bg-gray-100 rounded-lg p-4 mb-2 hover:bg-gray-200 transition-colors duration-200">
//             <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-3 flex-1 min-w-0">
//                     <span className="flex-shrink-0 w-6 h-6 bg-gray-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
//                         Q
//                     </span>
//                     <h3 className="text-gray-800 font-normal text-base leading-relaxed flex-1 truncate">
//                         {question}
//                     </h3>
//                 </div>
                
//                 <div className="flex items-center gap-2 ml-4">
//                     <div className={`items-center gap-2 ${
//                         isExpanded ? 'flex' : 'hidden group-hover:flex'
//                     }`}>
//                         <button 
//                             className="p-1.5 hover:bg-gray-300 rounded-md transition-colors duration-150 text-gray-600" 
//                             onClick={onTogglePin}
//                         >
//                             {isPinned ? (
//                                 <PinOff className="w-4 h-4" /> 
//                             ) : (
//                                 <Pin className="w-4 h-4" />
//                             )}
//                         </button>

//                         <button 
//                             className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-150 text-sm" 
//                             onClick={() => {
//                                 setIsExpanded(true)
//                                 onLearnMore()
//                             }}
//                         >
//                             <Sparkles className="w-4 h-4 text-teal-600" />
//                             <span className="text-gray-700 font-medium">
//                                 Learn More
//                             </span>
//                         </button>
//                     </div>
                    
//                     <button 
//                         className="p-1.5 hover:bg-gray-300 rounded-md transition-colors duration-150 text-gray-600"
//                         onClick={toggleExpand}
//                     >
//                         <ChevronDown
//                             size={20}
//                             className={`transform transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
//                         />
//                     </button>
//                 </div>
//             </div>

//             {/* Answer Section */}
//             <div 
//                 className="overflow-hidden transition-all duration-300 ease-in-out"
//                 style={{ maxHeight: `${height}px` }}
//             >
//                 <div
//                     ref={contentRef}
//                     className="pt-4"
//                 >
//                     {isExpanded && answer && (
//                         <div className="text-gray-700 leading-relaxed text-sm">
//                             {answer}
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default QuestionCard;
