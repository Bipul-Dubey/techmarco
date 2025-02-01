import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: {
    name: string;
    email: string;
    message: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<{
    name: string;
    email: string;
    message: string;
  }>>;
  onSubmit: (e: React.FormEvent) => void;
}

export default function ContactModal({ isOpen, onClose, formData, setFormData, onSubmit }: ContactModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", duration: 0.3 }}
            className="relative w-full max-w-md mx-4 bg-gradient-to-b from-indigo-900 to-indigo-950 rounded-2xl shadow-xl border border-indigo-500/20 overflow-hidden"
          >
            <div className="p-6">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-indigo-300 hover:text-indigo-100 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              
              <h2 className="text-2xl font-bold mb-6 text-indigo-100">Get in Touch</h2>
              <form onSubmit={onSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-indigo-200 mb-1">Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="block w-full rounded-lg bg-indigo-950/50 border border-indigo-500/30 text-indigo-100 shadow-sm focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20 p-3 outline-none transition-all duration-200"
                      required
                    />
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-indigo-500/10 to-purple-500/10 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-indigo-200 mb-1">Email</label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="block w-full rounded-lg bg-indigo-950/50 border border-indigo-500/30 text-indigo-100 shadow-sm focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20 p-3 outline-none transition-all duration-200"
                      required
                    />
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-indigo-500/10 to-purple-500/10 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-indigo-200 mb-1">Message</label>
                  <div className="relative">
                    <textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      rows={4}
                      className="block w-full rounded-lg bg-indigo-950/50 border border-indigo-500/30 text-indigo-100 shadow-sm focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20 p-3 outline-none transition-all duration-200 resize-none"
                      required
                    />
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-indigo-500/10 to-purple-500/10 pointer-events-none" />
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full flex items-center justify-center px-4 py-3 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 shadow-lg shadow-indigo-500/25"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}