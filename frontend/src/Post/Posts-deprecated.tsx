import { Button } from "@mui/material";
import { useState } from "react";
import { CreatePostModal } from "./CreatePostModal";
import React from "react";
import { getConnectedUser } from "./PostService";
import { EditPostModal } from "./EditPostModal";
import { DeletePostModal } from "./DeletePostModal";

export type CreatePostDetails = {
	title: string;
	content: string;
	phoneNumber: string;
	image: string | null;
	category: string;
};

// TODO: use the real post id and remove this func
export const getPostDetailsMock = () => {
    return { post_id: "65b6adc90d8a9bb172743b89", 
              user_id: "65b6ad960d8a9bb172743b85",
              details: {title: 'oo post',
                content: 'This is a content',
                phoneNumber: '54354',
                image: 'lk',
                category: 'Community'
            } as CreatePostDetails
        };
}

export const Posts = () => {
	const [open, setOpen] = useState<string | null>(null);

	return (
		<div>
			<div className="p-4">
				<Button onClick={() => setOpen("create")}>Create post</Button>
				<CreatePostModal
					open={open === "create"}
					onClose={() => setOpen(null)}
				/>
			</div>
			{
				// TODO: Add the specific post_creator_user_id + post_details + post_id
				getConnectedUser().id === getPostDetailsMock().user_id ? (
					<div>
						<div className="p-4">
							<Button onClick={() => setOpen("update")}>Edit post</Button>
							<EditPostModal
								open={open === "update"}
								onClose={() => setOpen(null)}
								postDetails={getPostDetailsMock().details}
								postId={getPostDetailsMock().post_id}
							/>
						</div>
						<div className="p-4">
							<Button onClick={() => setOpen("delete")}>Delete post</Button>
							<DeletePostModal
								open={open === "delete"}
								onClose={() => setOpen(null)}
								postId={getPostDetailsMock().post_id}
							/>
						</div>
					</div>
				) : (
					<div />
				)
			}
		</div>
	);
};
