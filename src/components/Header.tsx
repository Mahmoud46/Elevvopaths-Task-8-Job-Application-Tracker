import { useContext, useRef, type ReactNode } from "react";
import type { IAppContext } from "../interface/Context";
import { AppContext } from "../context/AppContext";
import { BiSearch } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";
import { PiPlus } from "react-icons/pi";
import { GrDocumentDownload, GrDocumentUpload } from "react-icons/gr";
import logo from "../assets/jl_logo.png";

export default function Header(): ReactNode {
	const { searchTitle, setSearchTitle, exportJson, jobsData, importJson } =
		useContext(AppContext) as IAppContext;
	const location = useLocation();
	const jsonFileInputRef = useRef<HTMLInputElement | null>(null);

	return (
		<header className="flex justify-between py-2 px-4 sm:py-4 sm:px-8 flex-wrap gap-2">
			<Link to={"/"} className="">
				<img src={logo} alt="jl" className="h-[60px]" />
			</Link>
			<div className="flex items-center gap-2">
				<button
					className="text-xl cursor-pointer p-2 bg-gray-100 rounded-lg"
					onClick={() => exportJson(jobsData)}
				>
					<GrDocumentDownload />
				</button>
				<button
					className="text-xl cursor-pointer bg-gray-100 rounded-lg p-2"
					onClick={() => jsonFileInputRef.current?.click()}
				>
					<GrDocumentUpload />
				</button>
				<Link
					to="/new-job"
					className="flex items-center gap-2 bg-gray-100 rounded-lg p-2"
				>
					<PiPlus className="text-xl" />
				</Link>
				{location.pathname === "/" && (
					<div className="relative flex items-center bg-gray-100 rounded-lg">
						<BiSearch className="absolute left-1 text-xl text-gray-400" />
						<input
							type="text"
							onChange={(e) => setSearchTitle(e.target.value)}
							value={searchTitle}
							placeholder="Search Job"
							className="pl-8 py-2 text-sm rounded-lg outline-gray-200"
						/>
					</div>
				)}
			</div>
			<input
				type="file"
				accept=".json"
				ref={jsonFileInputRef}
				onChange={importJson}
				hidden
			/>
		</header>
	);
}
