import React from "react";
import { Field } from "../constants/fields";
import { FiClipboard } from "react-icons/fi";
import { LuRefreshCcw } from "react-icons/lu";
import { convertFieldsToMarkdown } from "../utils/convertJsonToMarkdown";

interface ScriptCardsProps {
	item: Field;
	withContent: boolean;
	content?: string;
}

const ScriptCards: React.FC<ScriptCardsProps> = ({
	item,
	withContent,
	content,
}) => {
	const handleCopyFieldToClipboard = () => {
		if (item && content) {
			const copyText = convertFieldsToMarkdown(item.title, content);
			navigator.clipboard
				.writeText(copyText)
				.then(() => {
					alert(`${item.title} copied to clipboard`);
				})
				.catch((err) => {
					console.error("Failed to copy: ", err);
				});
		}
	};
	return (
		<div
			className="py-2 px-4 border border-neutral border-solid rounded-lg mb-4 "
			key={item.key}>
			<div className="flex w-full justify-between mb-2">
				<p className="font-medium">{item.title}</p>
				{withContent && (
					<div className="flex gap-2">
						<button onClick={() => handleCopyFieldToClipboard()}>
							<FiClipboard className="txt-xs" />
						</button>
						<button>
							<LuRefreshCcw className="txt-xs" />
						</button>
					</div>
				)}
			</div>
			{withContent && <p className="font-light">{content}</p>}
		</div>
	);
};

export default ScriptCards;
