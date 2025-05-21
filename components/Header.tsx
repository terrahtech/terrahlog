import { FC, useState, useRef, useEffect } from 'react';
import { FiBell, FiChevronDown, FiPlay } from 'react-icons/fi';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface HeaderProps {
  collapsed: boolean;
}

const Header: FC<HeaderProps> = ({ collapsed }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header
      className={`h-16 bg-[var(--light)] flex items-center justify-between px-2 md:px-6 fixed top-0 right-0 z-10 transition-all duration-300
      ${collapsed ? 'w-[calc(100%-4.2rem)] md:w-[calc(100%-5.2rem)]' : 'md:left-64 w-[calc(100%-4.2rem)] md:w-[calc(100%-16rem)]'}
    `}
    >
      <div className='flex items-center gap-2'>
        {collapsed && <div className="whitespace-nowrap md:block hidden">TerrahLog</div>}
        <div className="flex items-center gap-2 bg-[var(--secondary)] rounded-full p-1 pr-3">
          <button className='w-6 h-6 p-1 flex items-center justify-center rounded-[30px] bg-[var(--primary)] '><FiPlay size={14} className="text-white" /></button>
          00:00:00
        </div>
        {/* <h1 className="text-xl font-bold border-l-2 border-l-[var(--secondary)] pl-3">Dashboard</h1> */}
      </div>
      <div className="flex items-center gap-4 relative">
        <button className="relative text-white  p-1 rounded">
          <FiBell size={20} className='text-[var(--text-light)]' />
          <span className="flex align-center justify-center absolute top-0 right-0 block w-3 h-3 text-[8px] bg-red-600 rounded-full ring-2 ring-white">1</span>
        </button>
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="px-3 h-8 bg-[var(--secondary)]  font-bold flex items-center justify-center rounded-full flex-row gap-1"
          >
            NK <FiChevronDown />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-[var(--secondary)]  rounded shadow-lg z-20">
              <ul className="py-2">
                <li className="px-4 py-2 cursor-pointer"><Link href="/settings">Profile</Link></li>
                <li className="px-4 py-2 cursor-pointer"><Link href="/settings">Settings</Link></li>
                <li className="px-4 py-2 cursor-pointer">Logout</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
