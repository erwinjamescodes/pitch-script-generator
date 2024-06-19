import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Container from "@/components/layout/Container";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Pitch Script Generator",
	description: "Pitch Script Generator Application",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={`${inter.className} gradient-bg`}>
				<Container>{children}</Container>
			</body>
		</html>
	);
}
