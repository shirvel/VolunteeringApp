import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export const AllPostComments = () => {
	const [searchParams] = useSearchParams();

	useEffect(() => {}, []);
	return <div>comments for post: {searchParams.get("postId")}</div>;
};
