import axios from 'axios';
import { Button } from 'components/atoms/Button/Button';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Swal from 'sweetalert2';

const Emails = () => {
  const handleSendEmails = () => {
    axios
      .post(`http://127.0.0.1:8000/api/emails`)
      .then((response) => {
        if (response.status === 200) {
          Swal.fire('Sent!', 'Customer e-mails have been sent.', 'success');
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <Container>
      <p>Send e-mails to customers to remind them of the visit</p> <Button onClick={handleSendEmails}>Send</Button>
    </Container>
  );
};

export default Emails;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80vw;
  padding: 20px;
`;
