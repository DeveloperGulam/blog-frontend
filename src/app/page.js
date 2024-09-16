import { gql } from '@apollo/client';
import client from '../lib/apolloClient';
import Image from 'next/image';
import Link from 'next/link';
import CategoryFilter from '@/components/CategoryFilter';
import BlogList from '@/components/blog/BlogList';

const POSTS_PER_PAGE = 5;

const GET_BLOGS_AND_CATEGORIES = gql`
  query GetBlogsAndCategories($offset: Int!, $limit: Int!) {
    blogs(offset: $offset, limit: $limit) {
      id
      featureImage
      content
      excerpt
      category
      createdAt
    }
    categories {
      name
    }
  }
`;

async function getBlogsAndCategories(page) {
  const offset = (page - 1) * POSTS_PER_PAGE;
  
  const { data, loading, error } = await client.query({
    query: GET_BLOGS_AND_CATEGORIES,
    variables: { offset, limit: POSTS_PER_PAGE },
    fetchPolicy: 'network-only',
  });

  if (error) throw new Error(error.message);
  
  return {
    blogs: data.blogs,
    categories: data.categories
  };
}

export default async function Home({ searchParams }) {
  const page = parseInt(searchParams.page) || 1;
  const category = searchParams.category || '';
  const { blogs, categories } = await getBlogsAndCategories(page);

  return (
    <div className="container mx-auto p-4 xl:w-7/12">
      <h1 className="text-4xl font-bold mb-6 text-center mt-10">Blog List</h1>
      
      {/* Category Filter */}
      <div className='flex justify-end'>
        <CategoryFilter categories={categories} selectedCategory={category} />
      </div>

      {/* Blog List */}
      <div className="grid grid-cols-1 gap-6">
        {blogs.map((blog) => (
          <BlogList blog={blog} />
        ))}
      </div>
      
      {/* Pagination Controls */}
      <div className="flex justify-center mt-8">
        <Link href={`/?page=${page - 1}${category ? `&category=${category}` : ''}`}>
          <p className={`mx-2 px-4 py-2 border ${page === 1 ? 'text-gray-400 cursor-not-allowed' : 'border-purple-800 text-purple-800 hover:bg-purple-800 hover:text-white'} rounded-md`}>
            Previous
          </p>
        </Link>
        <Link href={`/?page=${page + 1}${category ? `&category=${category}` : ''}`}>
          <p className="mx-2 px-4 py-2 border border-purple-800 text-purple-800 hover:bg-purple-800 hover:text-white rounded-md">Next</p>
        </Link>
      </div>
    </div>
  );
}