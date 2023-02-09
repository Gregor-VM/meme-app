export interface Settings {
    batchSize: number;
    serverList: Array<string>;
    changeSettings?: (changeSettings: Partial<Settings>) => void;
    nsfwFilter: boolean;
}