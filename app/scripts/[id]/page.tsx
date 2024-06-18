"use client";
import React, { useEffect, useState, Suspense, useContext } from "react";
import { Field, fields } from "@/components/constants/fields";
import ScriptCards from "@/components/shared/ScriptCards";
import { usePathname } from "next/navigation";
import axios from "axios";
import Papa from "papaparse";
import { Loader } from "@/components/shared/Loader";
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

const Placeholders = () => {
	const [displayScript, setDisplayScript] = useState<FromPDFProps | null>(null);
	const { loadingState, loadingDispatch } = useContext(LoadingProviderContext);
	const { isLoading } = loadingState;

	const pathname = usePathname();
	const parseCsvString = (csvString: string): FromPDFProps[] | null => {
		const parsedData = Papa.parse<FromPDFProps>(csvString, {
			header: true,
			skipEmptyLines: true,
		});

		if (parsedData.errors.length) {
			console.error("Error parsing CSV:", parsedData.errors);
			return null;
		}

		return parsedData.data;
	};

	let currentKey = pathname.split("scripts/")[1].concat(".csv");

	useEffect(() => {
		if (currentKey && !displayScript) {
			let retrievedData;
			const fetchScript = async () => {
				loadingDispatch({
					type: "SET_START_LOADING",
				});
				try {
					const response = await axios.get("/api/fetch-script", {
						headers: {
							"X-Current-Key": currentKey,
						},
					});

					retrievedData = response.data;
					const parsedData = parseCsvString(retrievedData);
					if (parsedData) {
						setDisplayScript(parsedData[0]);
					} else {
						console.error("Parsed data is null or undefined");
					}
				} catch (error) {
					console.error("Error fetching file:", error);
				}
				loadingDispatch({
					type: "SET_FINISH_LOADING",
				});
			};
			fetchScript();
		}
	}, []);

	return (
		<div className="w-1/2 p-6 ml-[50%] relative h-[calc(100vh-70px)] hidden md:block mt-[70px]">
			<div className={`${displayScript ? "pb-12" : "pb-2"}`}>
				<h2 className="text-primary font-semibold text-xl mb-4 ">
					{!displayScript
						? `Click "Generate Pitch Script" to start populating content`
						: "Success! Here's your generated pitch script:"}
				</h2>
				{fields.map((item: Field) => (
					<ScriptCards
						key={item.key}
						item={item}
						withContent={true}
						content={displayScript?.[item.key as keyof FromPDFProps]}
					/>
				))}
			</div>
			{isLoading && <Loader />}
		</div>
	);
};

export default Placeholders;
