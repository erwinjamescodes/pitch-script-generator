"use client";

import { FiClipboard } from "react-icons/fi";

const CopyToClipboard = () => {
	return (
		<button
			onClick={() => console.log("Copy")}
			className="text-white font-[14px] bg-primary rounded-md flex items-center justify-center gap-2 h-9 px-4">
			Copy to Clipboard{" "}
			<span>
				<FiClipboard />
			</span>
		</button>
	);
};

export default CopyToClipboard;
