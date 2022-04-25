import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getUser } from '../../actions/users';
import { Typography, Paper, CircularProgress } from '@mui/material';

const UserDetails = () => {

  const { user, users, isLoading } = useSelector((state)=>state.users)
  const dispatch = useDispatch();
  const history = useNavigate();
  const  id  = useParams();

  useEffect(()=>{
    dispatch(getUser(id.id));
  },[id])
  
  if (isLoading) {
    return (
      <Paper elevation={6}>
        <CircularProgress size="7em" />
      </Paper>
    );
  }
  console.log(user);
  return (
    <div>
    <Typography>asdasdsad</Typography>
    </div>
  )
}

export default UserDetails