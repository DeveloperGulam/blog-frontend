'use client';

import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import client from '../../lib/apolloClient';
import { toast } from 'react-hot-toast';

const CREATE_BLOG = gql`
  mutation CreateBlog($featureImage: String, $content: String!, $excerpt: String, $category: String) {
    createBlog(featureImage: $featureImage, content: $content, excerpt: $excerpt, category: $category) {
      id
    }
  }
`;

export default function NewBlog() {
  const [formData, setFormData] = useState({
    featureImage: '',
    content: '',
    excerpt: '',
    category: '',
  });

  const [createBlog] = useMutation(CREATE_BLOG, { client });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createBlog({
        variables: formData,
      });
      toast.success('Blog post created successfully!');

      setFormData({
        featureImage: '',
        content: '',
        excerpt: '',
        category: '',
      });
    } catch (error) {
      console.error('Error creating blog post:', error);
      toast.error('Error creating blog post');
    }
  };

  return (
    <div className="mx-auto p-20 bg-gradient-to-br from-purple-100 to-white min-h-screen flex justify-center">
      <div className="w-7/12">
        <h1 className="text-4xl font-bold mb-8 text-purple-800 text-center">
          Create New Blog Post
        </h1>
        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-white p-6 rounded-lg shadow-md"
        >
          <div>
            <label className="block mb-2 font-semibold text-purple-800">
              Feature Image URL
            </label>
            <input
              type="url"
              name="featureImage"
              value={formData.featureImage}
              required
              onChange={handleChange}
              className="w-full p-3 border border-purple-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold text-purple-800">
              Content
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              className="w-full p-3 border border-purple-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent transition h-40"
            ></textarea>
          </div>
          <div>
            <label className="block mb-2 font-semibold text-purple-800">
              Excerpt
            </label>
            <input
              type="text"
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              required
              className="w-full p-3 border border-purple-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold text-purple-800">
              Category
            </label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full p-3 border border-purple-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
            />
          </div>
          <button
            type="submit"
            className="bg-purple-700 text-white px-6 py-3 rounded-md hover:bg-purple-800 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
          >
            Create Blog
          </button>
        </form>
      </div>
    </div>
  );
}