import React from 'react'

function Button({
    children,
    type = "button",
    onClick,
    disabled = false,
}) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`w-full rounded-[8px] cursor-pointer px-4 py-3 text-base font-semibold text-white transition
                ${
                    disabled
                        ? "cursor-not-allowed bg-gray-300 text-gray-500"
                        : "bg-purple-500 hover:bg-purple-600"
                }
            `}
        >
            {children}
        </button>
    );
}

export default Button