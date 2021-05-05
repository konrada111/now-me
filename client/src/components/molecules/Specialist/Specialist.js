import React from 'react';
import styled from 'styled-components';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { useRouteMatch } from 'react-router';
import { Link, Route, Switch } from 'react-router-dom';
import SpecialistServices from '../../organism/SpecialistServices/SpecialistServices';

const Specialist = ({ data: { firstName, lastName, id, profession } }) => {
  let { path, url } = useRouteMatch();

  return (
    <Wrapper>
      <Icon>
        <AccountCircleIcon />
      </Icon>
      <Name>
        <span>{firstName}</span>
        <span>{lastName}</span>
      </Name>
      <ProffesionName>{profession}</ProffesionName>
      <More to={`${path}/${id}?`}>More...</More>
    </Wrapper>
  );
};

export default Specialist;

const Wrapper = styled.div`
  width: 200px;
  height: 280px;
  background-color: #f7f8fa;
  padding: 20px 30px;
  border-radius: 25px;
  box-shadow: 0 5px 15px -10px rgba(0, 0, 0, 0.7);
  margin: 25px;
`;

const Icon = styled.div`
  .MuiSvgIcon-root {
    font-size: 100px;
    color: ${({ theme }) => theme.colors.grey};
  }
  display: grid;
  place-items: center;
`;

const Name = styled.p`
  display: grid;
  grid-template-columns: 1fr;
  place-items: center;
  grid-row-start: 2;
  span {
    margin: 2px;
  }
`;

const ProffesionName = styled.p`
  padding: 10px;
  display: grid;
  place-items: center;
  grid-row-start: 3;
`;
const More = styled(Link)`
  color: #5163a2;
  cursor: pointer;
  text-decoration: none;
  :hover {
    opacity: 0.7;
  }
`;
