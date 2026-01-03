/*
 * FILE: components/Button.jsx
 * PURPOSE: Reusable button components - Airbnb style
 */

import React from 'react';
import { Link } from 'react-router-dom';

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) {
  const baseStyles = 'font-medium rounded-lg transition-all focus:outline-none active:scale-[0.98]';
  
  const variants = {
    primary: 'bg-[#FF385C] text-white hover:bg-[#E31C5F] shadow-sm',
    secondary: 'bg-white text-gray-900 border border-gray-900 hover:bg-gray-50',
    outline: 'border border-gray-300 text-gray-700 hover:border-gray-900 bg-white',
    danger: 'bg-red-500 text-white hover:bg-red-600',
    ghost: 'text-gray-700 hover:bg-gray-100',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function ButtonLink({ to, children, variant = 'primary', size = 'md', className = '' }) {
  const baseStyles = 'inline-block font-medium rounded-lg transition-all text-center active:scale-[0.98]';
  
  const variants = {
    primary: 'bg-[#FF385C] text-white hover:bg-[#E31C5F] shadow-sm',
    secondary: 'bg-white text-gray-900 border border-gray-900 hover:bg-gray-50',
    outline: 'border border-gray-300 text-gray-700 hover:border-gray-900 bg-white',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <Link
      to={to}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </Link>
  );
}
