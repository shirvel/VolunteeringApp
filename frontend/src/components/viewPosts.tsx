import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, CardMedia, Typography, Button } from '@mui/material';

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
  const [categories, setCategories] = useState<string[]>([]);

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

    async function fetchCategories() {
      try {
        const response = await fetch('http://localhost:3000/categories');
        if (!response.ok) {
          throw new Error(`Failed to fetch categories. Status: ${response.status}`);
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchPosts();
    fetchCategories();
  }, []);

  const filterPostsByCategory = (category: string) => {
    // Implement filtering logic here based on the selected category
  };

  return (
    <Box p={2} bgcolor="lightgray">
      <Typography variant="h4" align="center" gutterBottom>
        View Posts
      </Typography>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Button
          variant="outlined"
          onClick={() => filterPostsByCategory('Cooking')}
        >
          Cooking
        </Button>
        <Button
          variant="outlined"
          onClick={() => filterPostsByCategory('Driving')}
        >
          Driving
        </Button>
      </Box>
      {posts.map((post) => (
        <Card key={post._id} sx={{ display: 'flex', flexDirection: 'column', marginBottom: 2 }}>
          <CardMedia
            component="img"
            sx={{ width: 200, objectFit: 'cover' }}
            image={post.image}
            alt={post.title}
          />
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {post.title}
            </Typography>
            <Typography variant="body1">{post.content}</Typography>
            <Typography variant="body2" color="textSecondary">
              Category: {post.category}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default ViewPosts;
