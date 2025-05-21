import { FC } from 'react';
import { useRouter } from 'next/router';
import { FiHome, FiClock, FiUsers, FiBarChart2, FiSettings, FiMenu, FiLayers, FiClipboard, FiUserX } from 'react-icons/fi';
import Link from 'next/link';

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
}


const Sidebar: FC<SidebarProps> = ({ collapsed, setCollapsed }) => {
  const router = useRouter();
  return (
  <aside className={`z-[99] h-screen bg-[var(--primary)] text-white fixed top-0 left-0 flex flex-col shadow-lg rounded-[0_20px_20px_0] transition-all duration-300
    ${collapsed ? 'w-14 md:w-20' : 'w-64'}`}>
    <div className={`flex gap-4 px-6 py-5  ${collapsed ? 'justify-center' : ''}`}>
      <button className='menu_btn' onClick={() => setCollapsed(!collapsed)}>
        <FiMenu className="text-gray-200" size={24} />
      </button>
      {!collapsed && <div className="whitespace-nowrap">TerrahLog</div>}
    </div>
    <div className="flex flex-col p-2 md:p-4 space-y-4 h-full justify-between">
      <nav className="flex flex-col space-y-4">
        <Link href="/dashboard" className={`mt-3 flex items-center gap-3 p-2 hover:bg-[var(--hover)]  rounded ${collapsed ? 'justify-center' : ''} ${router.pathname === '/dashboard/index' ? 'active-nav' : ''}`}>
          <FiHome size={22} /> {!collapsed &&<span>Dashboard</span>}
        </Link>
        <Link href="#" className={`mt-3 flex items-center gap-3 p-2 hover:bg-[var(--hover)]  rounded ${collapsed ? 'justify-center' : ''} ${router.pathname === '/time_sheet' ? 'active-nav' : ''}`}>
          
          <FiClock size={22} /> {!collapsed &&<span>Timesheet</span>}
        </Link>
        <Link href="#" className={`mt-3 flex items-center gap-3 p-2 hover:bg-[var(--hover)]  rounded ${collapsed ? 'justify-center' : ''} ${router.pathname === '/time_sheet' ? 'active-nav' : ''}`}>
          <FiLayers size={22} /> {!collapsed &&<span>Projects</span>}
        </Link>
        <Link href="#" className={`mt-3 flex items-center gap-3 p-2 hover:bg-[var(--hover)]  rounded ${collapsed ? 'justify-center' : ''} ${router.pathname === '/time_sheet' ? 'active-nav' : ''}`}>
          <FiClipboard size={22} /> {!collapsed &&<span>My Tasks</span>}
        </Link>
        <Link href="#" className={`mt-3 flex items-center gap-3 p-2 hover:bg-[var(--hover)]  rounded ${collapsed ? 'justify-center' : ''} ${router.pathname === '/time_sheet' ? 'active-nav' : ''}`}>
          <FiUserX size={22} /> {!collapsed &&<span>Leaves</span>}
        </Link>
        <Link href="#" className={`mt-3 flex items-center gap-3 p-2 hover:bg-[var(--hover)]  rounded ${collapsed ? 'justify-center' : ''} ${router.pathname === '/people' ? 'active-nav' : ''}`}>
          <FiUsers size={22} /> {!collapsed &&<span>People</span>}
        </Link>
        <Link href="#" className={`mt-3 flex items-center gap-3 p-2 hover:bg-[var(--hover)]  rounded ${collapsed ? 'justify-center' : ''} ${router.pathname === '/reports' ? 'active-nav' : ''}`}>
          <FiBarChart2 size={22} /> {!collapsed &&<span>Reports</span>}
        </Link>
      </nav>
      <Link href="/settings" className={` mt-3 flex items-center gap-3 p-2 hover:bg-[var(--hover)]  rounded ${collapsed ? 'justify-center' : ''} ${router.pathname === '/settings/index' ? 'active-nav' : ''}`}>
        <FiSettings size={22} /> {!collapsed &&<span>Settings</span>}
      </Link>
    </div>
  </aside>
);
};

export default Sidebar;
