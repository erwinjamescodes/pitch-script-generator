"use client";
import ScriptCards from "@/components/shared/ScriptCards";
import { useContext, useState } from "react";
import { Field, fields } from "@/components/constants/fields";
import { LoadingProviderContext } from "@/components/providers/LoadingProvider";

export interface FromPDFProps {
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

const Placeholders = ({ isGenerating }: any) => {
	const { loadingState, loadingDispatch } = useContext(LoadingProviderContext);

	const { isLoading } = loadingState;
	console.log("LOADING STATE", isLoading);
	return (
		<div className="w-1/2 p-6 ml-[50%] mt-[70px] relative h-[calc(100vh-70px)] hidden md:block ">
			<div className={"pb-2"}>
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
			{isLoading && (
				<div className="w-full h-[calc(100vh-70px)] bg-white absolute top-0 right-1 opacity-90 backdrop-filter backdrop-blur-lg flex items-center justify-center flex-col">
					<p className="text-primary font-medium text-[22px] ">
						Generating your pitch script...
					</p>
					<p className="text-primary font-medium text-[22px] ">
						This may take a few seconds.
					</p>
				</div>
			)}
		</div>
	);
};

export default function Home() {
	const [isGenerating, setIsGenerating] = useState(false);
	return (
		<main className="flex text-primary">
			<Placeholders
				isGenerating={isGenerating}
				setIsGenerating={setIsGenerating}
			/>
		</main>
	);
}
