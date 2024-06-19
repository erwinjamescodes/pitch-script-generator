import { FromPDFProps } from "@/app/page";
import React, { createContext, useReducer, ReactNode, Dispatch } from "react";

interface State {
	isLoading: boolean;
	displayScript: FromPDFProps | null;
	toastVisible: boolean;
	toastMessage: string;
}

interface Action {
	type: string;
	payload?: any;
}

const initialState: State = {
	isLoading: false,
	displayScript: null,
	toastVisible: false,
	toastMessage: "Pitch script generated",
};

interface ContextType {
	loadingState: State;
	loadingDispatch: Dispatch<Action>;
}

export const LoadingProviderContext = createContext<ContextType>({
	loadingState: initialState,
	loadingDispatch: () => {},
});

const reducer = (state: State, action: Action) => {
	console.log("action", action);
	switch (action.type) {
		case "SET_START_LOADING":
			return { ...state, isLoading: true, toastVisible: false };
		case "SET_FINISH_LOADING":
			return { ...state, isLoading: false, toastVisible: false };
		case "SET_DISPLAY_SCRIPT":
			return { ...state, displayScript: action.payload, toastVisible: false };
		case "SET_SHOW_TOAST":
			console.log("STATE", state);
			return { ...state, toastVisible: true, toastMessage: action.payload };
		case "SET_HIDE_TOAST":
			return { ...state, toastVisible: false };
		default:
			return state;
	}
};

interface LoadingProviderProps {
	children: ReactNode;
}

export const LoadingProvider = ({ children }: LoadingProviderProps) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<LoadingProviderContext.Provider
			value={{
				loadingState: state,
				loadingDispatch: dispatch,
			}}>
			{children}
		</LoadingProviderContext.Provider>
	);
};
