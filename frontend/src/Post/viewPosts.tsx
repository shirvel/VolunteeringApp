import React, { useEffect, useState, useCallback } from "react";
import { Box, Button } from "@mui/material";
import { getallposts, fetchWeatherForPost, gettAllPostsByUser, getConnectedUser } from "./PostService";
import { IPost, Post } from "./Post";
import { Category, getAllCategories } from "../chat/chatService";
import { endpoints } from "../api/endpoints";
import { renderWeatherIcon } from './weather';
import { CreatePostModal } from "./CreatePostModal"; // Import the CreatePostModal component
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useNavigate } from "react-router";
import { createSearchParams } from "react-router-dom";
import { post } from "api/requests";


interface IViewPostsProps {
	isSidebarOpen: boolean;
	toggleSidebar: () => void;
}


const ViewPosts: React.FC<IViewPostsProps> = () => {
	const [posts, setPosts] = useState<IPost[]>([]);
	const [categories, setCategories] = useState<Category[]>([]);
	const [weatherData, setWeatherData] = useState<any[]>([]); // Store weather data for each post
	const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
	const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);

	const navigate = useNavigate();
	const userDetails = getConnectedUser();

	const moveToUserPostPage = () => {
		if  (userDetails.id !== null) {
			console.log(userDetails.id);
			const queryParams = createSearchParams({ userId: userDetails.id });
			navigate({
				pathname: "/my-posts",
				search: `?userId=${userDetails.id}`,
			});
		}
		else{
			console.error("User ID is null. Unable to navigate.");
		}
	  };
	
	
	useEffect(() => {
		async function fetchPosts() {
			try {
				const fetchedPosts = await getallposts();
				if (fetchedPosts) {
					setPosts(fetchedPosts);
				} 
			} catch (error) {
				console.error(error);
			}
		}
		const getCategories = async () => {
			const response = await getAllCategories();
			setCategories(response);
		};

		getCategories();
		fetchPosts();
	}, []);

	const handleOpenCreatePostModal = () => {
		setIsCreatePostModalOpen(true);
	  };
	  const addNewPost = (newPost: IPost) => {
		setPosts((prevPosts) => [...prevPosts, newPost]);
	  };

	  const filterPostsByCategory = (categoryName: string) => {
		setSelectedCategory(categoryName);
	  };
	const filteredPosts = selectedCategory
		? posts.filter((post) => post.category === selectedCategory)
		: posts;

	return (
		<div className="overflow-y-scroll h-screen w-full">
			<div
        style={{
          position: "absolute",
          top: 10, 
          right: 32, 
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenCreatePostModal}
		  sx={{
			backgroundColor: "white",
			color: "blue",
		  }}
        >
          < AddCircleOutlineIcon />
        </Button>
      </div>
			<CreatePostModal
  				open={isCreatePostModalOpen}
  				onClose={() => setIsCreatePostModalOpen(false)}
				addNewPost={addNewPost}
			/>
		<Button onClick={() => moveToUserPostPage()}
		sx={{
			fontSize: '1.25rem', // Increase the font size
			fontWeight: 'bold',  // Make the text bold
			backgroundColor: 'white', // Change the background color
			color: 'blue',       // Change the text color
			padding: '12px 24px', // Increase the padding
			borderRadius: '8px',  // Add rounded corners
			'&:hover': {
			  backgroundColor: 'darkblue', // Change the background color on hover
			},
		  }}
		>
		  My Posts
		</Button>
        <Box p={2} bgcolor="none">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                {categories.map((category, index) => (
                    <Button
                        key={index}
                        variant="outlined"
                        onClick={() => filterPostsByCategory(category.name)}
                        sx={{
                			fontSize: '1rem',
                			fontWeight: 'bold',
                			backgroundColor: 'white',
                			color: 'blue',
                			padding: '12px 24px',
                			borderRadius: '8px',
                			'&:hover': {
                  				backgroundColor: 'darkblue',
                			},
             			 }}
           			 >
              		{category.name}
            	</Button>
          		))}
        	</Box>
			  {filteredPosts.map((post, index) => (
				  <div key={index}>
					  <Post weatherData={weatherData[index]} post={post} />
				  </div> 
			  ))}
		  </Box>
	  </div>
  );
};


export default ViewPosts;