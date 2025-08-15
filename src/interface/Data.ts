export interface IJob {
	id: string;
	company_name: string;
	job_title: string;
	status: IStatus;
	application_date: string;
	notes: string;
}

export type IStatus = "Applied" | "Interviewing" | "Offer" | "Rejected";
