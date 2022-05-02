import React from 'react';
import { TextField,InputAdornment, IconButton} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const Input = ({name, label, type, handleShowPassword, disabled}) => (
    <TextField
        name = {name}
        variant="outlined"
        required={!disabled}
        disabled={disabled}
        fullWidth
        label={label}
        InputProps={name === 'password' || 'newPassword' || 'confirmPassword' ? {
            endAdornment: (
                <InputAdornment position="end" >
                    <IconButton onClick={handleShowPassword}>
                        {type === "pasword" ? <Visibility/> : <VisibilityOff/>}
                    </IconButton>
                </InputAdornment>
            )
        } : null}


    />
);



export default Input;