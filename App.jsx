import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Calendar, Car, CarFront, Phone, User, CheckCircle, ArrowRight, XCircle, Clock, LogOut, ShieldCheck, Zap, Users, Map } from 'lucide-react';

const customStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');

  body {
    font-family: 'Plus Jakarta Sans', sans-serif;
    background-color: #f8fafc;
    margin: 0;
    -webkit-font-smoothing: antialiased;
    scroll-behavior: smooth;
    overflow-x: hidden;
  }

  @keyframes slideUpFade {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .animate-fade-in {
    animation: slideUpFade 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
  
  @keyframes popOut {
    0% { 
        opacity: 0; 
        transform: scale(0.8) translateY(40px) rotate(-2deg); 
    }
    70% {
        transform: scale(1.05) translateY(-10px) rotate(1deg);
    }
    100% { 
        opacity: 1; 
        transform: scale(1) translateY(0) rotate(0deg); 
    }
  }
  
  .animate-pop-out {
    animation: popOut 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  }

  /* NEW: High-end sliding background element animations */
  @keyframes slideInFloatRight {
    0% { opacity: 0; transform: translate(150px, 50px) rotate(15deg) scale(0.8); }
    100% { opacity: 1; transform: translate(0px, 0px) rotate(-5deg) scale(1); }
  }
  
  @keyframes slideInFloatLeft {
    0% { opacity: 0; transform: translate(-150px, 50px) rotate(-15deg) scale(0.8); }
    100% { opacity: 1; transform: translate(0px, 0px) rotate(5deg) scale(1); }
  }

  @keyframes floatContinuousRight {
    0% { transform: translateY(0) rotate(-5deg); }
    50% { transform: translateY(-15px) rotate(-2deg); }
    100% { transform: translateY(0) rotate(-5deg); }
  }

  @keyframes floatContinuousLeft {
    0% { transform: translateY(0) rotate(5deg); }
    50% { transform: translateY(-15px) rotate(2deg); }
    100% { transform: translateY(0) rotate(5deg); }
  }

  .floating-graphic-right {
    position: absolute;
    right: -130px;
    top: -50px;
    width: 240px;
    opacity: 0;
    pointer-events: none;
    z-index: 0;
    filter: drop-shadow(0 25px 35px rgba(0,0,0,0.15));
  }
  
  .floating-graphic-left {
    position: absolute;
    left: -130px;
    top: -50px;
    width: 240px;
    opacity: 0;
    pointer-events: none;
    z-index: 0;
    filter: drop-shadow(0 25px 35px rgba(0,0,0,0.15));
  }

  /* Trigger the slide-in + continuous float sequentially when the section appears */
  .animate-pop-out .floating-graphic-right {
    animation: slideInFloatRight 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards 0.2s, floatContinuousRight 4s ease-in-out infinite 1.2s;
  }
  
  .animate-pop-out .floating-graphic-left {
    animation: slideInFloatLeft 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards 0.2s, floatContinuousLeft 4s ease-in-out infinite 1.2s;
  }
  
  @media (max-width: 1150px) {
    .floating-graphic-right, .floating-graphic-left { display: none; }
  }
  
  @keyframes driveCar {
    0% { transform: translateX(-10px); }
    50% { transform: translateX(10px); }
    100% { transform: translateX(-10px); }
  }
  
  .animate-drive {
    animation: driveCar 4s ease-in-out infinite;
  }

  .hover-scale {
    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  
  .hover-scale:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 25px -5px rgba(29, 78, 216, 0.15), 0 8px 10px -6px rgba(29, 78, 216, 0.1);
  }

  .nav-btn {
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }
  
  .nav-btn:hover {
    background-color: white !important;
    color: #1d4ed8 !important;
    box-shadow: 0 4px 12px rgba(29, 78, 216, 0.1);
  }

  .modern-input {
    background: rgba(255, 255, 255, 0.9);
    border: 1px solid rgba(226, 232, 240, 0.8);
    backdrop-filter: blur(10px);
    transition: all 0.2s ease;
  }
  
  .modern-input:focus-within {
    border-color: #3b82f6;
    box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
    background: #ffffff;
  }

  .gradient-bg {
    background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
    position: relative;
  }
  
  .gradient-bg::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: radial-gradient(circle at top right, rgba(59, 130, 246, 0.1), transparent 40%),
                radial-gradient(circle at bottom left, rgba(16, 185, 129, 0.05), transparent 40%);
    pointer-events: none;
  }

  .section-divider {
    height: 2px;
    background: linear-gradient(90deg, transparent, rgba(226, 232, 240, 0.8), transparent);
    margin: 60px 0;
  }
`;

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const [activeSection, setActiveSection] = useState('find-ride-section');
  
  const [dashboardRole, setDashboardRole] = useState('driver');
  const [bookingStatusFilter, setBookingStatusFilter] = useState('ongoing');
  
  const [loginPhone, setLoginPhone] = useState('');
  const [signUpName, setSignUpName] = useState(''); 
  const [loginError, setLoginError] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const [rides, setRides] = useState(() => {
    const saved = localStorage.getItem('tsPoolRides');
    return saved ? JSON.parse(saved) : [];
  });
  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem('tsPoolBookings');
    return saved ? JSON.parse(saved) : [];
  });

  const [searchQuery, setSearchQuery] = useState({ from: '', to: '' });
  const [offerData, setOfferData] = useState({ from: '', to: '', stopovers: '', date: '', time: '', price: '', seats: '1', vehicleReg: '', vehicleType: '2 Wheeler', vehicleModel: '' });

  const [currentTime, setCurrentTime] = useState(Date.now());
  
  const findRideRef = useRef(null);
  const offerRideRef = useRef(null);
  const dashboardRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(Date.now()), 30000); 
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.innerText = customStyles;
    document.head.appendChild(styleSheet);

    const savedUsers = localStorage.getItem('tsPoolRegisteredUsers');
    if (savedUsers) {
      setRegisteredUsers(JSON.parse(savedUsers));
    }

    const activeSession = localStorage.getItem('tsPoolCurrentUser');
    if (activeSession) {
      setCurrentUser(JSON.parse(activeSession));
      setIsLoggedIn(true);
    }

    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('tsPoolRides', JSON.stringify(rides));
  }, [rides]);

  useEffect(() => {
    localStorage.setItem('tsPoolBookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    if (!isLoggedIn) return;

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.4 
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
          
          entry.target.classList.remove('animate-pop-out');
          void entry.target.offsetWidth; 
          entry.target.classList.add('animate-pop-out');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, options);

    if (findRideRef.current) observer.observe(findRideRef.current);
    if (offerRideRef.current) observer.observe(offerRideRef.current);
    if (dashboardRef.current) observer.observe(dashboardRef.current);

    return () => {
      if (findRideRef.current) observer.unobserve(findRideRef.current);
      if (offerRideRef.current) observer.unobserve(offerRideRef.current);
      if (dashboardRef.current) observer.unobserve(dashboardRef.current);
    };
  }, [isLoggedIn]);

  const filteredRides = rides.filter(ride => {
    if (parseInt(ride.seats, 10) <= 0) {
      return false;
    }

    const searchFrom = searchQuery.from.toLowerCase();
    const searchTo = searchQuery.to.toLowerCase();
    
    if (!searchFrom && !searchTo) return true;

    const matchesFrom = ride.from.toLowerCase().includes(searchFrom);
    const matchesTo = ride.to.toLowerCase().includes(searchTo);
    
    const stopoversArray = ride.stopovers ? ride.stopovers.toLowerCase() : '';
    const matchesStopoverTo = searchTo && stopoversArray.includes(searchTo);
    
    if (searchFrom && !searchTo) return matchesFrom;
    if (!searchFrom && searchTo) return matchesTo || matchesStopoverTo;
    
    return matchesFrom && (matchesTo || matchesStopoverTo);
  });

  const getDisplayedDriverBookings = () => {
    const allDriverBookings = bookings.filter(b => rides.find(r => r.id === b.rideId)?.driverPhone === currentUser?.phone);
    return allDriverBookings.filter(b => 
      bookingStatusFilter === 'ongoing' ? ['pending', 'accepted', 'completed'].includes(b.status) : ['finished', 'rejected'].includes(b.status)
    );
  };

  const getDisplayedPassengerBookings = () => {
    const allPassengerBookings = bookings.filter(b => b.passengerMobile === currentUser?.phone);
    return allPassengerBookings.filter(b => 
      bookingStatusFilter === 'ongoing' ? ['pending', 'accepted', 'completed'].includes(b.status) : ['finished', 'rejected'].includes(b.status)
    );
  };

  const handleLogin = () => {
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(loginPhone)) {
      setLoginError('Please enter a valid 10-digit mobile number.');
      return;
    }
    const foundUser = registeredUsers.find(user => user.phone === loginPhone);
    if (foundUser) {
      setCurrentUser(foundUser); 
      localStorage.setItem('tsPoolCurrentUser', JSON.stringify(foundUser)); 
      setIsLoggedIn(true);
      setLoginError(''); 
    } else {
      setLoginError('Number not registered. Please sign up first.');
    }
  };

  const handleSignUp = () => {
    const phoneRegex = /^\d{10}$/;
    if (!signUpName.trim()) {
      setLoginError('Please enter your full name.');
      return;
    }
    if (!phoneRegex.test(loginPhone)) {
      setLoginError('Please enter a valid 10-digit mobile number.');
      return;
    }
    const userExists = registeredUsers.some(user => user.phone === loginPhone);
    if (userExists) {
      setLoginError('This number is already registered. Please log in.');
    } else {
      const newUser = { name: signUpName, phone: loginPhone };
      const newRegisteredList = [...registeredUsers, newUser];
      setRegisteredUsers(newRegisteredList);
      localStorage.setItem('tsPoolRegisteredUsers', JSON.stringify(newRegisteredList));
      setLoginError('');
      alert('Registration successful! You can now log in.');
      setIsSignUp(false); 
      setLoginPhone(''); 
      setSignUpName('');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setLoginPhone('');
    localStorage.removeItem('tsPoolCurrentUser'); 
  };

  const handleBookRide = (ride) => {
    if (ride.driverPhone === currentUser.phone) {
      alert("You cannot book a ride you are offering.");
      return;
    }
    const requestedSeats = prompt(`How many seats do you want to book? (Max available: ${ride.seats})`, "1");
    if (requestedSeats === null) return; 
    const parsedSeats = parseInt(requestedSeats, 10);
    if (isNaN(parsedSeats) || parsedSeats <= 0 || parsedSeats > parseInt(ride.seats, 10)) {
      alert("Invalid selection of seats.");
      return;
    }
    const exactPickup = prompt("Enter your exact pickup location (e.g., JNTUH Main Gate, Opp. Paradise Bakery):");
    if (!exactPickup) {
      alert("Booking cancelled. Pickup address is required.");
      return;
    }
    const generatedOTP = Math.floor(1000 + Math.random() * 9000).toString();
    const newBooking = {
      id: Date.now(),
      rideId: ride.id,
      passengerName: currentUser.name, 
      passengerMobile: currentUser.phone, 
      rideDetails: `${ride.from} to ${searchQuery.to ? searchQuery.to : ride.to}`,
      pickupAddress: exactPickup,
      requestedSeats: parsedSeats, 
      status: 'pending',
      otp: generatedOTP 
    };
    setBookings([...bookings, newBooking]);
    alert(`Success! Request for ${parsedSeats} seat(s) sent. Wait for driver approval.`);
  };

  const handleAction = (booking, action) => {
    const updatedBookings = bookings.map(b => 
      b.id === booking.id ? { ...b, status: action } : b
    );
    setBookings(updatedBookings);

    const linkedRide = rides.find(r => r.id === booking.rideId);
    
    if (action === 'accepted') {
       const updatedRides = rides.map(r => {
          if (r.id === booking.rideId) {
             const remainingSeats = parseInt(r.seats, 10) - booking.requestedSeats;
             const updatedRide = { ...r, seats: remainingSeats.toString() };
             if (remainingSeats === 0 && !r.fullyBookedAt) {
                 updatedRide.fullyBookedAt = Date.now();
             }
             return updatedRide;
          }
          return r;
       });
       setRides(updatedRides);
    }

    let message = "";
    if (action === 'accepted') {
       const vehicleDisplay = linkedRide.vehicleType === '4 Wheeler' 
         ? `${linkedRide.vehicleType} - ${linkedRide.vehicleModel}` 
         : linkedRide.vehicleType;

       message = `*Ride Status Update*\n\nHi ${booking.passengerName}, your booking for *${booking.rideDetails}* (${booking.requestedSeats} seat(s)) has been ✅ ACCEPTED.\n\n📍 *I will pick you up at:* ${booking.pickupAddress}\n🚗 *My Vehicle:* ${linkedRide.vehicleReg.toUpperCase()} (${vehicleDisplay})\n🔑 *Your OTP:* ${booking.otp}\n\n_Please share this OTP with me when I arrive._`;
    } else if (action === 'rejected') {
       message = `*Ride Status Update*\n\nHi ${booking.passengerName}, your booking for *${booking.rideDetails}* has been ❌ REJECTED.\n\nNote: Sorry, I cannot take this booking at the moment.`;
    } else if (action === 'finished') {
       message = `*Ride Completed*\n\nHi ${booking.passengerName}, your ride for *${booking.rideDetails}* has been successfully completed! ✅\n\nThank you for choosing TS-Pool for your journey. Have a great day!`;
    }
    
    if (message) {
      window.open(`https://wa.me/91${booking.passengerMobile}?text=${encodeURIComponent(message)}`, '_blank');
    }
  };

  const handleVerifyOTP = (booking) => {
    const enteredOTP = prompt(`Enter the 4-digit OTP provided by ${booking.passengerName}:`);
    if (enteredOTP === null) return; 
    if (enteredOTP === booking.otp) {
      alert("✅ OTP Verified Successfully! You are picking up the correct passenger.");
      const updatedBookings = bookings.map(b => 
        b.id === booking.id ? { ...b, status: 'completed' } : b
      );
      setBookings(updatedBookings);
    } else {
      alert("❌ Invalid OTP. Please check with the passenger and try again.");
    }
  };

  const handlePostRide = () => {
    if(!offerData.from || !offerData.to || !offerData.price || !offerData.vehicleReg || !offerData.date || !offerData.time) {
      alert("Please fill all required details.");
      return;
    }
    if(offerData.vehicleType === '4 Wheeler' && !offerData.vehicleModel.trim()) {
       alert("Please specify the model of your 4 Wheeler.");
       return;
    }

    const selectedDateTime = new Date(`${offerData.date}T${offerData.time}`);
    const currentDateTime = new Date();

    if (selectedDateTime < currentDateTime) {
      alert("Invalid Time: You cannot offer a ride in the past. Please select a valid future time.");
      return; 
    }

    const newRide = { 
      ...offerData, 
      id: Date.now(), 
      driver: currentUser.name, 
      driverPhone: currentUser.phone 
    };
    setRides([newRide, ...rides]);
    
    document.getElementById('find-ride-section').scrollIntoView({ behavior: 'smooth' });
    alert("Ride Published Successfully!");
  };

  const formatTime = (timeString) => {
    if (!timeString) return '';
    const [hourString, minute] = timeString.split(':');
    const hour = parseInt(hourString, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minute} ${ampm}`;
  };

  const getTodayDateString = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const getMaxSeats = (type) => {
    if (type === '2 Wheeler') return 1;
    if (type === '3 Wheeler') return 3;
    if (type === '4 Wheeler') return 6;
    return 1;
  };

  const handleVehicleTypeChange = (e) => {
    const newType = e.target.value;
    setOfferData({ 
        ...offerData, 
        vehicleType: newType, 
        seats: '1' 
    });
  };

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
  };

  if (!isLoggedIn) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0f172a', backgroundImage: `url('/download.jpeg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        
        <div className="animate-fade-in" style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', padding: '50px 40px', borderRadius: '30px', width: '100%', maxWidth: '420px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)', margin: 'auto', position: 'relative', zIndex: 1, backdropFilter: 'blur(15px)' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '10px', justifyContent: 'center' }}>
            <div style={{ backgroundColor: 'white', padding: '8px', borderRadius: '16px', boxShadow: '0 8px 15px -3px rgba(0, 0, 0, 0.1)' }}>
              {/* MODIFIED: Using Oncoming Automobile for consistent brand theme */}
              <img src="https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Oncoming%20automobile/3D/oncoming_automobile_3d.png" alt="TS-Pool Car" width="40" height="40" className="animate-drive" style={{ display: 'block' }} />
            </div>
            <h2 style={{ fontSize: '32px', fontWeight: '900', color: '#0f172a', margin: 0, letterSpacing: '-1px' }}>
              {isSignUp ? 'Join TS-Pool' : 'TS-Pool'}
            </h2>
          </div>
          <p style={{ color: '#64748b', marginBottom: '40px', textAlign: 'center', fontSize: '15px', fontWeight: '500' }}>
            {isSignUp ? 'Create your account to start sharing rides.' : "Telangana's Premium Carpooling Network"}
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {isSignUp && (
              <div className="animate-fade-in">
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#475569', marginBottom: '8px', marginLeft: '5px' }}>Full Name</label>
                <div className="modern-input" style={{ borderRadius: '16px', overflow: 'hidden' }}>
                  <input 
                    type="text" 
                    placeholder="e.g., Anshul Reddy" 
                    value={signUpName}
                    onChange={(e) => setSignUpName(e.target.value)}
                    style={{ width: '100%', padding: '18px 20px', boxSizing: 'border-box', border: 'none', background: 'transparent', fontWeight: '600', outline: 'none', fontSize: '15px' }} 
                  />
                </div>
              </div>
            )}

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#475569', marginBottom: '8px', marginLeft: '5px' }}>Mobile Number</label>
              <div className="modern-input" style={{ display: 'flex', alignItems: 'center', borderRadius: '16px', overflow: 'hidden' }}>
                <span style={{ padding: '18px 15px 18px 20px', fontWeight: '800', color: '#64748b', borderRight: '1px solid rgba(226, 232, 240, 0.8)' }}>
                  +91
                </span>
                <input 
                  type="tel" 
                  placeholder="10-digit number" 
                  value={loginPhone}
                  onChange={(e) => setLoginPhone(e.target.value.replace(/\D/g, '').slice(0, 10))} 
                  style={{ flex: 1, padding: '18px 20px', border: 'none', background: 'transparent', fontWeight: '700', outline: 'none', fontSize: '16px', letterSpacing: '1px' }} 
                />
              </div>
            </div>
            {loginError && <span className="animate-fade-in" style={{ color: '#ef4444', fontSize: '14px', fontWeight: '600', marginTop: '-10px', display: 'flex', alignItems: 'center', gap: '5px' }}><XCircle size={16}/> {loginError}</span>}
            
            <button 
              onClick={isSignUp ? handleSignUp : handleLogin} 
              className="hover-scale"
              style={{ padding: '18px', background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)', color: 'white', borderRadius: '16px', border: 'none', fontWeight: '800', fontSize: '16px', cursor: 'pointer', marginTop: '10px', boxShadow: '0 10px 25px -5px rgba(37, 99, 235, 0.4)' }}
            >
              {isSignUp ? 'Create Account' : 'Secure Login'}
            </button>
            
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
              <button 
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setLoginError(''); 
                  setLoginPhone('');
                  setSignUpName('');
                }} 
                style={{ background: 'none', border: 'none', color: '#475569', fontWeight: '600', cursor: 'pointer', padding: '10px', fontSize: '14px', transition: 'color 0.2s' }}
                onMouseOver={(e) => e.target.style.color = '#2563eb'}
                onMouseOut={(e) => e.target.style.color = '#475569'}
              >
                {isSignUp ? 'Already have an account? Log in' : "New to TS-Pool? Create an account"}
              </button>
            </div>

          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'sans-serif' }}>
      {/* NAVBAR */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 5%', backgroundColor: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(226, 232, 240, 0.8)', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#1d4ed8' }}>
          <div style={{ backgroundColor: 'white', padding: '6px', borderRadius: '14px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)', border: '1px solid #e2e8f0' }}>
            <img src="https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Oncoming%20automobile/3D/oncoming_automobile_3d.png" alt="Car" width="30" height="30" style={{ display: 'block' }} />
          </div>
          <span style={{ fontSize: '24px', fontWeight: '900', letterSpacing: '-0.5px', color: '#0f172a' }}>TS-Pool</span>
        </div>
        
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', backgroundColor: '#f1f5f9', padding: '6px', borderRadius: '16px' }}>
          <button onClick={() => scrollToSection('find-ride-section')} style={{ padding: '10px 20px', borderRadius: '12px', border: 'none', fontWeight: '700', fontSize: '14px', backgroundColor: activeSection === 'find-ride-section' ? 'white' : 'transparent', color: activeSection === 'find-ride-section' ? '#1d4ed8' : '#64748b', cursor: 'pointer', transition: 'all 0.3s', boxShadow: activeSection === 'find-ride-section' ? '0 4px 6px -1px rgba(0,0,0,0.05)' : 'none' }}>Find Ride</button>
          <button onClick={() => scrollToSection('offer-ride-section')} style={{ padding: '10px 20px', borderRadius: '12px', border: 'none', fontWeight: '700', fontSize: '14px', backgroundColor: activeSection === 'offer-ride-section' ? 'white' : 'transparent', color: activeSection === 'offer-ride-section' ? '#1d4ed8' : '#64748b', cursor: 'pointer', transition: 'all 0.3s', boxShadow: activeSection === 'offer-ride-section' ? '0 4px 6px -1px rgba(0,0,0,0.05)' : 'none' }}>Offer Ride</button>
          <button onClick={() => scrollToSection('dashboard-section')} style={{ padding: '10px 20px', borderRadius: '12px', border: 'none', fontWeight: '700', fontSize: '14px', backgroundColor: activeSection === 'dashboard-section' ? 'white' : 'transparent', color: activeSection === 'dashboard-section' ? '#1d4ed8' : '#64748b', cursor: 'pointer', transition: 'all 0.3s', boxShadow: activeSection === 'dashboard-section' ? '0 4px 6px -1px rgba(0,0,0,0.05)' : 'none' }}>Dashboard</button>
        </div>
          
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#dbeafe', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1d4ed8', fontWeight: '800', fontSize: '16px' }}>
               {currentUser?.name.charAt(0).toUpperCase()}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontWeight: '800', color: '#0f172a', fontSize: '14px' }}>{currentUser?.name}</span>
              <span style={{ fontSize: '11px', color: '#10b981', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '3px' }}><CheckCircle size={10}/> Verified</span>
            </div>
          </div>
          <button onClick={handleLogout} className="hover-scale" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '12px', border: '1px solid #fee2e2', backgroundColor: '#fef2f2', color: '#ef4444', cursor: 'pointer' }}>
            <LogOut size={18} />
          </button>
        </div>
      </nav>

      {/* Decorative Header Background */}
      <div className="gradient-bg" style={{ padding: '60px 20px 100px 20px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '42px', fontWeight: '900', color: '#0f172a', margin: '0 0 15px 0', letterSpacing: '-1px' }}>Where are you heading today?</h1>
        <p style={{ color: '#475569', fontSize: '18px', maxWidth: '600px', margin: '0 auto', fontWeight: '500' }}>Find a comfortable ride across Telangana at a fraction of the cost.</p>
      </div>

      {/* Main Single Page Content Container */}
      <div style={{ maxWidth: '850px', margin: '-60px auto 40px auto', padding: '0 20px', position: 'relative', zIndex: 10 }}>
        
        {/* ========================================== */}
        {/* SECTION 1: FIND RIDES */}
        {/* ========================================== */}
        <div id="find-ride-section" ref={findRideRef} style={{ position: 'relative', backgroundColor: '#eff6ff', padding: '40px', borderRadius: '30px', scrollMarginTop: '100px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)' }}>
          {/* MODIFIED: Floating background graphic */}
          <img src="https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Mobile%20phone/3D/mobile_phone_3d.png" className="floating-graphic-right" alt="Phone Graphic" />
          
          <div style={{ position: 'relative', zIndex: 1 }}>
            {/* Search Box */}
            <div style={{ backgroundColor: 'white', padding: '15px', borderRadius: '24px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)', marginBottom: '40px', display: 'flex', gap: '15px', alignItems: 'center' }}>
              <div className="modern-input" style={{ display: 'flex', alignItems: 'center', flex: 1, padding: '5px 20px', borderRadius: '16px' }}>
                <MapPin size={22} color="#3b82f6" />
                <input onChange={(e) => setSearchQuery({...searchQuery, from: e.target.value})} placeholder="Leaving from..." style={{ width: '100%', padding: '15px 10px', border: 'none', backgroundColor: 'transparent', outline: 'none', fontWeight: '700', fontSize: '16px', color: '#0f172a' }} />
              </div>
              <div style={{ backgroundColor: '#f1f5f9', padding: '10px', borderRadius: '50%' }}>
                <ArrowRight color="#94a3b8" />
              </div>
              <div className="modern-input" style={{ display: 'flex', alignItems: 'center', flex: 1, padding: '5px 20px', borderRadius: '16px' }}>
                <MapPin size={22} color="#10b981" />
                <input onChange={(e) => setSearchQuery({...searchQuery, to: e.target.value})} placeholder="Going to..." style={{ width: '100%', padding: '15px 10px', border: 'none', backgroundColor: 'transparent', outline: 'none', fontWeight: '700', fontSize: '16px', color: '#0f172a' }} />
              </div>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
               <h2 style={{ fontWeight: '900', margin: 0, color: '#0f172a', fontSize: '24px' }}>Available Rides</h2>
               <span style={{ backgroundColor: 'white', color: '#1d4ed8', padding: '6px 15px', borderRadius: '20px', fontWeight: '700', fontSize: '13px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>{filteredRides.length} found</span>
            </div>

            <div style={{ display: 'grid', gap: '20px' }}>
              {filteredRides.length > 0 ? (
                filteredRides.map((ride, index) => (
                  <div key={ride.id} className="hover-scale" style={{ backgroundColor: 'white', padding: '30px', borderRadius: '24px', border: '1px solid rgba(226, 232, 240, 0.8)', display: 'flex', justifyContent: 'space-between', animationDelay: `${index * 0.1}s`, boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '12px' }}>
                        <span style={{ fontWeight: '900', fontSize: '22px', color: '#0f172a' }}>{ride.from}</span>
                        <ArrowRight size={20} color="#cbd5e1" />
                        <span style={{ fontWeight: '900', fontSize: '22px', color: '#0f172a' }}>{ride.to}</span>
                      </div>
                      
                      {ride.stopovers && (
                         <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '15px' }}>
                           <Map size={16} color="#64748b" style={{ marginTop: '1px' }}/>
                           <p style={{ color: '#64748b', fontSize: '14px', margin: 0, fontWeight: '500' }}>Routes via: <span style={{ color: '#0f172a', fontWeight: '600' }}>{ride.stopovers}</span></p>
                         </div>
                      )}
                      
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '20px 0' }}>
                        <span style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', padding: '8px 16px', borderRadius: '12px', color: '#475569', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '700' }}>
                          <Calendar size={16} color="#3b82f6" /> {ride.date}
                        </span>
                        <span style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', padding: '8px 16px', borderRadius: '12px', color: '#475569', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '700' }}>
                          <Clock size={16} color="#f59e0b" /> {formatTime(ride.time)}
                        </span>
                        
                        <span style={{ backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', padding: '8px 16px', borderRadius: '12px', color: '#1d4ed8', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '800' }}>
                          <User size={16} /> {ride.seats} Left
                        </span>
                      </div>
                      
                      <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginTop: '20px', backgroundColor: '#f8fafc', padding: '15px', borderRadius: '16px' }}>
                        <div style={{ width: '45px', height: '45px', backgroundColor: '#cbd5e1', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '18px' }}>
                           {ride.driver.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p style={{ color: '#0f172a', fontSize: '16px', fontWeight: '800', margin: '0 0 4px 0' }}>{ride.driver}</p>
                          <p style={{ color: '#64748b', fontSize: '13px', margin: 0, fontWeight: '500' }}>
                            <Car size={12} style={{ display:'inline', marginRight:'4px', marginBottom:'-2px' }}/>
                            <span style={{textTransform: 'uppercase', fontWeight: '700', color: '#334155'}}>{ride.vehicleReg}</span> • {ride.vehicleType === '4 Wheeler' && ride.vehicleModel ? ride.vehicleModel : ride.vehicleType}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-end', borderLeft: '2px dashed #e2e8f0', paddingLeft: '30px' }}>
                      <div style={{ textAlign: 'right' }}>
                         <p style={{ color: '#64748b', fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', margin: '0 0 5px 0' }}>Total Price</p>
                         <p style={{ fontSize: '36px', fontWeight: '900', color: '#059669', margin: 0, lineHeight: '1' }}>₹{ride.price}</p>
                         <p style={{ color: '#94a3b8', fontSize: '12px', fontWeight: '600', margin: '5px 0 0 0' }}>per seat</p>
                      </div>
                      
                      <button className="hover-scale" onClick={() => handleBookRide(ride)} style={{ padding: '15px 30px', background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)', color: 'white', borderRadius: '14px', border: 'none', fontWeight: '800', fontSize: '16px', cursor: 'pointer', boxShadow: '0 10px 15px -3px rgba(37, 99, 235, 0.3)', width: '100%' }}>Book Seat</button>
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ textAlign: 'center', padding: '60px 20px', backgroundColor: 'white', borderRadius: '30px', border: '2px dashed #e2e8f0' }}>
                  <div style={{ width: '80px', height: '80px', backgroundColor: '#f1f5f9', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto' }}>
                     <Search size={40} color="#94a3b8" />
                  </div>
                  <h3 style={{ color: '#0f172a', margin: '0 0 10px 0', fontSize: '24px', fontWeight: '800' }}>No rides found</h3>
                  <p style={{ color: '#64748b', margin: 0, fontSize: '16px', fontWeight: '500' }}>Try adjusting your search or scroll down to offer a ride!</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="section-divider"></div>

        {/* ========================================== */}
        {/* SECTION 2: OFFER RIDE */}
        {/* ========================================== */}
        <div id="offer-ride-section" ref={offerRideRef} style={{ position: 'relative', backgroundColor: '#ecfdf5', padding: '40px', borderRadius: '30px', scrollMarginTop: '100px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)' }}>
          {/* MODIFIED: Floating background graphic */}
          <img src="https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Automobile/3D/automobile_3d.png" className="floating-graphic-left" alt="Car Graphic" />
          
          <div style={{ position: 'relative', zIndex: 1, backgroundColor: 'white', padding: '40px', borderRadius: '24px', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '40px', borderBottom: '2px solid #f1f5f9', paddingBottom: '30px' }}>
              <div style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', padding: '16px', borderRadius: '20px', boxShadow: '0 10px 15px -3px rgba(16, 185, 129, 0.3)' }}>
                <img src="https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Oncoming%20automobile/3D/oncoming_automobile_3d.png" alt="Car" width="32" height="32" style={{ display: 'block' }} />
              </div>
              <div>
                <h2 style={{ fontWeight: '900', margin: 0, color: '#0f172a', fontSize: '28px', letterSpacing: '-0.5px' }}>Publish a Ride</h2>
                <p style={{ color: '#64748b', margin: '8px 0 0 0', fontSize: '16px', fontWeight: '500' }}>Fill in your trip details to find passengers heading your way.</p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
              <div style={{ display: 'flex', gap: '20px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '800', color: '#334155', marginBottom: '10px', marginLeft: '5px' }}>Leaving from</label>
                  <div className="modern-input" style={{ borderRadius: '16px', backgroundColor: '#f8fafc' }}>
                    <input onChange={(e) => setOfferData({...offerData, from: e.target.value})} placeholder="e.g., Kompally" style={{ width: '100%', boxSizing: 'border-box', padding: '18px 20px', border: 'none', background: 'transparent', fontWeight: '600', outline: 'none', fontSize: '15px' }} />
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '800', color: '#334155', marginBottom: '10px', marginLeft: '5px' }}>Going to (Final Dest.)</label>
                  <div className="modern-input" style={{ borderRadius: '16px', backgroundColor: '#f8fafc' }}>
                    <input onChange={(e) => setOfferData({...offerData, to: e.target.value})} placeholder="e.g., Paradise Circle" style={{ width: '100%', boxSizing: 'border-box', padding: '18px 20px', border: 'none', background: 'transparent', fontWeight: '600', outline: 'none', fontSize: '15px' }} />
                  </div>
                </div>
              </div>
              
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '800', color: '#334155', marginBottom: '10px', marginLeft: '5px' }}>Stopovers (Optional)</label>
                <div className="modern-input" style={{ borderRadius: '16px', backgroundColor: '#f8fafc' }}>
                  <input onChange={(e) => setOfferData({...offerData, stopovers: e.target.value})} placeholder="e.g., Bowenpally, Secunderabad" style={{ width: '100%', boxSizing: 'border-box', padding: '18px 20px', border: 'none', background: 'transparent', fontWeight: '600', outline: 'none', fontSize: '15px' }} />
                </div>
                <p style={{ fontSize: '12px', color: '#94a3b8', margin: '8px 0 0 10px', fontWeight: '500' }}>Passengers searching for these places will also see your ride.</p>
              </div>
              
              <div style={{ display: 'flex', gap: '20px', padding: '30px', backgroundColor: '#f8fafc', borderRadius: '24px', border: '1px solid #e2e8f0' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '800', color: '#334155', marginBottom: '10px', marginLeft: '5px' }}>Date of Journey</label>
                  <div className="modern-input" style={{ borderRadius: '16px', backgroundColor: 'white' }}>
                    <input type="date" min={getTodayDateString()} onChange={(e) => setOfferData({...offerData, date: e.target.value})} style={{ width: '100%', boxSizing: 'border-box', padding: '18px 20px', border: 'none', background: 'transparent', color: '#334155', fontWeight: '700', outline: 'none', fontSize: '15px' }} />
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '800', color: '#334155', marginBottom: '10px', marginLeft: '5px' }}>Departure Time</label>
                  <div className="modern-input" style={{ borderRadius: '16px', backgroundColor: 'white' }}>
                    <input type="time" onChange={(e) => setOfferData({...offerData, time: e.target.value})} style={{ width: '100%', boxSizing: 'border-box', padding: '18px 20px', border: 'none', background: 'transparent', color: '#334155', fontWeight: '700', outline: 'none', fontSize: '15px' }} />
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '20px' }}>
                <div style={{ flex: 2 }}>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '800', color: '#334155', marginBottom: '10px', marginLeft: '5px' }}>Vehicle Registration</label>
                  <div className="modern-input" style={{ borderRadius: '16px', backgroundColor: '#f8fafc' }}>
                    <input onChange={(e) => setOfferData({...offerData, vehicleReg: e.target.value})} placeholder="e.g., TS 09 EA 1234" style={{ width: '100%', boxSizing: 'border-box', padding: '18px 20px', border: 'none', background: 'transparent', textTransform: 'uppercase', fontWeight: '700', outline: 'none', fontSize: '15px', letterSpacing: '1px' }} />
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '800', color: '#334155', marginBottom: '10px', marginLeft: '5px' }}>Vehicle Category</label>
                  <div className="modern-input" style={{ borderRadius: '16px', backgroundColor: '#f8fafc' }}>
                    <select onChange={handleVehicleTypeChange} value={offerData.vehicleType} style={{ width: '100%', boxSizing: 'border-box', padding: '18px 20px', border: 'none', background: 'transparent', color: '#334155', fontWeight: '700', outline: 'none', fontSize: '15px', cursor: 'pointer' }}>
                      <option value="2 Wheeler">2 Wheeler</option>
                      <option value="3 Wheeler">3 Wheeler</option>
                      <option value="4 Wheeler">4 Wheeler</option>
                    </select>
                  </div>
                </div>
              </div>

              {offerData.vehicleType === '4 Wheeler' && (
                <div className="animate-fade-in">
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '800', color: '#334155', marginBottom: '10px', marginLeft: '5px' }}>Car Model</label>
                  <div className="modern-input" style={{ borderRadius: '16px', backgroundColor: '#f8fafc' }}>
                    <input onChange={(e) => setOfferData({...offerData, vehicleModel: e.target.value})} placeholder="e.g., Hyundai Creta, Maruti Swift" style={{ width: '100%', boxSizing: 'border-box', padding: '18px 20px', border: 'none', background: 'transparent', fontWeight: '600', outline: 'none', fontSize: '15px' }} />
                  </div>
                </div>
              )}
              
              <div style={{ display: 'flex', gap: '20px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '800', color: '#334155', marginBottom: '10px', marginLeft: '5px' }}>Available Seats</label>
                  <div className="modern-input" style={{ borderRadius: '16px', backgroundColor: '#f8fafc' }}>
                    <select value={offerData.seats} onChange={(e) => setOfferData({...offerData, seats: e.target.value})} style={{ width: '100%', boxSizing: 'border-box', padding: '18px 20px', border: 'none', background: 'transparent', color: '#334155', fontWeight: '700', outline: 'none', fontSize: '15px', cursor: 'pointer' }}>
                      {[...Array(getMaxSeats(offerData.vehicleType))].map((_, i) => (
                         <option key={i+1} value={i+1}>{i+1} Seat{i+1 > 1 ? 's' : ''}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '800', color: '#334155', marginBottom: '10px', marginLeft: '5px' }}>Price per Seat</label>
                  <div className="modern-input" style={{ position: 'relative', borderRadius: '16px', backgroundColor: '#f8fafc' }}>
                    <span style={{ position: 'absolute', left: '20px', top: '18px', fontWeight: '800', color: '#64748b', fontSize: '16px' }}>₹</span>
                    <input type="number" onChange={(e) => setOfferData({...offerData, price: e.target.value})} placeholder="0.00" style={{ width: '100%', boxSizing: 'border-box', padding: '18px 20px 18px 40px', border: 'none', background: 'transparent', fontWeight: '800', outline: 'none', fontSize: '16px', color: '#0f172a' }} />
                  </div>
                </div>
              </div>

              <button className="hover-scale" onClick={handlePostRide} style={{ padding: '22px', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', color: 'white', borderRadius: '16px', border: 'none', fontWeight: '900', fontSize: '18px', cursor: 'pointer', marginTop: '20px', boxShadow: '0 10px 25px -5px rgba(16, 185, 129, 0.4)' }}>
                Publish Ride
              </button>
            </div>
          </div>
        </div>

        <div className="section-divider"></div>

        {/* ========================================== */}
        {/* SECTION 3: DASHBOARD */}
        {/* ========================================== */}
        <div id="dashboard-section" ref={dashboardRef} style={{ position: 'relative', backgroundColor: '#f1f5f9', padding: '40px', borderRadius: '30px', scrollMarginTop: '100px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)' }}>
          {/* MODIFIED: Floating background graphic */}
          <img src="https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Spiral%20calendar/3D/spiral_calendar_3d.png" className="floating-graphic-right" alt="Calendar Graphic" />
          
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', padding: '0 10px' }}>
              <div>
                <h2 style={{ fontWeight: '900', margin: 0, color: '#0f172a', fontSize: '28px', letterSpacing: '-0.5px' }}>My Dashboard</h2>
                <p style={{ color: '#64748b', margin: '8px 0 0 0', fontSize: '16px', fontWeight: '500' }}>Manage your trips as a driver or passenger.</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '15px', marginBottom: '20px', padding: '0 10px' }}>
              <button onClick={() => setDashboardRole('driver')} style={{ flex: 1, padding: '14px', borderRadius: '16px', border: 'none', fontWeight: '800', fontSize: '15px', cursor: 'pointer', backgroundColor: dashboardRole === 'driver' ? '#1d4ed8' : 'white', color: dashboardRole === 'driver' ? 'white' : '#64748b', transition: 'all 0.3s', boxShadow: dashboardRole === 'driver' ? '0 10px 15px -3px rgba(29, 78, 216, 0.3)' : '0 4px 6px rgba(0,0,0,0.05)' }}>
                Driving Role
              </button>
              <button onClick={() => setDashboardRole('passenger')} style={{ flex: 1, padding: '14px', borderRadius: '16px', border: 'none', fontWeight: '800', fontSize: '15px', cursor: 'pointer', backgroundColor: dashboardRole === 'passenger' ? '#059669' : 'white', color: dashboardRole === 'passenger' ? 'white' : '#64748b', transition: 'all 0.3s', boxShadow: dashboardRole === 'passenger' ? '0 10px 15px -3px rgba(5, 150, 105, 0.3)' : '0 4px 6px rgba(0,0,0,0.05)' }}>
                Passenger Role
              </button>
            </div>
            
            <div style={{ display: 'flex', gap: '10px', marginBottom: '30px', padding: '0 10px' }}>
               <span 
                   onClick={() => setBookingStatusFilter('ongoing')} 
                   style={{ cursor: 'pointer', padding: '8px 20px', borderRadius: '20px', backgroundColor: bookingStatusFilter === 'ongoing' ? '#cbd5e1' : 'transparent', color: bookingStatusFilter === 'ongoing' ? '#0f172a' : '#64748b', fontWeight: '800', fontSize: '14px', transition: 'all 0.2s' }}>
                   Ongoing & Active
               </span>
               <span 
                   onClick={() => setBookingStatusFilter('history')} 
                   style={{ cursor: 'pointer', padding: '8px 20px', borderRadius: '20px', backgroundColor: bookingStatusFilter === 'history' ? '#cbd5e1' : 'transparent', color: bookingStatusFilter === 'history' ? '#0f172a' : '#64748b', fontWeight: '800', fontSize: '14px', transition: 'all 0.2s' }}>
                   History
               </span>
            </div>

            {/* DRIVER DASHBOARD VIEW */}
            {dashboardRole === 'driver' && (
              getDisplayedDriverBookings().length > 0 ? 
                getDisplayedDriverBookings().map((b, i) => (
                <div key={i} className="hover-scale animate-fade-in" style={{ backgroundColor: 'white', padding: '30px', borderRadius: '24px', border: '1px solid #e2e8f0', marginBottom: '20px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '2px dashed #f1f5f9', paddingBottom: '20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                          <div style={{ backgroundColor: '#eff6ff', padding: '12px', borderRadius: '16px' }}>
                            <User size={24} color="#1d4ed8" />
                          </div>
                          <div>
                            <span style={{ fontWeight: '900', fontSize: '18px', display: 'block', color: '#0f172a' }}>{b.passengerName}</span>
                            <span style={{ fontSize: '13px', color: '#64748b', fontWeight: '700' }}>Passenger • {b.requestedSeats} Seat{b.requestedSeats > 1 ? 's' : ''} requested</span>
                          </div>
                      </div>
                      <div>
                        {b.status === 'pending' && <span style={{ fontSize: '13px', padding: '6px 14px', backgroundColor: '#fffbeb', color: '#d97706', borderRadius: '20px', fontWeight: '800', border: '1px solid #fde68a' }}>PENDING</span>}
                        {b.status === 'accepted' && <span style={{ fontSize: '13px', padding: '6px 14px', backgroundColor: '#ecfdf5', color: '#059669', borderRadius: '20px', fontWeight: '800', border: '1px solid #a7f3d0' }}>ACCEPTED</span>}
                        {b.status === 'rejected' && <span style={{ fontSize: '13px', padding: '6px 14px', backgroundColor: '#fef2f2', color: '#dc2626', borderRadius: '20px', fontWeight: '800', border: '1px solid #fecaca' }}>REJECTED</span>}
                        {b.status === 'completed' && <span style={{ fontSize: '13px', padding: '6px 14px', background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', color: 'white', borderRadius: '20px', fontWeight: '800', boxShadow: '0 4px 6px rgba(245, 158, 11, 0.2)' }}>ONGOING</span>}
                        {b.status === 'finished' && <span style={{ fontSize: '13px', padding: '6px 14px', backgroundColor: '#f8fafc', color: '#64748b', borderRadius: '20px', fontWeight: '800', border: '1px solid #cbd5e1' }}>FINISHED</span>}
                      </div>
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '25px', backgroundColor: '#f8fafc', padding: '20px', borderRadius: '16px' }}>
                    <div>
                      <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 6px 0', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Route Requested</p>
                      <p style={{ margin: 0, fontWeight: '800', color: '#0f172a', fontSize: '15px' }}>{b.rideDetails}</p>
                    </div>
                    <div>
                      <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 6px 0', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Contact Info</p>
                      <p style={{ margin: 0, fontWeight: '800', color: '#1d4ed8', fontSize: '15px' }}>+91 {b.passengerMobile}</p>
                    </div>
                    <div style={{ gridColumn: '1 / -1', borderTop: '1px solid #e2e8f0', paddingTop: '15px' }}>
                      <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 6px 0', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Exact Pickup Location</p>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                        <MapPin size={18} color="#dc2626" style={{ marginTop: '2px' }}/>
                        <p style={{ margin: 0, fontWeight: '800', color: '#0f172a', fontSize: '15px' }}>{b.pickupAddress}</p>
                      </div>
                    </div>
                  </div>
                  
                  {b.status === 'pending' && (
                      <div style={{ display: 'flex', gap: '15px' }}>
                          <button 
                              className="hover-scale"
                              onClick={() => handleAction(b, 'accepted')} 
                              style={{ flex: 1, padding: '16px', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', color: 'white', borderRadius: '14px', border: 'none', fontWeight: '800', fontSize: '15px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', boxShadow: '0 4px 10px rgba(16, 185, 129, 0.3)' }}>
                              <CheckCircle size={20}/> Accept Request
                          </button>
                          <button 
                              className="hover-scale"
                              onClick={() => handleAction(b, 'rejected')} 
                              style={{ flex: 1, padding: '16px', backgroundColor: 'white', color: '#ef4444', borderRadius: '14px', border: '2px solid #fecaca', fontWeight: '800', fontSize: '15px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                              <XCircle size={20}/> Decline
                          </button>
                      </div>
                  )}

                  {b.status === 'accepted' && (
                      <div style={{ marginTop: '15px' }}>
                          <button 
                              className="hover-scale"
                              onClick={() => handleVerifyOTP(b)} 
                              style={{ width: '100%', padding: '16px', background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)', color: 'white', borderRadius: '14px', border: 'none', fontWeight: '800', fontSize: '16px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', boxShadow: '0 10px 15px -3px rgba(37, 99, 235, 0.3)' }}>
                              <ShieldCheck size={20}/> Verify Passenger OTP
                          </button>
                      </div>
                  )}

                  {b.status === 'completed' && (
                      <div style={{ marginTop: '15px' }}>
                          <button 
                              className="hover-scale"
                              onClick={() => handleAction(b, 'finished')} 
                              style={{ width: '100%', padding: '16px', backgroundColor: '#0f172a', color: 'white', borderRadius: '14px', border: 'none', fontWeight: '800', fontSize: '16px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', boxShadow: '0 10px 15px -3px rgba(15, 23, 42, 0.3)' }}>
                              <CheckCircle size={20}/> Finish Ride
                          </button>
                      </div>
                  )}

                </div>
              )) : (
                <div style={{ textAlign: 'center', padding: '60px 20px', backgroundColor: 'white', borderRadius: '30px', border: '2px dashed #e2e8f0' }}>
                  <div style={{ width: '80px', height: '80px', backgroundColor: '#f8fafc', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto' }}>
                     <img src="https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Oncoming%20automobile/3D/oncoming_automobile_3d.png" alt="Car" width="40" height="40" />
                  </div>
                  <h3 style={{ color: '#0f172a', margin: '0 0 10px 0', fontSize: '24px', fontWeight: '800' }}>
                    {bookingStatusFilter === 'ongoing' ? 'No passengers yet' : 'No past trips'}
                  </h3>
                  <p style={{ color: '#64748b', margin: 0, fontSize: '16px', fontWeight: '500' }}>
                    {bookingStatusFilter === 'ongoing' ? 'When people book your rides, their requests will appear here.' : 'Your finished trips will show up here.'}
                  </p>
                </div>
              )
            )}

            {/* PASSENGER DASHBOARD VIEW */}
            {dashboardRole === 'passenger' && (
              getDisplayedPassengerBookings().length > 0 ? 
                getDisplayedPassengerBookings().map((b, i) => (
                <div key={i} className="hover-scale animate-fade-in" style={{ backgroundColor: 'white', padding: '30px', borderRadius: '24px', border: '1px solid #e2e8f0', marginBottom: '20px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '2px dashed #f1f5f9', paddingBottom: '20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                          <div style={{ backgroundColor: '#ecfdf5', padding: '12px', borderRadius: '16px' }}>
                            <img src="https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Oncoming%20automobile/3D/oncoming_automobile_3d.png" alt="Car" width="24" height="24" />
                          </div>
                          <div>
                            <span style={{ fontWeight: '900', fontSize: '18px', display: 'block', color: '#0f172a' }}>
                              {rides.find(r => r.id === b.rideId)?.driver || 'Driver'}
                            </span>
                            <span style={{ fontSize: '13px', color: '#64748b', fontWeight: '700' }}>Driver</span>
                          </div>
                      </div>
                      <div>
                        {b.status === 'pending' && <span style={{ fontSize: '13px', padding: '6px 14px', backgroundColor: '#fffbeb', color: '#d97706', borderRadius: '20px', fontWeight: '800', border: '1px solid #fde68a' }}>PENDING</span>}
                        {b.status === 'accepted' && <span style={{ fontSize: '13px', padding: '6px 14px', backgroundColor: '#ecfdf5', color: '#059669', borderRadius: '20px', fontWeight: '800', border: '1px solid #a7f3d0' }}>ACCEPTED</span>}
                        {b.status === 'rejected' && <span style={{ fontSize: '13px', padding: '6px 14px', backgroundColor: '#fef2f2', color: '#dc2626', borderRadius: '20px', fontWeight: '800', border: '1px solid #fecaca' }}>REJECTED</span>}
                        {b.status === 'completed' && <span style={{ fontSize: '13px', padding: '6px 14px', background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', color: 'white', borderRadius: '20px', fontWeight: '800', boxShadow: '0 4px 6px rgba(245, 158, 11, 0.2)' }}>ONGOING</span>}
                        {b.status === 'finished' && <span style={{ fontSize: '13px', padding: '6px 14px', backgroundColor: '#f8fafc', color: '#64748b', borderRadius: '20px', fontWeight: '800', border: '1px solid #cbd5e1' }}>FINISHED</span>}
                      </div>
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', backgroundColor: '#f8fafc', padding: '20px', borderRadius: '16px' }}>
                    <div>
                      <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 6px 0', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Route Requested</p>
                      <p style={{ margin: 0, fontWeight: '800', color: '#0f172a', fontSize: '15px' }}>{b.rideDetails}</p>
                    </div>
                    <div>
                      <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 6px 0', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Seats Booked</p>
                      <p style={{ margin: 0, fontWeight: '800', color: '#1d4ed8', fontSize: '15px' }}>{b.requestedSeats}</p>
                    </div>
                    <div style={{ gridColumn: '1 / -1', borderTop: '1px solid #e2e8f0', paddingTop: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 6px 0', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Pickup Location</p>
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                          <MapPin size={18} color="#dc2626" style={{ marginTop: '2px' }}/>
                          <p style={{ margin: 0, fontWeight: '800', color: '#0f172a', fontSize: '15px' }}>{b.pickupAddress}</p>
                        </div>
                      </div>
                      
                      {(b.status === 'accepted' || b.status === 'completed') && (
                        <div style={{ backgroundColor: '#eff6ff', padding: '10px 20px', borderRadius: '12px', border: '1px dashed #3b82f6', textAlign: 'center' }}>
                          <p style={{ fontSize: '11px', color: '#3b82f6', margin: '0 0 4px 0', fontWeight: '800', textTransform: 'uppercase' }}>Your OTP</p>
                          <p style={{ margin: 0, fontWeight: '900', color: '#1d4ed8', fontSize: '20px', letterSpacing: '2px' }}>{b.otp}</p>
                        </div>
                      )}
                    </div>
                  </div>

                </div>
              )) : (
                <div style={{ textAlign: 'center', padding: '60px 20px', backgroundColor: 'white', borderRadius: '30px', border: '2px dashed #e2e8f0' }}>
                  <div style={{ width: '80px', height: '80px', backgroundColor: '#f8fafc', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto' }}>
                     <MapPin size={40} color="#cbd5e1" />
                  </div>
                  <h3 style={{ color: '#0f172a', margin: '0 0 10px 0', fontSize: '24px', fontWeight: '800' }}>
                    {bookingStatusFilter === 'ongoing' ? 'No trips booked yet' : 'No past trips'}
                  </h3>
                  <p style={{ color: '#64748b', margin: 0, fontSize: '16px', fontWeight: '500' }}>
                    {bookingStatusFilter === 'ongoing' ? 'When you book a ride, your trip details will appear here.' : 'Your history of completed trips will appear here.'}
                  </p>
                </div>
              )
            )}

          </div>
        </div>
        
        {/* Information Section moved to bottom as a footer-style element */}
        <div className="section-divider"></div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '30px', paddingBottom: '40px' }}>
          <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '24px', textAlign: 'center', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
            <div style={{ width: '60px', height: '60px', backgroundColor: '#eff6ff', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto', boxShadow: '0 10px 15px -3px rgba(59, 130, 246, 0.2)' }}>
              <ShieldCheck size={28} color="#2563eb" />
            </div>
            <h4 style={{ color: '#0f172a', marginBottom: '10px', fontSize: '18px', fontWeight: '800' }}>Secure Platform</h4>
            <p style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.6', margin: 0, fontWeight: '500' }}>Every user is verified via mobile OTP. Driver and vehicle details are tracked for safety.</p>
          </div>
          <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '24px', textAlign: 'center', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
            <div style={{ width: '60px', height: '60px', backgroundColor: '#ecfdf5', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto', boxShadow: '0 10px 15px -3px rgba(16, 185, 129, 0.2)' }}>
              <Zap size={28} color="#059669" />
            </div>
            <h4 style={{ color: '#0f172a', marginBottom: '10px', fontSize: '18px', fontWeight: '800' }}>Instant Booking</h4>
            <p style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.6', margin: 0, fontWeight: '500' }}>Request a seat in one click. Connect with drivers instantly via automated WhatsApp.</p>
          </div>
          <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '24px', textAlign: 'center', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
            <div style={{ width: '60px', height: '60px', backgroundColor: '#fef2f2', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto', boxShadow: '0 10px 15px -3px rgba(239, 68, 68, 0.2)' }}>
              <Users size={28} color="#dc2626" />
            </div>
            <h4 style={{ color: '#0f172a', marginBottom: '10px', fontSize: '18px', fontWeight: '800' }}>Community Driven</h4>
            <p style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.6', margin: 0, fontWeight: '500' }}>Share fuel costs, reduce traffic in Telangana, and travel comfortably with peers.</p>
          </div>
        </div>

      </div>
    </div>
  );
}