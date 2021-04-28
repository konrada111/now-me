import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import { MainWrapper, Icon, Profile, Services, PersonalData, ProffesionName } from './SpecialistServices.style';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SpecialistServicesItem from '../../molecules/SpecialistServicesItem/SpecialistServicesItem';

const SpecialistServices = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      await axios.get('http://127.0.0.1:8000/api/services-by-employee/25').then((response) => console.log(response.data));
    };
    fetchEmployees();
  }, []);

  return (
    <MainWrapper>
      <Profile>
        <Icon>
          <AccountCircleIcon />
        </Icon>
        <PersonalData>
          <span>Gosia</span>
          <span>Andrzejewicz</span>
        </PersonalData>
        <ProffesionName>Piosenkarka</ProffesionName>
      </Profile>
      <Services>
        <h1>Services: </h1>
        {/*<SpecialistServicesItem services={services} />*/}
      </Services>
    </MainWrapper>
  );
};

SpecialistServices.propTypes = {};

export default SpecialistServices;
