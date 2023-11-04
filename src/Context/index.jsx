/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const ContextData = createContext();

const ShareContextData = ({ children }) => {
  const [theme, setTheme] = useState(true);
  const [userId, setUserId] = useState();
  const siteName = "Task Management";

  const share = {
    siteName,
    setTheme,
    theme,
    userId,
    setUserId,
  };
  return <ContextData.Provider value={share}>{children}</ContextData.Provider>;
};

export default ShareContextData;
