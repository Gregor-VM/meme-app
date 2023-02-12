import { useContext } from 'react';
import { SettingsContext } from '../../context/Settings';
import { packObj, PackType } from '../../utils/packObj';
import './Settings.css';

const batchSizes = [
  2, 5, 10, 25, 50
];

/* TODO: PACK OBJECT WITH ITS CORRESPONDING LANGUAGES*/
/* CHANGE SERVERLIST NAME for SUBREDDITS OR SOMETHING LIKE THAT */

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

  const setLowRes = (lowRes: boolean) => {
    if(changeSettings) changeSettings({
        lowRes: lowRes
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
    <div className='mb-3 mx-2 settings'>
        <div className="dropdown bg-transparent">
            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                Image Batch Size
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              {batchSizes.map(size => {
                return <li key={size}><a onClick={() => setBatchSize(size)} className={batchClasses(size)}>{size}</a></li>
              })}
            </ul>
        </div>

        <div className='right-side'>
          <div className="form-check form-switch mx-3 mt-3">
                <input checked={settings.lowRes} onChange={(e) => setLowRes(e.target.checked)} className="form-check-input" type="checkbox" id="lowRes" />
                <label className="form-check-label text-white" htmlFor="lowRes">Low res</label>
            </div>
            <div className="form-check form-switch mx-3 mt-3">
                <input checked={settings.nsfwFilter} onChange={(e) => setFilter(e.target.checked)} className="form-check-input" type="checkbox" id="nsfwFilter" />
                <label className="form-check-label text-white" htmlFor="nsfwFilter">NSFW filter</label>
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