// import React from 'react'

// const DeleteAlertContent = ({content, onDelete}) => {
//   return (
//     <div className='p-5'>
//         <p className='text-[14px]'>{content}</p>
//         <div className='flex justify-end mt-6'>
//           <button 
//           type='button'
//           className='btn-small'
//           onClick={onDelete}
//           >Delete
//           </button>
//         </div>
//     </div>
//   )
// }

// export default DeleteAlertContent
import React from 'react'

const DeleteAlertContent = ({content, onDelete}) => {
  return (
    <div className='p-1 '>
        <p className='text-lg'>{content}</p>
        <div className='flex justify-end mt-4'>
          <button 
          type='button '
          className='ml-10 px-4 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors'
          onClick={onDelete}
          >Delete
          </button>
        </div>
    </div>
  )
}

export default DeleteAlertContent
