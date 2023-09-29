import Head from 'next/head';
import styles from '../styles/Home.module.css';
import BingMapsReact from "../custom-modules/bingmaps-react";
import React, { useEffect, useState } from "react";
import dotenv from "dotenv";
import { mapClickEvent } from "bingmaps-react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SendIcon from '@mui/icons-material/Send';
dotenv.config();
const options = [
  {
    value: 'yes',
    label: 'Yes',
  },
  {
    value: 'no',
    label: 'No',
  }
];

export default function Home() {
  const [pushPins, setpushPins] = useState([]);
  const [center, setCenter] = useState([]);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      let userCenter = { latitude: position.coords.latitude, longitude: position.coords.longitude };
      setCenter(userCenter);
      const pushPin = {
        center: userCenter,
        options: {
          title: "My Location",
        },
      };
      setpushPins(currentList => [...currentList, pushPin]);
    });
  }, []);
  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });
  if (pushPins.length === 0) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
        <BingMapsReact pushPins={pushPins} height="80vh" viewOptions={{ center: center, mapTypeId: 'aerial', zoom: 19 }} bingMapsKey={process.env.NEXT_PUBLIC_API} />
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 2 }, textAlign: 'center'
          }}
          noValidate
          autoComplete="off"
        >
       
          <TextField
            id="emergency-text"
            label="What's the Emergency?"
            multiline
            maxRows={4}
            sx={{ width: '45vw' }}
          />
          <TextField
            id="location-text"
            label="Where are you?"
            multiline
            maxRows={4}
            sx={{ width: '45vw' }}
          />
          <br />
          <TextField
            id="additional-info"
            label="Additional Information"
            multiline
            sx={{ width: '45vw' }}
          />
          <TextField
            id="call-emergency"
            select
            label="Select"
            sx={{ width: '22vw' }}
            helperText="Did you called emergency services?"
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="call-amulance"
            select
            label="Select"
            sx={{ width: '20vw' }}
            helperText="Do you need an ambulance?"
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <div style={{display:'flex',flexDirection:'row',justifyContent:'space-around'}}>
          <div style={{display:'flex',flexDirection:'column',justifyContent:'space-around'}}>
              <Typography id="discrete-slider"  gutterBottom>Seriousness of the emergency ?</Typography>
          
          <Slider
            aria-label="Seriousness of the emergency ?"
            defaultValue={1}
            valueLabelDisplay="auto"
            step={1}
            marks
                sx={{ color: 'success.main'}}
            min={1}
            max={5}
          />
            </div>
            <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
              Upload file
              <VisuallyHiddenInput type="file" />
            </Button>
          </div>
          <Button variant="contained" endIcon={<SendIcon />} size='large' sx={{marginTop:3}}>
            Submit
          </Button>
        </Box>
        
      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel" className={styles.logo} />
        </a>
      </footer>

      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        footer img {
          margin-left: 0.5rem;
        }
        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          color: inherit;
        }
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family:
            Menlo,
            Monaco,
            Lucida Console,
            Liberation Mono,
            DejaVu Sans Mono,
            Bitstream Vera Sans Mono,
            Courier New,
            monospace;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family:
            -apple-system,
            BlinkMacSystemFont,
            Segoe UI,
            Roboto,
            Oxygen,
            Ubuntu,
            Cantarell,
            Fira Sans,
            Droid Sans,
            Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
