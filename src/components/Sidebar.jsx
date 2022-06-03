import React, {useState} from 'react';
import { Link, NavLink } from 'react-router-dom';
import { GoChevronDown, GoChevronUp } from "react-icons/go";
import { MdOutlineCancel } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { links } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';

const Sidebar = () => {
  const [subnav, setSubnav] = useState(false)
  const { currentColor, activeMenu, setActiveMenu, screenSize } = useStateContext();

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  const showSubnev = () => setSubnav(!subnav)

  const activeLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white  text-md m-2';
  const normalLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2';

  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
            <TooltipComponent content="NITI Aayog" position="BottomCenter">
              <div
            className="flex items-center justify-center p-5 gap-2 cursor-pointer -mb-5 hover:bg-light-gray rounded-lg"
          >
            <img
              className="w-full h-8"
              src="https://niti.gov.in/edm/images/NITIAayog_LOGO_picture.jpg"
              alt="user-profile"
            />
            <img
              className="w-full h-4"
              src="https://niti.gov.in/edm/images/NITIAayog_LOGO_text.jpg"
              alt="user-profile"
            />
            </div>
            </TooltipComponent>

            <TooltipComponent content="Menu" position="BottomCenter">
              <button
                type="button"
                onClick={() => setActiveMenu(!activeMenu)}
                style={{ color: currentColor }}
                className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
              >
                <MdOutlineCancel />
              </button>
            </TooltipComponent>
          </div>
          <div className="mt-10 ">
            {links.map((item) => (
              <div key={item.title}>
                <Link onClick={item.links && showSubnev}
                to={item.path} className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">
                  <div>
                    <h2 className='flex justify-between items-center pr-5'>
                      {item.title}
                      <GoChevronDown />
                    </h2>
                  </div>
                  {
                    item.links && subnav ? GoChevronDown
                    : item.links ? GoChevronUp
                    : null
                  }
                </Link>
                {subnav && item.links.map((link) => (
                  <NavLink
                    to={`/${link.name}`}
                    key={link.name}
                    onClick={handleCloseSideBar}
                    style={({ isActive }) => ({
                      backgroundColor: isActive ? currentColor : '',
                    })}
                    className={({ isActive }) => (isActive ? activeLink : normalLink)}
                  >
                    {link.icon}
                    <span className="capitalize ">{link.name}</span>
                  </NavLink>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
