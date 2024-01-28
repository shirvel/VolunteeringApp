import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, CardMedia, Typography, Button, Dialog } from '@mui/material';

interface IViewPostsProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

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
interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
}


const ViewPosts: React.FC<IViewPostsProps> = ({ isSidebarOpen, toggleSidebar }) => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [location, setLocation] = useState('Ashdod'); // Initialize with a default location
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);


  const [open, setOpen] = useState(false);

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
    async function getweather(city: string) {
      try {
        const apiKey = "c4b0c9fa960f9b84cd0964869bca6f3c";
        const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        if (response.ok) {
          const data = await response.json();
          setWeatherData(data);
        } else {
          setWeatherData(null); // Clear weather data if API call fails
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchPosts();
    fetchCategories();
    getweather("Ashdod"); //mock 
  }, []);

  const filterPostsByCategory = (category: string) => {
    // Implement filtering logic here based on the selected category
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={toggleSidebar}>
        {isSidebarOpen ? 'Close Sidebar' : 'Open Sidebar'}
      </Button>
      <Dialog onClose={handleClose} open={open}>
        {/* Your dialog content here */}
      </Dialog>
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
        <div className="weather">
          {weatherData ? (
            <>
              <h2 className="city">{weatherData.name}</h2>
              <h1 className="temp">{Math.round(weatherData.main.temp)}°C</h1>
              <div className="details">
                <div className="col">
                  <p className="humidity">{weatherData.main.humidity}%</p>
                    <p>Humidity</p>
                </div>
              <div className="col">
                <p className="wind">{weatherData.wind.speed} km/h</p>
                <p>Wind Speed</p>
              </div>
            </div>
          </>
        ) : (
          <p>Loading weather data...</p>
        )}
      </div>
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
    </div>
  );
};

export default ViewPosts;
