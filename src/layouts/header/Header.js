import React from 'react';
// import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, NavItem, UncontrolledDropdown, DropdownToggle, DropdownMenu, Button, Input, } from 'reactstrap';
import cogoToast from 'cogo-toast';
import * as Icon from 'react-feather';
import user1 from '../../assets/images/users/user4.jpg';

import { ToggleMiniSidebar, ToggleMobileSidebar } from '../../store/customizer/CustomizerSlice';
import ProfileDD from './ProfileDD';
import Logo from '../logo/Logo';

const Header = () => {
  const navigate = useNavigate();
  // const isDarkMode = useSelector((state) => state.customizer.isDark);
  const topbarColor = useSelector((state) => state.customizer.topbarBg);
  const dispatch = useDispatch();

  // Logout function example
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    cogoToast.error('Logged Out!');
    setTimeout(() => {
      navigate('/');
    }, 500);
  };


  return (
    <Navbar expand="lg" className="topbar bg-themegray" >
      {/******************************/}
      {/**********Toggle Buttons**********/}
      {/******************************/}
      <div className="d-flex align-items-center">
        <Button className="d-none d-lg-block bg-transparent border-0" onClick={() => dispatch(ToggleMiniSidebar())} > <Icon.Menu size={22} className='text-white' /> </Button>
        <div href="/" className="d-sm-flex d-lg-none"> <Logo /> </div>
        <Button color={topbarColor} className="d-sm-block d-lg-none" onClick={() => dispatch(ToggleMobileSidebar())} > <Icon.Menu size={22} /> </Button>
      </div>

      {/******************************/}
      {/**********Left Nav Bar**********/}
      {/******************************/}

      <Nav className="me-auto d-none d-lg-flex" navbar>

        <NavItem className="app-search ps-3">
          <Input id="txt-srch" name="search" placeholder="Search & Enter" className="rounded-pill" type="text" />
        </NavItem>
      </Nav>

      <div className="d-flex align-items-center">
        <UncontrolledDropdown>
          <DropdownToggle className="bg-transparent border-0 p-0">
            <img src={user1} alt="profile" className="rounded-circle me-2" width="40" />
          </DropdownToggle>
          <DropdownMenu className="ddWidth">
            <ProfileDD />
            <div className="p-2 px-3">
              <Button onClick={handleLogout} color="danger" size="sm">
                Logout
              </Button>
            </div>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    </Navbar>
  );
};

export default Header;
