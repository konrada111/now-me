import React from 'react';
import { FaBars } from 'react-icons/fa';
import { Nav, NavContainer, NavLogo, MobileIcon, NavLinks, NavMenu, NavItem, NavBtn, NavBtnLink } from './Navbar.style';
import { useSelector } from 'react-redux';
import { selectUserToken, selectUserRole } from '../../../features/appSlice';

export const Navbar = ({ toggle }) => {
  const token = useSelector(selectUserToken);
  const role = useSelector(selectUserRole);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    window.location.reload();
  };
  return (
    <>
      <Nav>
        <NavContainer>
          <NavLogo to="/">Novme</NavLogo>
          <MobileIcon onClick={toggle}>
            <FaBars />
          </MobileIcon>
          <NavMenu>
            <NavItem>
              <NavLinks to="/specialist">Specialist</NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks to="/discover">Discover</NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks to="/about">About</NavLinks>
            </NavItem>
            {token && role === 'admin' ? (
              <NavItem>
                <NavLinks to="/admin-panel">Admin panel</NavLinks>
              </NavItem>
            ) : null}
          </NavMenu>
          {token && role ? (
            <NavBtn>
              <NavBtnLink to="/" onClick={handleLogout}>
                Logout
              </NavBtnLink>{' '}
            </NavBtn>
          ) : (
            <NavBtn>
              <NavBtnLink to="/login"> Sign In</NavBtnLink>
            </NavBtn>
          )}
        </NavContainer>
      </Nav>
    </>
  );
};
