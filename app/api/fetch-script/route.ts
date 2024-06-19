import AWS from "aws-sdk";
import { NextRequest, NextResponse } from "next/server";

const s3 = new AWS.S3({
	accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY_ID,
	secretAccessKey: process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY,
	region: process.env.NEXT_PUBLIC_REGION,
});

export async function GET(request: NextRequest) {
	try {
		const key = request.headers.get("X-Current-Key") || "";

		if (!key) {
			return NextResponse.json(
				{ error: "Missing key parameter" },
				{ status: 400 }
			);
		}

		const params = {
			Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME || "",
			Key: key,
		};

		const retrievedFile = await s3.getObject(params).promise();
		const { Body } = retrievedFile;

		if (!Body) {
			return NextResponse.json(
				{ error: "No CSV content found" },
				{ status: 404 }
			);
		}

		const contentType = "text/csv";

		return new NextResponse(Body as BodyInit, {
			status: 200,
			headers: {
				"Content-Type": contentType,
				"Content-Disposition": `attachment; filename="${key}"`,
			},
		});
	} catch (error) {
		console.error("Error fetching or processing CSV:", error);
		return NextResponse.json(
			{ error: "Error fetching or processing CSV" },
			{ status: 500 }
		);
	}
}
