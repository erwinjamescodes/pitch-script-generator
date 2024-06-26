import Image from "next/image";
import Logo from "../../../assets/fornax-logo.png";

const MobileHeader = () => {
	return (
		<div className="flex flex-col justify-between px-6 items-center w-screen bg-transparent">
			<Image
				src={Logo}
				alt="Description of my image"
				height={24}
				className="mt-12"
			/>
			<h1 className="text-[22px] font-[500] leading-[30px] text-primary mt-4">
				Pitch Script Generator
			</h1>
		</div>
	);
};

export default MobileHeader;
