"use client";
import { GoLink } from "react-icons/go";

const ShareButton = () => {
	return (
		<button
			onClick={() => console.log("Share")}
			className="text-primary font-[14px] border border-solid border-neutral rounded-md flex items-center justify-center gap-2 h-9 px-4">
			Share
			<span>
				<GoLink className="text-primary text-[18px]" />
			</span>
		</button>
	);
};

export default ShareButton;
