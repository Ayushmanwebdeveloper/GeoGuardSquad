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
import { useSession, getSession } from 'next-auth/react'
import { getServerSession } from "next-auth/next"
import Link from 'next/link';
import { Alert, AlertTitle } from '@mui/material';
import { signIn } from "next-auth/react"
import { authOptions } from '/pages/api/auth/[...nextauth]';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import NavBar from '../components/NavBar/NavBar';

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

export default function Home({ incidents, user }) {
  const [pushPins, setpushPins] = useState([]);
  const [center, setCenter] = useState([]);
  let isdisabled= true;
  let crruser = null;
  const uniqueKey = Date.now();
  console.log(incidents);

  if (user) {
    console.log(user);
    isdisabled = false;
    crruser = user;
  }
  
  useEffect(() => {
      navigator.geolocation.getCurrentPosition(function (position) {
      let userCenter = { latitude: position.coords.latitude, longitude: position.coords.longitude };
      setCenter(userCenter);
      let dbpushPins = incidents.map(incident => {
        return {
          center: incident?.pushPin?.center,
          options: {
            title: incident?.pushPin?.options?.title,
            subTitle: incident?.pushPin?.options?.subTitle,
          },
        }
      }
      );
      const pushPin = {
        center: userCenter,
        options: {
          title: "My Location",
        },
      };
      setpushPins(currentList => [...currentList, pushPin, ...dbpushPins]);
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

  const [open, setOpen] = useState(false);
  const [openReqnotfilled, setOpenReqnotfilled] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
    setOpenReqnotfilled(false);
  };
  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  if (pushPins.length === 0) {
    return <div>Loading...</div>;
  }
  console.log(sessionStorage.getItem('latitude'));
  const handleSubmit = async (event) => {
    event.preventDefault();

    await fetch('/api/createMsg', {
      body: parseFloat(sessionStorage.getItem('latitude'))+parseFloat(sessionStorage.getItem('longitude')),
      method: 'POST'
    })

    const data = new FormData(event.target);
    if(!crruser){
      return;
    }
    if( !data.get('emergency-text')|| !data.get('location-text')|| !data.get('additional-info')|| !data.get('call-emergency')|| !data.get('call-amulance')|| !data.get('seriousness')){
      setOpenReqnotfilled(true);
      return;
    }
    let incident = {
      emergency: data.get('emergency-text'),
      location: data.get('location-text'),
      additional: data.get('additional-info'),
      callEmergency: data.get('call-emergency'),
      callAmbulance: data.get('call-amulance'),
      seriousness: data.get('seriousness'),
      user:crruser,
   }
    
    incident = {
      ...incident, pushPin: {
        center: { latitude: parseFloat(sessionStorage.getItem('latitude')), longitude: parseFloat(sessionStorage.getItem('longitude')) },
        options: {
          title: incident.location,
          subTitle: incident.emergency,
        },
      } }

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
      <NavBar cuser={crruser} />
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Geo Guard Squad
        </h1>
        <BingMapsReact key={uniqueKey} pushPins={pushPins} height="80vh" viewOptions={{ center: center, mapTypeId: 'aerial', zoom: 19 }} bingMapsKey={process.env.NEXT_PUBLIC_API} />
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 2 }, textAlign: 'center', borderBottomLeftRadius: 2, borderBottomRightRadius: 2, border: '1px solid #eaeaea', p: 1, boxShadow: 1, bgcolor: 'background.paper',
          }}
          noValidate
          className='incident-form'
          autoComplete="off"
          onSubmit={handleSubmit}
        >

         {isdisabled && ( 
            <Alert severity="info" sx={{textAlign:'left', marginTop:2}}>
              <AlertTitle>You need to be Logged in to Submit an incident</AlertTitle>
              <button onClick={() => signIn('google',{ callbackUrl: "/red" })}>Sign in with Google</button>
              Click here to login - <strong><Link target='_blank' href={`/api/auth/signin`} >Sign in with Google</Link></strong>
            </Alert>)}

          <TextField
            required
            id="emergency-text"
            name='emergency-text'
            label="What's the Emergency?"
            multiline
            maxRows={4}
            sx={{ width: '45vw' }}
            disabled={isdisabled}
          />
          <TextField
            required
            id="location-text"
            name='location-text'
            label="Your exact location now?"
            multiline
            maxRows={4}
            sx={{ width: '45vw' }}
            disabled={isdisabled}
          />
          <br />
          <TextField
            required
            id="additional-info"
            name='additional-info'
            label="Additional Information"
            multiline
            sx={{ width: '45vw' }}
            disabled={isdisabled}
          />
          <TextField
            required
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
            required
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
            required
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
              Upload EVIDENCE
              <VisuallyHiddenInput type="file" />
            </Button>
          </div>
          <Button variant="contained" disabled={isdisabled} type="submit" onClick={handleClick} endIcon={<SendIcon />} size='large' sx={{marginTop:3}}>
            Submit
          </Button>
          <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            message="Incident Submitted Successfully"
            action={action}
          />
          <Snackbar
            open={openReqnotfilled}
            autoHideDuration={6000}
            onClose={handleClose}
            message="Please fill all the required fields"
            action={action}
          />
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

export async function getServerSideProps({ req, res }) {
  try {
    const client = await clientPromise;
    const db = client.db("admin1");
    const incidents = await db
      .collection("incidentdata")
      .find({})
      .toArray();
    const session = await getServerSession(req, res, authOptions);
    res.setHeader(
      'Cache-Control',
      'no-cache, no-store, max-age=0, must-revalidate'
    )
    if(!session){
      return {
        props: { incidents: JSON.parse(JSON.stringify(incidents)), user: null },
      };
    }
    return {
      props: { incidents: JSON.parse(JSON.stringify(incidents)), user: JSON.parse(JSON.stringify(session?.user)) },
    };
  } catch (e) {
      console.error(e);
  }
}