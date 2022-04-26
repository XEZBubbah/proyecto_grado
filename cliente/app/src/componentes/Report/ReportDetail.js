import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Paper, CircularProgress } from '@mui/material';
import { getReport } from '../../actions/reports';

const ReportDetail = () => {

  const { report, reports, isLoading } = useSelector((state)=>state.reports)
  const dispatch = useDispatch();
  const history = useNavigate();
  const  id  = useParams();

  useEffect(()=>{
    dispatch(getReport(id.id));
  },[id])

  if (isLoading) {
    return (
      <Paper elevation={6}>
        <CircularProgress size="7em" />
      </Paper>
    );
  }
  console.log(report);
  
  return (
    <div>
    <Typography>asdasdsad{report.Asunto}</Typography>
    </div>
  )
}

export default ReportDetail