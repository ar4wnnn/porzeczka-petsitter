'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ColorfulSection from '../components/ui/ColorfulSection';
import AnimatedBackground from '../components/ui/AnimatedBackground';
import { MapPinIcon, PhoneIcon, EnvelopeIcon, ClockIcon } from '@heroicons/react/24/outline';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      // In a real application, you would send this data to your backend
      // For demo purposes, we'll simulate a successful submission after a delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      setSubmitError('There was an error submitting your message. Please try again.');
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-16">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Miau-Kontakt <span className="text-[var(--color-primary)]">z Nami 😸</span>
            </motion.h1>
            <motion.p 
              className="text-lg text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Masz pytania albo chcesz zamówić nasze usługi? Jesteśmy tu, żeby pomóc! 😺
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <div className="bg-gradient-to-r from-[#FF6B9E] to-[#B86EFF] px-6 py-4">
                <h2 className="text-2xl font-bold text-white">Skontaktuj się z nami 📬 😺</h2>
              </div>
              
              <div className="p-6">
                {submitSuccess ? (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <p className="text-green-700 font-medium">Twoja wiadomość została wysłana pomyślnie! Odezwiemy się najszybciej jak to możliwe - miau! 😽</p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white rounded-xl shadow-xl p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Imię i nazwisko *</label>
                        <input 
                          type="text" 
                          id="name" 
                          name="name" 
                          value={formData.name} 
                          onChange={handleInputChange} 
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent" 
                          required 
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                        <input 
                          type="email" 
                          id="email" 
                          name="email" 
                          value={formData.email} 
                          onChange={handleInputChange} 
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent" 
                          required 
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Telefon</label>
                        <input 
                          type="tel" 
                          id="phone" 
                          name="phone" 
                          value={formData.phone} 
                          onChange={handleInputChange} 
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent" 
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="inquiryType" className="block text-sm font-medium text-gray-700 mb-1">Typ zapytania *</label>
                        <select 
                          id="inquiryType" 
                          name="inquiryType" 
                          value={formData.subject} 
                          onChange={handleInputChange} 
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent" 
                          required
                        >
                          <option value="">Wybierz typ zapytania 🤔</option>
                          <option value="booking">Rezerwacja 📅</option>
                          <option value="information">Ogólna informacja ℹ️</option>
                          <option value="pricing">Ceny 💰</option>
                          <option value="feedback">Opinia 🌟</option>
                          <option value="other">Inne 🐾</option>
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Twoja wiadomość *</label>
                        <textarea 
                          id="message" 
                          name="message" 
                          value={formData.message} 
                          onChange={handleInputChange} 
                          rows={5} 
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent" 
                          required
                        ></textarea>
                      </div>
                      
                      <div>
                        <button 
                          type="submit" 
                          className="w-full bg-gradient-to-r from-[#FF6B9E] to-[#B86EFF] text-white font-medium py-3 px-6 rounded-lg hover:shadow-lg transition-all shadow-md"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? 'Wysyłanie...' : 'Wyślij wiadomość'} 😸
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </motion.div>
            
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Contact Details */}
              <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                <h2 className="text-2xl font-bold mb-6">Informacje kontaktowe 📱 😻</h2>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="bg-pink-100 p-3 rounded-full text-pink-500">
                      <MapPinIcon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-medium">Adres 🏠</h3>
                      <p className="text-gray-600 mt-1">ul. Kocia 15<br />00-000 Warszawa, Polska</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-pink-100 p-3 rounded-full text-pink-500">
                      <PhoneIcon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-medium">Telefon ☎️</h3>
                      <p className="text-gray-600 mt-1">+48 123 456 789<br />+48 987 654 321</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-pink-100 p-3 rounded-full text-pink-500">
                      <EnvelopeIcon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-medium">Email 📧</h3>
                      <p className="text-gray-600 mt-1">kontakt@porzeczka-petsitter.pl<br />rezerwacje@porzeczka-petsitter.pl</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-pink-100 p-3 rounded-full text-pink-500">
                      <ClockIcon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-medium">Godziny pracy ⏰</h3>
                      <p className="text-gray-600 mt-1">
                        Poniedziałek - Piątek: 8:00 - 20:00<br />
                        Sobota - Niedziela: 9:00 - 18:00<br />
                        (dla kotków pracujemy 24/7 😽)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Social Media */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-2xl font-bold mb-4">Połącz Się z Nami 🌐 😺</h2>
                <p className="text-gray-600 mb-6">Śledź nas w mediach społecznościowych, aby otrzymywać aktualizacje, porady dotyczące opieki nad zwierzętami i urocze zdjęcia! 📸 😻</p>
                
                <div className="flex space-x-4">
                  <a href="#" className="bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                    </svg>
                  </a>
                  <a href="#" className="bg-pink-500 text-white p-3 rounded-full hover:bg-pink-600 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                  <a href="#" className="bg-blue-400 text-white p-3 rounded-full hover:bg-blue-500 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                    </svg>
                  </a>
                  <a href="#" className="bg-red-500 text-white p-3 rounded-full hover:bg-red-600 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* FAQ Section */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-8 text-center">Najczęściej Zadawane Pytania 🤔 😸</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div 
                className="bg-white p-6 rounded-xl shadow-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h3 className="text-lg font-semibold">Z jakim wyprzedzeniem powinienem zarezerwować usługi? 📅 😺</h3>
                <p className="text-gray-600 mt-2">Zalecamy rezerwację z co najmniej tygodniowym wyprzedzeniem dla standardowych usług. W okresie świątecznym preferowane jest 2-3 tygodniowe wyprzedzenie, aby zapewnić dostępność.</p>
              </motion.div>
              
              <motion.div 
                className="bg-white p-6 rounded-xl shadow-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-lg font-semibold">Czy świadczycie usługi dla wszystkich rodzajów zwierząt? 🐾 😻</h3>
                <p className="text-gray-600 mt-2">Tak, opiekujemy się psami, kotami, ptakami, małymi ssakami i gadami. Prosimy o podanie konkretnego rodzaju zwierzaka podczas rezerwacji, abyśmy mogli przydzielić najbardziej odpowiedniego opiekuna.</p>
              </motion.div>
              
              <motion.div 
                className="bg-white p-6 rounded-xl shadow-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="text-lg font-semibold">Jakie formy płatności akceptujecie? 💰 😹</h3>
                <p className="text-gray-600 mt-2">Akceptujemy gotówkę, przelewy bankowe i wszystkie główne karty kredytowe/debetowe. Płatność jest zwykle wymagana przed rozpoczęciem usługi. Akceptujemy również płatność w kociej walucie (mruczankach) 😸</p>
              </motion.div>
              
              <motion.div 
                className="bg-white p-6 rounded-xl shadow-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <h3 className="text-lg font-semibold">Co się stanie, jeśli będę musiał anulować rezerwację? ❌ 😼</h3>
                <p className="text-gray-600 mt-2">Wymagamy co najmniej 24-godzinnego wyprzedzenia w przypadku anulowania. Późne anulowanie może podlegać opłacie w wysokości 50% kosztu usługi. Nasze kotki będą bardzo rozczarowane! 🙀</p>
              </motion.div>
            </div>
          </div>
        </div>
      </ColorfulSection>
      
      <Footer />
    </main>
  );
} 