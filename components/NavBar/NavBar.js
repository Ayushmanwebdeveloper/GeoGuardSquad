import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Link from '@mui/material/Link';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
const settings = ['Profile', 'Account', 'Products', 'Logout', 'Follow Me@LinkedIn'];

function NavBar({cuser}) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  let user = cuser
  const logoutHandler = () => {
    fetch('/api/auth/signout', {
      method: 'GET'
    })
      .catch((err) => {
        console.log(err);
      });
  }
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

    return (
      <AppBar position="static" sx={{ backgroundColor: '#FFEFBA', width:'100vw' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <IntegrationInstructionsIcon sx={{ color: 'black', display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'black',
                textDecoration: 'none',
              }}
            >
              <span id='logo'>Geo Guard Squad</span>
            </Typography>
  
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="black"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                
                <Link href="#"> <MenuItem key='page' onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">Products</Typography>
                  </MenuItem></Link>
  
                  <Link>  <MenuItem key='page' onClick={logoutHandler}>
                    <Typography textAlign="center">LogOut</Typography>
                  </MenuItem></Link>
              </Menu>
            </Box>
            {/* <IntegrationInstructionsIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'black',
                textDecoration: 'none',
              }}
            >
              Geo Guard Squad
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              
                <Button
                  key="Products"
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'black', display: 'block' }}
                >
                Products
                </Button>

              {  user?.email ? (
                <Button
                  key="LogOut"
                  href="/api/auth/signout"
                  sx={{ my: 2, color: 'black', display: 'block' }}
                > LOG OUT
                </Button>
                ) :(
                <Button
                  key="LogIn"
                  href="/api/auth/signin"
                  sx={{ my: 2, color: 'black', display: 'block' }}
                >
                LOG IN
                </Button>
                )
              }

                
              
            </Box>
  
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <SettingsApplicationsIcon sx={{color:'black',display: { xs: 'none', md: 'flex' }, mr: 1,fontSize: 40 }} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    );
  }

export default NavBar;
