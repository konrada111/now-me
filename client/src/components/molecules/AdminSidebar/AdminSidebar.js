import React from 'react';
import styled from 'styled-components';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import SmsIcon from '@material-ui/icons/Sms';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import { NavLink } from 'react-router-dom';

function Siddebar() {
  return (
    <SidebarContainer>
      <SidebarHeader>
        <SidebarInfo>
          <h2>Admin</h2>
          <h3>Karol Cylwik</h3>
        </SidebarInfo>
      </SidebarHeader>
      <hr />
      <StyledLink to={'/admin-panel/cabinets'}>
        <HomeRoundedIcon />
        <h3>Cabinets</h3>
      </StyledLink>
      <StyledLink to={'/admin-panel/specialists'}>
        <AddRoundedIcon />
        <h3>Specialists</h3>
      </StyledLink>
      <StyledLink to={'/admin-panel/services'}>
        <MenuBookIcon />
        <h3>Services</h3>
      </StyledLink>
      <StyledLink to={'/admin-panel/SMS'}>
        <SmsIcon />
        <h3>SMS</h3>
      </StyledLink>
      <StyledLink to={'/admin-panel/emails'}>
        <MailOutlineIcon />
        <h3>E-mails</h3>
      </StyledLink>
    </SidebarContainer>
  );
}

export default Siddebar;

const SidebarContainer = styled.div`
  background-color: #424874;
  color: white;
  width: 20vw;
  min-width: 180px;
  border-top: 1px solid #808080;
  height: 90vh;

  > hr {
    margin-top: 10px;
    margin-bottom: 10px;
    border: 1px solid #808080;
  }
`;

const SidebarHeader = styled.div`
  display: flex;

  padding: 13px;

  > .MuiSvgIcon-root {
    padding: 8px;
    color: #2155be;
    font-size: 18px;
    background-color: white;
    border-radius: 999px;
    cursor: pointer;

    :hover {
      opacity: 0.5;
    }
  }
`;

const SidebarInfo = styled.div`
  flex: 1;
  > h2 {
    font-size: 15px;
    font-weight: 900;
    margin-bottom: 5;
  }
  > h3 {
    display: flex;
    font-size: 15px;
    font-weight: 400;
    align-items: center;
  }

  > h3 > .MuiSvgIcon-root {
    font-size: 14px;
    margin-top: 1px;
    margin-right: 2px;
    color: green;
  }
`;
const activeClassName = 'active-link';
const StyledLink = styled(NavLink).attrs({ activeClassName: activeClassName })`
  display: flex;
  font-size: 12px;
  align-items: center;
  justify-content: center;
  padding-right: 30px;
  cursor: pointer;
  transition: transform 0.2s;
  text-decoration: none;
  color: white;

  :hover {
    transform: scale(1.1);
  }
  .MuiSvgIcon-root {
    font-size: 30px;
  }
  h3 {
    font-size: 20px;
    font-weight: 600;
    margin-left: 10px;
  }
  h3:after {
    display: block;
    content: '';
    border-bottom: solid 5px #fff;
    transform: scaleX(0);
    transition: transform 300ms ease-in-out;
  }
  h3:hover:after {
    transform: scaleX(1);
  }

  &.active-link {
    h3 {
      color: #8f9199;
    }
  }
`;
