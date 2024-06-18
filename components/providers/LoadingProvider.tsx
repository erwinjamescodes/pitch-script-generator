import React, { createContext, useReducer, ReactNode, Dispatch } from "react";

interface State {
	isLoading: boolean;
}

interface Action {
	type: string;
	payload?: any;
}

const initialState: State = {
	isLoading: false,
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
	switch (action.type) {
		case "SET_START_LOADING":
			return { ...state, isLoading: true };
		case "SET_FINISH_LOADING":
			return { ...state, isLoading: false };
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
