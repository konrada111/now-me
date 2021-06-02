import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { enterUserToken, enterUserRole, enterUserId } from '../features/appSlice';

const initialFormState = {
  email: '',
  password: '',
};

const initialValidState = {
  email: true,
  password: true,
};

const useLoginForm = () => {
  const [formValues, setFormValues] = useState(initialFormState);
  const [isValid, setIsValid] = useState(initialValidState);

  const dispatch = useDispatch();
  const history = useHistory();

  const handleInputChange = (event) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (isValid.email === true && formValues.email.length > 0 && isValid.password === true && formValues.password.length > 0) {
      axios
        .post('http://127.0.0.1:8000/api/auth/login', {
          email: formValues.email,
          password: formValues.password,
        })
        .then((response) => {
          console.log(response.data.user.id);
          if (response.status === 200) {
            dispatch(
              enterUserToken({
                userToken: response.data.access_token,
              })
            );
            dispatch(
              enterUserRole({
                userRole: response.data.user.role,
              })
            );
            dispatch(
              enterUserId({
                id: response.data.user.id,
              })
            );
            localStorage.setItem('token', response.data.access_token);
            localStorage.setItem('role', response.data.user.role);
            localStorage.setItem('userId', response.data.user.id);
            Swal.fire({
              icon: 'success',
              title: 'Successful login',
              confirmButtonText: `Ok`,
            }).then((result) => {
              if (result.isConfirmed) {
                history.push('/');
              }
            });
          }
        })
        .catch((err) => {
          Swal.fire({
            icon: 'error',
            title: 'Wrong username or password',
            confirmButtonText: `Ok`,
          });
        });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: '<a href>Why do I have this issue?</a>',
      });
    }
  };

  const handleValidData = (e) => {
    if (e.target.name === 'email') {
      if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(formValues.email)) {
        setIsValid({
          ...isValid,
          [e.target.name]: true,
        });
      } else {
        if (formValues.email.length === 0) {
          setIsValid({
            ...isValid,
            email: true,
          });
        } else {
          setIsValid({
            ...isValid,
            [e.target.name]: false,
          });
        }
      }
    } else if (e.target.name === 'password') {
      if (formValues.password.length < 8) {
        if (formValues.password.length === 0) {
          setIsValid({
            ...isValid,
            password: true,
          });
        } else {
          setIsValid({
            ...isValid,
            [e.target.name]: false,
          });
        }
      } else {
        setIsValid({
          ...isValid,
          [e.target.name]: true,
        });
      }
    }
  };

  return { handleInputChange, handleLogin, handleValidData, formValues, isValid };
};

export default useLoginForm;
