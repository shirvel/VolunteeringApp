import React, { useEffect, useState } from 'react';

// Define the IPost interface
interface IPost {
  _id: string;
  title: string;
  content: string;
  phoneNumber: string;
  image: string;
  category: string;
  likes: number;
  likedBy: string[];
  dislikes: number;
  dislikedBy: string[];
}

const ViewPosts: React.FC = () => {
  // Initialize the state variable for posts
  const [posts, setPosts] = useState<IPost[]>([]);

  // Fetch the posts when the component mounts
  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch('http://localhost:3000/posts'); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error(`Failed to fetch posts. Status: ${response.status}`);
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchPosts();
  }, []);

  return (
    <div>
      <h1>View Posts</h1>
      {posts.map((post) => (
        <div key={post._id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <p>Category: {post.category}</p>
          {/* Add more post details as needed */}
        </div>
      ))}
    </div>
  );
};

export default ViewPosts;
