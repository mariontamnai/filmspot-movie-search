import React from "react";

export default function SearchBar({ value, onChange, onSubmit}) {
  return (
    <form onSubmit={onSubmit} className="w-full max-w-md flex">
      <input type="text" placeholder="Search movies..." value={value} onChange={(e) => onChange(e.target.value)} className="flex-1 p-2 rounded-l-md text-black" />
      <button type="submit" className="bg-blue-600 text-white px-4 rounded-r-md hover:bg-blue-700 transition-colors">Search</button>
    </form>
  );
}