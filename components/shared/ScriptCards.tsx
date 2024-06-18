import React from "react";
import { Field } from "../constants/fields";
import { FiClipboard } from "react-icons/fi";
import { LuRefreshCcw } from "react-icons/lu";

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
	return (
		<div
			className="py-2 px-4 border border-neutral border-solid rounded-lg mb-4 "
			key={item.key}>
			<div className="flex w-full justify-between mb-2">
				<p className="font-medium">{item.title}</p>
				{withContent && (
					<div className="flex gap-2">
						<button>
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
