import React from 'react'

const Spinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-t-4 border-gray-300 border-solid rounded-full animate-spin"></div>
        <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-gray-300 rounded-full animate-ping"></div>
      </div>
    </div>
  )
}

export default Spinner
