import { useContext } from 'react';
import { SettingsContext } from '../../context/Settings';
import { packObj, PackType } from '../../utils/packObj';

function Settings() {

  const {changeSettings, ...settings} = useContext(SettingsContext);

  const setBatchSize = (size: number) => {
    if(changeSettings) changeSettings({
        batchSize: size
    });
    localStorage.setItem("settings", JSON.stringify({...settings, batchSize: size}));
  }

  const setPack = (pack: PackType) => {
    if(changeSettings) changeSettings({
        serverList: packObj[pack]
    });
    localStorage.setItem("settings", JSON.stringify({...settings, serverList: packObj[pack]}));
  }

  return (
    <div className='mb-3 mx-2 d-flex justify-content-between'>
        <div className="dropdown bg-transparent">
            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                Image Batch Size
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li><a onClick={() => setBatchSize(10)} className="dropdown-item">10</a></li>
                <li><a onClick={() => setBatchSize(25)} className="dropdown-item">25</a></li>
                <li><a onClick={() => setBatchSize(50)} className="dropdown-item">50</a></li>
            </ul>
        </div>

        <div className="dropdown bg-transparent">
            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                Server Pack
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li><a onClick={() => setPack("spanish")} className="dropdown-item">Spanish</a></li>
                <li><a onClick={() => setPack("english")} className="dropdown-item">English</a></li>
                <li><a onClick={() => setPack("all")} className="dropdown-item">All</a></li>
            </ul>
        </div>
    </div>
  )
}

export default Settings