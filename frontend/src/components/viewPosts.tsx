import React, { useEffect, useState } from 'react';

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
  
  const [posts, setPosts] = useState<IPost[]>([]);

  
  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch('http://localhost:3000/posts'); 
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
        </div>
      ))}
    </div>
  );
};

export default ViewPosts;
