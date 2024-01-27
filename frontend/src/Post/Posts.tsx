import { Button } from "@mui/material";
import { useState } from "react";
import { CreatePostModal } from "./CreatePostModal";
import React from "react";
import { getConnectedUser } from "./PostService";
import { EditPostModal } from "./EditPostModal";
import { DeletePostModal } from "./DeletePostModal";

export type CreatePostDetails =  {
    title: string;
    content: string;
    phoneNumber: string;
    image: string;
    category: string;
  };

// TODO: use the real post id and remove this func
export const getPostDetailsMock = () => {
    return { post_id: "65b50a593728b5f851e68e53", 
              user_id: "65b4cc6fd5c541695cb7a7e4",
              details: {title: 'My title',
                content: 'This is a contant4444',
                phoneNumber: '0525381648',
                image: 'path to image',
                category: 'Elderly'
            } as CreatePostDetails
        };
}

export const Posts = () => {

    const [open, setOpen] = useState<string | null>(null);
    
	return (
        <div>

		<div className="p-4">
			<Button onClick={() => setOpen('create')}>Create post</Button>
			<CreatePostModal open={open === 'create'} onClose={() => setOpen(null)} />
		</div>
        { 
        // TODO: Add the specific post_creator_user_id + post_details + post_id 
        getConnectedUser().id === getPostDetailsMock().user_id ?
            (<div>
            <div className="p-4">
                <Button onClick={() => setOpen('update')}>Edit post</Button>
                <EditPostModal open={open === 'update'} onClose={() => setOpen(null)} postDetails={getPostDetailsMock().details} postId={getPostDetailsMock().post_id}/>
            </div>
            <div className="p-4">
                <Button onClick={() => setOpen('delete')}>Delete post</Button>
                <DeletePostModal open={open === 'delete'} onClose={() => setOpen(null)} postId={getPostDetailsMock().post_id}/>
            </div>
            </div>
            ) 
            : 
            (<div/>)
        }

        </div>
	);
};
