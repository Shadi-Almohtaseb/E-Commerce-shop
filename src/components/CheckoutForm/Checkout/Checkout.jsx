import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CssBaseline, Paper, Stepper, styled, Step, StepLabel, Typography, CircularProgress, Divider, Button } from '@mui/material';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';

import { commerce } from '../../../lib/commerce';

const steps = ['Shipping address', 'Payment details'];

const StyledMain = styled('section')(({ theme }) => ({
    marginTop: '5%',
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
        width: 600,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
}))

const StyledPaper = styled(Paper)(({ theme }) => ({
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
        width: '100%',
        marginTop: 60,
    },
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
        marginTop: theme.spacing(6),
        marginBottom: theme.spacing(6),
        padding: theme.spacing(3),
    },
}))



const Checkout = ({ cart, handleCapturCheckout, errorMessage, order }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState(null);
    const [shippingData, setShippingData] = useState({});

    useEffect(() => {
        const generateToken = async () => {
            try {
                const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' })
                setCheckoutToken(token);
            } catch (error) {

            }
        }
        generateToken();
    }, [cart])

    const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
    const BackStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

    const next = (data) => {
        setShippingData(data);
        nextStep();
    }

    let Confirmation = () => (order.customer ? (
        <>
            <div>
                <Typography sx={{ paddingY: '28px' }} color='success' variant="h5">Thank you for your purchase, {order.customer.firstname} {order.customer.lastname}!</Typography>
                <Divider sx={{ margin: '20px 0' }} />
                <Typography variant="subtitle2">Order ref: {order.customer_reference}</Typography>
            </div>
            <br />
            <Button component={Link} variant="outlined" type="button" to="/">Back to home</Button>
        </>
    ) : (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '40px 0' }}>
            <CircularProgress />
        </div>
    ));

    if (errorMessage) {
        Confirmation = () => (
            <>
                <Typography sx={{ paddingY: '28px' }} color='error' variant="h5">Error: {errorMessage}</Typography>
                <br />
                <Button component={Link} variant="outlined" type="button" to="/">Back to home</Button>
            </>
        );
    }

    const Form = () => activeStep === 0 ? <AddressForm checkoutToken={checkoutToken} next={next} /> : <PaymentForm shippingData={shippingData} checkoutToken={checkoutToken} BackStep={BackStep} handleCapturCheckout={handleCapturCheckout} nextStep={nextStep} />

    return (
        <>
            <CssBaseline />
            <StyledMain style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <StyledPaper sx={{ marginTop: '80px', width: '75%', }}  >
                    <Typography variant='h4' align='center'>Checkout</Typography>
                    <Stepper activeStep={activeStep} >
                        {steps.map((step) => (
                            <Step key={step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />}
                </StyledPaper>
            </StyledMain>
        </>
    )
}

export default Checkout
