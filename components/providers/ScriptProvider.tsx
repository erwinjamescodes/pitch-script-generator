import { createContext, useReducer, ReactNode } from "react";

interface State {
	generatedScript: string;
	loading: boolean;
}

interface Action {
	type: string;
	payload?: any;
}

const initialState: State = {
	generatedScript: "",
	loading: true,
};
export const GeneratedScriptProviderContext = createContext<{
	generatedScriptState: State;
	generatedScriptDispatch: React.Dispatch<Action>;
}>({ generatedScriptState: initialState, generatedScriptDispatch: () => null });

const reducer = (state: State, action: Action) => {
	switch (action.type) {
		case "SET_GENERATED_SCRIPT":
			return { ...state, generatedScript: action.payload, loading: false };
		case "LOADING":
			return { ...state, loading: true };
		default:
			return state;
	}
};

interface GeneratedScriptProviderProps {
	children: ReactNode;
}

export const GeneratedScriptProvider = ({
	children,
}: GeneratedScriptProviderProps) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<GeneratedScriptProviderContext.Provider
			value={{
				generatedScriptState: state,
				generatedScriptDispatch: dispatch,
			}}>
			{children}
		</GeneratedScriptProviderContext.Provider>
	);
};
