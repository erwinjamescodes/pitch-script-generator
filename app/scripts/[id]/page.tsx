"use client";
import React, { useEffect, useContext } from "react";
import { Field, fields } from "@/components/constants/fields";
import ScriptCards from "@/components/shared/ScriptCards";
import { usePathname } from "next/navigation";
import axios from "axios";
import { Loader } from "@/components/shared/Loader";
import { LoadingProviderContext } from "@/components/providers/LoadingProvider";
import { FromPDFProps } from "@/app/page";
import { parseCsvString } from "@/components/utils/parseCsvString";

const Placeholders = () => {
	const { loadingState, loadingDispatch } = useContext(LoadingProviderContext);
	const { isLoading, displayScript } = loadingState;
	const pathname = usePathname();
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
						loadingDispatch({
							type: "SET_DISPLAY_SCRIPT",
							payload: parsedData[0],
						});
					} else {
						console.error("Parsed data is null or undefined");
					}
				} catch (error) {
					console.error("Error fetching file:", error);
				}
				loadingDispatch({
					type: "SET_FINISH_LOADING",
				});
				loadingDispatch({
					type: "SET_SHOW_TOAST",
					payload: "Pitch script updated",
				});
			};
			fetchScript();
		}
	}, []);

	return (
		<div className="w-1/2 p-6 ml-[50%] relative h-[calc(100vh-70px)] hidden md:block mt-[70px]">
			<div className={`${displayScript ? "pb-12" : "pb-2"}`}>
				<h2 className="text-primary font-semibold text-xl mb-4 ">
					Success! Here's your generated pitch script:
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
