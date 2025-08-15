import { useContext, useRef, useState, type ReactNode } from "react";
import { statusColors, statusOptions } from "../constants/Constant";

import { AppContext } from "../context/AppContext";
import type { IAppContext } from "../interface/Context";
import type { IStatus } from "../interface/Data";
import { nanoid } from "nanoid";
import { BiPlus } from "react-icons/bi";

export default function AddJob(): ReactNode {
	const { formatDate, addJob, navigate } = useContext(
		AppContext
	) as IAppContext;
	const dateRef = useRef<HTMLInputElement | null>(null);
	// Form attributes
	const [jobTitle, setJobTitle] = useState<string>("");
	const [companyName, setCompanyName] = useState<string>("");
	const [applicationDate, setApplicationDate] = useState<string>(
		new Date().toISOString().split("T")[0]
	);
	const [jobStatus, setJobStatus] = useState<IStatus>("Applied");
	const [notes, setNotes] = useState<string>("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		addJob({
			id: nanoid(),
			status: jobStatus,
			job_title: jobTitle,
			company_name: companyName,
			application_date: applicationDate,
			notes: notes,
		});
		navigate("/");
	};
	return (
		<>
			<div className="flex flex-col gap-2">
				<form onSubmit={handleSubmit} className="flex flex-col gap-2">
					<div className="text-3xl font-bold my-4">
						<input
							type="text"
							placeholder="job Title"
							required
							value={jobTitle}
							onChange={(e) => setJobTitle(e.target.value)}
							className="w-full outline-gray-200 p-1"
						/>
					</div>
					<div className="text-lg w-full">
						<input
							type="text"
							placeholder="company Name"
							required
							value={companyName}
							onChange={(e) => setCompanyName(e.target.value)}
							className="w-full outline-gray-200 p-1"
						/>
					</div>
					<div className="flex gap-4 items-center">
						<div className="">
							<p
								className="text-sm text-gray-500 cursor-pointer w-fit"
								onClick={() => dateRef.current?.showPicker()}
							>
								{formatDate(applicationDate)}
							</p>
						</div>
						<div className="">
							<select
								name=""
								id=""
								value={jobStatus}
								onChange={(e) => setJobStatus(e.target.value as IStatus)}
								className={`py-2 text-sm rounded-lg cursor-pointer text-white ${statusColors[jobStatus]}`}
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
					</div>
					<div className="">
						<textarea
							name=""
							id=""
							className="w-full h-[300px] overflow-auto resize-none bg-gray-50 p-4 rounded-2xl mt-4 outline-gray-200"
							placeholder="Notes"
							value={notes}
							onChange={(e) => setNotes(e.target.value)}
						></textarea>
					</div>
					<button
						type="submit"
						className="flex gap-2 items-center cursor-pointer p-2 bg-gray-200 rounded-lg mt-1 w-fit"
					>
						<BiPlus className="text-xl" /> <span>Add Job</span>
					</button>
				</form>
			</div>
		</>
	);
}
