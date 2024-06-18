import React from "react";
import DesktopHeader from "./Desktop";
import MobileHeader from "./Mobile";

const Header = () => {
	return (
		<>
			<div className="hidden md:block">
				<DesktopHeader />
			</div>
			<div className="block md:hidden">
				<MobileHeader />
			</div>
		</>
	);
};

export default Header;
