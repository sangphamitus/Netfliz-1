import React, { useState, useRef, useEffect } from 'react';
import { Button } from "./Button";
import { Input } from './Input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faBars} from '@fortawesome/free-solid-svg-icons'
import NetflizLogo from '../assets/images/pink2-logo.png'
import { Link } from 'react-router-dom';

const NavBar = () => {
  const [showLinks, setShowLinks] = useState(false);
  const linksContainerRef = useRef(null);
  const linksRef = useRef(null);
  const toggleLinks = () => {
    setShowLinks(!showLinks);
  };
  useEffect(() => {
    const linksHeight = linksRef.current.getBoundingClientRect().height;
    if (showLinks) {
      linksContainerRef.current.style.height = `${linksHeight}px`;
    } else {
      linksContainerRef.current.style.height = "0px";
    }
  }, [showLinks]);
  return (
    <div className="nav-center flex flex-row bg-black bg-opacity-75">
      <div className="nav-header px-6">
        <button className="nav-toggle hidden" onClick={toggleLinks}>
          <FontAwesomeIcon icon={faBars} />
        </button>
        <Link to="/HomePage">
          <img
            src={NetflizLogo}
            className="logo w-[160px] max-w-none"
            alt="logo"
          />
        </Link>
      </div >
      <div className="links-container" ref={linksContainerRef}>
        <ul className="links" ref={linksRef}></ul>
      </div>
      <div className="nav-header px-6">
        <Button theme={"bg-opacity-100 my-2"}>
          <Link className="text-4xl font-button text-[#CD0574]" to='/'>Category</Link>
        </Button>
      </div>
      <div className="flex mr-0 w-5 ml-auto">
        <Input
          inputTheme={"p-4 h-15 max-2w-xl w-auto bg-black bg-opacity-25"} 
          placeHolder={"Input movie name, category, actor"}
          containerTheme={"pt-2 mb-2 w-auto bg-opacity-25"}
          textColor={"white"}
        ></Input>
        <Button
          className="nav-toggle"
          onClick={toggleLinks}
          theme="mt-2 w-14 rounded-full ml-0"
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} inverse size="2x" />
        </Button>
      </div>
      <div className='mr-0 ml-auto'>
        <Button theme={"bg-gray-200 my-2 mr-5 w-28 rounded-full"}>
          <Link className="text-4xl font-button text-[#CD0574]" to='/LogInPage'>LOGIN</Link>
        </Button>
        <Button theme={"bg-[#CD0574] my-2 mr-5 w-28 rounded-full"}>
          <Link className="text-4xl font-button text-gray-200" to='/SignUpPage'>SIGNUP</Link>
        </Button>
      </div>
    </div>
  );
};
export { NavBar };