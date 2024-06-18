import React from "react";
import DesktopHeader from "./Desktop";
import MobileHeader from "./Mobile";

const Header = () => {
	return (
		<div className="fixed top-0 bg-white z-50">
			<div className="hidden md:block">
				<DesktopHeader />
			</div>
			<div className="block md:hidden">
				<MobileHeader />
			</div>
		</div>
	);
};

export default Header;
