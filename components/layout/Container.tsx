"use client";
import React from "react";
import { LoadingProvider } from "../providers/LoadingProvider";
import UserInput from "./UserInput";
import Header from "./header/Header";
import Toast from "../shared/Toast";

const Container = ({ children }: { children: React.ReactNode }) => {
	return (
		<LoadingProvider>
			<Header />
			<>
				<UserInput />
				{children}
			</>

			<Toast message="Pitch script updated" />
		</LoadingProvider>
	);
};

export default Container;
