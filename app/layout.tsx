"use client";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/layout/header/Header";
import UserInput from "@/components/layout/UserInput";
import { LoadingProvider } from "@/components/providers/LoadingProvider";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
// 	title: "Pitch Script Generator",
// 	description: "Pitch Script Generator Application",
// };

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={`${inter.className} gradient-bg`}>
				<Header />
				<div>
					<LoadingProvider>
						<UserInput />
						{children}
					</LoadingProvider>
				</div>
			</body>
		</html>
	);
}
