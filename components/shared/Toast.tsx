import React, { useEffect, useContext } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { LoadingProviderContext } from "../providers/LoadingProvider";

interface ToastProps {
	message: string;
}

const Toast: React.FC<ToastProps> = () => {
	const { loadingState, loadingDispatch } = useContext(LoadingProviderContext);
	const { toastVisible, toastMessage } = loadingState;

	const closeToast = () => {
		loadingDispatch({
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
				toastVisible ? "" : "hidden"
			}`}>
			<div className="bg-white text-primary px-8 py-4 rounded-lg flex items-center space-x-4 shadow-2xl border border-solid border-gray-200">
				<span>
					<FaCheckCircle className="text-xl" />
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
