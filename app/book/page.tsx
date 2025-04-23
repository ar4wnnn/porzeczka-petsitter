'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ColorfulSection from '../components/ui/ColorfulSection';
import AnimatedBackground from '../components/ui/AnimatedBackground';

export default function BookingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    petName: '',
    petType: '',
    petBreed: '',
    petAge: '',
    notes: ''
  });
  const [calendarLoaded, setCalendarLoaded] = useState(false);

  const services = [
    { id: 'dog-walking', name: 'Dog Walking', icon: '🐕' },
    { id: 'home-visits', name: 'Home Visits', icon: '🏠' },
    { id: 'overnight-care', name: 'Overnight Care', icon: '🌙' },
    { id: 'pet-taxi', name: 'Pet Taxi', icon: '🚗' },
    { id: 'grooming', name: 'Grooming', icon: '✂️' },
    { id: 'pet-medication', name: 'Pet Medication', icon: '💊' }
  ];

  useEffect(() => {
    // Load Google Calendar API
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js';
    script.onload = initializeGoogleCalendar;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const initializeGoogleCalendar = () => {
    if (window.gapi) {
      window.gapi.load('client:auth2', () => {
        window.gapi.client.init({
          apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY || '', 
          clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '',
          discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
          scope: 'https://www.googleapis.com/auth/calendar.readonly'
        }).then(() => {
          setCalendarLoaded(true);
          console.log('Google Calendar API initialized');
        }).catch(error => {
          console.error('Error initializing Google Calendar API', error);
        });
      });
    }
  };

  const fetchAvailableTimes = (date: Date) => {
    if (!calendarLoaded || !window.gapi.client) {
      // Mock data if API not loaded
      const mockTimes = ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'];
      setAvailableTimes(mockTimes);
      return;
    }

    const timeMin = new Date(date);
    timeMin.setHours(0, 0, 0, 0);
    
    const timeMax = new Date(date);
    timeMax.setHours(23, 59, 59, 999);

    window.gapi.client.calendar.freebusy.query({
      timeMin: timeMin.toISOString(),
      timeMax: timeMax.toISOString(),
      items: [{ id: 'primary' }]
    }).then(response => {
      const busySlots = response.result.calendars.primary.busy;
      
      // Generate all possible time slots (9AM to 5PM)
      const allTimeSlots = [];
      for (let hour = 9; hour <= 17; hour++) {
        allTimeSlots.push(`${hour.toString().padStart(2, '0')}:00`);
      }
      
      // Filter out busy times
      const availableSlots = allTimeSlots.filter(timeSlot => {
        const [hour, minute] = timeSlot.split(':').map(Number);
        const slotTime = new Date(date);
        slotTime.setHours(hour, minute, 0, 0);
        
        // Check if this time slot overlaps with any busy period
        return !busySlots.some(busy => {
          const busyStart = new Date(busy.start);
          const busyEnd = new Date(busy.end);
          return slotTime >= busyStart && slotTime < busyEnd;
        });
      });
      
      setAvailableTimes(availableSlots);
    }).catch(error => {
      console.error('Error fetching calendar data', error);
      // Fallback to mock data
      const mockTimes = ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'];
      setAvailableTimes(mockTimes);
    });
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    fetchAvailableTimes(date);
    setSelectedTime(null);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!calendarLoaded || !window.gapi.client) {
      alert('Booking system is currently unavailable. Please try again later or contact us directly.');
      return;
    }
    
    if (!selectedDate || !selectedTime || !selectedService) {
      alert('Please complete all booking details');
      return;
    }
    
    const bookingDate = new Date(selectedDate);
    const [hours, minutes] = selectedTime.split(':').map(Number);
    bookingDate.setHours(hours, minutes, 0, 0);
    
    const endTime = new Date(bookingDate);
    endTime.setHours(endTime.getHours() + 1); // Assuming 1-hour appointments
    
    const event = {
      summary: `Pet Service: ${services.find(s => s.id === selectedService)?.name}`,
      description: `Pet: ${formData.petName} (${formData.petType})\nNotes: ${formData.notes}\nContact: ${formData.name}, ${formData.phone}, ${formData.email}`,
      start: {
        dateTime: bookingDate.toISOString(),
        timeZone: 'Europe/Warsaw'
      },
      end: {
        dateTime: endTime.toISOString(),
        timeZone: 'Europe/Warsaw'
      }
    };
    
    window.gapi.client.calendar.events.insert({
      calendarId: 'primary',
      resource: event
    }).then(() => {
      alert('Booking confirmed! We will contact you shortly to confirm the details.');
      // Reset form
      setCurrentStep(1);
      setSelectedService(null);
      setSelectedDate(null);
      setSelectedTime(null);
      setFormData({
        name: '',
        email: '',
        phone: '',
        petName: '',
        petType: '',
        petBreed: '',
        petAge: '',
        notes: ''
      });
    }).catch(error => {
      console.error('Error creating event', error);
      alert('There was an error processing your booking. Please try again or contact us directly.');
    });
  };

  const nextStep = () => {
    if (currentStep === 1 && !selectedService) {
      alert('Please select a service');
      return;
    }
    
    if (currentStep === 2 && (!selectedDate || !selectedTime)) {
      alert('Please select both date and time');
      return;
    }
    
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  // Calendar rendering helpers
  const renderCalendar = () => {
    const currentDate = selectedDate || new Date();
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();
    const startingDayOfWeek = firstDayOfMonth.getDay();
    
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];
    
    const days = [];
    const today = new Date();
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="h-10 w-10"></div>);
    }
    
    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isToday = date.toDateString() === today.toDateString();
      const isPast = date < today && !isToday;
      const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
      
      days.push(
        <button
          key={`day-${day}`}
          onClick={() => !isPast && handleDateSelect(date)}
          disabled={isPast}
          className={`h-10 w-10 rounded-full flex items-center justify-center text-sm
            ${isPast ? 'text-gray-300 cursor-not-allowed' : 'cursor-pointer hover:bg-[var(--color-primary-light)]'}
            ${isToday ? 'border border-[var(--color-primary)]' : ''}
            ${isSelected ? 'bg-[var(--color-primary)] text-white' : ''}
          `}
        >
          {day}
        </button>
      );
    }
    
    return (
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => {
              const newDate = new Date(currentDate);
              newDate.setMonth(newDate.getMonth() - 1);
              handleDateSelect(newDate);
            }}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <h3 className="text-lg font-semibold">
            {monthNames[month]} {year}
          </h3>
          
          <button
            onClick={() => {
              const newDate = new Date(currentDate);
              newDate.setMonth(newDate.getMonth() + 1);
              handleDateSelect(newDate);
            }}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
            <div key={day} className="h-8 flex items-center justify-center text-xs text-gray-500">
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-1">
          {days}
        </div>
      </div>
    );
  };

  return (
    <main className="min-h-screen">
      <AnimatedBackground />
      <Navbar />
      
      <ColorfulSection 
        backgroundColor="#F0F7FF" 
        nextSectionColor="#FFF4EC"
        wavePattern="wave1"
        waveHeight={120}
        withFloatingShapes
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <motion.h1 
              className="text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Book Your <span className="text-[var(--color-primary)]">Pet Care</span> Service
            </motion.h1>
            <motion.p 
              className="text-lg text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Schedule a time for your pet's care with our simple booking system
            </motion.p>
          </div>
          
          {/* Progress Steps */}
          <div className="flex justify-between items-center mb-8">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  currentStep >= step 
                    ? 'bg-[var(--color-primary)] text-white' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {step}
                </div>
                <span className="text-sm mt-2">{
                  step === 1 ? 'Service' : 
                  step === 2 ? 'Schedule' : 
                  'Details'
                }</span>
              </div>
            ))}
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
            {/* Step 1: Choose Service */}
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-bold mb-6">Choose a Service</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {services.map((service) => (
                    <div 
                      key={service.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
                        selectedService === service.id 
                          ? 'border-[var(--color-primary)] bg-[var(--color-primary-light)]/10' 
                          : 'border-gray-200'
                      }`}
                      onClick={() => handleServiceSelect(service.id)}
                    >
                      <div className="text-3xl mb-2">{service.icon}</div>
                      <h3 className="font-medium">{service.name}</h3>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
            
            {/* Step 2: Choose Date & Time */}
            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-bold mb-6">Choose Date & Time</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Select Date</h3>
                    {renderCalendar()}
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Select Time</h3>
                    {selectedDate ? (
                      <div className="grid grid-cols-3 gap-2">
                        {availableTimes.length > 0 ? (
                          availableTimes.map(time => (
                            <button
                              key={time}
                              onClick={() => handleTimeSelect(time)}
                              className={`py-2 px-3 border rounded-md text-sm ${
                                selectedTime === time 
                                  ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)]' 
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                            >
                              {time}
                            </button>
                          ))
                        ) : (
                          <p className="text-gray-500 col-span-3">No available times for this date</p>
                        )}
                      </div>
                    ) : (
                      <p className="text-gray-500">Please select a date first</p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
            
            {/* Step 3: Enter Details */}
            {currentStep === 3 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-bold mb-6">Your Details</h2>
                
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Pet's Name</label>
                      <input
                        type="text"
                        name="petName"
                        value={formData.petName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Pet Type</label>
                      <select
                        name="petType"
                        value={formData.petType}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
                      >
                        <option value="">Select pet type</option>
                        <option value="Dog">Dog</option>
                        <option value="Cat">Cat</option>
                        <option value="Bird">Bird</option>
                        <option value="Small Animal">Small Animal</option>
                        <option value="Reptile">Reptile</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Breed (if applicable)</label>
                      <input
                        type="text"
                        name="petBreed"
                        value={formData.petBreed}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Pet's Age</label>
                      <input
                        type="text"
                        name="petAge"
                        value={formData.petAge}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Special Instructions or Notes</label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
                    ></textarea>
                  </div>
                  
                  <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold mb-2">Booking Summary</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>Service:</div>
                      <div className="font-medium">{services.find(s => s.id === selectedService)?.name}</div>
                      
                      <div>Date:</div>
                      <div className="font-medium">{selectedDate?.toLocaleDateString()}</div>
                      
                      <div>Time:</div>
                      <div className="font-medium">{selectedTime}</div>
                    </div>
                  </div>
                  
                  <div className="mt-4 text-sm text-gray-500">
                    <p>
                      By completing this booking, you agree to our terms of service and cancellation policy.
                      We will contact you to confirm the booking details.
                    </p>
                  </div>
                </form>
              </motion.div>
            )}
            
            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`px-5 py-2 rounded-md ${
                  currentStep === 1 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Back
              </button>
              
              {currentStep < 3 ? (
                <button
                  onClick={nextStep}
                  className="px-5 py-2 bg-[var(--color-primary)] text-white rounded-md hover:bg-[var(--color-primary-dark)]"
                >
                  Continue
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="px-5 py-2 bg-[var(--color-primary)] text-white rounded-md hover:bg-[var(--color-primary-dark)]"
                >
                  Book Appointment
                </button>
              )}
            </div>
          </div>
          
          <div className="mt-12 bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Potrzebujesz Pomocy? 🆘</h2>
            <p className="text-gray-600 mb-3">
              Masz pytania lub potrzebujesz pomocy z rezerwacją? Nie wahaj się - daj nam znać, a przybędziemy z odsieczą szybciej niż kot na dźwięk otwieranej puszki! 🐈
            </p>
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="text-gray-700">+48 123 456 789</span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="text-gray-700">rezerwacje@porzeczka-petsitter.pl</span>
            </div>
          </div>
        </div>
      </ColorfulSection>
      
      <Footer />
    </main>
  );
} 