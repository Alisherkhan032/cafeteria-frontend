import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const Breadcrumb = ({ items }) => {
  return (
    <nav className="flex items-center space-x-2 mb-4 pt-2 pl-2 sm:pl-6">

      {items.map((item, index) => (
        <div key={item.path} className="flex items-center">
          {index > 0 && (
            <ChevronRight 
              className="h-4 w-4 text-gray-400 mx-2" 
              strokeWidth={2} 
            />
          )}
          
          {index === items.length - 1 ? (
            <span className="text-gray-200 font-semibold">
              {item.label}
            </span>
          ) : (
            <Link 
              to={item.path} 
              className="text-gray-400 hover:text-gray-100 transition-colors"
            >
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumb;