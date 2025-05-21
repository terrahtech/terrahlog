import Layout from '../../components/Layout';
import React, { useState } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import CustomSelect from '../../components/CustomSelect';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useAppSelector, useAppDispatch } from '../../store/hooks';

const SettingsPage = () => {

  const [activeTab, setActiveTab] = useState<'profile' | 'accounts' | 'emails' | 'workspace'>('profile');
  const [profileSubTab, setProfileSubTab] = useState<'profile' | 'security'>('profile');
  const [startDate, setStartDate] = useState<Date | null>(null);

  const timeZones = [
    { label: 'Asia/Kolkata (IST)', value: 'Asia/Kolkata' },
    { label: 'UTC', value: 'UTC' },
    { label: 'America/New_York (EST)', value: 'America/New_York' },
    { label: 'Europe/London (GMT)', value: 'Europe/London' },
    { label: 'Asia/Dubai (GST)', value: 'Asia/Dubai' },
    { label: 'Australia/Sydney (AEST)', value: 'Australia/Sydney' },
  ];
  const martial = [
    { label: 'Single', value: 'Single' },
    { label: 'Married', value: 'Married' },
    { label: 'Divorced', value: 'Divorced' },
  ];
  const time_duration = [
    { label: 'Hours and Minutes Format', value: 'Hours and Minutes Format' },
    { label: 'Colon Format', value: 'Colon Format' },
    { label: 'Decimal Hors Format', value: 'Decimal Hors Format' },
  ];
  const cloack_format = [
    { label: '12 Hours', value: '12 Hours' },
    { label: '24 Hours', value: '24 Hours' },
  ];

  const handleChange = (value: string) => {
    console.log('Selected value:', value);
  };


  const name = useAppSelector((state) => state.name.value);

  console.log(name, "===============>>>thisisname");

  return (
    <Layout>
      <div className="">
        <div className='mb-4 flex justify-between items-center'>
          <h1 className="text-xl font-bold capitalize">{activeTab}</h1>
          <button
            className="flex items-center gap-2 px-5 py-2 rounded-md bg-[var(--primary)] text-white hover:bg-opacity-90 transition min-w-[120px]"
          >
            <FiLogOut size={16} /> Logout
          </button>
        </div>
        <div className="gap-y-4 lg:gap-5  grid grid-cols-1 lg:grid-cols-4">

          {/* Sidebar */}
          <aside className="bg-[var(--card)]  p-6 rounded-lg">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-500 text-white w-10 h-10 flex items-center justify-center rounded-full font-semibold">
                NK
              </div>
              <div>
                <h2 className="font-semibold text-lg">Nithul KP</h2>
                <p className="text-xs text-gray-500">Member since 2023</p>
              </div>
            </div>

            <nav className="mt-8">
              <button onClick={() => setActiveTab('profile')} className={`my-3 flex items-center space-x-2 ${activeTab === 'profile' ? 'text-[var(--active)] ' : ' opacity-[.5]'}`}>
                <span>👤</span>
                <span>Profile Settings</span>
              </button>
              <button onClick={() => setActiveTab('accounts')} className={`my-3 flex items-center space-x-2 ${activeTab === 'accounts' ? 'text-[var(--active)] ' : ' opacity-[.5]'}`}>
                <span>⚙️</span>
                <span>Accounts</span>
              </button>
              <button onClick={() => setActiveTab('emails')} className={`my-3 flex items-center space-x-2 ${activeTab === 'emails' ? 'text-[var(--active)] ' : ' opacity-[.5]'}`}>
                <span>📧</span>
                <span>Emails</span>
              </button>
              <p className="text-xs text-gray-400 uppercase mt-5 mb-3">Workspace</p>
              <button onClick={() => setActiveTab('workspace')} className={`my-3 flex items-center space-x-2 ${activeTab === 'workspace' ? 'text-[var(--active)] ' : ' opacity-[.5]'}`}>
                <span>👥</span>
                <span>Workspace</span>
              </button>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="bg-[var(--card)] col-span-3 p-6 space-y-6 rounded-lg min-h-[calc(100vh-200px)]">
            <div>


              {/* Show sub-tabs if 'profile' is selected */}
              {activeTab === 'profile' && (
                <div className="flex space-x-6 border-b border-[var(--border)] mt-2">
                  <button onClick={() => setProfileSubTab('profile')} className={` ${profileSubTab === 'profile' ? 'pb-1 border-b-2 border-[var(--primary)]  ' : 'pb-1 opacity-[.5]'}`}>Profile</button>
                  <button onClick={() => setProfileSubTab('security')} className={` ${profileSubTab === 'security' ? 'pb-1 border-b-2 border-[var(--primary)]  ' : 'pb-1 opacity-[.5]'}`}>Security</button>
                </div>
              )}
            </div>

            {/* Conditional Content */}
            {activeTab === 'profile' && profileSubTab === 'profile' && (
              <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div >
                  <label htmlFor="firstName" className="block text-sm  text-gray-400">First Name *</label>
                  <input id="firstName" type="text" defaultValue="Nithul" className="mt-1 block w-full py-2 px-4 bg-[var(--input-bg)] border border-[var(--border)]  rounded-md focus:outline-none " />
                </div>
                <div >
                  <label htmlFor="lastName" className="block text-sm  text-gray-400">Last Name *</label>
                  <input id="lastName" type="text" defaultValue="KP" className="mt-1 block w-full py-2 px-4 bg-[var(--input-bg)] border border-[var(--border)]  rounded-md focus:outline-none " />
                </div>
                <div >
                  <label htmlFor="lastName" className="block text-sm  text-gray-400">Email ID *</label>
                  <input id="lastName" type="text" defaultValue="nithulcr@gmail.com" className="mt-1 block w-full py-2 px-4 bg-[var(--input-bg)] border border-[var(--border)]  rounded-md focus:outline-none " />
                </div>
                <div >
                  <label htmlFor="timeZone" className="block text-sm text-gray-400">Your Time Zone *</label>
                  <CustomSelect options={timeZones} defaultValue="Asia/Kolkata" onChange={handleChange} />
                </div>
                <div >
                  <label htmlFor="dob" className="block text-sm  text-gray-400">Date of Birth</label>
                  <div className="flex items-center justify-center mt-1 block w-full py-2 px-4 bg-[var(--input-bg)] border border-[var(--border)]  rounded-md focus:outline-none">
                    <DatePicker
                      selected={startDate}
                      onChange={(date: Date) => setStartDate(date)}
                      className="bg-transparent outline-none text-sm pr-8 max-w-[150px]"
                    />
                    <FaCalendarAlt className="h-3 w-3" />
                  </div>
                </div>
                <div >
                  <label htmlFor="martial" className="block text-sm text-gray-400">Martial Status</label>
                  <CustomSelect options={martial} onChange={handleChange} />
                </div>
                <div >
                  <label htmlFor="firstName" className="block text-sm  text-gray-400">Address</label>
                  <input id="firstName" type="text" defaultValue="" className="mt-1 block w-full py-2 px-4 bg-[var(--input-bg)] border border-[var(--border)]  rounded-md focus:outline-none " />
                </div>
                <div >
                  <label htmlFor="firstName" className="block text-sm  text-gray-400">Phone Number</label>
                  <input id="firstName" type="number" defaultValue="" className="mt-1 block w-full py-2 px-4 bg-[var(--input-bg)] border border-[var(--border)]  rounded-md focus:outline-none " />
                </div>
              </form>
            )}



            {activeTab === 'profile' && profileSubTab === 'security' && (
              <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div >
                  <label htmlFor="password" className="block text-sm  text-gray-400">Old Password</label>
                  <input id="password" type="password" className="mt-1 block w-full py-2 px-4 bg-[var(--input-bg)] border border-[var(--border)]  rounded-md focus:outline-none  " />
                </div>
                <div >
                  <label htmlFor="password" className="block text-sm  text-gray-400">New Password</label>
                  <input id="password" type="password" className="mt-1 block w-full py-2 px-4 bg-[var(--input-bg)] border border-[var(--border)]  rounded-md focus:outline-none  " />
                </div>
                <div >
                  <label htmlFor="password" className="block text-sm  text-gray-400">Confirm Password</label>
                  <input id="password" type="password" className="mt-1 block w-full py-2 px-4 bg-[var(--input-bg)] border border-[var(--border)]  rounded-md focus:outline-none  " />
                </div>
              </form>
            )}

            {activeTab === 'accounts' && (
              <p className="">Account-related settings will appear here.</p>
            )}

            {activeTab === 'emails' && (
              <p className="">Manage your emails here.</p>
            )}

            {activeTab === 'workspace' && (
              <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div >
                  <label htmlFor="time_duration" className="block text-sm text-gray-400">Select workspace time duration format</label>
                  <CustomSelect options={time_duration} defaultValue="Select an option" onChange={handleChange} />
                </div>
                <div >
                  <label htmlFor="cloack_format" className="block text-sm text-gray-400">Select workspace clock format</label>
                  <CustomSelect options={cloack_format} defaultValue="Select an option" onChange={handleChange} />
                </div>
              </form>
            )}
          </main>
        </div>
        {activeTab === 'profile' && (profileSubTab === 'profile' || profileSubTab === 'security') && (

          <div className='flex justify-end gap-5 mt-5'>
            <button
              className="px-5 py-2 rounded-md border border-[var(--border)] bg-[var(--input-bg)] text-gray-700 hover:bg-gray-100 transition min-w-[120px]"
            >
              Cancel
            </button>
            <button
              className="px-5 py-2 rounded-md bg-[var(--primary)] text-white hover:bg-opacity-90 transition min-w-[120px]"
            >
              Save
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SettingsPage;
