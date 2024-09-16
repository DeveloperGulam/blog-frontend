'use client';

import { useState } from 'react';

export default function CategoryFilter({ categories, selectedCategory }) {
  const [category, setCategory] = useState(selectedCategory);

  const handleChange = (e) => {
    const newCategory = e.target.value;
    setCategory(newCategory);
    window.location.href = newCategory ? `/?category=${newCategory}` : '/';
  };

  return (
    <div className="mb-6">
      <select 
        className="w-full p-2 border border-purple-800 rounded-md"
        onChange={handleChange}
        value={category}
      >
        <option value="">Select a Category...</option>
        {categories.map((cat) => (
          <option key={cat.name} value={cat.name}>{cat.name}</option>
        ))}
      </select>
    </div>
  );
}