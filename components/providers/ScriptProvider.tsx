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
	scriptState: State;
	scriptDispatch: Dispatch<Action>;
}

export const ScriptProviderContext = createContext<ContextType>({
	scriptState: initialState,
	scriptDispatch: () => {},
});

const reducer = (state: State, action: Action) => {
	switch (action.type) {
		case "SET_START_LOADING":
			return { ...state, isLoading: true, toastVisible: false };
		case "SET_FINISH_LOADING":
			return { ...state, isLoading: false, toastVisible: false };
		case "SET_DISPLAY_SCRIPT":
			return { ...state, displayScript: action.payload, toastVisible: false };
		case "SET_SHOW_TOAST":
			return { ...state, toastVisible: true, toastMessage: action.payload };
		case "SET_HIDE_TOAST":
			return { ...state, toastVisible: false };
		default:
			return state;
	}
};

interface ScriptProviderProps {
	children: ReactNode;
}

export const ScriptProvider = ({ children }: ScriptProviderProps) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<ScriptProviderContext.Provider
			value={{
				scriptState: state,
				scriptDispatch: dispatch,
			}}>
			{children}
		</ScriptProviderContext.Provider>
	);
};
