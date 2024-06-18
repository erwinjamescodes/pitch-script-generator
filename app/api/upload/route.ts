import AWS from "aws-sdk";
import { NextRequest, NextResponse } from "next/server";

const s3 = new AWS.S3({
	accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY_ID,
	secretAccessKey: process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY,
	region: process.env.NEXT_PUBLIC_REGION,
});

export async function POST(request: NextRequest) {
	try {
		const { fileName, fileType } = await request.json();

		if (!fileName || !fileType) {
			return NextResponse.json(
				{ error: "Missing required parameters" },
				{ status: 400 }
			);
		}

		const params = {
			Bucket: "pitch-script-generator",
			Key: fileName,
			ContentType: fileType,
			Expires: 3600,
		};

		const uploadURL = await s3.getSignedUrlPromise("putObject", params);

		return NextResponse.json({ uploadURL });
	} catch (error) {
		console.error("Error generating signed URL:", error);
		return NextResponse.json(
			{ error: "Error generating signed URL" },
			{ status: 500 }
		);
	}
}
