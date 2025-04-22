'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ColorfulSection from '../components/ui/ColorfulSection';
import AnimatedBackground from '../components/ui/AnimatedBackground';

export default function AboutPage() {
  const teamSectionRef = useRef<HTMLDivElement>(null);
  const isTeamSectionInView = useInView(teamSectionRef, { once: true, amount: 0.2 });

  const teamMembers = [
    {
      name: "Anna Kowalska",
      role: "Założycielka & Główna Petsitterka 🐱‍👤",
      bio: "Anna ma ponad 10 lat doświadczenia w opiece nad zwierzakami wszelkiego rodzaju. Jej głębokie zrozumienie zachowań zwierząt sprawia, że Twoje pupile są w najlepszych rękach (i to dosłownie - ma świetny masaż za uszami!).",
      image: "/team/anna.jpg",
      certifications: ["Pierwsza Pomoc dla Zwierząt", "Specjalistka Behawioryzmu Zwierząt"]
    },
    {
      name: "Piotr Nowak",
      role: "Starszy Specjalista Opieki Nad Zwierzętami 🐕‍🦺",
      bio: "Piotr to certyfikowany trener psów ze specjalnym talentem do nawiązywania więzi nawet z najbardziej nieśmiałymi lub niespokojnymi zwierzakami. Podobno psy śnią o nim po zakończonych spacerach!",
      image: "/team/piotr.jpg",
      certifications: ["Certyfikowany Trener Psów", "Specjalista Żywienia Zwierząt"]
    },
    {
      name: "Marta Wiśniewska",
      role: "Asystentka Opieki Nad Zwierzętami 🐰",
      bio: "Delikatne podejście Marty i ogromne doświadczenie z małymi zwierzętami czyni ją idealną opiekunką dla Twoich mniejszych pupili, od kotów po króliki i nie tylko. Chomiki piszą do niej listy miłosne!",
      image: "/team/marta.jpg",
      certifications: ["Specjalistka ds. Kotów", "Opieka nad Małymi Zwierzętami"]
    }
  ];

  const values = [
    {
      title: "Niezawodność 🐢",
      description: "Zawsze na czas, jak kot na karmę! Żadnych spóźnień, żadnych nieobecności - jesteśmy bardziej niezawodni niż poranny budzik Twojego psa.",
      icon: "🔒"
    },
    {
      title: "Empatia 🐶",
      description: "Twoje zwierzaki to nasi przyjaciele! Traktujemy je z taką samą miłością, jakby to były nasze własne futrzaki, nawet te, które myślą, że drapanie mebli to sport olimpijski.",
      icon: "❤️"
    },
    {
      title: "Profesjonalizm 🦊",
      description: "Nasz zespół jest przeszkolony w opiece nad zwierzętami, pierwszej pomocy i technikach, które sprawiają, że nawet najbardziej wybredny kot będzie mruczeć z zadowolenia.",
      icon: "🏆"
    },
    {
      title: "Przejrzystość 🦉",
      description: "Żadnych tajemnic! Wysyłamy zdjęcia, filmy i raporty tak często, że Twój zwierzak będzie miał więcej dokumentacji niż celebryta na czerwonym dywanie.",
      icon: "📱"
    }
  ];

  return (
    <main className="min-h-screen">
      <AnimatedBackground />
      <Navbar />
      
      {/* About Section */}
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
              O <span className="text-[var(--color-primary)]">Porzeczce</span> 🍒
            </motion.h1>
            <motion.p 
              className="text-lg text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Nie jesteśmy tylko opiekunami zwierząt, jesteśmy zwierzęcymi rodzicami, którzy rozumieją tę wyjątkową więź, jaką dzielisz ze swoimi futrzastymi członkami rodziny. I tak, rozumiemy też, dlaczego rozmawiasz ze swoim kotem jakby rozumiał każde słowo! 😸
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-6">Nasza <span className="text-[var(--color-primary)]">Historia</span> 🐾</h2>
              <p className="text-gray-600 mb-4">
                Porzeczka Pet Sitting powstała w 2015 roku z jedną prostą misją: zapewnienie kochającej, profesjonalnej opieki zwierzakom, gdy ich właściciele nie mogą być obecni. To, co zaczęło się jako jednoosobowa operacja, rozrosło się w zaufany zespół oddanych specjalistów od opieki nad zwierzętami, obsługujący obszar Warszawy. Można powiedzieć, że wyewoluowaliśmy szybciej niż kot uczący się otwierać lodówkę! 😸
              </p>
              <p className="text-gray-600 mb-4">
                Pasja założycielki do zwierząt i zaangażowanie w wysoką jakość opieki ukształtowały każdy aspekt naszej działalności. Rozumiemy, że zwierzaki są członkami rodziny i traktujemy je z taką samą troską, szacunkiem i uwagą jak Ty. Nawet te, które myślą, że Twoja kanapa to ich osobisty drapak! 🙀
              </p>
              <p className="text-gray-600">
                Dziś jesteśmy dumni, że jesteśmy jedną z najbardziej zaufanych usług petsittingu w Warszawie, z lojalną bazą klientów złożoną zarówno ze stałych klientów, jak i ich szczęśliwych zwierzaków. Nasze motto? "Wasze zwierzaki zasługują na wakacje równie dobre jak Wy!" 🐶🐱
              </p>
            </motion.div>
            
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative h-96 overflow-hidden rounded-xl shadow-xl">
                <Image
                  src="/images/about.jpg"
                  alt="Porzeczka - opiekunka zwierząt z szczęśliwymi pupilami"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <div className="p-6">
                    <p className="text-white text-lg font-medium">Profesjonalna opieka nad zwierzętami od 2015 roku</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-5 -right-5 bg-white p-4 rounded-lg shadow-lg">
                <p className="font-bold text-[var(--color-primary)]">600+ Szczęśliwych Zwierzaków</p>
                <p className="text-sm text-gray-600">I ich jeszcze szczęśliwszych właścicieli! 🎉</p>
              </div>
            </motion.div>
          </div>
        </div>
      </ColorfulSection>
      
      {/* Values Section */}
      <ColorfulSection 
        backgroundColor="#FFF4EC" 
        nextSectionColor="#F2EAFF"
        wavePattern="wave2"
        waveHeight={100}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Nasze <span className="text-[var(--color-primary)]">Wartości</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Zasady, które kierują naszą misją zapewnienia wyjątkowej opieki nad zwierzętami (i które sprawiają, że ogony merdają radośnie! 🐾)
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, amount: 0.5 }}
              >
                <div className="text-3xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </ColorfulSection>
      
      {/* Team Section */}
      <ColorfulSection 
        backgroundColor="#F2EAFF" 
        nextSectionColor="#E9F9FF"
        wavePattern="wave3"
        waveHeight={100}
      >
        <div ref={teamSectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Nasz <span className="text-[var(--color-primary)]">Zespół</span> 🐾
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Poznaj troskliwych profesjonalistów, którzy zajmą się Twoimi ukochanymi zwierzakami (i nauczą je paru sztuczek, o których nawet nie marzyłeś!) 😺
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                className="bg-white rounded-xl overflow-hidden shadow-lg"
                initial={{ opacity: 0, y: 50 }}
                animate={isTeamSectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className="h-64 relative">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold">{member.name}</h3>
                  <p className="text-[var(--color-primary)] mb-3">{member.role}</p>
                  <p className="text-gray-600 mb-4">{member.bio}</p>
                  <div className="space-y-1">
                    {member.certifications.map((cert, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--color-primary)]" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm text-gray-700">{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </ColorfulSection>
      
      {/* Find Us Section */}
      <ColorfulSection 
        backgroundColor="#E9F9FF" 
        nextSectionColor="#F0F7FF"
        wavePattern="curved"
        waveHeight={80}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Jak nas <span className="text-[var(--color-primary)]">Znaleźć</span> 🧭
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Nasze biuro znajduje się w dogodnej lokalizacji w Warszawie. Wpadnij do nas na konsultację! Nawet koty nie mają problemu z trafieniem do nas (a one zawsze chodzą własnymi ścieżkami 😸).
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <motion.div 
              className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-4">Informacje Kontaktowe 📋</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-[var(--color-primary-light)]/30 p-2 rounded-full mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">Adres: 🏠</p>
                    <p className="text-gray-600">Plac Wojska Polskiego 1</p>
                    <p className="text-gray-600">05-075 Warszawa</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-[var(--color-primary-light)]/30 p-2 rounded-full mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">Telefon: 📞</p>
                    <p className="text-gray-600">+48 123 456 789</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-[var(--color-primary-light)]/30 p-2 rounded-full mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">Email: 📧</p>
                    <p className="text-gray-600">kontakt@porzeczka-petsitter.pl</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-[var(--color-primary-light)]/30 p-2 rounded-full mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">Godziny pracy: ⏰</p>
                    <p className="text-gray-600">Poniedziałek - Piątek: 8:00 - 18:00 🐕</p>
                    <p className="text-gray-600">Weekendy: 9:00 - 15:00 🐈</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h4 className="font-semibold mb-2">Transport publiczny: 🚌</h4>
                <p className="text-gray-600 mb-4">Nasze biuro jest łatwo dostępne transportem publicznym (nawet chomiki do nas trafiają!):</p>
                <ul className="list-disc pl-5 text-gray-600 space-y-1">
                  <li>Linie autobusowe: 115, 116, 180</li>
                  <li>Linie tramwajowe: 3, 6, 9</li>
                  <li>Metro: Linia M1, Stacja "Ratusz Arsenał" (10 min spacer)</li>
                </ul>
              </div>
            </motion.div>
            
            <motion.div 
              className="lg:col-span-3 rounded-xl overflow-hidden shadow-md h-[450px]"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {/* Google Maps iframe */}
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2443.3970385489637!2d21.002433377129964!3d52.242992358877106!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471ecc9fabe41f05%3A0x4a4c8e552f5afb8b!2sPlac%20Wojska%20Polskiego%201%2C%2005-075%20Warszawa!5e0!3m2!1sen!2spl!4v1695890000000!5m2!1sen!2spl" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </motion.div>
          </div>
          
          <motion.div 
            className="bg-white p-6 rounded-xl shadow-md mt-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold mb-4">Informacje o Parkowaniu 🚗</h3>
            <p className="text-gray-600">
              Płatne parkowanie jest dostępne przed naszym biurem. Bezpłatne parkowanie można znaleźć na sąsiednich ulicach (2 minuty spacerem).
              Dla klientów odwiedzających nasze biuro oferujemy voucher parkingowy na 1 godzinę - zapytaj naszą recepcjonistkę o szczegóły 
              (tak, możesz również zaparkować swojego kota, zapewniamy drapaki i kocią trawę 😹).
            </p>
          </motion.div>
        </div>
      </ColorfulSection>
      
      <Footer />
    </main>
  );
} 