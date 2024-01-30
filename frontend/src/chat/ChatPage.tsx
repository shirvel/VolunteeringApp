import React, { useCallback, useEffect, useState } from "react";
import { getAllCategories } from "./chatService";
import { Button } from "@mui/material";
import { createSearchParams, useSearchParams } from "react-router-dom";
import { GroupChat } from "./GroupChat";

export const ChatPage = () => {
	const [categories, setCategories] = useState<string[]>([]);
	let [searchParams, setSearchParams] = useSearchParams();

	const onClickCategory = useCallback((category: string) => {
		const params = { category };
		setSearchParams(createSearchParams(params));
	}, []);

	useEffect(() => {
		const getCategories = async () => {
			const response = await getAllCategories();
			setCategories(response);
		};
		getCategories();
	}, [searchParams]);

	return (
		<div>
			<div className="flex items-center">
				{categories.map((category, index) => (
					<div className="p-4">
						<Button
							color="secondary"
							key={index}
							variant={
								category === searchParams.get("category")
									? "contained"
									: "outlined"
							}
							onClick={() => onClickCategory(category)}>
							{category}
						</Button>
					</div>
				))}
			</div>
			<div className="p-4">
				<GroupChat />
			</div>
		</div>
	);
};
