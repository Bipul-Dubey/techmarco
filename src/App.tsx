import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Rocket, ChevronDown, MessageSquare, Package } from 'lucide-react';
import ContactModal from './components/ContactModal';
import ProductsModal from './components/ProductsModal';

function App() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isProductsModalOpen, setIsProductsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', message: '' });
    setIsContactModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-purple-900 to-indigo-950 text-white">
      {/* Hero Section */}
      <section className="min-h-screen relative flex flex-col items-center justify-center overflow-hidden">
        <motion.div 
          className="z-10 text-center px-4 mb-12"
          style={{ scale }}
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="flex items-center justify-center mb-6"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Rocket className="w-12 h-12 text-indigo-400" />
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              Coming Soon
            </h1>
            <p className="text-xl md:text-2xl text-indigo-100 max-w-2xl mx-auto">
              We're crafting something amazing. Our innovative products will revolutionize the way you work.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsProductsModalOpen(true)}
              className="mt-8 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-full text-white font-semibold flex items-center justify-center mx-auto space-x-2 transition-colors"
            >
              <Package className="w-5 h-5" />
              <span>View Products</span>
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-12"
          >
            <ChevronDown className="w-8 h-8 mx-auto animate-bounce text-indigo-400" />
          </motion.div>
        </motion.div>

        {/* Features Section */}
        <div className="w-full max-w-6xl mx-auto px-4 mt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              { title: "Innovation", description: "Cutting-edge technology that sets new industry standards" },
              { title: "Simplicity", description: "Intuitive design that makes complex tasks effortless" },
              { title: "Performance", description: "Lightning-fast solutions that scale with your needs" }
            ].map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="bg-white/5 backdrop-blur-lg p-6 rounded-xl border border-indigo-500/20"
              >
                <h3 className="text-xl font-bold mb-2 text-indigo-300">{feature.title}</h3>
                <p className="text-indigo-100">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Footer */}
        <footer className="w-full py-8 text-center text-indigo-300 mt-12">
          <p>&copy; {new Date().getFullYear()}. All rights reserved.</p>
        </footer>

        {/* Floating Contact Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsContactModalOpen(true)}
          disabled={true}
          className="fixed bottom-8 right-8 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition-colors z-20"
        >
          <MessageSquare className="w-6 h-6" />
        </motion.button>

        {/* Modals */}
        <ContactModal
          isOpen={isContactModalOpen}
          onClose={() => setIsContactModalOpen(false)}
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
        />
        <ProductsModal
          isOpen={isProductsModalOpen}
          onClose={() => setIsProductsModalOpen(false)}
        />
      </section>
    </div>
  );
}

export default App;