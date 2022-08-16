import React from 'react';
import { Grid, styled } from '@mui/material';
import Product from './Product/Product';

const StyledMain = styled('section')(({ theme }) => ({
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
    marginTop: '6rem',
}))

const Products = ({ products, onAddToCart }) => {
    return (
        <StyledMain>
            <Grid container justifyContent='center' spacing={4} >
                {products.map((item) => (
                    <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
                        <Product item={item} onAddToCart={onAddToCart}/>
                    </Grid>
                ))}
            </Grid>
        </StyledMain>
    )
}

export default Products
