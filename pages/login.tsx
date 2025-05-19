import React from 'react';
import { useRouter } from 'next/router';
import CustomSelect from '../components/CustomSelect';


export default function LoginPage() {
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();

    // TODO: Add your authentication logic here (e.g. validate username/password)

    // On successful login, navigate to dashboard
    router.push('/dashboard');
  };
    const role = [
        { label: 'Manager', value: 'Manager' },
        { label: 'HR', value: 'HR' },
        { label: 'Project Manager', value: 'Project Manager' },
        { label: 'Team Lead', value: 'Team Lead' },
        { label: 'Employee', value: 'Employee' },

    ];

    const handleChange = (value: string) => {
        console.log('Selected value:', value);
    };

  return (
    <div className="min-h-screen flex flex-col md:flex-row text-white bg-[var(--primary)] overflow-hidden font-inter">
      {/* Left Section */}
      <div className="md:w-1/2 w-full relative h-[500px] md:h-screen">
        <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover mask-gradient"
            >
            <source src="/login_bg.mp4" type="video/mp4" />
            Your browser does not support the video tag.
        </video>
        <span  className="absolute inset-0 w-full h-full object-cover bg-[#21213ba8] backdrop-blur-sm"></span>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h3 className="text-2xl md:text-3xl font-extrabold">Welcome to</h3>
          <h2 className="text-[var(--warning)] text-3xl md:text-4xl tracking-[0.3em] font-bold uppercase py-4">TERRAHLOG</h2>
        </div>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center">
          <h6 className="text-sm mb-1">Powered By Terrah.tech</h6>
        </div>
      </div>

      {/* Right Section */}
      <div className="md:w-1/2 w-full flex items-center justify-center p-6 md:p-12  md:min-h-screen">
        <div className="w-full max-w-md space-y-6">
          
          <h4 className="text-[var(--warning)] text-2xl md:text-3xl font-bold text-center">Log In</h4>
          <h6 className="text-center text-base font-normal">
            Please enter your login information or
            <a href="#" className="text-[var(--warning)] underline ml-1">click here</a> to register.
          </h6>

          <form className="space-y-6 login-form" onSubmit={handleLogin}>
            <div>
              <label htmlFor="username" className="block text-sm font-medium">User Name</label>
              <input
                id="username"
                type="text"
                placeholder="Enter your user name"
                className="mt-1 block w-full px-4 py-2  border border-[#F1F1F133] text-[#F1F1F199] placeholder-white rounded-md focus:outline-none focus:text-white"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="mt-1 block w-full px-4 py-2  border border-[#F1F1F133] text-[#F1F1F199] placeholder-white rounded-md focus:outline-none focus:text-white"
              />
            </div>
            <div className="dark-input">
              <label htmlFor="role" className="block text-sm font-medium">Choose Role</label>
              <CustomSelect options={role}  onChange={handleChange}  />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" className="accent-[#FFCD36] w-4 h-4" />
                <span>Remember me</span>
              </label>
              <a href="#" className="text-[var(--warning)] underline">Forget password?</a>
            </div>

            <button
              type="submit"
              className="relative w-full h-12 flex justify-center items-center bg-[var(--warning)] text-[var(--primary)] font-bold rounded-md overflow-hidden group"
            >
              Log In
              
            </button>
          </form>
        </div>
      </div>

      
    </div>
  );
}
