import { XCircle,ArrowRight , LucideSmile} from 'lucide-react'
import React from 'react'
import {Link} from "react-router-dom"

const CancelPage = () => {
  return (
    <div className='max-h-screen w-full flex items-center justify-center'>
         <div className="  bg-gray-900/65 w-2xs mt-12  p-4 space-y-4 flex flex-col items-center justify-center rounded-md shadow-lg shadow-emerald-900">
        <XCircle className="size-12 text-3xl text-red-500" />
        <h4 className=" text-red-500 text-lg">Your order has been Cancelled..</h4>
        <p className="text-sm ">
          No charges made...
        </p>
        <div className="bg-gray-700/40 w-full px-2 py-3 space-y-2 rounded-md text-sm">
          
         <span className=''>If you have any query feel free to ask our support team... <LucideSmile  className='inline-block size-5  '/> </span> 
        </div>
        
        <Link
          to={"/"}
          className="text-gray-300  bg-gray-700 hover:bg-green-600 transition-all duration-400  rounded-md px-4 py-2 flex justify-between items-center gap-3"
        >
          <p>Continue shopping </p>
          <ArrowRight className="size-6" />
        </Link>
      </div>
    </div>
  )
}

export default CancelPage