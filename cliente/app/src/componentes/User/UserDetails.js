import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchUserInfoMovil } from '../../api';

const UserDetails = () => {

  const dispatch = useDispatch();
  const history = useNavigate();
  const { username } = useParams();
  const [usermobile, setUserMobile] = useState();

  useEffect(() => {
    console.log(username);
    fetchUserInfoMovil(username).then((response) =>{
      setUserMobile(response.data);
    })
  }, [username])

  return (
    <div>UserDetails</div>
  )
}

export default UserDetails