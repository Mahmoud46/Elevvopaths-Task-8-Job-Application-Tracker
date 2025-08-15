import { createContext } from "react";
import type { IAppContext } from "../interface/Context";

export const AppContext = createContext<IAppContext | null>(null);
