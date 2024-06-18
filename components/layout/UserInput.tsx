"use client";
import React, { ChangeEvent, useContext, useState } from "react";
import { FiUpload } from "react-icons/fi";
import { BsStars } from "react-icons/bs";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { LoadingProviderContext } from "../providers/LoadingProvider";

type FormData = {
	userPitch: string;
	pitchDeck: string | null;
	pitchLength: number;
	additionalInstructions: string;
};

const UserInput = () => {
	const [formData, setFormData] = useState<FormData>({
		userPitch: "",
		pitchDeck: null,
		pitchLength: 3,
		additionalInstructions: "",
	});
	const [isUploading, setIsUploading] = useState(false);
	const [isGenerating, setIsGenerating] = useState(false);

	const { loadingState, loadingDispatch } = useContext(LoadingProviderContext);
	const { isLoading } = loadingState;
	console.log("LOADING STATE", loadingState);

	const router = useRouter();
	const pathname = usePathname();
	const isHome = pathname === "/";

	const handleSubmit = async (formData: FormData) => {
		loadingDispatch({ type: "SET_START_LOADING" });
		try {
			const response = await axios.post("/api/generate-pitch", formData, {
				headers: {
					"Content-Type": "application/json",
				},
			});

			const { scriptURL } = response.data;

			// Redirect to a new URL with s3Url as a query parameter
			router.push(`/scripts/${scriptURL}`);
		} catch (error) {
			console.error("Error submitting form:", error);
		}

		loadingDispatch({ type: "SET_FINISH_LOADING" });
	};

	const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
		setIsUploading(true);
		const file = event.target.files?.[0];
		if (!file) return;

		try {
			// Get the pre-signed URL from the backend so the frontend can securely upload to Amazon S3 without exposing secret access key and id
			const response = await axios.post("/api/upload", {
				fileName: file.name,
				fileType: file.type,
			});

			const { uploadURL } = response.data;

			// Upload the file to S3 using the retrieved pre-signed URL
			await axios.put(uploadURL, file, {
				headers: {
					"Content-Type": file.type,
				},
			});

			setFormData({
				...formData,
				pitchDeck: file.name,
			});

			console.log("File uploaded successfully");
		} catch (error) {
			console.error("Error uploading file:", error);
		}
		setIsUploading(false);
	};

	const handleInputChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value, files } = e.target as HTMLInputElement;
		setFormData({
			...formData,
			[name]: files ? files[0] : value,
		});
	};

	const increasePitchLength = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		if (formData.pitchLength < 10) {
			setFormData({
				...formData,
				pitchLength: formData.pitchLength + 1,
			});
		}
	};

	const decreasePitchLength = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		if (formData.pitchLength > 1) {
			setFormData({
				...formData,
				pitchLength: formData.pitchLength - 1,
			});
		}
	};

	const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			await handleSubmit(formData);
		} catch (error) {
			console.error("Error handling form submit:", error);
		}
	};

	return (
		<div
			className={`w-full md:w-1/2 p-6 md:bg-[#F8F8F8] md:fixed h-[calc(100vh-70px)] ${
				isHome ? "mt-8 md:mt-[70px]" : ""
			}`}>
			<form onSubmit={handleSubmitForm}>
				<h2 className="text-primary font-semibold text-xl mb-4 hidden md:block">
					Preferences
				</h2>

				{/* User pitch */}
				<div className="mb-4">
					<label
						htmlFor="userPitch"
						className="block mb-2">
						What would you like to pitch about?
					</label>
					<textarea
						id="userPitch"
						name="userPitch"
						value={formData.userPitch}
						onChange={handleInputChange}
						placeholder="Ask Fornax AI to generate a pitch script based on your prompt"
						className="w-full h-40 p-4 border border-neutral rounded-md resize-none"
					/>
				</div>

				{/* File Upload */}
				<div className="mb-4">
					<label
						onClick={(event) => event.preventDefault()}
						htmlFor="pitchDeck"
						className="block font-medium">
						Or upload a pitch deck{" "}
						<span className="block md:inline-block">
							(Accepts PDF files up to 10MB)
						</span>
					</label>

					<div className="flex w-full justify-between items-center gap-3">
						<p className="flex-grow bg-white rounded-md border border-neutral px-4 py-2 text-gray-400">
							{formData.pitchDeck ? formData.pitchDeck : "No file chosen"}
						</p>
						<div className="flex items-center">
							<label
								htmlFor="pitchDeck"
								className="flex items-center bg-primary text-white rounded-md px-4 py-2 gap-2 cursor-pointer">
								{!isUploading ? (
									<>
										Upload File
										<span>
											<FiUpload />
										</span>
									</>
								) : (
									<>
										Uploading File
										<span>
											<FiUpload />
										</span>
									</>
								)}
							</label>
							<input
								type="file"
								id="pitchDeck"
								name="pitchDeck"
								className="hidden"
								accept=".pdf"
								onChange={(event) => {
									handleFileUpload(event);
								}}
							/>
						</div>
					</div>
				</div>

				{/* Select Length */}
				<div className="my-8 flex justify-between items-center">
					<label
						htmlFor="pitchLength"
						className="block font-medium  ">
						Pitch length in minutes (Recommended: 3-5 minutes)
					</label>
					<div className="flex gap-2">
						<button
							onClick={decreasePitchLength}
							className="h-10 w-10 bg-white rounded-md border border-neutral border-solid text-2xl">
							-
						</button>
						<div className="h-10 w-10 bg-white rounded-md border border-neutral border-solid flex items-center justify-center">
							{formData.pitchLength}
						</div>
						<button
							onClick={increasePitchLength}
							className="h-10 w-10 bg-white rounded-md border border-neutral border-solid text-2xl">
							+
						</button>
					</div>
				</div>

				{/* Optional Additional Preferences */}
				<div className="mb-4">
					<label
						htmlFor="additionalInstructions"
						className="block font-medium ">
						Additional instructions or specifications
					</label>
					<textarea
						id="additionalInstructions"
						name="additionalInstructions"
						placeholder="Enter your preferences on tone or structure"
						value={formData.additionalInstructions}
						onChange={handleInputChange}
						className="w-full p-4 border border-neutral rounded-md resize-none"
					/>
				</div>

				{/* Submit Button */}
				<div className="w-full flex justify-center mt-10 md:mt-24">
					<button
						type="submit"
						className="flex items-center justify-center text-xl bg-primary text-white rounded-lg px-8 py-4 gap-2 cursor-pointer w-full md:w-auto">
						{isGenerating ? "Generating Script..." : "Generate Script"}
						<span>
							<BsStars />
						</span>
					</button>
				</div>
			</form>
			{isLoading && (
				<div className="block md:hidden">
					<div className="w-full h-screen bg-white fixed top-0 right-0 z-50 backdrop-filter backdrop-blur-lg flex items-center justify-center flex-col ">
						<p className="absolute top-16 text-xl">Generating script</p>
						<div>
							<p className="text-primary font-medium text-[22px] ">
								Generating your pitch script...
							</p>
							<p className="text-primary font-medium text-[22px] ">
								This may take a few seconds.
							</p>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default UserInput;
