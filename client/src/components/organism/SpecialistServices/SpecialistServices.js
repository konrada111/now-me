import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import { MainWrapper, Icon, Profile, Services, PersonalData, ProffesionName } from './SpecialistServices.style';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SpecialistServicesItem from '../../molecules/SpecialistServicesItem/SpecialistServicesItem';
import StarRating from '../../molecules/StarRating/StarRating';

const SpecialistServices = () => {
  const [services, setServices] = useState([]);
  const [specialist, setSpecialist] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    const fetchEmployees = async () => {
      await axios.get(`http://127.0.0.1:8000/api/employee/${id}`).then((response) => setSpecialist(response.data.employee));
    };
    fetchEmployees();
  }, []);

  useEffect(() => {
    const fetchServices = async () => {
      await axios.get(`http://127.0.0.1:8000/api/services-by-employee/${id}`).then((response) => setServices(response.data.services));
    };
    fetchServices();
  }, []);

  return (
    <MainWrapper>
      <Profile>
        <Icon>
          <AccountCircleIcon />
        </Icon>
        <PersonalData>
          <span>{specialist.firstName}</span>
          <span>{specialist.lastName}</span>
        </PersonalData>
        <ProffesionName>{specialist.profession}</ProffesionName>
      </Profile>
      <Services>
        <h1>Services: </h1>
        <SpecialistServicesItem services={services} />
      </Services>
      <StarRating />
    </MainWrapper>
  );
};

SpecialistServices.propTypes = {};

export default SpecialistServices;
