export default function PrimaryButton({ className = '', disabled, children, ...props }) {
    return (
        <button
            {...props}
            className={
                `bg-primary inline-flex scale-[0.78] btn glass items-center px-4 py-2 h-5 hover:scale-90  border border-transparent rounded-md font-semibold text-lg  text-white hover:bg-primary focus:bg-orange-600 active:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 ${disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
