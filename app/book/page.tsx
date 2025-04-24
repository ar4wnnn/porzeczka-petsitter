'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ColorfulSection from '../components/ui/ColorfulSection';
import AnimatedBackground from '../components/ui/AnimatedBackground';

const services = [
  { id: 'dog-walking', name: 'Spacer z Pieskiem 🐕', icon: '🦮' },
  { id: 'home-visits', name: 'Wizyta w Domu 🏠', icon: '🐾' },
  { id: 'overnight-care', name: 'Nocny Dyżur 🌙', icon: '😴' },
  { id: 'pet-taxi', name: 'Zwierzakowa Taksówka 🚗', icon: '🐶' },
  { id: 'grooming', name: 'Kąpiel i Strzyżenie ✂️', icon: '🧼' },
  { id: 'pet-medication', name: 'Podanie Lekarstw 💊', icon: '🏥' }
];

// Mock available times for simplicity
const mockTimes = ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'];

interface FormData {
  name: string;
  email: string;
  phone: string;
  petName: string;
  petType: string;
  petBreed: string;
  petAge: string;
  notes: string;
}

export default function BookingPage() {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    petName: '',
    petType: '',
    petBreed: '',
    petAge: '',
    notes: ''
  });

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId);
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedTime(''); // Reset time when date changes
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (step === 1) {
      if (!selectedService) {
        alert('Wybierz usługę, prosimy! 🐾');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!selectedDate || !selectedTime) {
        alert('Wybierz datę i godzinę Twojej wizyty! 📅');
        return;
      }
      setStep(3);
    }
  };

  const handleBack = () => {
    setStep(prev => Math.max(1, prev - 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Rezerwacja potwierdzona! 🎉 Wkrótce skontaktujemy się z Tobą, żeby potwierdzić szczegóły. Twój pupil już nie może się doczekać! 🐶❤️');
    // Reset form
    setStep(1);
    setSelectedService('');
    setSelectedDate(null);
    setSelectedTime('');
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
  };

  // Simple calendar component
  const renderCalendar = () => {
    const today = new Date();
    const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    const days: JSX.Element[] = [];
    
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(today.getFullYear(), today.getMonth(), day);
      const isToday = day === today.getDate();
      const isPast = date < today && !isToday;
      const isSelected = selectedDate && 
        selectedDate.getDate() === day &&
        selectedDate.getMonth() === today.getMonth() &&
        selectedDate.getFullYear() === today.getFullYear();
      
      days.push(
        <button
          key={`day-${day}`}
          onClick={() => !isPast && handleDateSelect(date)}
          disabled={isPast}
          className={`h-10 w-10 rounded-full flex items-center justify-center text-sm
            ${isPast ? 'text-gray-300 cursor-not-allowed' : 'cursor-pointer hover:bg-purple-100'}
            ${isToday ? 'border border-purple-500' : ''}
            ${isSelected ? 'bg-purple-500 text-white' : ''}
          `}
        >
          {day}
        </button>
      );
    }
    
    const weekdayHeaders: JSX.Element[] = ['Nd', 'Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'Sb'].map(day => (
      <div key={day} className="h-8 flex items-center justify-center text-xs text-gray-500">
        {day}
      </div>
    ));
    
    // Calculate starting offset
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const startingDayOfWeek = firstDayOfMonth.getDay();
    const blanks: JSX.Element[] = Array(startingDayOfWeek).fill(null).map((_, i) => (
      <div key={`blank-${i}`} className="h-10 w-10"></div>
    ));
    
    return (
      <div className="mb-8">
        <div className="text-lg font-semibold text-center mb-4">
          {today.toLocaleString('pl-PL', { month: 'long', year: 'numeric' })}
        </div>
        
        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekdayHeaders}
        </div>
        
        <div className="grid grid-cols-7 gap-1">
          {blanks}
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
                  <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text-purple-500">
                    Zarezerwuj Usługę Petsittingu 🐾
                  </h1>
                  <p className="text-gray-600 max-w-xl mx-auto">
                    Wypełnij poniższy formularz, aby zarezerwować wybraną usługę. 
                    Twój pupil już nie może się doczekać nowej przygody! 🐶
                  </p>
                </motion.div>
              </div>
          
              {/* Progress Steps */}
              <div className="flex items-center justify-between mb-10">
                <div className="w-full flex justify-between relative">
                  {[1, 2, 3].map((s) => (
                    <div 
                      key={s} 
                      className={`w-10 h-10 rounded-full flex items-center justify-center z-10 ${
                        step === s 
                          ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white' 
                          : step > s 
                            ? 'bg-purple-500 text-white' 
                            : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {step > s ? '✓' : s}
                    </div>
                  ))}
                  
                  {/* Progress Bar */}
                  <div className="absolute top-1/2 transform -translate-y-1/2 left-0 right-0 h-1 bg-gray-200">
                    <div 
                      className="h-full bg-purple-500" 
                      style={{ width: `${(step - 1) * 50}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                {/* Step 1: Service Selection */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-6"
                  >
                    <h2 className="text-2xl font-bold text-center mb-8">Wybierz usługę dla swojego pupila 🐱</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {services.map((service) => (
                        <div
                          key={service.id}
                          onClick={() => handleServiceSelect(service.id)}
                          className={`p-6 rounded-xl cursor-pointer transition-all ${
                            selectedService === service.id 
                              ? 'bg-purple-100 border-2 border-purple-500 shadow-md' 
                              : 'bg-white hover:bg-gray-50 border border-gray-200'
                          }`}
                        >
                          <div className="flex items-center space-x-4">
                            <div className="text-4xl">{service.icon}</div>
                            <div>
                              <h3 className="font-bold text-lg">{service.name}</h3>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
                
                {/* Step 2: Date & Time Selection */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
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
                            {mockTimes.map(time => (
                              <button
                                key={time}
                                onClick={() => handleTimeSelect(time)}
                                className={`py-2 px-4 rounded-lg text-center
                                  ${selectedTime === time 
                                    ? 'bg-purple-500 text-white' 
                                    : 'bg-gray-100 hover:bg-purple-100'
                                  }`}
                              >
                                {time} {time < '12:00' ? '🌅' : '☀️'}
                              </button>
                            ))}
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
                
                {/* Step 3: Personal Information */}
                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
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
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                        {step > 1 && (
                          <button
                            type="button"
                            onClick={handleBack}
                            className="px-6 py-3 bg-gray-200 rounded-full text-gray-700 font-medium hover:bg-gray-300 transition-all flex items-center"
                          >
                            <span className="mr-2">←</span> Wróć
                          </button>
                        )}
                        
                        {step !== 3 ? (
                          <button
                            type="button"
                            onClick={handleNext}
                            className={`px-6 py-3 rounded-full font-medium ml-auto flex items-center ${
                              (step === 1 && !selectedService) || (step === 2 && (!selectedDate || !selectedTime))
                                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                : 'bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:shadow-lg transition-all'
                            }`}
                          >
                            Dalej <span className="ml-2">→</span>
                          </button>
                        ) : (
                          <button
                            type="submit"
                            className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full text-white font-medium hover:shadow-lg transition-all ml-auto flex items-center"
                          >
                            Zarezerwuj <span className="ml-2">✓</span>
                          </button>
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