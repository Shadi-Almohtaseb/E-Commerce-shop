import React from 'react';
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import logo from '../../assets/commerce.png';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ totalItems }) => {
    const location = useLocation();
    return (
        <>
            <AppBar position='fixed' color="inherit" sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)', }}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', }}>
                    <Typography component={Link} to='/' variant='h6' color="inherit" sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        textDecoration: 'none',
                        gap: '12px',
                        cursor: 'pointer',
                    }}>
                        <img src={logo} alt="commerce.js" height='38px' sx={{ marginRight: '10px' }} /> Commerce.js
                    </Typography>
                    {(location.pathname === '/') &&
                        (
                            <div>
                                <IconButton LinkComponent={Link} to='/cart' aria-label='Show cart items' color="inherit">
                                    <Badge badgeContent={totalItems} color='error'>
                                        <AddShoppingCartIcon />
                                    </Badge>
                                </IconButton>
                            </div>
                        )
                    }
                </Toolbar>
            </AppBar>

        </>
    )
}

export default Navbar
