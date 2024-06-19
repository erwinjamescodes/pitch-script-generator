"use client";
import React from "react";
import { ScriptProvider } from "../providers/ScriptProvider";
import UserInput from "./UserInput";
import Header from "./header/Header";
import Toast from "../shared/Toast";

const Container = ({ children }: { children: React.ReactNode }) => {
	return (
		<ScriptProvider>
			<Header />
			<>
				<UserInput />
				{children}
			</>
			<Toast />
		</ScriptProvider>
	);
};

export default Container;
