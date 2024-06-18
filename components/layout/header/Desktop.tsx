import Image from "next/image";
import React from "react";
import Logo from "../../../assets/fornax-logo.png";
import ShareButton from "../../buttons/Share";
import CopyToClipboard from "../../buttons/CopyToClipboard";

const DesktopHeader = () => {
	return (
		<div className="flex justify-between h-[70px] px-6 items-center border border-solid border-neutral fixed z-50 w-full bg-white">
			<div className="flex items-center gap-4 h-[30px]">
				<Image
					src={Logo}
					alt="Description of my image"
					height={20}
				/>
				<h1 className="text-[22px] font-[500] leading-[30px] text-primary">
					Pitch Script Generator
				</h1>
			</div>
			<div className="flex gap-3">
				<ShareButton />
				<CopyToClipboard />
			</div>
		</div>
	);
};

export default DesktopHeader;
