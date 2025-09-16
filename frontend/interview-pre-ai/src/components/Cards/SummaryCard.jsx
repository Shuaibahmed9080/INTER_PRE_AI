import React from 'react'
import { getInitails } from '../../utils/helper';
const SummaryCard = ({
  
    colors,
    role,
    topicToFocus,
    experience,
    questions,
    description,
    lastUpdated,
    onSelect,
    onDelete,

}) => {
   return (
<div
  className="w-full max-w-lg bg-white rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition p-4"
  onClick={onSelect}
>
  {/* Header with avatar + role + delete */}
  <div
    className="rounded-xl p-4 flex items-center justify-between"
    style={{ background: colors.bgcolor }}
  >
    <div className="flex items-center gap-4">
      {/* Avatar/Initials */}
      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white shadow font-bold text-gray-700">
        {/* GU */}
        {getInitails(role)}
      </div>

      {/* Content */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900">{role}</h2>
        <p className="text-sm text-gray-600">{topicToFocus}</p>
      </div>
    </div>

    {/* Delete button */}
    <button
      className="text-xs font-medium px-3 py-1 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition"
      onClick={(e) => {
        e.stopPropagation();
        onDelete();
      }}
    >
      delete 
      {/* <LuTrash2/> */}
    </button>
  </div>

  {/* Footer Info with pill badges */}
  <div className="mt-4 flex flex-wrap gap-2">
    <span className="px-3 py-1 text-sm rounded-full border border-gray-300">
      Experience: {experience} {experience === 1 ? "Year" : "Years"}
    </span>
    <span className="px-3 py-1 text-sm rounded-full border border-gray-300">
      {questions} Q&A
    </span>
    <span className="px-3 py-1 text-sm rounded-full border border-gray-300">
      Last Updated: {lastUpdated}
    </span>
  </div>

  {/* Description */}
  <p className="mt-3 text-sm text-gray-600">{description}</p>
</div>
   )
}
export default SummaryCard;

