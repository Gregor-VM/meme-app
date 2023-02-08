import { MemesResponse } from '../interfaces/Meme';
import axiosInstance from './axios';

export async function getMemes (index: number = 0, limit = 50, serverList: string[]): Promise<MemesResponse> {
    const {data} = await axiosInstance.get(`/${serverList[index]}/${limit}`);
    if(index + 1 > serverList.length) index = -1;
    return ({...data, nextIndex: index + 1});
}