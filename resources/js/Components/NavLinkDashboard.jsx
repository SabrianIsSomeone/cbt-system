import { Link } from '@inertiajs/react';

export default function NavLink({ active = false, className = '', children, ...props }) {
    return (
        <li className='hover:text-yellow-600 active:text-primary'>
            <Link
                {...props}
                className={
                    'font-bold flex text-base ' +
                    (active
                        ? 'border-primary/80 text-primary focus:border-primary/70 '
                        : 'border-transparent hover:text-primary hover:border-gray-300 focus:text-secondary active:text-secondary focus:border-gray-300 ') +
                    className
                }
            >
                {children}
            </Link>
        </li>

    );
}
