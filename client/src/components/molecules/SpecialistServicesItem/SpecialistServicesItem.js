import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from '../../atoms/Button/Button';

const SpecialistServicesItem = ({ services }) => {
  return (
    <List>
      {services.map(({ id, name, price, service_length }) => (
        <ListItem key={id}>
          <Paragraph>{name}</Paragraph>
          <Paragraph>{price} zł</Paragraph>
          <Paragraph>{service_length}</Paragraph>
          <Button>Wybierz</Button>
        </ListItem>
      ))}
    </List>
  );
};

const List = styled.ul`
  list-style-type: none;
  padding: 10px;
`;

const Paragraph = styled.p`
  padding: 10px;
`;

const ListItem = styled.li`
  display: flex;
  flex-direction: row;
  background-color: ${({ theme }) => theme.colors.lightPurple};
  margin: 10px;
`;

SpecialistServicesItem.propTypes = {};

export default SpecialistServicesItem;
