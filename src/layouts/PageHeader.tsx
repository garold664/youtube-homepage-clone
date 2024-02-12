import React, { useState } from 'react';
import Logo from '../assets/Logo.jpg';
import { Menu, Upload, Bell, User, Mic, Search, ArrowLeft } from 'lucide-react';
import Button from '../components/Button';
import { useSidebarContext } from '../contexts/SidebarContext';

export default function PageHeader() {
  const [showFullWidthSearch, setShowFullWidthSearch] = useState(false);

  return (
    <div className="flex gap-10 lg:gap-20 justify-between pt-2 mb-6 mx-4">
      <PageHeaderFirstSection hidden={showFullWidthSearch} />
      <form
        className={`gap-4 flex-grow justify-center ${
          showFullWidthSearch ? 'flex' : 'hidden md:flex'
        }`}
      >
        {showFullWidthSearch && (
          <Button
            onClick={() => setShowFullWidthSearch(false)}
            type="button"
            size="icon"
            variant="ghost"
          >
            <ArrowLeft />
          </Button>
        )}

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
      <div
        className={`flex-shrink-0 md:gap-2 ${
          showFullWidthSearch ? 'hidden' : 'flex'
        }`}
      >
        <Button
          onClick={() => setShowFullWidthSearch(true)}
          type="button"
          size="icon"
          variant="ghost"
          className="md:hidden"
        >
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

type PageHeaderFirstSectionProps = { hidden?: boolean };
export function PageHeaderFirstSection({
  hidden = false,
}: PageHeaderFirstSectionProps) {
  const { toggle } = useSidebarContext();
  return (
    <div
      className={`gap-4 items-center flex-shrink-0  ${
        hidden ? 'hidden' : 'flex'
      }`}
    >
      <Button variant="ghost" size="icon" onClick={toggle}>
        <Menu />
      </Button>
      <a href="/">
        <img src={Logo} className="h-6" alt="" />
      </a>
    </div>
  );
}
