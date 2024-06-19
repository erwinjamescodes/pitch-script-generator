"use client";
import { useContext } from "react";
import { FiClipboard } from "react-icons/fi";
import { ScriptProviderContext } from "../providers/ScriptProvider";
import { convertJsonToMarkdown } from "../utils/convertJsonToMarkdown";

const CopyToClipboard = () => {
	const { scriptDispatch, scriptState } = useContext(ScriptProviderContext);
	const { displayScript } = scriptState;

	const handleCopyToClipboardClick = () => {
		if (!displayScript) {
			scriptDispatch({
				type: "SET_SHOW_TOAST",
				payload: "Please generate a script first",
			});
			return;
		}
		if (displayScript) {
			const copyText = convertJsonToMarkdown(displayScript);
			navigator.clipboard
				.writeText(copyText)
				.then(() => {
					scriptDispatch({
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
