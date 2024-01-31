import React, { useCallback, useEffect, useState } from "react";
import { Category, getAllCategories } from "./chatService";
import { Button } from "@mui/material";
import { createSearchParams, useSearchParams } from "react-router-dom";
import { GroupChat } from "./GroupChat";

export const ChatPage = () => {
	const [categories, setCategories] = useState<Category[]>([]);
	let [searchParams, setSearchParams] = useSearchParams();

	const onClickCategory = useCallback((category: string) => {
		const params = { category };
		setSearchParams(createSearchParams(params));
	}, []);

	useEffect(() => {
		const getCategories = async () => {
			const response = await getAllCategories();
			setCategories(response);
			onClickCategory(response[0].name);
		};
		getCategories();
	}, []);

	return (
		<div className="w-full">
			<div className="flex items-center">
				{categories.map((category, index) => (
					<div className="p-4" key={index}>
						<Button
							color="secondary"
							variant={
								category.name === searchParams.get("category")
									? "contained"
									: "outlined"
							}
							onClick={() => onClickCategory(category.name)}>
							{category.name}
						</Button>
					</div>
				))}
			</div>
			<div className="p-4 w-full">
				<GroupChat />
			</div>
		</div>
	);
};
