'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ColorfulSection from '../components/ui/ColorfulSection';
import AnimatedBackground from '../components/ui/AnimatedBackground';

// Define type for Google API
declare global {
  interface Window {
    gapi: {
      load: (api: string, callback: () => void) => void;
      client: {
        init: (config: any) => Promise<any>;
        calendar: {
          freebusy: {
            query: (params: any) => Promise<any>;
          };
          events: {
            insert: (params: any) => Promise<any>;
          };
        };
      };
    };
  }
}

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
    
    window.gapi.client.calendar.events.insert({
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
    }).catch(error => {
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
    <>
      <Navbar />
      <div className="relative">
        <AnimatedBackground className="" />
        <ColorfulSection 
          backgroundColor="#F0F7FF" 
          nextSectionColor="#FFF4EC"
          className="min-h-screen py-20"
        >
          <div className="container mx-auto px-4 pt-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="px-8 py-10">
                <h1 className="text-4xl font-extrabold text-center bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] bg-clip-text text-transparent mb-6">
                  Zarezerwuj Wizytę dla Twojego Pupila! 🐶 🐱
                </h1>
                
                <div className="mb-10">
                  <div className="flex items-center justify-between">
                    {[1, 2, 3].map(step => (
                      <div key={step} className="flex flex-col items-center">
                        <div 
                          className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold 
                            ${currentStep >= step 
                              ? 'bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white' 
                              : 'bg-gray-100 text-gray-400'
                            }`}
                        >
                          {step}
                        </div>
                        <span className={`mt-2 text-sm ${currentStep >= step ? 'text-gray-800 font-semibold' : 'text-gray-400'}`}>
                          {step === 1 ? 'Wybierz Usługę 🦮' : 
                           step === 2 ? 'Wybierz Termin 📅' : 
                           'Dane Kontaktowe 📝'}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 h-2 bg-gray-100 rounded-full">
                    <div 
                      className="h-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] rounded-full transition-all duration-300"
                      style={{ width: `${(currentStep / 3) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                {currentStep === 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <h2 className="text-2xl font-bold text-center mb-8">Co możemy zrobić dla Twojego pupila? 🐾</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {services.map(service => (
                        <motion.div
                          key={service.id}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleServiceSelect(service.id)}
                          className={`p-6 rounded-xl cursor-pointer transition-all border-2 flex items-center gap-4 
                            ${selectedService === service.id 
                              ? 'border-[var(--color-primary)] bg-[var(--color-primary-light)]/10' 
                              : 'border-gray-200 hover:border-[var(--color-primary-light)]'
                            }`}
                        >
                          <div className="text-4xl">{service.icon}</div>
                          <div>
                            <h3 className="font-bold text-lg">{service.name}</h3>
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
                      
                      <div className="flex justify-between pt-4">
                        <button
                          type="button"
                          onClick={prevStep}
                          className="px-6 py-2 bg-gray-200 rounded-lg text-gray-700 font-medium hover:bg-gray-300 transition-colors"
                        >
                          ← Wróć
                        </button>
                        
                        <button
                          type="submit"
                          className="px-8 py-3 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white rounded-lg font-bold hover:shadow-lg transition-all transform hover:scale-105"
                        >
                          Zarezerwuj Wizytę! 🐾
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}
                
                {currentStep < 3 && (
                  <div className="flex justify-between mt-12">
                    {currentStep > 1 ? (
                      <button
                        onClick={prevStep}
                        className="px-6 py-2 bg-gray-200 rounded-lg text-gray-700 font-medium hover:bg-gray-300 transition-colors"
                      >
                        ← Wróć
                      </button>
                    ) : (
                      <div></div>
                    )}
                    
                    <button
                      onClick={nextStep}
                      className="px-8 py-3 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white rounded-lg font-bold hover:shadow-lg transition-all transform hover:scale-105"
                    >
                      Dalej →
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </ColorfulSection>
      </div>
      <Footer />
    </>
  );
} 