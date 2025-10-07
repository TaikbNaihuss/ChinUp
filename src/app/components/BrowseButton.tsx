import React from "react";

type BrowseButtonProps = {
  onClick: () => void;
  className?: string;
};

export default function BrowseButton({ onClick, className = '' }: BrowseButtonProps) {
  return (
    <button 
      className={`browse-button nav-button font-mono fade-in-2 dark:shadow-xl/40 rounded-xl 
                 shadow-lg shadow-slate-800/50 dark:shadow-yellow-200/50 
                 py-2 px-5 ${className}`}
      onClick={onClick}
    >
      Start Browsing
    </button>
  );
}