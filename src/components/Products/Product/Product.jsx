import React from 'react';
import { Card, CardMedia, CardActions, Typography, IconButton, CardContent } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const Product = ({ item , onAddToCart}) => {
    return (
        <Card sx={{ maxWidth: "100%" }}>
            <CardMedia sx={{ height: 0, paddingTop: '69.25%' }} image={item.image.url} title={item.name} alt={item.name}/>
            <CardContent>
                <div sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant='h5' gutterBottom>
                        {item.name}
                    </Typography>
                    <Typography variant='h5' gutterBottom>
                        {item.price.formatted_with_symbol}
                    </Typography>
                </div>
                <Typography dangerouslySetInnerHTML={{__html: item.description}} variant='body2' color="textSeconary" />
            </CardContent>
            <CardActions disableSpacing sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <IconButton aria-label='Add to Cart' onClick={() => onAddToCart(item.id , 1)}>
                    <AddShoppingCartIcon />
                </IconButton>
            </CardActions>
        </Card>
    )
}

export default Product
