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
import clientPromise from '../utils/database'
import { useSession } from 'next-auth/react'
import Link from 'next/link';
import { Alert, AlertTitle } from '@mui/material';

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

export default function Home({ incidents }) {
  const [pushPins, setpushPins] = useState([]);
  const [center, setCenter] = useState([]);
  let isdisabled=false;
  const { session, status } = useSession();
  console.log(session);
 
    if(!session){
      isdisabled = true;
    }

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const user={
      name:session.user.name,
      email:session.user.email,
      image:session.user.image,
    }
    const incident = {
      emergency: data.get('emergency-text'),
      location: data.get('location-text'),
      additional: data.get('additional-info'),
      callEmergency: data.get('call-emergency'),
      callAmbulance: data.get('call-amulance'),
      seriousness: data.get('seriousness'),
      user:user
    }
    const res = await fetch('/api/createincidents', {
      body: JSON.stringify(incident),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    }).then(resp => resp.json());
  };
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Geo Guard Squad
        </h1>
        <BingMapsReact pushPins={pushPins} height="80vh" viewOptions={{ center: center, mapTypeId: 'aerial', zoom: 19 }} bingMapsKey={process.env.NEXT_PUBLIC_API} />
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 2 }, textAlign: 'center'
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >

         {!session && ( 
            <Alert severity="info" sx={{textAlign:'left', marginTop:2}}>
              <AlertTitle>You need to be Logged in to Submit an incident</AlertTitle>
              Click here to login - <strong><Link href={`/api/auth/signin`} >Sign in with Google</Link></strong>
            </Alert>)}

          <TextField
            id="emergency-text"
            name='emergency-text'
            label="What's the Emergency?"
            multiline
            maxRows={4}
            sx={{ width: '45vw' }}
            disabled={isdisabled}
          />
          <TextField
            id="location-text"
            name='location-text'
            label="Where are you?"
            multiline
            maxRows={4}
            sx={{ width: '45vw' }}
            disabled={isdisabled}
          />
          <br />
          <TextField
            id="additional-info"
            name='additional-info'
            label="Additional Information"
            multiline
            sx={{ width: '45vw' }}
            disabled={isdisabled}
          />
          <TextField
            id="call-emergency"
            name='call-emergency'
            select
            label="Select"
            sx={{ width: '22vw' }}
            helperText="Did you called emergency services?"
            disabled={isdisabled}
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="call-amulance"
            name='call-amulance'
            select
            label="Select"
            sx={{ width: '20vw' }}
            helperText="Do you need an ambulance?"
            disabled={isdisabled}
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
            name='seriousness'
            valueLabelDisplay="auto"
            step={1}
            marks
                sx={{ color: 'success.main'}}
            min={1}
            max={5}
            disabled={isdisabled}
          />
            </div>
            <Button component="label" disabled={isdisabled} variant="contained" startIcon={<CloudUploadIcon />}>
              Upload file
              <VisuallyHiddenInput type="file" />
            </Button>
          </div>
          <Button variant="contained" disabled={isdisabled} type="submit" endIcon={<SendIcon />} size='large' sx={{marginTop:3}}>
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
          padding: 1rem 0;
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

export async function getServerSideProps(context) {
  try {
    const client = await clientPromise;
    const db = client.db("admin1");
    const incidents = await db
      .collection("incidentdata")
      .find({})
      .toArray();

    return {
      props: { incidents: JSON.parse(JSON.stringify(incidents)) },
    };
  } catch (e) {
      console.error(e);
  }
}