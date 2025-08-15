import type { ReactNode } from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import JobDetails from "./pages/JobDetails";
import AddJob from "./pages/AddJob";
import Header from "./components/Header";
import { Toaster } from "react-hot-toast";

export default function App(): ReactNode {
	return (
		<>
			<Toaster />
			<Header />
			<section className="px-4 sm:px-8 w-full">
				<Routes>
					<Route index element={<Dashboard />} />
					<Route path="/new-job" element={<AddJob />} />
					<Route path="/job/:id" element={<JobDetails />} />
				</Routes>
			</section>
		</>
	);
}
