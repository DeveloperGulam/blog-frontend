import { gql } from '@apollo/client';
import client from '../../../lib/apolloClient';
import Image from 'next/image';

const defaultImage = "/assets/gallary-image.png";

const GET_BLOG = gql`
  query GetBlog($id: ID!) {
    blog(id: $id) {
      id
      featureImage
      content
      category
      createdAt
    }
  }
`;

async function getBlog(id) {
  const { data } = await client.query({
    query: GET_BLOG,
    variables: { id },
  });

  return data.blog;
}

export default async function BlogPost({ params }) {
  const blog = await getBlog(params.id);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">{blog.category}</h1>
      {blog.featureImage && (
        <Image src={blog.featureImage} alt="Feature Image" width={800} height={600} className="rounded-md" />
      )}
      <p className="mt-6 text-gray-800 leading-relaxed">{blog.content}</p>
      <p className="mt-4 text-gray-500">Published on: {new Date(blog.createdAt).toLocaleDateString()}</p>
    </div>
  );
}
