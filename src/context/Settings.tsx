import { createContext, useState } from 'react';
import { Settings } from '../interfaces/settings';
import { packObj } from '../utils/packObj';

const initialState = {
    batchSize: JSON.parse(localStorage.getItem("settings") || "{}")?.batchSize || 10,
    serverList: JSON.parse(localStorage.getItem("settings") || "{}")?.serverList || packObj["spanish"],
  }

export const SettingsContext: React.Context<Settings> = createContext(initialState);


function SettingsProvider({children}: any) {

  const [settings, setSettings] = useState<Settings>(initialState);

  const changeSettings = (newSettings: Partial<Settings>) => {
    setSettings({...settings, ...newSettings});
  }

  return <SettingsContext.Provider value={{...settings, changeSettings}} >
        {children}
    </SettingsContext.Provider>
}

export default SettingsProvider;