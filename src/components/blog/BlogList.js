import Image from "next/image";
import Link from "next/link";
import { Calendar } from "lucide-react";
import { format, parseISO } from 'date-fns';

const defaultImage = "/assets/gallary-image.png";

export default function BlogList({ blog }) {
  const formattedDate = blog?.createdAt ? format(parseISO(blog.createdAt), 'dd MMM yyyy, EEEE') : '';
  const blogImage = defaultImage;

  return (
    <div className="flex bg-white rounded-lg shadow-md overflow-hidden">
      <div className="w-1/3">
        <Image
          src={blogImage}
          alt="Feature Image"
          width={300}
          height={200}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="w-2/3 p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center text-red-500 font-semibold mb-4">
            <Calendar size={16} className="mr-2" />
            <span className="text-sm text-gray-500">{formattedDate}</span>
          </div>

          <h2 className="text-md text-gray-600 font-bold mb-4">{blog?.excerpt}</h2>
          <div className="flex items-center mb-4">
            <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-sm">
              {blog?.category}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">By: <span className="text-purple-800">Admin</span></span>
          <Link href={`/blog/${blog?.id}`}>
            <span className="text-purple-800 hover:underline text-sm font-medium">
              Read Now
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
