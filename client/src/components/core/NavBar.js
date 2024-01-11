import React from 'react';

import {Navbar, NavbarBrand, NavbarContent, NavbarMenuToggle, NavbarMenu, NavbarMenuItem,  NavbarItem, Link, Button} from "@nextui-org/react";
import {Dropdown, DropdownMenu,DropdownItem, DropdownTrigger} from "@nextui-org/react"


export const ChevronDown = ({fill, size, height, width, ...props}) => {
  return (
    <svg
      fill="none"
      height={size || height || 24}
      viewBox="0 0 24 24"
      width={size || width || 24}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="m19.92 8.95-6.52 6.52c-.77.77-2.03.77-2.8 0L4.08 8.95"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      />
    </svg>
  );
};

export default function NavBar() {

    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    
    const icons = {
      chevron: <ChevronDown fill="currentColor" size={16} />,
    };
    const menuItems = [
      "Home",
      "Features",
      "Job portal",
      "Resources",
      "Contact Us",
      "Log Out",
    ];

  return (
    <Navbar isBordered isBlurred shouldHideOnScroll onMenuOpenChange={setIsMenuOpen} className="border-y-stone-100 z-index-2" >
        <NavbarContent >
            <NavbarMenuToggle
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                className="sm:hidden"
            />
            <NavbarBrand>
                <p className="font-bold text-inherit">JOBX</p>
            </NavbarBrand>
        </NavbarContent>
       
       

        <NavbarContent className="hidden sm:flex gap-5" justify="center">
        <NavbarItem isActive >
            <Link color="foreground" href="#" className="text-sm subpixel-antialiased">
            Home 
            </Link>
        </NavbarItem>
        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className="p-0 mt-0.5 bg-transparent data-[hover=true]:bg-transparent text-sm font-semibold subpixel-antialiased"
                radius="sm"
                variant="light"
                endContent={icons.chevron}
              >
                Features
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="ACME features"
            className="w-[340px]"
            itemClasses={{
              base: "gap-4",
            }}
          >
            <DropdownItem
              key="autoscaling"
              description="ACME scales apps to meet user demand, automagically, based on load."
            >
              Autoscaling
            </DropdownItem>
            <DropdownItem
              key="usage_metrics"
              description="Real-time metrics to debug issues. Slow query added? We’ll show you exactly where."
              
            >
              Usage Metrics
            </DropdownItem>
            <DropdownItem
              key="production_ready"
              description="ACME runs on ACME, join us and others serving requests at web scale."
              
            >
              Production Ready
            </DropdownItem>
            <DropdownItem
              key="99_uptime"
              description="Applications stay on the grid with high availability and high uptime guarantees."
              
            >
              +99% Uptime
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <NavbarItem>
            <Link color="foreground" href="#" className="text-sm font-semibold subpixel-antialiased">
            Resources
            </Link>
        </NavbarItem>
        <NavbarItem >
            <Link color="foreground" href="#" aria-current="page" className="text-sm font-semibold subpixel-antialiased">
            Job portal
            </Link>
        </NavbarItem>
        <NavbarItem>
            <Link color="foreground" href="#" className="text-sm font-semibold subpixel-antialiased">
            Contact Us
            </Link>
        </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
        <NavbarItem>
          {/* <MainBlueButton hrefLink="/" text="Get started" /> */}
          <Button color="primary" variant="bordered" className="text-xs font-semibold text-gray-500 px-4 border-slate-200 border"> 
            Get started
          </Button> 
         
        </NavbarItem>
        </NavbarContent>
        <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
              }
              className="w-full"
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  )
};
