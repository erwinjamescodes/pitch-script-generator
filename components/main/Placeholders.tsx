// "use client";
// import React, { useEffect, useState, Suspense } from "react";
// import { Field, fields } from "../constants/fields";
// import ScriptCards from "../shared/ScriptCards";
// import { useSearchParams } from "next/navigation";
// import axios from "axios";
// import Papa from "papaparse";

// export interface FromPDFProps {
// 	Introduction: string;
// 	Hook: string;
// 	ProblemStatement: string;
// 	Solution: string;
// 	MarketOpportunity: string;
// 	BusinessModel: string;
// 	Traction: string;
// 	GoToMarketStrategy: string;
// 	Team: string;
// 	FinancialsAndProjections: string;
// 	Closing: string;
// }

// const Placeholders = ({
// 	generatedScript,
// 	isGenerating,
// 	setIsGenerating,
// }: any) => {
// 	const [displayScript, setDisplayScript] = useState<FromPDFProps | null>(null);

// 	const parseCsvString = (csvString: string): FromPDFProps[] | null => {
// 		const parsedData = Papa.parse<FromPDFProps>(csvString, {
// 			header: true,
// 			skipEmptyLines: true,
// 		});

// 		if (parsedData.errors.length) {
// 			console.error("Error parsing CSV:", parsedData.errors);
// 			return null;
// 		}

// 		return parsedData.data;
// 	};

// 	const searchParams =  useSearchParams()
// 	let currentKey: string | undefined;

// 	const getCurrentKey = () => {
// 		currentKey = searchParams?.get("key")?.concat(".csv");
// 	};

// 	useEffect(() => {
// 		getCurrentKey();
// 		if (currentKey && !displayScript) {
// 			let retrievedData;
// 			const fetchScript = async () => {
// 				setIsGenerating(true);
// 				try {
// 					const response = await axios.get("/api/fetch-script", {
// 						params: { key: currentKey },
// 					});

// 					retrievedData = response.data;
// 					const parsedData = parseCsvString(retrievedData);
// 					if (parsedData) {
// 						setDisplayScript(parsedData[0]); // Assuming you want to set the first item in the array
// 					} else {
// 						console.error("Parsed data is null or undefined");
// 					}
// 				} catch (error) {
// 					console.error("Error fetching file:", error);
// 				}
// 				setIsGenerating(false);
// 			};
// 			fetchScript();
// 		}
// 		// eslint-disable-next-line react-hooks/exhaustive-deps
// 	}, []);

// 	useEffect(() => {
// 		if (generatedScript) {
// 			try {
// 				const parsedScript = JSON.parse(generatedScript) as FromPDFProps;
// 				setDisplayScript(parsedScript);
// 			} catch (error) {
// 				console.error("Error parsing JSON:", error);
// 			}
// 		}
// 	}, [generatedScript]);

// 	return (
// 		<div className="w-1/2 p-6 ml-[50%] mt-[70px] relative h-[calc(100vh-70px)] hidden md:block ">
// 			<Suspense fallback={<div>Loading...</div>}>
// 				<div className={`${displayScript ? "pb-12" : "pb-2"}`}>
// 					<h2 className="text-primary font-semibold text-xl mb-4 ">
// 						{!displayScript
// 							? `Click "Generate Pitch Script" to start populating content`
// 							: "Success! Here's your generated pitch script:"}
// 					</h2>
// 					{!displayScript &&
// 						fields.map((item: Field, index) => (
// 							<ScriptCards
// 								key={index}
// 								item={item}
// 								withContent={false}
// 							/>
// 						))}
// 					{displayScript &&
// 						fields.map((item: Field) => (
// 							<ScriptCards
// 								key={item.key}
// 								item={item}
// 								withContent={true}
// 								content={displayScript[item.key as keyof FromPDFProps]}
// 							/>
// 						))}
// 				</div>
// 			</Suspense>
// 			{isGenerating && (
// 				<div className="w-full h-[calc(100vh-70px)] bg-white absolute top-0 right-1 opacity-90 backdrop-filter backdrop-blur-lg flex items-center justify-center flex-col">
// 					<p className="text-primary font-medium text-[22px] ">
// 						Generating your pitch script...
// 					</p>
// 					<p className="text-primary font-medium text-[22px] ">
// 						This may take a few seconds.
// 					</p>
// 				</div>
// 			)}
// 		</div>
// 	);
// };

// export default Placeholders;

"use client"; // Assuming this is a comment or placeholder

import React, { useEffect, useState, Suspense } from "react";
import { Field, fields } from "../constants/fields";
import ScriptCards from "../shared/ScriptCards";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import Papa from "papaparse";

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

const Placeholders = ({
	generatedScript,
	isGenerating,
	setIsGenerating,
}: any) => {
	const [displayScript, setDisplayScript] = useState<FromPDFProps | null>(null);

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

	const searchParams = useSearchParams();
	let currentKey: string | undefined;

	const getCurrentKey = () => {
		currentKey = searchParams?.get("key")?.concat(".csv");
	};

	useEffect(() => {
		getCurrentKey();
		if (currentKey && !displayScript) {
			let retrievedData;
			const fetchScript = async () => {
				setIsGenerating(true);
				try {
					const response = await axios.get("/api/fetch-script", {
						params: { key: currentKey },
					});

					retrievedData = response.data;
					const parsedData = parseCsvString(retrievedData);
					if (parsedData) {
						setDisplayScript(parsedData[0]); // Assuming you want to set the first item in the array
					} else {
						console.error("Parsed data is null or undefined");
					}
				} catch (error) {
					console.error("Error fetching file:", error);
				}
				setIsGenerating(false);
			};
			fetchScript();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (generatedScript) {
			try {
				const parsedScript = JSON.parse(generatedScript) as FromPDFProps;
				setDisplayScript(parsedScript);
			} catch (error) {
				console.error("Error parsing JSON:", error);
			}
		}
	}, [generatedScript]);

	return (
		<div className="w-1/2 p-6 ml-[50%] mt-[70px] relative h-[calc(100vh-70px)] hidden md:block ">
			<Suspense fallback={<div>Loading...</div>}>
				<PlaceholdersContent
					displayScript={displayScript}
					isGenerating={isGenerating}
					fields={fields}
				/>
			</Suspense>
		</div>
	);
};

interface PlaceholdersContentProps {
	displayScript: FromPDFProps | null;
	isGenerating: boolean;
	fields: Field[];
}

const PlaceholdersContent: React.FC<PlaceholdersContentProps> = ({
	displayScript,
	isGenerating,
	fields,
}) => (
	<div className={`${displayScript ? "pb-12" : "pb-2"}`}>
		<h2 className="text-primary font-semibold text-xl mb-4 ">
			{!displayScript
				? `Click "Generate Pitch Script" to start populating content`
				: "Success! Here's your generated pitch script:"}
		</h2>
		{!displayScript &&
			fields.map((item: Field, index) => (
				<ScriptCards
					key={index}
					item={item}
					withContent={false}
				/>
			))}
		{displayScript &&
			fields.map((item: Field) => (
				<ScriptCards
					key={item.key}
					item={item}
					withContent={true}
					content={displayScript[item.key as keyof FromPDFProps]}
				/>
			))}
		{isGenerating && (
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

export default Placeholders;
