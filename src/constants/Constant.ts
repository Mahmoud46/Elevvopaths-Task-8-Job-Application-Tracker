import type { IStatus } from "../interface/Data";

export const statusOptions: IStatus[] = [
	"Applied",
	"Interviewing",
	"Offer",
	"Rejected",
];

export const statusColors: Record<string, string> = {
	Applied: "bg-blue-300 focus:outline-blue-500",
	Interviewing: "bg-yellow-300 focus:outline-yellow-500",
	Offer: "bg-green-300 focus:outline-green-500",
	Rejected: "bg-red-300 focus:outline-red-500",
};
