import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Card, CardMedia, CardContent, Typography, Button } from "@mui/material";
import { gettAllPostsByUser, deletePost } from "../Post/PostService";
import { IPost } from "./Post";
import { getConnectedUser } from "./PostService";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import { EditPostModal } from "./EditPostModal"; // Import EditPostModal
import { DeletePostModal } from "./DeletePostModal"; // Import DeletePostModal

export const AllUserPosts = () => {
  const [searchParams] = useSearchParams();
  const [posts, setPosts] = useState<IPost[]>([]);
  const connectedUser = getConnectedUser();
  const [openEditModal, setOpenEditModal] = useState(false); // State for EditPostModal
  const [openDeleteModal, setOpenDeleteModal] = useState(false); // State for DeletePostModal
  const [selectedPost, setSelectedPost] = useState<IPost | null>(null); // State to store selected post for editing
  const [editedContent, setEditedContent] = useState<string | null>(null);

  useEffect(() => {
    const userId = searchParams.get("userId");

    const loadAllPosts = async () => {
      if (userId) {
        const response = await gettAllPostsByUser(userId);
        setPosts(response);
      }
    };

    loadAllPosts();
  }, [searchParams]);
  
  const handleOpenDeleteModal = () => {
		setOpenDeleteModal(true);
	  };
  const handleDeletePost = async (postId: string) => {
    try {
      await deletePost(postId);
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
    } catch (error) {
      console.error("Error deleting the post:", error);
    }
  };

  const handleEditPost = (post: IPost) => {
    setSelectedPost(post);
    setOpenEditModal(true);
  };

  const canEditOrDelete = (post: IPost) => {
    return connectedUser && post.user_id === connectedUser.id;
  };

  return (
    <>
      {posts.length !== 0 ? (
        <div>
          <h2>Posts by User</h2>
          {posts.map((post) => (
            <Card key={post._id} style={{ marginBottom: "16px" }}>
              <CardMedia
                component="img"
                sx={{ width: 200, objectFit: "cover" }}
                image={post.image}
                alt={post.title}
              />
              <CardContent>
                <Typography variant="h5">{post.title}</Typography>
                <Typography variant="body1">{post.content}</Typography>
                <Typography variant="body2">
                  Location: {post.location}
                </Typography>
                <Typography variant="body1">
                  Likes: {post.likes}
                </Typography>
                <Typography variant="body1">
                  DisLikes: {post.dislikes}
                </Typography>
               {canEditOrDelete(post)  && (
          // Render the edit and delete buttons only if the connected user is the post creator
          <div>
            <Button
  				variant="outlined"
  				color="primary"
  				onClick={() => handleEditPost(post)}
  				style={{
    				marginBottom: "8px",
    				backgroundColor: "transparent",
    				color: "blue",
    				justifyContent: "flex-end",
    				display: "flex",
    				alignItems: "center",
  				}}
			>
  			<ModeEditIcon style={{ marginRight: "4px" }} />
		</Button>
	<Button
  		variant="outlined"
  		color="secondary"
  		onClick={handleOpenDeleteModal}
  		style={{
    		backgroundColor: "transparent",
    		color: "red",
    		justifyContent: "flex-end",
    		display: "flex",
    		alignItems: "center",
  		}}
	>
  <DeleteIcon style={{ marginRight: "4px" }} />
	</Button>
	</div>
        )}
        <DeletePostModal
          open={openDeleteModal}
          onClose={() => setOpenDeleteModal(false)}
          postId={post._id}
          onDelete={(deletedPostId: string) => handleDeletePost(deletedPostId)}
        />
        <EditPostModal
          open={openEditModal}
          onClose={() => {
            setOpenEditModal(false);
            setEditedContent(null); // Clear edited content when modal is closed
          }}
          postId={post._id}
          content={editedContent || ""}
          onContentChange={setEditedContent} // Callback to update edited content
        />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div>This user has no posts yet</div>
      )}
    </>
  );
};
