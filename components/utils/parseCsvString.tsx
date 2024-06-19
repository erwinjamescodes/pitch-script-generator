import { FromPDFProps } from "@/app/page";
import Papa from "papaparse";

export const parseCsvString = (csvString: string): FromPDFProps[] | null => {
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
