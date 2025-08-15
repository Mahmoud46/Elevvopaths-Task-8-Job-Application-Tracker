import { useContext, useEffect, useState, type ReactNode } from "react";
import { AppContext } from "../context/AppContext";
import type { IAppContext } from "../interface/Context";
import { Link } from "react-router-dom";
import { BiFilterAlt, BiPlus } from "react-icons/bi";
import { statusColors, statusOptions } from "../constants/Constant";
import type { IJob, IStatus } from "../interface/Data";
import { TbError404 } from "react-icons/tb";
import { PiEmpty } from "react-icons/pi";

export default function Dashboard(): ReactNode {
	const { jobsData, searchTitle, formatDate } = useContext(
		AppContext
	) as IAppContext;
	const [filterKey, setFilterKey] = useState<IStatus | "All">("All");
	const [jobApplications, setJobApplications] = useState<IJob[]>([]);

	useEffect(() => {
		const tempApplications: IJob[] = jobsData.filter((job) =>
			searchTitle.trim() == "" && filterKey == "All"
				? job.job_title
				: job.job_title.toLowerCase().includes(searchTitle.toLowerCase()) &&
				  job.status.includes(filterKey)
		);
		setJobApplications(tempApplications);
	}, [filterKey, searchTitle, jobsData]);
	return (
		<>
			<div className="relative flex justify-between items-center">
				<h1 className="text-2xl">Saved Jobs</h1>
				<div className="relative flex gap-1 items-center bg-gray-100 rounded-lg cursor-pointer">
					<BiFilterAlt className="absolute left-1 text-xl text-gray-400" />
					<select
						name=""
						id=""
						className="pl-8 py-2 text-sm rounded-lg cursor-pointer outline-gray-200"
						value={filterKey}
						onChange={(e) => setFilterKey(e.target.value as IStatus | "All")}
					>
						<option value="All">All</option>
						{statusOptions.map((status, i) => (
							<option value={status} key={i}>
								{status}
							</option>
						))}
					</select>
				</div>
			</div>

			<div className="w-full grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-4 mt-4">
				{jobApplications &&
					jobApplications.map((job, i) => (
						<Link
							to={`/job/${job.id}`}
							key={i}
							className="bg-gray-100 p-4 rounded-2xl max-w-[400px] flex flex-col"
						>
							<div
								className={`${
									statusColors[job.status]
								} text-white w-fit text-sm px-2 py-1 rounded-lg`}
							>
								{job.status}
							</div>
							<h2 className="text-2xl font-bold my-1">{job.job_title}</h2>
							<p>{job.company_name}</p>
							<p className="text-sm text-gray-500">
								{formatDate(job.application_date)}
							</p>
						</Link>
					))}
				<div className=""></div>
				<div className=""></div>
				<div className=""></div>
			</div>
			{jobApplications.length == 0 && jobsData.length !== 0 && (
				<div className="h-[70dvh] flex flex-col items-center justify-center">
					<TbError404 className="text-5xl" />
					<p>No job applications match your search criteria.</p>
				</div>
			)}
			{jobApplications.length == 0 && jobsData.length === 0 && (
				<div className="h-[70dvh] flex flex-col items-center justify-center gap-2">
					<PiEmpty className="text-5xl" />
					<p>No job applications yet — time to add your first one!</p>
					<Link
						to={"/new-job"}
						className="flex gap-2 items-center cursor-pointer p-2 bg-gray-200 rounded-lg mt-1 w-fit"
					>
						<BiPlus className="text-2xl" /> <span>Add Job</span>
					</Link>
				</div>
			)}
		</>
	);
}
