import { useContext } from 'react';
import { SettingsContext } from '../../context/Settings';
import { packObj, PackType } from '../../utils/packObj';

function Settings() {

  const {changeSettings, ...settings} = useContext(SettingsContext);

  const setBatchSize = (size: number) => {
    if(changeSettings) changeSettings({
        batchSize: size
    });
  }

  const setPack = (pack: PackType) => {
    if(changeSettings) changeSettings({
        serverList: packObj[pack]
    });
  }

  const setFilter = (filter: boolean) => {
    if(changeSettings) changeSettings({
        nsfwFilter: filter
    });
  }

  const batchClasses = (value: number) => {
    if(value === settings.batchSize) return "dropdown-item " + "bg-primary";
    else return "dropdown-item";
  }

  const packClasses = (pack: PackType) => {
    if(pack !== "all" && packClasses("all") === "dropdown-item " + "bg-primary") return "dropdown-item";
    const sameServerList = packObj[pack].every(subReddit => settings.serverList.includes(subReddit));
    if(sameServerList) return "dropdown-item " + "bg-primary";
    else return "dropdown-item";
  }

  return (
    <div className='mb-3 mx-2 d-flex justify-content-between'>
        <div className="dropdown bg-transparent">
            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                Image Batch Size
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li><a onClick={() => setBatchSize(2)} className={batchClasses(2)}>2</a></li>
                <li><a onClick={() => setBatchSize(5)} className={batchClasses(5)}>5</a></li>
                <li><a onClick={() => setBatchSize(10)} className={batchClasses(10)}>10</a></li>
                <li><a onClick={() => setBatchSize(25)} className={batchClasses(25)}>25</a></li>
                <li><a onClick={() => setBatchSize(50)} className={batchClasses(50)}>50</a></li>
            </ul>
        </div>

        <div className='right-side d-flex align-items-center'>
            <div className="form-check form-switch mx-3">
                <input checked={settings.nsfwFilter} onChange={(e) => setFilter(e.target.checked)} className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
                <label className="form-check-label" htmlFor="flexSwitchCheckDefault">NSFW filter</label>
            </div>
            <div className="dropdown bg-transparent">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    Server Pack
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li><a onClick={() => setPack("spanish")} className={packClasses("spanish")}>Spanish</a></li>
                    <li><a onClick={() => setPack("english")} className={packClasses("english")}>English</a></li>
                    <li><a onClick={() => setPack("all")} className={packClasses("all")}>All</a></li>
                </ul>
            </div>
        </div>

        
    </div>
  )
}

export default Settings