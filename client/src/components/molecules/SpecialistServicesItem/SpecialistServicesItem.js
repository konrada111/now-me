import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const SpecialistServicesItem = ({ services }) => {
  return (
    <Wrapper>
      {services.map(({ id, name, price, service_length }) => (
        <ListItem key={id}></ListItem>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.ul``;

const ListItem = styled.li``;

SpecialistServicesItem.propTypes = {};

export default SpecialistServicesItem;
