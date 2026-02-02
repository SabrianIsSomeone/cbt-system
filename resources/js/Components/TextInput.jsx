import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function TextInput({ type = 'text', className = '', isFocused = false, ...props }, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <input
            {...props}
            type={type}
            className={
                'border-gray-300 mt-1 border-t-primary border-l-primary border-r-secondary border-b-secondary focus:border-none focus:border-primary focus:ring-yellow-600 rounded-md shadow-sm ' +
                className
            }
            ref={input}
        />
    );
});
