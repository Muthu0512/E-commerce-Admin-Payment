import React, { useEffect } from 'react'
import {useProductStore} from  "../stores/useProductStore"
import {Trash2,Star} from "lucide-react"
import {motion} from "framer-motion"

const ProductsList = () => {
const {products,toggleFeaturedProducts,deleteProduct} = useProductStore()




  return (

    <motion.div initial={{opacity:0,y:100}} animate={{opacity:1,y:0}} transition={{duration:1}} className='w-screen sm:min-w-3xl  px-auto py-4 mt-4 overflow-scroll'>
      <table className='min-w-full border-collapse   '>
        <thead className='text-2xs  sm:text-2xl  bg-gray-800 text-emerald-600'>
          <tr className='tracking-wider  mb- uppercase'>
            <th className="py-1 px-2 text-center"> S.No</th>
            <th className='py-1 px-2 text-center' >
              Product
            </th>
            <th  className='py-1 px-2 text-center'>
              Price
            </th>
            <th  className='py-1 px-2 text-center'>
              Category
            </th>
            <th  className='py-1 px-2 text-center'>
              Featured
            </th>
            <th  className='py-1 px-2 text-center'>
              Remove
            </th>
          </tr>
         
        
        </thead>
         <tbody className=' w-full divide-y divide-gray-600  '>
         {
          products.map((product,index)=>(
            <tr key={product._id} className=' whitespace-nowrap text-center bg-gray-900 ' >
               <td className='px-2 py-2 text-center' >{index+1}</td>
              <td className='px-2 py-2 text-center'>
                <div className='flex gap-2  items-center justify-around '>
                {product.name.charAt(0).toUpperCase() +product.name.slice(1)}
                <img src={product.image} alt={product.name} loading='eager' className='size-6 sm:size-12 rounded-full object-cover'/>
                </div>
                
              </td> 

              <td className='px-2 py-2 text-center' >
               ₹ {product.price.toFixed(2)}
              </td >
              <td className='px-2 py-2 text-center'>
                {product.category}
              </td>
              <td className='px-2 py-2 text-center '>
                {product.isFeatured? (<button onClick={()=>toggleFeaturedProducts(product._id)} className='active:scale-80  transition-colors'><Star className=' cursor-pointer size-8 text-green-400 fill-green-600 hover:fill-gray-600 hover:text-gray-400'></Star></button>):(<button onClick={()=>toggleFeaturedProducts(product._id)} className='active:scale-80  transition-colors'><Star className='cursor-pointer size-8 text-gray-400 fill-gray-600 hover:fill-emerald-600 hover:text-green-400'></Star></button>)}
              </td>
              <td className='px-2 py-2 text-center'>
             <button onClick={(e)=>deleteProduct(product._id)} className=' p-1 rounded-full transition-all duration-200 active:scale-50 cursor-pointer'>
              <Trash2 className=' hover:text-red-800 size-8 p-1 rounded-full transition-colors '/>
             </button>
              </td>
            </tr>
          ))
         }

         
        
         </tbody>
      </table>
    </motion.div>
  )
}

export default ProductsList