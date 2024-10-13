import React from "react";
import { ROUTES } from "../config/enums";
import APP_ASSETS from "../config/assets";
import { NavbarItem } from "./NavbarItem";
// import Brochure from "../../public/assets/Brochure.pdf";

enum NavbarItemEnum {
  HOME = "HOME",
  PRODUCTS = "PRODUCTS",
  CATEGORIES = "CATEGORIES",
}

export const Navbar = () => {
  const [selected, setSelected] = React.useState<NavbarItemEnum>(
    NavbarItemEnum.HOME
  );
  const [expanded, setExpanded] = React.useState(false);

  return (
    <>
      <nav className="hidden md:block px-8 top-0 bg-white w-[100%] border-[#1999D6] border-b-[2px] fixed">
        <div className="flex flex-row justify-between">
          <div className="">
            <img
              src={APP_ASSETS.LOGO}
              alt="Alfab Electric"
              width={90}
              height={90}
            />
          </div>
          <ul className="flex flex-row items-center">
            <NavbarItem
              title={NavbarItemEnum.HOME}
              link={ROUTES.HOME}
              selected={selected === NavbarItemEnum.HOME}
              onClick={() => setSelected(NavbarItemEnum.HOME)}
            />
            <NavbarItem
              title={NavbarItemEnum.PRODUCTS}
              link={ROUTES.PRODUCTS}
              selected={selected === NavbarItemEnum.PRODUCTS}
              onClick={() => setSelected(NavbarItemEnum.PRODUCTS)}
            />
            <NavbarItem
              title={NavbarItemEnum.CATEGORIES}
              link={ROUTES.CATEGORIES}
              selected={selected === NavbarItemEnum.CATEGORIES}
              onClick={() => setSelected(NavbarItemEnum.CATEGORIES)}
            />
          </ul>
        </div>
      </nav>
      <div className="z-50 visible md:hidden">
        <nav className="top-0 bg-white w-screen">
          <div className="flex flex-row items-center justify-between  px-5">
            <img
              src={APP_ASSETS.LOGO}
              alt="Alfab Electric"
              width={70}
              height={70}
            />
            <button onClick={() => setExpanded(!expanded)}>
              <img
                className="w-5 h-5"
                src={APP_ASSETS.MENU}
                alt="menu"
                //  width={25} height={25}
              />
            </button>
          </div>
        </nav>
        {expanded && (
          <div
            className="w-screen h-screen top-0 left-0 fixed"
            onClick={() => setExpanded(false)}
          >
            <div className="bg-[#D9D9D9] h-screen w-[70%]">
              <ul className="flex flex-col pt-10 gap-10 items-start">
                <NavbarItem
                  title={NavbarItemEnum.HOME}
                  link={ROUTES.HOME}
                  selected={selected === NavbarItemEnum.HOME}
                  onClick={() => setSelected(NavbarItemEnum.HOME)}
                />
                <NavbarItem
                  title={NavbarItemEnum.PRODUCTS}
                  link={ROUTES.PRODUCTS}
                  selected={selected === NavbarItemEnum.PRODUCTS}
                  onClick={() => setSelected(NavbarItemEnum.PRODUCTS)}
                />
                <NavbarItem
                  title={NavbarItemEnum.CATEGORIES}
                  link={ROUTES.CATEGORIES}
                  selected={selected === NavbarItemEnum.CATEGORIES}
                  onClick={() => setSelected(NavbarItemEnum.CATEGORIES)}
                />
              </ul>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
