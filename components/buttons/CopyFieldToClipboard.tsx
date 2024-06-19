"use client";
import React, { useContext } from "react";
import { FiClipboard } from "react-icons/fi";
import { convertFieldsToMarkdown } from "../utils/convertJsonToMarkdown";
import { ScriptProviderContext } from "../providers/ScriptProvider";

interface Props {
	title: string;
	content: string | undefined;
}

const CopyFieldToClipboard: React.FC<Props> = ({ title, content }) => {
	const { scriptDispatch } = useContext(ScriptProviderContext);
	const handleCopyFieldToClipboard = () => {
		if (title && content) {
			const copyText = convertFieldsToMarkdown(title, content);
			navigator.clipboard
				.writeText(copyText)
				.then(() => {
					scriptDispatch({
						type: "SET_SHOW_TOAST",
						payload: `${title} copied to clipboard`,
					});
				})
				.catch((err) => {
					console.error("Failed to copy: ", err);
				});
		}
	};

	return (
		<button onClick={handleCopyFieldToClipboard}>
			<FiClipboard className="txt-xs" />
		</button>
	);
};

export default CopyFieldToClipboard;
