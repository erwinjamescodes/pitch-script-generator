"use client";
import ScriptCards from "@/components/shared/ScriptCards";
import { useContext, useState } from "react";
import { Field, fields } from "@/components/constants/fields";
import { LoadingProviderContext } from "@/components/providers/LoadingProvider";
import { Loader } from "@/components/shared/Loader";

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

const Placeholders = () => {
	const { loadingState } = useContext(LoadingProviderContext);
	const { isLoading } = loadingState;
	console.log("LOADING STATE", isLoading);
	return (
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
	);
};

export default function Home() {
	return (
		<main className="flex text-primary">
			<Placeholders />
		</main>
	);
}
