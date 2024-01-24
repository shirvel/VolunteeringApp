import { Button } from "@mui/material";
import { useState } from "react";
import { EditUserDetailsModal } from "./EditUserDetailsModal";

export type UserDetails = { name: string; email: string };

export const EditUserDetails = () => {
	const [open, setOpen] = useState(false);
	return (
		<div className="p-4">
			<Button onClick={() => setOpen(true)}>Update</Button>
			<EditUserDetailsModal open={open} onClose={() => setOpen(false)} />
		</div>
	);
};
