import {useState} from "react"
import {Eye,EyeOff} from "lucide-react"

const PasswordReveal=({showPassword,setShowPassword})=>{
    return (
        <button type="button" className="absolute cursor-pointer outline-none bg-emerald-800 rounded-md px-0.5 right-3  top-[70%] -translate-y-1/2 hover:bg-emerald-600 transition-colors duration-200" onClick={()=>{
            setShowPassword(!showPassword)
        }}>
            {showPassword ? <Eye className='size-5'/> :<EyeOff className='size-5'/>}
        </button>
    )
}

export default PasswordReveal