import { createContext, useState } from 'react';
import { Settings } from '../interfaces/settings';
import { packObj } from '../utils/packObj';

const savedSettings = JSON.parse(localStorage.getItem("settings") || "{}");

const initialState = {
    batchSize: savedSettings?.batchSize || 2,
    serverList: savedSettings?.serverList || packObj["spanish"],
    nsfwFilter: savedSettings?.nsfwFilter === false ? false : true,
    lowRes: savedSettings?.lowRes === false ? false : true
}

export const SettingsContext: React.Context<Settings> = createContext(initialState);


function SettingsProvider({children}: any) {

  const [settings, setSettings] = useState<Settings>(initialState);

  const changeSettings = (newSettings: Partial<Settings>) => {
    setSettings({...settings, ...newSettings});
    localStorage.setItem("settings", JSON.stringify({...settings, ...newSettings}));
  }

  return <SettingsContext.Provider value={{...settings, changeSettings}} >
        {children}
    </SettingsContext.Provider>
}

export default SettingsProvider;