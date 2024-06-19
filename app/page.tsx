"use client";
import ScriptCards from "@/components/shared/ScriptCards";
import { useContext, useEffect } from "react";
import { Field, fields } from "@/components/constants/fields";
import { ScriptProviderContext } from "@/components/providers/ScriptProvider";
import { Loader } from "@/components/shared/Loader";
export interface ScriptKeysProps {
	Introduction: string;
	Hook: string;
	ProblemStatement: string;
	Solution: string;
	MarketOpportunity: string;
	BusinessModel: string;
	Traction: string;
	GoToMarketStrategy: string;
	Team: string;
	FinancialsAndProjections: string;
	Closing: string;
}

export default function Home() {
	const { scriptState, scriptDispatch } = useContext(ScriptProviderContext);
	const { isLoading } = scriptState;

	useEffect(() => {
		scriptDispatch({ type: "SET_DISPLAY_SCRIPT", payload: null });
	}, []);
	return (
		<main className="flex text-primary">
			<div className="w-1/2 p-6 ml-[50%] mt-[70px] relative h-[calc(100vh-70px)] ">
				<div className={"pb-2 hidden md:block "}>
					<h2 className="text-primary font-semibold text-xl mb-4 ">
						Click "Generate Pitch Script" to start populating content
					</h2>
					{fields.map((item: Field, index) => (
						<ScriptCards
							key={index}
							item={item}
							withContent={false}
						/>
					))}
				</div>
				{isLoading && <Loader />}
			</div>
		</main>
	);
}
