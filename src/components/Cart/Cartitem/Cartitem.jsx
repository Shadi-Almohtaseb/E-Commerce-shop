import React, { useState } from 'react';
import { Typography, Button, Card, CardActions, CardContent, CardMedia ,Box } from '@mui/material';

const Cartitem = ({ myitem, handleRemoveFromCart, handleUpdateCartQty }) => {
    return (
        <Card>
            <CardMedia sx={{ height: 0, paddingTop: '69.25%' }} alt={myitem.name} image={myitem.image.url} title={myitem.name} />
            <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant='h5' gutterBottom>
                        {myitem.name}
                    </Typography>
                    <Typography variant='h5' gutterBottom>
                        {myitem.line_total.formatted_with_symbol}
                    </Typography>
                </Box>
                <Typography dangerouslySetInnerHTML={{ __html: myitem.description }} variant='body2' color="textSeconary" />
            </CardContent>
            <CardActions sx={{ display: 'flex', justifyContent: 'space-between' , padding:'18px' }}>
                <Button type='button' size='medium' onClick={() => handleUpdateCartQty(myitem.id , myitem.quantity - 1 )} >
                    -
                </Button>
                <Typography>
                    {myitem.quantity}
                </Typography>
                <Button  type='button' size='medium' onClick={() => handleUpdateCartQty(myitem.id , myitem.quantity + 1 )} >
                    +
                </Button>
                <Button onClick={() => handleRemoveFromCart(myitem.id)} type='button' variant='contained' color='error' >
                    Remove
                </Button>

            </CardActions>
        </Card>
    )
}

export default Cartitem
