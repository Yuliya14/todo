import FormControl from '@mui/material/FormControl'
import Grid from '@mui/material/Grid'
import React from 'react'
import {Button, Checkbox, FormControlLabel, FormGroup, FormLabel, TextField} from "@mui/material";

export const Login = () => {
    return <Grid container justifyContent={"center"}>
        <FormControl>
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
                <TextField label='Email' margin='normal'/>
                <TextField label='Password' margin='normal' type={'password'}/>
                <FormControlLabel control={<Checkbox color={'error'}/>} label={'Remember me'}/>
                <Button type={'submit'} variant={'outlined'} color={'inherit'}>Login</Button>
            </FormGroup>
        </FormControl>

    </Grid>
}