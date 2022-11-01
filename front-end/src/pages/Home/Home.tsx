import React, {useState} from 'react';
import {Button, ButtonGroup, Paper, TextField} from '@mui/material';
import style from './Home.module.scss';
import { createShortUrl } from 'services/WebServices';
import {CopyAll as CopyAllIcon, OpenInNew as OpenInNewIcon} from '@mui/icons-material/';
export default function Home() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState();
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLongUrl(event.target.value);
  };

  const isValidHttpUrl = (urlParam:string) => {
    let url;
    try {
      url = new URL(urlParam);
    } catch (_) {
      return false;
    }
    return url.protocol === "http:" || url.protocol === "https:";
  }

  const shortenUrl = async () => {
    if (longUrl) {
      if (isValidHttpUrl(longUrl)) {
        if (errorMsg.length !== 0) {
          setErrorMsg('')
        }
        await createShortUrl(longUrl).then((res) => setShortUrl(res.data.shortUrl))
        .catch((error) => {
          let errorMessage = `${error?.response?.status} ${error?.response?.statusText}`;
          if (error?.response?.status === 404) {
            errorMessage = 'Un problème est survenu lors de cette requête au server';
          }
          setErrorMsg(errorMessage)
        });
      }else{
        setErrorMsg('Invalid URL')
      }
    }else{
      setErrorMsg('The URL field is required.')
    }
  }

  const copyShortUrlToClipBoard = async () => {
    if (shortUrl) {
      await navigator.clipboard.writeText(shortUrl);
    }
  };

  const openShortUrlInNewTab = () => {
    window.open(shortUrl, '_blank', 'noopener,noreferrer');
  };

  const initialization =()=>{
    setLongUrl("");
    setShortUrl(undefined)
  }

  return (
    <div className={style.containerHome}>
      <Paper className={style.paper}>
        <div className={style.textFieldSection}>
          <TextField disabled={shortUrl} error={errorMsg.length !== 0} className={style.textField} onChange={handleChange} value={longUrl} id="long-URL" label="Long URL" variant="outlined" />
          {errorMsg.length !== 0 && <p className={style.errorMessage}>{errorMsg}</p>}
        </div>
        {shortUrl && <a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a>}
        {shortUrl &&<ButtonGroup variant="outlined" aria-label="outlined button group">
          <Button endIcon={<OpenInNewIcon/>} onClick={() => openShortUrlInNewTab()}>ouvrir</Button>
          <Button endIcon={<CopyAllIcon />} onClick={() => copyShortUrlToClipBoard()}>Copie</Button>
        </ButtonGroup>}
        <Button variant="contained" onClick={()=>!shortUrl ?shortenUrl(): initialization()}>{!shortUrl ?'Shorten' :'Shorten another'}</Button>
      </Paper>
    </div>
  );
}
