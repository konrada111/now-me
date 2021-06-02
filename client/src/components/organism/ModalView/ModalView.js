import { Button } from 'components/atoms/Button/Button';
import { Select } from 'components/atoms/Select/Select';
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { selectUserId } from '../../../features/appSlice';

import { TextField } from '@material-ui/core';
import { useSelector } from 'react-redux';

const ModalView = ({ isOpen, setIsOpen, day, month, year }) => {
  const { id, service } = useParams();
  const [specialist, setSpecialist] = useState('');
  const [serviceData, setServiceData] = useState('');
  const [visits, setVisits] = useState([]);
  const [time, setTime] = useState('07:30');
  const [startDate] = useState(`${year}-${month.toString().length < 2 ? '0' + month : month}-${day.toString().length < 2 ? '0' + day : day}`);

  const userId = useSelector(selectUserId);

  const date = {
    employee_id: id,
    day: day,
    month: month + 1,
    year: parseInt(year),
  };

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

  // useEffect(() => {
  //   const fetchVisits = async () => {
  //     await axios
  //       .post(`http://127.0.0.1:8000/api/dailyVisits`, date)
  //       .then((response) => console.log(response))
  //       .catch((err) => console.log(err));
  //   };

  //   fetchVisits();
  // }, []);

  const handleReserveVisit = () => {
    const newTime = new Date(new Date('1970/01/01 ' + time).getTime() + (serviceData.service_length / 60) * 60000).toLocaleTimeString('en-UK', { hour: '2-digit', minute: '2-digit', hour12: false });
    axios
      .post(`http://127.0.0.1:8000/api/visit`, {
        employee_id: id,
        user_id: userId,
        service_id: service,
        start: `${startDate} ${time}`,
        end: `${startDate} ${newTime}`,
      })
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  };

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
      <TextField
        id="time"
        label="Time selection"
        type="time"
        defaultValue="07:30"
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 300, // 5 min
        }}
        size="medium"
        onChange={(e) => setTime(e.target.value)}
      />
      <Button onClick={handleReserveVisit}>Reserve</Button>
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
