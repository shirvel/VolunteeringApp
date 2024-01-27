import { Button } from "@mui/material";
import { useState } from "react";
import { CreatePostModal } from "./CreatePostModal";
import React from "react";

export type CreatePostDetails =  {
    title: string;
    content: string;
    phoneNumber: string;
    image: string;
    category: string;
  };

export const Posts = () => {
	const [open, setOpen] = useState(false);
	return (
		<div className="p-4">
			<Button onClick={() => setOpen(true)}>Create post</Button>
			<CreatePostModal open={open} onClose={() => setOpen(false)} />
		</div>
	);
};
