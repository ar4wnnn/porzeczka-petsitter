import HomeHeroButton from './HomeHeroButton';

export default function HomeHeroExample() {
  return (
    <div className="flex flex-col items-center space-y-4 p-6">
      <h2 className="text-2xl font-bold mb-4">Home Hero Buttons Example</h2>
      
      <HomeHeroButton href="/services">
        View Our Services
      </HomeHeroButton>
      
      <HomeHeroButton href="/contact" className="mt-4">
        Contact Us Today
      </HomeHeroButton>
      
      <p className="text-gray-600 mt-6 text-center max-w-md">
        These buttons use a purple-to-indigo gradient that's distinct from the 'Kontakt' button,
        with a scaling hover effect rather than a translation effect.
      </p>
    </div>
  );
} 