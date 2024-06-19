import { useEffect, useContext } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { ScriptProviderContext } from "../providers/ScriptProvider";

const Toast = () => {
	const { scriptState, scriptDispatch } = useContext(ScriptProviderContext);
	const { toastVisible, toastMessage } = scriptState;

	const closeToast = () => {
		scriptDispatch({
			type: "SET_HIDE_TOAST",
		});
	};

	useEffect(() => {
		const timer = setTimeout(() => {
			closeToast();
		}, 3000);

		return () => clearTimeout(timer);
	}, [toastVisible]);

	return (
		<div
			className={`fixed bottom-2 inset-x-0 flex justify-center mb-4 fade-out ${
				toastVisible ? "animate-toast-pop-up" : "hidden"
			}`}>
			<div className="bg-white text-primary px-8 py-4 rounded-lg flex items-center space-x-4 shadow-2xl border border-solid border-gray-200">
				<span>
					<FaCheckCircle className="text-xl text-[#F4C8DB] " />
				</span>
				<span>{toastMessage}</span>
				<button
					onClick={() => closeToast()}
					className="text-gray-400 hover:text-white text-2xl">
					&times;
				</button>
			</div>
		</div>
	);
};

export default Toast;
