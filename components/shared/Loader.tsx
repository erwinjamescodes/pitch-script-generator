"use client";
import { useEffect, useState } from "react";

export const Loader = () => {
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			if (progress < 3000) {
				setProgress((prevProgress) => prevProgress + 1);
			}
		}, 500);

		return () => clearInterval(interval);
	}, [progress]);

	return (
		<div className="w-full h-[calc(100vh-70px)] bg-white absolute top-0 right-1 opacity-90 backdrop-filter backdrop-blur-lg flex items-center justify-center flex-col">
			<p className="text-primary font-medium text-[22px] ">
				Generating your pitch script...
			</p>
			<p className="text-primary font-medium text-[22px] ">
				This may take a few seconds.
			</p>
			<div className="mt-8 w-[70%] h-5 bg-slate-100 rounded-xl overflow-hidden ">
				<div
					className="loading-bar h-full rounded-xl"
					style={{ width: `${progress}%` }}></div>
			</div>
		</div>
	);
};
