"use client";
import { useContext } from "react";
import { FiClipboard } from "react-icons/fi";
import { LoadingProviderContext } from "../providers/LoadingProvider";
import { convertJsonToMarkdown } from "../utils/convertJsonToMarkdown";

const CopyToClipboard = () => {
	const { loadingDispatch, loadingState } = useContext(LoadingProviderContext);
	const { displayScript } = loadingState;

	const handleCopyToClipboardClick = () => {
		if (displayScript) {
			const copyText = convertJsonToMarkdown(displayScript);
			navigator.clipboard
				.writeText(copyText)
				.then(() => {
					loadingDispatch({
						type: "SET_SHOW_TOAST",
						payload: "Script copied to clipboard",
					});
				})
				.catch((err) => {
					console.error("Failed to copy: ", err);
				});
		}
	};

	return (
		<button
			onClick={() => handleCopyToClipboardClick()}
			className="text-white font-[14px] bg-primary rounded-md flex items-center justify-center gap-2 h-9 px-4">
			Copy to Clipboard{" "}
			<span>
				<FiClipboard />
			</span>
		</button>
	);
};

export default CopyToClipboard;
