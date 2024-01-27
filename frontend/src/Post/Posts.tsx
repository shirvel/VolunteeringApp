import { Button } from "@mui/material";
import { useState } from "react";
import { CreatePostModal } from "./CreatePostModal";
import React from "react";
import { getConnectedUser } from "./PostService";
import { EditPostModal } from "./EditPostModal";

export type CreatePostDetails =  {
    title: string;
    content: string;
    phoneNumber: string;
    image: string;
    category: string;
  };

// TODO: use the real post id and remove this func
export const getPostDetailsMock = () => {
    return { post_id: "65b4cce5d5c541695cb7a7e9", 
              user_id: "65b4cc6fd5c541695cb7a7e4",
              details: {title: 'gff',
                content: 'fdg',
                phoneNumber: '4654564',
                image: 'hjhgj',
                category: 'Community'
            } as CreatePostDetails
        };
}

export const Posts = () => {
	const [open, setOpen] = useState(false);
	return (
        <div>

		<div className="p-4">
			<Button onClick={() => setOpen(true)}>Create post</Button>
			<CreatePostModal open={open} onClose={() => setOpen(false)} />
		</div>
        { 
        // TODO: Add the specific post_creator_user_id + post_details + post_id 
        getConnectedUser().id === getPostDetailsMock().user_id ?
            (<div className="p-4">
                <Button onClick={() => setOpen(true)}>Edit post</Button>
                <EditPostModal open={open} onClose={() => setOpen(false)} postDetails={getPostDetailsMock().details} postId={getPostDetailsMock().post_id}/>
            </div>) 
            : 
            (<div/>)
        }

        </div>
	);
};
