"use client";
import UserInput from "../components/main/UserInput";
import Placeholders from "../components/main/Placeholders";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
	const [generatedScript, setGeneratedScript] = useState(null);
	const [isGenerating, setIsGenerating] = useState(false);
	const router = useRouter();

	const handleSubmit = async (formData: FormData) => {
		setIsGenerating(true);
		try {
			const response = await axios.post("/api/generate-pitch", formData, {
				headers: {
					"Content-Type": "application/json",
				},
			});

			const { scriptURL } = response.data;

			// Redirect to a new URL with s3Url as a query parameter
			router.push(`/?key=${scriptURL}`);

			const data = await response.data;
			setGeneratedScript(data.pitchScript.choices[0].text);
		} catch (error) {
			console.error("Error submitting form:", error);
		}
		setIsGenerating(false);
	};
	return (
		<main className="flex text-primary">
			<UserInput
				onSubmit={handleSubmit}
				isGenerating={isGenerating}
			/>
			<Placeholders
				generatedScript={generatedScript}
				isGenerating={isGenerating}
				setIsGenerating={setIsGenerating}
			/>
		</main>
	);
}
