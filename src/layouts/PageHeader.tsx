import React from 'react';
import Logo from '../assets/Logo.jpg';
import { Menu, Upload, Bell, User, Mic, Search } from 'lucide-react';
import Button from '../components/Button';

export default function PageHeader() {
  return (
    <div className="flex gap-10 lg:gap-20 justify-between pt-2 mb-6 mx-4">
      <div className="flex gap-4 items-center flex-shrink-0">
        <Button variant="ghost" size="icon" className="">
          <Menu />
        </Button>
        <a href="/">
          <img src={Logo} className="h-6" alt="" />
        </a>
      </div>
      <form className="md:flex hidden gap-4 flex-grow justify-center">
        <div className="flex flex-grow max-w-[600px]">
          <input
            type="search"
            placeholder="Search"
            className="rounded-l-full border border-secondary-border shadow-inner shadow-secondary py-1 px-4 text-lg w-full focus:border-blue-500 outline-none"
          />
          <Button className="py-2 px-4 rounded-r-full border border-secondary-border border-l-0">
            <Search />
          </Button>
        </div>
        <Button size="icon">
          <Mic />
        </Button>
      </form>
      <div className="flex flex-shrink-0 md:gap-2">
        <Button size="icon" variant="ghost" className="md:hidden">
          <Search />
        </Button>
        <Button size="icon" variant="ghost">
          <Upload />
        </Button>
        <Button size="icon" variant="ghost">
          <Bell />
        </Button>
        <Button size="icon" variant="ghost">
          <User />
        </Button>
      </div>
    </div>
  );
}
