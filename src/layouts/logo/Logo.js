import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import React from 'react';
import LogoDarkText from '../../assets/images/logos/drbwc_logo.svg';
import { ReactComponent as LogoWhiteIcon } from '../../assets/images/logos/elite-white-icon.svg';
import LogoWhiteText from '../../assets/images/logos/logo-light-text.png';
import SmallLogo from '../../assets/images/logos/logo_small.jpg';


const Logo = () => {
  const isDarkMode = useSelector((state) => state.customizer.isDark);
  const toggleMiniSidebar = useSelector((state) => state.customizer.isMiniSidebar);
  const activeSidebarBg = useSelector((state) => state.customizer.sidebarBg);
  return (
    <Link to="/admin" className="d-flex align-items-center justify-content-center gap-2">
      {isDarkMode || activeSidebarBg !== 'white' ? (
        <>
          <LogoWhiteIcon />
          {toggleMiniSidebar ? '' : <img src={LogoWhiteText} className="d-none d-lg-block" alt='logo-text' />}
        </>
      ) : (
        <>

          {toggleMiniSidebar ? <img src={SmallLogo} className="d-none d-lg-block rounded-3" height={40} alt='logo-text' /> : <img src={LogoDarkText} className="d-none d-lg-block" height={45} alt='logo-text' />}
        </>
      )}
    </Link>
  );
};

export default Logo;
