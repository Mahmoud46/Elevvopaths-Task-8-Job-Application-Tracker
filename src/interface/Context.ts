import type { ReactNode } from "react";
import type { IJob, IStatus } from "./Data";
import type { NavigateFunction } from "react-router-dom";

export interface IAppContext {
	searchTitle: string;
	jobsData: IJob[];
	setSearchTitle: React.Dispatch<React.SetStateAction<string>>;
	formatDate: (date: string) => ReactNode;
	updateJobStatus: (id: string, status: IStatus) => void;
	updateJobData: (id: string, updatedJob: IJob) => void;
	deleteJob: (id: string) => void;
	addJob: (newJob: IJob) => void;
	navigate: NavigateFunction;
	exportJson: (jobsData: IJob[]) => void;
	importJson: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
