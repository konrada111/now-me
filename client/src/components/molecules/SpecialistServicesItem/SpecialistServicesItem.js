import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from '../../atoms/Button/Button';
import { Link } from 'react-router-dom';
import { useRouteMatch } from 'react-router';

const SpecialistServicesItem = ({ services }) => {
  let { path, url } = useRouteMatch();
  return (
    <List>
      {services.map(({ id, name, price, service_length }) => (
        <ListItem key={id}>
          <Paragraph>{name}</Paragraph>
          <Paragraph>{price} zł</Paragraph>
          <Paragraph>{service_length / 60} min</Paragraph>
          <Button>
            <More to={`${url}/${id}?`}>Wybierz</More>
          </Button>
        </ListItem>
      ))}
    </List>
  );
};

const More = styled(Link)`
  color: #5163a2;
  cursor: pointer;
  text-decoration: none;
  :hover {
    opacity: 0.7;
  }
`;

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
