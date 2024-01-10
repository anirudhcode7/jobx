import React from 'react';

import {Navbar, NavbarBrand, NavbarContent, NavbarMenuToggle, NavbarMenu, NavbarMenuItem,  NavbarItem, Link, Button} from "@nextui-org/react";

export default function NavBar() {

    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const menuItems = [
      "Home",
      "Features",
      "Job portal",
      "Resources",
      "Contact Us",
      "Log Out",
    ];

  return (
    <Navbar  shouldHideOnScroll onMenuOpenChange={setIsMenuOpen}>
        <NavbarContent>
            <NavbarMenuToggle
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                className="sm:hidden"
            />
            <NavbarBrand>
                <p className="font-bold text-inherit">JOBX</p>
            </NavbarBrand>
        </NavbarContent>
       

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive>
            <Link color="foreground" href="#">
            Home 
            </Link>
        </NavbarItem>
        <NavbarItem>
            <Link color="foreground" href="#">
            Features
            </Link>
        </NavbarItem>
        <NavbarItem>
            <Link color="foreground" href="#">
            Resources
            </Link>
        </NavbarItem>
        <NavbarItem >
            <Link color="foreground" href="#" aria-current="page">
            Job portal
            </Link>
        </NavbarItem>
        <NavbarItem>
            <Link color="foreground" href="#">
            Contact Us
            </Link>
        </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
            <Link href="#">Login</Link>
        </NavbarItem>
        <NavbarItem>
            <Button as={Link} color="primary" href="#" radius="md">
            Sign Up
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
