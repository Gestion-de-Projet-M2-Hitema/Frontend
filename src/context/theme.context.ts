import { createContext } from "react";

export const ThemeContext = createContext<Record<string, any>>({theme: "light", changeTheme: () => {}});