import { ScriptKeysProps } from "@/app/page";

export const convertJsonToMarkdown = (json: ScriptKeysProps) => {
	let markdown = "";
	for (const [key, value] of Object.entries(json)) {
		markdown += `### ${key}\n\n${value}\n\n`;
	}
	return markdown;
};

export const convertFieldsToMarkdown = (key: string, value: string) => {
	let markdown = "";
	markdown += `### ${key}\n\n${value}\n\n`;

	return markdown;
};
