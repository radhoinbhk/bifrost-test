import axios from "axios";

export function createShortUrl(url:string){
    return axios.post(`${process.env.REACT_APP_API_URL}/create`,{'origUrl': url})
}