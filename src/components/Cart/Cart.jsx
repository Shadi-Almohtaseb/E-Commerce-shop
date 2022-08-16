import React from 'react';
import { Container, Typography, Button, Grid, Box } from '@mui/material';
import Cartitem from './Cartitem/Cartitem';
import { Link } from 'react-router-dom';


const Cart = ({ cart , handleUpdateCartQty , handleRemoveFromCart , handleEmptyCart}) => {

    const EmptyCart = () => (
        <Typography marginTop='80px' variant='subtitle1' textAlign='center'  sx={{ display:'flex' , flexDirection:'column' ,gap:'40px'}}>
            You have no items in your shpping cart, start adding some!
            <Link style={{textDecoration: 'none'}} to='/'><Button type='button' variant='contained'>Add Some Items</Button> </Link>
        </Typography>
    );

    const FiledCart = () => (
        <>
            <Grid container spacing={3}>
                {cart.line_items.map((myitem) => (
                    <Grid item xs={12} sm={6} md={4} key={myitem.id}>
                        <Cartitem myitem={myitem} handleUpdateCartQty={handleUpdateCartQty} handleRemoveFromCart={handleRemoveFromCart}/>
                    </Grid>
                ))}
            </Grid>
            <Grid container sx={{
                display: 'flex',
                marginY: '4%',
                width: '100%',
                justifyContent: 'space-between',
            }}>
                <Typography variant='h4'>
                    Subtotal: {cart.subtotal.formatted_with_symbol}
                </Typography>
                <Box marginTop='19px'>
                    <Button onClick={() => handleEmptyCart()} sx={{ minWidth: '150px', marginRight: '40px' }} size='large' type='button' variant='contained' color='error'>
                        Empty Cart
                    </Button>
                    <Button LinkComponent={Link} to='/checkout' sx={{ minWidth: '150px' }} size='large' type='button' variant='contained' color='primary'>
                        Checkout
                    </Button>
                </Box>
            </Grid>
        </>
    );

    if (!cart.line_items) return 'Loading...';


    return (
        <Container>
            <Typography variant='h3' sx={{ marginTop: '80px', marginBottom: '50px' }} textAlign='center' gutterBottom>
                Your Shopping Cart
            </Typography>
            {!cart.line_items.length ? <EmptyCart /> : <FiledCart />}
        </Container>
    )
}

export default Cart
