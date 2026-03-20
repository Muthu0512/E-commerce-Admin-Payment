
function InputForm( {label,id,icon:Icon,value,type,onChange,placeholder}) {
  return (
    <div className="flex flex-col gap-1 px-auto  text-gray-200">
      <label htmlFor={id} className="block text-sm  font-medium text">
        {label}
      </label>
      <div className="flex justify-start items-center gap-2 px-2 py-0.5 border-gray-700  border-2 rounded-md ">
        <Icon className="size-4 block  " />
        <input
        
          id={id}
          value={value}
          type={type}
          required
          onChange={onChange}
          placeholder={placeholder}
          className=" w-full block  placeholder-gray-200 focus:outline-none py-2 text-s bg-gray-900  "
        />
      </div>
    </div>
  );
}

export default InputForm;


