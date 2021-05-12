import { Button } from 'components/atoms/Button/Button';
import { Select } from 'components/atoms/Select/Select';
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ModalView = ({ isOpen, setIsOpen }) => {
  const { id, service } = useParams();
  const [specialist, setSpecialist] = useState('');
  const [serviceData, setServiceData] = useState('');

  useEffect(() => {
    const fetchEmployee = async () => {
      await axios.get(`http://127.0.0.1:8000/api/employee/${id}`).then((response) => setSpecialist(response.data.employee));
    };
    fetchEmployee();

    const fetchService = async () => {
      await axios.get(`http://127.0.0.1:8000/api/service/${service}`).then((response) => setServiceData(response.data.service));
    };
    fetchService();
  }, []);
  return (
    <ModalWrapper isOpen={isOpen} appElement={document.getElementById('root')}>
      <InfoWrapper>
        <h2>
          {specialist.firstName} {specialist.lastName}
        </h2>
        <h3>{specialist.profession}</h3>
        <p>{serviceData.name}</p>
        <span>{serviceData.price} zł</span>
        <span>{serviceData.service_length / 60} min</span>
      </InfoWrapper>
      <Button onClick={() => setIsOpen(false)}>Close </Button>
    </ModalWrapper>
  );
};

export default ModalView;

export const ModalWrapper = styled(Modal)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 600px;
  min-height: 500px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 15px;
  box-shadow: 8px -5px 25px -10px rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;

  :focus {
    outline: none;
  }
`;

const InfoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
