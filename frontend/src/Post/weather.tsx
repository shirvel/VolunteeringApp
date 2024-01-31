import React from "react";
import CloudIcon from "@mui/icons-material/Cloud";
import ClearIcon from "@mui/icons-material/WbSunny";
import RainIcon from "@mui/icons-material/CloudQueue";
import DrizzleIcon from "@mui/icons-material/Grain";
import MistIcon from "@mui/icons-material/Opacity";

export const renderWeatherIcon = (weatherCondition: string) => {
	switch (weatherCondition) {
		case "Clouds":
			return <CloudIcon color="primary" />;
		case "Clear":
			return <ClearIcon color="primary" />;
		case "Rain":
			return <RainIcon color="primary" />;
		case "Drizzle":
			return <DrizzleIcon color="primary" />;
		case "Mist":
			return <MistIcon color="primary" />;
		default:
			return null;
	}
};
