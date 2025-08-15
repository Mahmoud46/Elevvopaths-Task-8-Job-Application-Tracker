import { useState, type ReactNode } from "react";
import { AppContext } from "./AppContext";
import type { IAppContext } from "../interface/Context";
import type { IJob, IStatus } from "../interface/Data";

import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function AppContextProvider({
	children,
}: {
	children: ReactNode;
}): ReactNode {
	const [searchTitle, setSearchTitle] = useState<string>("");
	const [jobsData, setJobsData] = useState<IJob[]>(
		JSON.parse(localStorage.getItem("jobs") ?? "[]")
	);
	const navigate = useNavigate();

	const formatDate = (date: string): ReactNode => {
		return (
			<>
				{new Date(date).toLocaleDateString("en-US", {
					weekday: "long",
				})}{" "}
				&bull;{" "}
				{new Date(date).toLocaleDateString("en-US", {
					year: "numeric",
					month: "long",
					day: "numeric",
				})}
			</>
		);
	};

	const updateJobStatus = (id: string, status: IStatus) => {
		const jobsTemp: IJob[] = jobsData;
		const jobIndex = jobsTemp.findIndex((job) => job.id === id);

		if (jobIndex === -1) {
			toast.error("Job not found");
			return;
		}

		jobsTemp[jobIndex].status = status;
		setJobsData([...jobsTemp]);
		localStorage.setItem("jobs", JSON.stringify([...jobsTemp]));
		toast.success("Job status updated successfully");
	};

	const updateJobData = (id: string, updatedJob: IJob): void => {
		const jobsTemp: IJob[] = jobsData;
		const jobIndex = jobsTemp.findIndex((job) => job.id === id);
		if (jobIndex === -1) {
			toast.error("Job not found");
			return;
		}

		jobsTemp[jobIndex] = { ...jobsTemp[jobIndex], ...updatedJob };
		setJobsData([...jobsTemp]);
		localStorage.setItem("jobs", JSON.stringify([...jobsTemp]));
		toast.success("Job updated successfully");
	};

	const deleteJob = (id: string): void => {
		let jobsTemp: IJob[] = jobsData;
		jobsTemp = jobsTemp.filter((job) => job.id !== id);

		setJobsData([...jobsTemp]);
		localStorage.setItem("jobs", JSON.stringify([...jobsTemp]));
		toast.success("Job deleted successfully");
	};

	const addJob = (newJob: IJob): void => {
		const jobsTemp: IJob[] = [newJob, ...jobsData];
		setJobsData([...jobsTemp]);
		localStorage.setItem("jobs", JSON.stringify([...jobsTemp]));
		toast.success("Job added successfully");
	};

	const exportJson = (jobsData: IJob[]): void => {
		const jsonObject = { jobs: jobsData };

		const jsonString = JSON.stringify(jsonObject);

		const blob = new Blob([jsonString], { type: "application/json" });

		const url = URL.createObjectURL(blob);
		const link = document.createElement("a");

		link.href = url;
		link.download = "job_applications.json";
		link.click();

		URL.revokeObjectURL(url);
	};

	const importJson = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const file = e.target.files?.[0];
		if (!file) return;

		const reader = new FileReader();

		reader.onload = (e) => {
			try {
				const content = e.target?.result as string;
				const parsed = JSON.parse(content) as { jobs: IJob[] };
				setJobsData(parsed.jobs);
				toast.success("File uploaded successfully!");
			} catch (error) {
				if (error instanceof Error) {
					toast.error(error.message);
				}
			}
		};
		reader.readAsText(file);
	};

	const contextValue: IAppContext = {
		searchTitle,
		setSearchTitle,
		jobsData,
		formatDate,
		updateJobStatus,
		updateJobData,
		deleteJob,
		addJob,
		navigate,
		exportJson,
		importJson,
	};
	return (
		<AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
	);
}
