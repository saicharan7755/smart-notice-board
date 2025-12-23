
import React, { useState } from 'react';
import { UserRole } from '../types';

interface LoginPageProps {
  onLogin: (role: UserRole) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>(UserRole.STUDENT);
  const [isLoading, setIsLoading] = useState(false);

  const roles = [
    { 
      role: UserRole.STUDENT, 
      label: 'Student',
      desc: 'Access learning hub',
      icon: 'M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z' 
    },
    { 
      role: UserRole.TEACHER, 
      label: 'Teacher',
      desc: 'Manage classrooms',
      icon: 'M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z' 
    },
    { 
      role: UserRole.ADMIN, 
      label: 'Admin',
      desc: 'Control system node',
      icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' 
    },
    { 
      role: UserRole.CR, 
      label: 'CR',
      desc: 'Coordinate peers',
      icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' 
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      onLogin(selectedRole);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 p-6 relative overflow-hidden transition-colors duration-500">
      {/* Dynamic Animated Blobs */}
      <div className="bg-blob bg-indigo-600 -top-20 -left-20"></div>
      <div className="bg-blob bg-blue-800 bottom-0 right-0" style={{ animationDelay: '-5s' }}></div>
      <div className="bg-blob bg-purple-900 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10" style={{ width: '800px', height: '800px', animationDuration: '30s' }}></div>

      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-0 glass rounded-[3rem] shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-hidden relative z-10 border-white/5">
        
        {/* Left Side: Branding & Info */}
        <div className="hidden lg:flex flex-col justify-between p-12 bg-indigo-600/10 border-r border-white/5">
          <div className="stagger-1">
            <div className="flex items-center gap-3 mb-12">
              <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-[0_0_30px_rgba(79,70,229,0.5)]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
              </div>
              <h1 className="text-2xl font-black text-white tracking-tighter uppercase">Smart<span className="text-indigo-500">Hub</span></h1>
            </div>
            
            <h2 className="text-5xl font-extrabold text-white leading-tight mb-6">
              Empowering <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-300">Campus Intel.</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-sm leading-relaxed">
              Experience the next generation of academic management. Real-time insights, priority notices, and seamless collaboration.
            </p>
          </div>
          
          <div className="stagger-2 flex items-center gap-6">
             <div className="flex -space-x-4">
               {[1,2,3,4].map(i => (
                 <img key={i} className="w-10 h-10 rounded-full border-2 border-gray-950 object-cover" src={`https://picsum.photos/seed/user${i}/100/100`} alt="user" />
               ))}
             </div>
             <p className="text-sm text-gray-500 font-medium">Joined by <span className="text-white font-bold">1,000+</span> scholars</p>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="p-8 lg:p-12 flex flex-col justify-center">
          <div className="lg:hidden flex justify-center mb-8">
             <h1 className="text-3xl font-black text-white tracking-tighter uppercase">Smart<span className="text-indigo-500">Hub</span></h1>
          </div>

          <div className="stagger-1 text-center lg:text-left mb-10">
            <h3 className="text-2xl font-bold text-white mb-2">Welcome Back</h3>
            <p className="text-gray-500 text-sm">Select your gateway to the campus network.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="stagger-2 grid grid-cols-2 gap-4">
              {roles.map((r) => (
                <button
                  key={r.role}
                  type="button"
                  onClick={() => setSelectedRole(r.role)}
                  className={`group relative flex flex-col items-start p-4 rounded-3xl transition-all duration-300 border ${
                    selectedRole === r.role 
                      ? 'border-indigo-500 bg-indigo-500/10 shadow-[0_0_20px_rgba(79,70,229,0.2)]' 
                      : 'border-white/5 bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <div className={`p-2 rounded-xl mb-3 transition-colors ${selectedRole === r.role ? 'bg-indigo-600 text-white' : 'bg-gray-800 text-gray-400 group-hover:text-white'}`}>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={r.icon} />
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className={`text-xs font-bold uppercase tracking-widest ${selectedRole === r.role ? 'text-indigo-400' : 'text-gray-400'}`}>{r.label}</p>
                    <p className="text-[10px] text-gray-600 hidden md:block">{r.desc}</p>
                  </div>
                  {selectedRole === r.role && (
                    <div className="absolute top-4 right-4 w-2 h-2 bg-indigo-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(79,70,229,0.8)]"></div>
                  )}
                </button>
              ))}
            </div>

            <div className="stagger-3 space-y-4">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-500 group-focus-within:text-indigo-500 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                </div>
                <input 
                  type="email" 
                  required
                  placeholder="Official Email Address" 
                  className="w-full pl-12 pr-5 py-4 bg-white/5 border border-white/5 rounded-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all placeholder-gray-600 text-white text-sm"
                />
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-500 group-focus-within:text-indigo-500 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                </div>
                <input 
                  type="password" 
                  required
                  placeholder="Security Password" 
                  className="w-full pl-12 pr-5 py-4 bg-white/5 border border-white/5 rounded-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all placeholder-gray-600 text-white text-sm"
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="stagger-3 w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-[0_20px_40px_rgba(79,70,229,0.3)] transform transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 group overflow-hidden relative"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Verifying Identity...
                </>
              ) : (
                <>
                  <span>Initialize ${selectedRole} Access</span>
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                </>
              )}
            </button>
          </form>

          <div className="stagger-3 mt-10 text-center flex items-center justify-center gap-4 text-[10px] text-gray-600 font-bold uppercase tracking-[0.2em]">
            <span className="h-px w-8 bg-white/5"></span>
            Security Level: Class-A
            <span className="h-px w-8 bg-white/5"></span>
          </div>
        </div>
      </div>
      
      {/* Floating UI Elements for Polish */}
      <div className="absolute bottom-10 left-10 text-gray-600 text-[10px] font-mono tracking-tighter opacity-20 pointer-events-none hidden md:block">
        BUILD_VER: 2.5.0-ALPHA<br />
        SYSTEM_UPTIME: 99.98%<br />
        ENCRYPTION: AES-256-GCM
      </div>
    </div>
  );
};

export default LoginPage;
