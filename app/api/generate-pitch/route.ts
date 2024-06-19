import { fields } from "@/components/constants/fields";
import { NextResponse, NextRequest } from "next/server";
import { OpenAIApi, Configuration } from "openai-edge";
import * as AWS from "aws-sdk";
// import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { parse } from "json2csv";

const configuration = new Configuration({
	apiKey: process.env.NEXT_PUBLIC_OPEN_API_KEY,
});

const openai = new OpenAIApi(configuration);

interface RequestBody {
	userPitch: string;
	pitchDeck: string;
	pitchLength: number;
	additionalInstructions: string;
}

AWS.config.update({
	accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY_ID,
	secretAccessKey: process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY,
	region: process.env.NEXT_PUBLIC_REGION,
});

export async function POST(request: NextRequest) {
	const s3 = new AWS.S3();

	try {
		const {
			userPitch,
			pitchDeck,
			pitchLength,
			additionalInstructions,
		}: RequestBody = await request.json();

		const prompt = `
      Generate a pitch script based on the following details:
      - Introduction: ${userPitch}
      - Pitch length: ${pitchLength} minutes
      - Additional instructions: ${additionalInstructions}

      Please break down the pitch into the following key areas and return them in a JSON format using the same items below as keys. Ensure that the return value is in JSON format enclosed by curly braces.
      - Introduction
      - Hook
      - ProblemStatement
      - Solution
      - MarketOpportunity
      - BusinessModel
      - Traction
      - GoToMarketStrategy
      - Team
      - FinancialsAndProjections
      - Closing
    `;

		const response = await openai.createCompletion({
			model: "gpt-3.5-turbo-instruct",
			prompt: prompt,
			max_tokens: 1500,
		});

		const pitchScript = await response.json();
		// const pitchText = ensureJsonFormatForPDF(pitchScript.choices[0].text);

		// Generate CSV data
		// Remove trailing whitespace from the pitch script text and parse it as JSON
		const pitchScriptText = pitchScript.choices[0].text;
		const formattedPitchScriptText = removeTrailingWhitespace(pitchScriptText);
		const pitchScriptJson = JSON.parse(formattedPitchScriptText);
		const csvData = convertJsonToCsv(pitchScriptJson);

		// TEMPORARILY COMMENTING OUT FUNCTION TO SAVE SCRIPT AS PDF. FOR NOW, SAVING THE FILE TO A CSV IS MORE EFFICIENT FOR EASIER PARSING

		// Create PDF document
		// const pdfDoc = await PDFDocument.create();
		// const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
		// const page = pdfDoc.addPage();
		// const textWidth = 500;
		// const fontSize = 11;
		// page.drawText(pitchText, {
		// 	x: 50,
		// 	y: page.getHeight() - 50,
		// 	font: timesRomanFont,
		// 	size: fontSize,
		// 	maxWidth: textWidth,
		// 	color: rgb(0, 0, 0),
		// });

		// const pdfBytes = await pdfDoc.save();

		// // Upload PDF to S3
		// const uploadParams = {
		// 	Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME || "",
		// 	Key: `pitch-script-${currentDate}.pdf`,
		// 	Body: pdfBytes,
		// 	ContentType: "application/pdf",
		// };

		// const pdfDataResponse = await s3.upload(uploadParams).promise();
		// console.log("PDF File uploaded successfully:", pdfDataResponse.Location);

		const currentDate = Date.now();
		// Upload CSV to S3
		const csvUploadParams = {
			Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME || "",
			Key: `pitch-script-${currentDate}.csv`,
			Body: csvData,
			ContentType: "text/csv",
		};

		let csvDataResponse = await s3.upload(csvUploadParams).promise();
		console.log("CSV file uploaded successfully:", csvDataResponse.Location);

		const scriptURL = csvDataResponse.Location.split(".com/")[1].replace(
			".csv",
			""
		);

		return NextResponse.json({ pitchScript, scriptURL });
	} catch (error: any) {
		console.error("Error generating pitch script:", error);
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}

// const ensureJsonFormatForPDF = (str: string) => {
// 	let cleanedStr = str.trim();
// 	if (cleanedStr.startsWith("{")) {
// 		cleanedStr = cleanedStr.replace(/^\{+/, "{");
// 	}
// 	if (cleanedStr.endsWith("}")) {
// 		cleanedStr = cleanedStr.replace(/\}+$/, "}");
// 	}

// 	return cleanedStr;
// };

const removeTrailingWhitespace = (str: string): string => {
	return str.replace(/\s+$/, "");
};

const convertJsonToCsv = (jsonData: any): string => {
	const fieldKeys: string[] = fields.map((field) => field.key);
	try {
		const csvData = parse([jsonData], { fields: fieldKeys });
		return csvData;
	} catch (error) {
		console.error("Error converting JSON to CSV:", error);
		return "";
	}
};
