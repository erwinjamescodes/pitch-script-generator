import { ScriptKeysProps } from "@/app/page";
import Papa from "papaparse";

export const parseCsvString = (csvString: string): ScriptKeysProps[] | null => {
	const parsedData = Papa.parse<ScriptKeysProps>(csvString, {
		header: true,
		skipEmptyLines: true,
	});

	if (parsedData.errors.length) {
		console.error("Error parsing CSV:", parsedData.errors);
		return null;
	}

	return parsedData.data;
};
