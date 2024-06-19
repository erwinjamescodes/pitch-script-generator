"use client";
import { useContext } from "react";
import { GoLink } from "react-icons/go";
import { ScriptProviderContext } from "../providers/ScriptProvider";

const ShareButton = () => {
	const { scriptDispatch } = useContext(ScriptProviderContext);

	const handleShareClick = () => {
		const url = window.location.href;
		navigator.clipboard
			.writeText(url)
			.then(() => {
				scriptDispatch({
					type: "SET_SHOW_TOAST",
					payload: "Link copied to clipboard",
				});
			})
			.catch((err) => {
				console.error("Failed to copy: ", err);
			});
	};

	return (
		<button
			onClick={() => handleShareClick()}
			className="text-primary font-[14px] border border-solid border-neutral rounded-md flex items-center justify-center gap-2 h-9 px-4">
			Share
			<span>
				<GoLink className="text-primary text-[18px]" />
			</span>
		</button>
	);
};

export default ShareButton;
