import React, { useState } from 'react';
import { Link } from 'react-router';
import {
  Avatar,
  Box,
  Menu,
  Button,
  IconButton,
  MenuItem,
  ListItemIcon,
  ListItemText, Typography
} from '@mui/material';

import { IconDashboard, IconMail, IconUser, IconSettings } from '@tabler/icons-react';

import ProfileImg from 'src/assets/images/profile/user-3.jpg';
import SigninModal from '../../../components/modals/signin/SigninModal';
import SignupModal from '../../../components/modals/register/SignupModal';
import ForgotPasswordModal from '../../../components/modals/forgotpassword/ForgotPasswordModal';
import ResetPasswordModal from '../../../components/modals/resetpassword/ResetPasswordModal';
import ConfirmEmailModal from '../../../components/modals/confirmemail/ConfirmEmailModal';
import PlansModal from '../../../components/modals/plans/PlansModal';

const Profile = () => {
  const [anchorEl2, setAnchorEl2] = useState(null);
  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  return (
    <Box>
      <IconButton
        size="large"
        aria-label="show 11 new notifications"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          ...(typeof anchorEl2 === 'object' && {
            color: 'primary.main',
          }),
        }}
        onClick={handleClick2}
      >
        <Avatar
          src={ProfileImg}
          alt={ProfileImg}
          sx={{
            width: 35,
            height: 35,
          }}
        />
      </IconButton>
      {/* ------------------------------------------- */}
      {/* Message Dropdown */}
      {/* ------------------------------------------- */}
      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        sx={{
          '& .MuiMenu-paper': {
            width: '200px',
          },
        }}
      >
        {/* <MenuItem>
          <Link to='/form-layouts'>
            <Box display='flex' alignItems='center'>
              <ListItemIcon>
                <IconUser width={20} />
              </ListItemIcon>
              <ListItemText><Typography variant='subtitle1' color='textPrimary'>My Profile</Typography></ListItemText>
            </Box>
          </Link>
        </MenuItem> */}
        {/* <MenuItem>
          <Link to='/tables/basic-table'>
            <Box display='flex' alignItems='center'>
              <ListItemIcon>
                <IconMail width={20} />
              </ListItemIcon>
              <ListItemText><Typography variant='subtitle1' color='textPrimary'>Performance</Typography></ListItemText>
            </Box>
          </Link>
        </MenuItem> */}
        <MenuItem>
          <Link to='/dashboard'>
            <Box display='flex' alignItems='center'>
              <ListItemIcon>
                <IconDashboard width={20} />
              </ListItemIcon>
              <ListItemText><Typography variant='subtitle1' color='textPrimary'>My Dashboard</Typography></ListItemText>
            </Box>
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to='/settings'>
            <Box display='flex' alignItems='center'>
              <ListItemIcon>
                <IconSettings width={20} />
              </ListItemIcon>
              <ListItemText><Typography variant='subtitle1' color='textPrimary'>Settings</Typography></ListItemText>
            </Box>
          </Link>
        </MenuItem>

        {/* <MenuItem>
          <Link to='/dashboard'>
            <Box display='flex' alignItems='center'>
              <SigninModal />
            </Box>
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to='/dashboard'>
            <Box display='flex' alignItems='center'>
              <SignupModal />
            </Box>
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to='/dashboard'>
            <Box display='flex' alignItems='center'>
              <ForgotPasswordModal />
            </Box>
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to='/dashboard'>
            <Box display='flex' alignItems='center'>
              <ResetPasswordModal />
            </Box>
          </Link>
        </MenuItem>    
        <MenuItem>
          <Link to='/dashboard'>
            <Box display='flex' alignItems='center'>
              <ConfirmEmailModal />
            </Box>
          </Link>
        </MenuItem> */}

        {/* <MenuItem>
          <Link to='/dashboard'>
            <Box display='flex' alignItems='center'>
              <PlansModal />
            </Box>
          </Link>
        </MenuItem> */}
        
        <Box mt={1} py={1} px={2}>
          <Button to="/auth/login" variant="outlined" color="primary" component={Link} fullWidth>
            Logout
          </Button>
        </Box>
      </Menu>
    </Box>
  );
};

export default Profile;
