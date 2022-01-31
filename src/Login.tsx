import FormControl from '@mui/material/FormControl'
import Grid from '@mui/material/Grid'
import React from 'react'
import {Button, Checkbox, FormControlLabel, FormGroup, FormLabel, TextField} from "@mui/material";
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {loginTC} from "./state/auth-reducer";
import {AppRootStateType} from "./state/store";
import {Navigate} from "react-router-dom";

export const Login = () => {
    const isLoggedIn = useSelector<AppRootStateType, boolean>(store => store.auth.isLoggedIn)
    const dispatch = useDispatch()

    type formikErrorsType = {
        email?: string
        password?: string
        rememberMe?: boolean
    }
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        onSubmit: values => {
            formik.resetForm()
            dispatch(loginTC(values))

        },
        validate: values => {
            const errors: formikErrorsType = {}
            if (!values.email) errors.email = 'Required'
            else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) errors.email = 'Invalid email'
            else if (!values.password) errors.password = 'Required'
            else if (errors.password && errors.password.length < 5) errors.password = 'Length password should be more 5'
            return errors
        }
    })
    if (isLoggedIn) {
        return <Navigate to={'/'}/>
    }
    return <Grid container justifyContent={"center"}>
        <form onSubmit={formik.handleSubmit}><FormControl>
            <FormLabel>
                <p>To got in get registered
                    <a href={'https://social-network.samuraijs.com/'}
                       target={'_blank'}>here
                    </a>
                </p>
                <p>or use common test account credentials:</p>
                <p>Email: free@samuraijs.com</p>
                <p>Password: free</p>
            </FormLabel>
            <FormGroup>
                <TextField label='Email' margin='normal' {...formik.getFieldProps('email')}/>
                {formik.errors.email ? <div style={{color: 'red'}}>{formik.errors.email}</div> : null}

                <TextField label='Password' margin='normal' type={'password'} {...formik.getFieldProps('password')}/>
                {formik.errors.password ? <div style={{color: 'red'}}>{formik.errors.password}</div> : null}

                <FormControlLabel control={<Checkbox color={'error'}
                                                     checked={formik.values.rememberMe}
                                                     {...formik.getFieldProps('rememberMe')}/>} label={'Remember me'}/>
                <Button type={'submit'} variant={'outlined'} color={'inherit'}>Login</Button>
            </FormGroup>
        </FormControl></form>
    </Grid>
}