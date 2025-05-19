import Layout from '../components/Layout';
import { FiInfo } from 'react-icons/fi';
import { FaRegListAlt, FaChartLine, FaCalendarAlt } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from 'react';

export default function Dashboard() {
  const [startDate, setStartDate] = useState(new Date());

  const projects = [
    { name: 'Fren', time: '20:00', total: '50:00' },
    { name: 'BooBoo Land W...', time: '50:46', total: '168:00' },
    { name: 'Vextera', time: '120:00', total: '168:00' },
    { name: 'Tribe', time: '20:00', total: '168:00' },
    { name: 'MasarDubai', time: '150:00', total: '168:00' },
    { name: 'Brands', time: '130:00', total: '168:00' },
  ];
  
  function getPercentage(time: string, total: string) {
    const toMinutes = (t: string) => {
      const [h, m] = t.split(':').map(Number);
      return h * 60 + m;
    };
    const timeMinutes = toMinutes(time);
    const totalMinutes = toMinutes(total);
    return totalMinutes > 0 ? (timeMinutes / totalMinutes) * 100 : 0;
  }
  
  function getColorClass(percentage: number) {
    if (percentage < 33.33) return 'bg-red-400';
    if (percentage < 66.66) return 'bg-yellow-400';
    return 'bg-green-400';
  }
  

  return (
    <Layout>
      <div className="mb-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Dashboard</h1>

        {/* Date Picker Input */}
        <div className="relative flex items-center gap-2 bg-[var(--card)] px-3 py-2 rounded">
          <DatePicker
            selected={startDate}
            onChange={(date: Date) => setStartDate(date)}
            className="bg-transparent outline-none text-sm pr-8 max-w-[150px]"
          />
          <span className='bg-[var(--secondary)] absolute right-3 top-1/2 transform -translate-y-1/2 h-6 w-6 cursor-pointer flex items-center justify-center rounded-full'><FaCalendarAlt className="h-3 w-3" /></span>
        </div>
      </div>

      <div className="grid grid-cols-1  lg:grid-cols-3 md:grid-cols-2 gap-6">
        {/* Profile Card */}
        <div className="bg-[var(--card)] p-4 rounded-xl flex justify-between items-center">
          <div className="flex gap-4">
            <div className="w-16 h-16 bg-[var(--primary)] text-white font-bold text-xl rounded-xl flex items-center justify-center">
              NK
            </div>
            <div>
              <h2 className="font-semibold">Nithul KP</h2>
              <p className="text-sm truncate w-40">GALTech Technologies</p>
              <div className="text-sm mt-1">👨‍💻 Employee</div>
            </div>
          </div>
        </div>

        {/* Today Card */}
        <div className="bg-[var(--card)] p-4 rounded-xl flex flex-col justify-between">
          <div>
            <h2 className="font-medium">Today</h2>
            <p className="text-3xl font-semibold mt-2">0:00</p>
            <p className="text-sm text-orange-500 mt-1">
              0% yesterday <span className="bg-purple-200 text-purple-700 text-xs px-2 py-0.5 rounded ml-1">0m</span>
            </p>
          </div>
          <div className="mt-4 h-1.5 w-full bg-[var(--secondary)] rounded-full relative">
            <div className="w-1/4 h-full bg-[var(--primary)] rounded-full"></div>
          </div>
        </div>

        {/* This Week Card */}
        <div className="bg-[var(--card)] p-4 rounded-xl flex flex-col justify-between">
          <div className="flex justify-between items-center">
            <h2 className="font-medium">This Week</h2>
            <FaChartLine className="text-red-400" />
          </div>
          <p className="text-3xl font-semibold mt-2">28:00</p>
          <p className="text-sm text-red-500 mt-1">
            -29% Last week <span className="bg-purple-200 text-purple-700 text-xs px-2 py-0.5 rounded ml-1">39h 30m</span>
          </p>
        </div>

        {/* Projects Card */}
        <div className="bg-[var(--card)] p-4 rounded-xl md:col-span-1">
          <div className="flex justify-between items-center mb-4">
            <h2 className="">Projects</h2>
            <FiInfo className="text-gray-400" />
          </div>
          {projects.map((project, index) => {
            const percent = getPercentage(project.time, project.total);
            const color = getColorClass(percent);

            return (
              <div key={index} className="flex justify-between items-center mb-2">
                <div className="text-sm w-32 truncate">{project.name}</div>
                <div className="text-sm min-w-[50px]">{project.time}</div>
                <div className="flex-1 h-2 mx-2 bg-gray-200 rounded-full">
                  <div
                    className={`h-2 ${color} rounded-full`}
                    style={{ width: `${percent}%` }}
                  ></div>
                </div>
                <div className="text-sm min-w-[50px]">{project.total}</div>
              </div>
            );
          })}


        </div>

        {/* Leaves Card */}
        <div className="bg-[var(--card)] p-4 rounded-xl">
          <div className="flex justify-between items-center mb-4">
            <h2 className="">Leaves</h2>
            <FiInfo className="text-gray-400" />
          </div>
          <div className="text-center text-gray-400 mt-6">
            <FaRegListAlt className="mx-auto text-3xl text-purple-400 mb-2" />
            <p>No team members are currently on leave.</p>
          </div>
        </div>

        {/* Activity Card */}
        <div className="bg-[var(--card)] p-4 rounded-xl">
          <h2 className=" mb-4">Activity</h2>
          <div className="text-center text-gray-400 mt-6">
            <div className="text-3xl mb-2">
              <span className="inline-block p-3 bg-purple-100 text-purple-600 rounded-lg">📈</span>
            </div>
            <p>Your activity level data will be displayed here when you track time on the Desktop Tracker.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
