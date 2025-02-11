import React, { useEffect } from 'react';
import { useParams, } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import {   apiGet  } from "../../utils/api";
const UserConfirmation = () => {
//   const history = useHistory();
  const { userId, token } = useParams();
  const Navigate = useNavigate();


useEffect(() => {
  const confirmUser = async () => {
    try {
      await apiGet(`/users/confirm/${userId}/${token}`);
    
      Swal.fire({
        title: 'Account Confirmed!',
        text: 'Your account has been verified successfully. You can now log in.',
        icon: 'success',
        showConfirmButton: false,
      });

      // Close SweetAlert after 2 seconds
      setTimeout(() => {
        Swal.close();
        // Navigate to the desired page
        Navigate('/sign-in');
      }, 4000);
    } catch (error) {
      console.error('Error confirming user:', error.message);
      // Handle errors and display an appropriate message
      Swal.fire({
        title: 'Error',
        text: 'There was an error confirming your account. Please try again later.',
        icon: 'error',
      });
    }
  };

  confirmUser();
}, [userId, token]);


  return (
    <div>
      {/* <h1>User Confirmation Page</h1> */}
      {/* You can add additional content if needed */}
    </div>
  );
};

export default UserConfirmation;
