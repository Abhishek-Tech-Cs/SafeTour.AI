import React from 'react'

function Input({
    type="text",
    name,
    label,
    placeholder,
    required=false,
    value,
    onChange,
    error,
    icon,
    rightElement
}){
  return (
    <div className="mb-4">
        {label && (
            <label htmlFor={name} className="mb-2 block text-sm font-medium text-gray-800">
                {label}
            </label>
        )}

        <div className="relative">
            {icon && (
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    {icon}
                </span>
            )}
            {rightElement && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2">
                    {rightElement}
                </span>
            )}  
            
            <input 
                id={name}
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                required={required}
                onChange={onChange}
                className={`w-full text-black rounded-[8px] border px-4 pl-10 pr-10 py-2.5 text-base
                    placeholder:text-gray-400
                    transition
                    focus:outline-none
                    ${
                        error
                            ? "border-red-500 focus:border-red-500"
                            : "border-gray-300 focus:border-purple-500"
                    }
                `}
            />
        </div>


        {error && (
            <p className='mt-1 text-sm text-red-500'>{error}</p>
        )}
    </div>
  )
}

export default Input