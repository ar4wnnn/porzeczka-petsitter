'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ColorfulSection from '../components/ui/ColorfulSection';
import AnimatedBackground from '../components/ui/AnimatedBackground';

export default function BookingPage() {
  const [currentStep, setCurrentStep] = useState<number>(1);
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
    { id: 'dog-walking', name: 'Spacer z Pieskiem 🐕', icon: '🦮' },
    { id: 'home-visits', name: 'Wizyta w Domu 🏠', icon: '🐾' },
    { id: 'overnight-care', name: 'Nocny Dyżur 🌙', icon: '😴' },
    { id: 'pet-taxi', name: 'Zwierzakowa Taksówka 🚗', icon: '🐶' },
    { id: 'grooming', name: 'Kąpiel i Strzyżenie ✂️', icon: '🧼' },
    { id: 'pet-medication', name: 'Podanie Lekarstw 💊', icon: '🏥' }
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
    // Use type assertion for gapi
    const gapi = (window as any).gapi;
    if (gapi) {
      gapi.load('client:auth2', () => {
        gapi.client.init({
          apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY || '', 
          clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '',
          discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
          scope: 'https://www.googleapis.com/auth/calendar.readonly'
        }).then(() => {
          setCalendarLoaded(true);
          console.log('Google Calendar API initialized');
        }).catch((error: any) => {
          console.error('Error initializing Google Calendar API', error);
        });
      });
    }
  };

  const fetchAvailableTimes = (date: Date) => {
    // Use type assertion for gapi
    const gapi = (window as any).gapi;
    if (!calendarLoaded || !gapi || !gapi.client) {
      // Mock data if API not loaded
      const mockTimes = ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'];
      setAvailableTimes(mockTimes);
      return;
    }

    const timeMin = new Date(date);
    timeMin.setHours(0, 0, 0, 0);
    
    const timeMax = new Date(date);
    timeMax.setHours(23, 59, 59, 999);

    gapi.client.calendar.freebusy.query({
      timeMin: timeMin.toISOString(),
      timeMax: timeMax.toISOString(),
      items: [{ id: 'primary' }]
    }).then((response: any) => {
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
        return !busySlots.some((busy: any) => {
          const busyStart = new Date(busy.start);
          const busyEnd = new Date(busy.end);
          return slotTime >= busyStart && slotTime < busyEnd;
        });
      });
      
      setAvailableTimes(availableSlots);
    }).catch((error: any) => {
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
    
    // Use type assertion for gapi
    const gapi = (window as any).gapi;
    if (!calendarLoaded || !gapi || !gapi.client) {
      alert('System rezerwacji jest chwilowo niedostępny. Spróbuj ponownie później lub skontaktuj się z nami bezpośrednio! 🐾');
      return;
    }
    
    if (!selectedDate || !selectedTime || !selectedService) {
      alert('Wypełnij wszystkie dane rezerwacji, proszę! 🐱');
      return;
    }
    
    const bookingDate = new Date(selectedDate);
    const [hours, minutes] = selectedTime.split(':').map(Number);
    bookingDate.setHours(hours, minutes, 0, 0);
    
    const endTime = new Date(bookingDate);
    endTime.setHours(endTime.getHours() + 1); // Assuming 1-hour appointments
    
    const event = {
      summary: `Usługa: ${services.find(s => s.id === selectedService)?.name}`,
      description: `Zwierzak: ${formData.petName} (${formData.petType})\nUwagi: ${formData.notes}\nKontakt: ${formData.name}, ${formData.phone}, ${formData.email}`,
      start: {
        dateTime: bookingDate.toISOString(),
        timeZone: 'Europe/Warsaw'
      },
      end: {
        dateTime: endTime.toISOString(),
        timeZone: 'Europe/Warsaw'
      }
    };
    
    gapi.client.calendar.events.insert({
      calendarId: 'primary',
      resource: event
    }).then(() => {
      alert('Rezerwacja potwierdzona! 🎉 Wkrótce skontaktujemy się z Tobą, żeby potwierdzić szczegóły. Twój pupil już nie może się doczekać! 🐶❤️');
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
    }).catch((error: any) => {
      console.error('Error creating event', error);
      alert('Ojej! 😿 Wystąpił błąd podczas przetwarzania rezerwacji. Spróbuj ponownie lub skontaktuj się z nami bezpośrednio!');
    });
  };

  const nextStep = () => {
    if (currentStep === 1 && !selectedService) {
      alert('Wybierz usługę, prosimy! 🐾');
      return;
    }
    
    if (currentStep === 2 && (!selectedDate || !selectedTime)) {
      alert('Wybierz datę i godzinę Twojej wizyty! 📅');
      return;
    }
    
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
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
      <Navbar />
      <div className="relative">
        <AnimatedBackground />
        <ColorfulSection 
          backgroundColor="#FFF0F8" 
          nextSectionColor="#F2EAFF"
          wavePattern="wave1"
          waveHeight={100}
          withFloatingShapes={true}
          className="pt-36 pb-32"
        >
          <div className="max-w-4xl mx-auto p-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8">
              <div className="mb-8 text-center">
                <motion.div 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text-[var(--color-primary)]">
                    Zarezerwuj Usługę Petsittingu 🐾
                  </h1>
                  <p className="text-gray-600 max-w-xl mx-auto">
                    Wypełnij poniższy formularz, aby zarezerwować wybraną usługę. 
                    Twój pupil już nie może się doczekać nowej przygody! 🐶
                  </p>
                </motion.div>
              </div>
              
              <div className="flex items-center justify-between mb-10">
                {/* Progress Steps */}
                <div className="w-full flex justify-between relative">
                  {[1, 2, 3].map((step) => (
                    <div 
                      key={step} 
                      className={`w-10 h-10 rounded-full flex items-center justify-center z-10 ${
                        currentStep === step 
                          ? 'bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white' 
                          : currentStep > step 
                            ? 'bg-[var(--color-primary)] text-white' 
                            : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {currentStep > step ? '✓' : step}
                    </div>
                  ))}
                  
                  {/* Progress Bar */}
                  <div className="absolute top-1/2 transform -translate-y-1/2 left-0 right-0 h-1 bg-gray-200">
                    <div 
                      className="h-full bg-[var(--color-primary)]" 
                      style={{ width: `${(currentStep - 1) * 50}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                {currentStep === 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <h2 className="text-2xl font-bold text-center mb-8">Wybierz usługę dla swojego pupila 🐱</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {services.map((service) => (
                        <motion.div
                          key={service.id}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleServiceSelect(service.id)}
                          className={`p-6 rounded-xl cursor-pointer transition-all ${
                            selectedService === service.id 
                              ? 'bg-[var(--color-primary-light)] border-2 border-[var(--color-primary)] shadow-md' 
                              : 'bg-white hover:bg-gray-50 border border-gray-200'
                          }`}
                        >
                          <div className="flex items-center space-x-4">
                            <div className="text-4xl">{service.icon}</div>
                            <div>
                              <h3 className="font-bold text-lg">{service.name}</h3>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
                
                {currentStep === 2 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <h2 className="text-2xl font-bold text-center mb-8">Kiedy zaplanować radosny dzień? 📅 🐶</h2>
                    
                    <div className="flex flex-col md:flex-row gap-8">
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-4">Wybierz datę:</h3>
                        {renderCalendar()}
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-4">Wybierz godzinę:</h3>
                        {selectedDate ? (
                          <div className="grid grid-cols-2 gap-3">
                            {availableTimes.length > 0 ? (
                              availableTimes.map(time => (
                                <motion.button
                                  key={time}
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => handleTimeSelect(time)}
                                  className={`py-2 px-4 rounded-lg text-center
                                    ${selectedTime === time 
                                      ? 'bg-[var(--color-primary)] text-white' 
                                      : 'bg-gray-100 hover:bg-[var(--color-primary-light)]/20'
                                    }`}
                                >
                                  {time} {time < '12:00' ? '🌅' : '☀️'}
                                </motion.button>
                              ))
                            ) : (
                              <p className="col-span-2 text-center text-gray-500 py-4">
                                Brak dostępnych terminów w tym dniu 😿 <br/>
                                Wybierz inny dzień, proszę!
                              </p>
                            )}
                          </div>
                        ) : (
                          <p className="text-center text-gray-500 py-4">
                            Najpierw wybierz datę z kalendarza 🗓️
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
                
                {currentStep === 3 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <h2 className="text-2xl font-bold text-center mb-8">Powiedz nam więcej o sobie i Twoim pupilu! 📝 🐾</h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Twoje imię i nazwisko 👤</label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                            placeholder="Jan Kowalski"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Email 📧</label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                            placeholder="jan@example.com"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Telefon 📱</label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                            placeholder="123-456-789"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Imię pupila 🐶</label>
                          <input
                            type="text"
                            name="petName"
                            value={formData.petName}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                            placeholder="Reksio"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Rodzaj zwierzaka 🐾</label>
                          <select
                            name="petType"
                            value={formData.petType}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                          >
                            <option value="">Wybierz...</option>
                            <option value="Pies">Pies 🐕</option>
                            <option value="Kot">Kot 🐱</option>
                            <option value="Królik">Królik 🐰</option>
                            <option value="Świnka morska">Świnka morska 🐹</option>
                            <option value="Inne">Inne zwierzątko 🦜</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Rasa pupila 🧬</label>
                          <input
                            type="text"
                            name="petBreed"
                            value={formData.petBreed}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                            placeholder="Labrador / Dachowiec / Perski"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Wiek pupila 🎂</label>
                          <input
                            type="text"
                            name="petAge"
                            value={formData.petAge}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                            placeholder="2 lata"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Specjalne instrukcje lub uwagi 📝</label>
                        <textarea
                          name="notes"
                          value={formData.notes}
                          onChange={handleInputChange}
                          rows={4}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                          placeholder="Powiedz nam co lubi Twój pupil, o czym powinniśmy pamiętać, czy ma jakieś szczególne potrzeby... 🐾"
                        ></textarea>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-bold mb-2">Podsumowanie Twojej rezerwacji:</h3>
                        <p><span className="font-semibold">Usługa:</span> {services.find(s => s.id === selectedService)?.name || '(nie wybrano)'}</p>
                        <p>
                          <span className="font-semibold">Termin:</span> {selectedDate ? (
                            <>
                              {selectedDate.toLocaleDateString('pl-PL')} o {selectedTime || '(nie wybrano godziny)'}
                            </>
                          ) : '(nie wybrano)'}
                        </p>
                      </div>
                      
                      <div className="flex justify-between mt-8">
                        {currentStep > 1 && (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={prevStep}
                            className="px-6 py-3 bg-gray-200 rounded-full text-gray-700 font-medium hover:bg-gray-300 transition-all flex items-center"
                          >
                            <span className="mr-2">←</span> Wróć
                          </motion.button>
                        )}
                        
                        {currentStep < 3 ? (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={nextStep}
                            disabled={
                              (currentStep === 1 && !selectedService) || 
                            disabled={(currentStep === 1 && !selectedService) || (currentStep === 2 && (!selectedDate || !selectedTime))}
                            className={`px-6 py-3 rounded-full font-medium ml-auto flex items-center ${
                              (currentStep === 1 && !selectedService) || (currentStep === 2 && (!selectedDate || !selectedTime))
                                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                : 'bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white hover:shadow-lg transition-all'
                            }`}
                          >
                            Dalej <span className="ml-2">→</span>
                          </motion.button>
                        ) : (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type="submit"
                            onClick={handleSubmit}
                            className="px-6 py-3 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] rounded-full text-white font-medium hover:shadow-lg transition-all ml-auto flex items-center"
                          >
                            Zarezerwuj <span className="ml-2">✓</span>
                          </motion.button>
                        )}
                      </div>
                    </form>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </ColorfulSection>
      </div>
      <Footer />
    </main>
  );
} 