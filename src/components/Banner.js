import '../styles/Banner.css';
import logo from '../media/lesbonsartisansdef.png';
import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import PersonIcon from '@mui/icons-material/Person';

const ColorButton = styled(Button)({
    color: '#1b2150',
    borderColor: '#1b2150',
    padding: '16px 26px',
    fontWeight: '700',
    fontSize: '12px',
    fontFamily: 'Quicksand',
    '&:hover': {
      color: '#FFFFFF',
      backgroundColor: '#1b2150',
      borderColor: '#1b2150'
    },
});

function Banner() {
    return (
        <div className='lmj-banner'>
            <ColorButton variant="outlined" startIcon={<PersonIcon />}>Connectez-vous</ColorButton>
            <div className='banner-title'>
                <img src={logo} alt="logo" className='lmj-logo'/>
                <h1>| Test technique</h1>
            </div>
        </div>
    )
}

export default Banner