import { useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import type { IAppContext } from "../interface/Context";
import type { IJob, IStatus } from "../interface/Data";
import { BiTrash } from "react-icons/bi";
import { GrDocumentUpdate } from "react-icons/gr";
import { statusColors, statusOptions } from "../constants/Constant";

export default function JobDetails(): ReactNode {
	const {
		jobsData,
		formatDate,
		updateJobStatus,
		updateJobData,
		deleteJob,
		navigate,
	} = useContext(AppContext) as IAppContext;
	const [job, setJob] = useState<IJob | null>(null);
	const { id } = useParams();
	const dateRef = useRef<HTMLInputElement | null>(null);

	// Form attributes
	const [jobStatus, setJobStatus] = useState<IStatus>("Applied");
	const [jobTitle, setJobTitle] = useState<string>("");
	const [companyName, setCompanyName] = useState<string>("");
	const [applicationDate, setApplicationDate] = useState<string>("");
	const [notes, setNotes] = useState<string>("");

	useEffect(() => {
		// Get the job ID
		const jobIndex = jobsData.findIndex((job) => job.id === id);
		if (jobIndex === -1) return;

		setJob(jobsData[jobIndex]);
		setJobStatus(jobsData[jobIndex].status);
		setJobTitle(jobsData[jobIndex].job_title);
		setCompanyName(jobsData[jobIndex].company_name);
		setApplicationDate(jobsData[jobIndex].application_date);
		setNotes(jobsData[jobIndex].notes);
	}, [id, jobsData]);

	return (
		<>
			{job && (
				<div className="">
					<div className="flex justify-between items-center">
						<div className={`${statusColors[jobStatus]} rounded-lg text-sm`}>
							<select
								name=""
								id=""
								className={`py-2 text-sm rounded-lg cursor-pointer text-white ${statusColors[jobStatus]}`}
								value={jobStatus}
								onChange={(e) => {
									updateJobStatus(job.id, e.target.value as IStatus);
									setJobStatus(e.target.value as IStatus);
								}}
							>
								{statusOptions.map((status, i) => (
									<option
										value={status}
										key={i}
										className="text-black bg-white"
									>
										{status}
									</option>
								))}
							</select>
						</div>
						<button
							className="bg-red-100 rounded-lg p-2 text-xl cursor-pointer"
							onClick={() => {
								deleteJob(job.id);
								navigate("/");
							}}
						>
							<BiTrash />
						</button>
					</div>
					<div className="text-3xl font-bold my-4">
						<input
							type="text"
							value={jobTitle}
							required
							className="w-full outline-gray-200 p-1"
							onChange={(e) => setJobTitle(e.target.value)}
						/>
					</div>
					<div className="text-lg w-full ">
						<input
							type="text"
							value={companyName}
							required
							onChange={(e) => setCompanyName(e.target.value)}
							className="w-full outline-gray-200 p-1"
						/>
					</div>

					<p
						className="text-sm text-gray-500 cursor-pointer w-fit"
						onClick={() => dateRef.current?.showPicker()}
					>
						{formatDate(applicationDate)}
					</p>
					<div className="">
						<textarea
							name=""
							id=""
							className="w-full h-[300px] overflow-auto resize-none bg-gray-50 p-4 rounded-2xl mt-4 outline-gray-200"
							value={notes}
							onChange={(e) => setNotes(e.target.value)}
							placeholder="Notes"
						></textarea>
					</div>

					<input
						type="date"
						hidden
						ref={dateRef}
						value={applicationDate}
						required
						onChange={(e) => {
							setApplicationDate(e.target.value);
						}}
					/>

					{(jobTitle != job.job_title ||
						companyName != job.company_name ||
						applicationDate != job.application_date ||
						notes != job.notes) && (
						<button
							className="flex gap-2 items-center cursor-pointer p-2 bg-gray-100 rounded-lg mt-1"
							onClick={() => {
								updateJobData(job.id, {
									id: job.id,
									status: jobStatus,
									job_title: jobTitle,
									company_name: companyName,
									application_date: applicationDate,
									notes: notes,
								});
								navigate("/");
							}}
						>
							<GrDocumentUpdate className="text-xl" /> <span>Update</span>
						</button>
					)}
				</div>
			)}
		</>
	);
}
