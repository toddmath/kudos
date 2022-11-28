import type { SelectBoxOption } from "~/components/select-box";

export const colorMap = {
	RED: "text-red-400",
	GREEN: "text-green-400",
	BLUE: "text-blue-400",
	WHITE: "text-white",
	YELLOW: "text-yellow-300",
} as const;

export const backgroundColorMap = {
	RED: "bg-red-400",
	GREEN: "bg-green-400",
	BLUE: "bg-blue-400",
	WHITE: "bg-white",
	YELLOW: "bg-yellow-300",
} as const;

export const emojiMap = {
	THUMBSUP: "👍",
	PARTY: "🎉",
	HANDSUP: "🙌🏻",
} as const;

export const sortOptions = [
	{
		name: "Date",
		value: "date",
	},
	{
		name: "Sender Name",
		value: "sender",
	},
	{
		name: "Emoji",
		value: "emoji",
	},
] as SelectBoxOption[];
