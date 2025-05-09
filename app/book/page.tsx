'use client';

import React, { useState } from 'react';
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

// Mock available times
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
  // Instead of using a step state, we'll just directly control visibility of each section
  const [showServiceSelection, setShowServiceSelection] = useState(true);
  const [showDateTimeSelection, setShowDateTimeSelection] = useState(false);
  const [showPersonalInfo, setShowPersonalInfo] = useState(false);
  
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

  // Handle service selection and advance to next step
  function handleServiceSelect(serviceId: string) {
    setSelectedService(serviceId);
    console.log("Selected service:", serviceId);
  }

  // Go to step 2 - Date & Time Selection
  function goToStep2() {
    if (!selectedService) {
      alert('Wybierz usługę, prosimy! 🐾');
      return;
    }
    console.log("Going to step 2");
    setShowServiceSelection(false);
    setShowDateTimeSelection(true);
    setShowPersonalInfo(false);
  }

  // Go to step 3 - Personal Information
  function goToStep3() {
    if (!selectedDate || !selectedTime) {
      alert('Wybierz datę i godzinę Twojej wizyty! 📅');
      return;
    }
    setShowServiceSelection(false);
    setShowDateTimeSelection(false);
    setShowPersonalInfo(true);
  }

  // Go back to service selection
  function backToStep1() {
    setShowServiceSelection(true);
    setShowDateTimeSelection(false);
    setShowPersonalInfo(false);
  }

  // Go back to date & time selection
  function backToStep2() {
    setShowServiceSelection(false);
    setShowDateTimeSelection(true);
    setShowPersonalInfo(false);
  }

  function handleDateSelect(date: Date) {
    setSelectedDate(date);
    setSelectedTime('');
  }

  function handleTimeSelect(time: string) {
    setSelectedTime(time);
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    alert('Rezerwacja potwierdzona! 🎉 Wkrótce skontaktujemy się z Tobą, żeby potwierdzić szczegóły. Twój pupil już nie może się doczekać! 🐶❤️');
    
    // Reset form and go back to step 1
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
    setShowServiceSelection(true);
    setShowDateTimeSelection(false);
    setShowPersonalInfo(false);
  }

  // Get current step for progress indicator
  function getCurrentStep() {
    if (showPersonalInfo) return 3;
    if (showDateTimeSelection) return 2;
    return 1;
  }

  // Simple calendar component
  function renderCalendar() {
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
          className={`h-10 w-10 rounded-full flex items-center justify-center text-sm transition-colors duration-150
            ${isPast ? 'text-stone-light cursor-not-allowed' : 'cursor-pointer hover:bg-sky-light/50'}
            ${isToday ? 'border border-sky-medium' : ''}
            ${isSelected ? 'bg-sky-dark text-frost' : isToday ? 'text-sky-dark' : 'text-stone-dark'}
          `}
          type="button"
        >
          {day}
        </button>
      );
    }
    
    const weekdayHeaders: JSX.Element[] = ['Nd', 'Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'Sb'].map(day => (
      <div key={day} className="h-8 flex items-center justify-center text-xs text-stone-medium">
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
  }

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="relative">
        <AnimatedBackground />
        <ColorfulSection 
          backgroundColor="var(--frost)" 
          nextSectionColor="var(--sky-light)"
          wavePattern="wave1"
          waveHeight={100}
          withFloatingShapes={true}
          className="pt-36 pb-32"
        >
          <div className="max-w-4xl mx-auto p-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8">
              <div className="mb-8 text-center">
                <div>
                  <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text-sky-dark">
                    Zarezerwuj Usługę Petsittingu 🐾
                  </h1>
                  <p className="text-stone-medium max-w-xl mx-auto">
                    Wypełnij poniższy formularz, aby zarezerwować wybraną usługę. 
                    Twój pupil już nie może się doczekać nowej przygody! 🐶
                  </p>
                </div>
              </div>
          
              {/* Progress Steps - Simplified version */}
              <div className="flex items-center justify-between mb-10">
                <div className="w-full flex justify-between relative">
                  {[1, 2, 3].map((s) => (
                    <div 
                      key={s} 
                      className={`w-10 h-10 rounded-full flex items-center justify-center z-10 transition-colors duration-300 ${
                        getCurrentStep() === s 
                          ? 'bg-gradient-to-r from-sky-medium to-sky-dark text-frost' 
                          : getCurrentStep() > s 
                            ? 'bg-sky-dark text-frost' 
                            : 'bg-stone-light text-stone-medium'
                      }`}
                    >
                      {getCurrentStep() > s ? '✓' : s}
                    </div>
                  ))}
                  
                  {/* Progress Bar */}
                  <div className="absolute top-1/2 transform -translate-y-1/2 left-0 right-0 h-1 bg-stone-light">
                    <div 
                      className="h-full bg-sky-dark transition-all duration-500 ease-out"
                      style={{ width: `${((getCurrentStep() - 1) / 2) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                {/* Step 1: Service Selection */}
                {showServiceSelection && (
                  <div>
                    <h2 className="text-2xl font-bold text-center mb-8">Wybierz usługę dla swojego pupila 🐱</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {services.map((service) => (
                        <div
                          key={service.id}
                          onClick={() => handleServiceSelect(service.id)}
                          className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 group 
                            ${selectedService === service.id 
                              ? 'border-sky-dark bg-sky-light/30 shadow-lg' 
                              : 'border-stone-light hover:border-sky-medium hover:shadow-md'}
                          `}
                        >
                          <div className={`text-3xl mb-2 ${selectedService === service.id ? 'text-sky-dark' : 'text-stone-medium group-hover:text-sky-dark'}`}>
                            {service.icon}
                          </div>
                          <h3 className={`font-semibold ${selectedService === service.id ? 'text-sky-dark' : 'text-stone-dark'}`}>{service.name}</h3>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex justify-end mt-8">
                      <button 
                        onClick={goToStep2}
                        className="w-full mt-6 bg-gradient-to-r from-sky-medium to-sky-dark text-frost font-medium py-3 px-6 rounded-lg hover:shadow-lg transition-all shadow-md disabled:opacity-50"
                        disabled={!selectedService}
                      >
                        Dalej <span className="ml-2">→</span>
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Step 2: Date & Time Selection */}
                {showDateTimeSelection && (
                  <div>
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
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-150 
                                  ${selectedTime === time 
                                    ? 'bg-sky-dark text-frost' 
                                    : 'bg-stone-light text-stone-dark hover:bg-sky-light/50'}
                                `}
                                type="button"
                              >
                                {time} {time < '12:00' ? '🌅' : '☀️'}
                              </button>
                            ))}
                          </div>
                        ) : (
                          <p className="text-center text-stone-medium py-4">
                            Najpierw wybierz datę z kalendarza 🗓️
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex justify-between mt-8">
                      <button
                        onClick={backToStep1}
                        className="px-6 py-2 border border-stone-medium text-stone-dark rounded-lg hover:bg-stone-light transition-colors"
                        type="button"
                      >
                        Wstecz
                      </button>
                      
                      <button
                        onClick={goToStep3}
                        className="bg-gradient-to-r from-sky-medium to-sky-dark text-frost font-medium py-2 px-6 rounded-lg hover:shadow-lg transition-all shadow-md disabled:opacity-50"
                        disabled={!selectedDate || !selectedTime}
                        type="button"
                      >
                        Dalej <span className="ml-2">→</span>
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Step 3: Personal Information */}
                {showPersonalInfo && (
                  <div>
                    <h2 className="text-2xl font-bold text-center mb-8">Powiedz nam więcej o sobie i Twoim pupilu! 📝 🐾</h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-stone-dark mb-1">Twoje imię i nazwisko 👤</label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2 border border-stone-light rounded-lg focus:ring-2 focus:ring-sky-medium focus:border-transparent"
                            placeholder="Jan Kowalski"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-stone-dark mb-1">Email 📧</label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2 border border-stone-light rounded-lg focus:ring-2 focus:ring-sky-medium focus:border-transparent"
                            placeholder="jan@example.com"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-stone-dark mb-1">Telefon 📱</label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2 border border-stone-light rounded-lg focus:ring-2 focus:ring-sky-medium focus:border-transparent"
                            placeholder="123-456-789"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="petName" className="block text-sm font-medium text-stone-dark mb-1">Imię pupila 🐶</label>
                          <input
                            type="text"
                            id="petName"
                            name="petName"
                            value={formData.petName}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2 border border-stone-light rounded-lg focus:ring-2 focus:ring-sky-medium focus:border-transparent"
                            placeholder="Reksio"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="petType" className="block text-sm font-medium text-stone-dark mb-1">Rodzaj zwierzaka 🐾</label>
                          <select
                            id="petType"
                            name="petType"
                            value={formData.petType}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2 border border-stone-light rounded-lg focus:ring-2 focus:ring-sky-medium focus:border-transparent"
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
                          <label htmlFor="petBreed" className="block text-sm font-medium text-stone-dark mb-1">Rasa pupila 🧬</label>
                          <input
                            type="text"
                            id="petBreed"
                            name="petBreed"
                            value={formData.petBreed}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-stone-light rounded-lg focus:ring-2 focus:ring-sky-medium focus:border-transparent"
                            placeholder="Labrador / Dachowiec / Perski"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="petAge" className="block text-sm font-medium text-stone-dark mb-1">Wiek pupila 🎂</label>
                          <input
                            type="text"
                            id="petAge"
                            name="petAge"
                            value={formData.petAge}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-stone-light rounded-lg focus:ring-2 focus:ring-sky-medium focus:border-transparent"
                            placeholder="2 lata"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="notes" className="block text-sm font-medium text-stone-dark mb-1">Specjalne instrukcje lub uwagi 📝</label>
                        <textarea
                          id="notes"
                          name="notes"
                          value={formData.notes}
                          onChange={handleInputChange}
                          rows={4}
                          className="w-full px-4 py-2 border border-stone-light rounded-lg focus:ring-2 focus:ring-sky-medium focus:border-transparent"
                          placeholder="Powiedz nam co lubi Twój pupil, o czym powinniśmy pamiętać, czy ma jakieś szczególne potrzeby... 🐾"
                        ></textarea>
                      </div>
                      
                      <div className="bg-stone-light p-4 rounded-lg">
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
                        <button
                          onClick={backToStep2}
                          className="px-6 py-2 border border-stone-medium text-stone-dark rounded-lg hover:bg-stone-light transition-colors"
                          type="button"
                        >
                          Wstecz
                        </button>
                        
                        <button
                          type="submit"
                          className="bg-gradient-to-r from-sky-medium to-sky-dark text-frost font-medium py-2 px-6 rounded-lg hover:shadow-lg transition-all shadow-md"
                        >
                          Potwierdź Rezerwację 🐾
                        </button>
                      </div>
                    </form>
                  </div>
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