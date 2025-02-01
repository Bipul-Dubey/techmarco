import { motion, AnimatePresence } from 'framer-motion';
import { X, PackageSearch, ArrowUpRight } from 'lucide-react';

interface Product {
  name: string;
  description: string;
  logo: string;
  url: string;
}

interface ProductsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center">
      <PackageSearch className="w-16 h-16 text-purple-400 mb-4" />
      <h3 className="text-xl font-semibold text-purple-100 mb-2">
        Products Coming Soon
      </h3>
      <p className="text-purple-300 text-sm max-w-md">
        We're working on something exciting! Check back later to see our latest products and offerings.
      </p>
    </div>
  );
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-purple-800/20 rounded-xl border border-purple-500/20 hover:border-purple-400/30 transition-all group flex flex-col h-full"
    >
      <div className="p-6 flex-1">
        <div className="flex items-start space-x-4">
          <div className="bg-purple-900/50 rounded-lg p-2 flex-shrink-0">
            <img 
              src={product.logo} 
              alt={`${product.name} logo`}
              className="w-10 h-10 object-contain" 
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-purple-100 group-hover:text-white transition-colors">
              {product.name}
            </h3>
            <p className="text-purple-300 text-sm mt-1">
              {product.description}
            </p>
          </div>
        </div>
      </div>
      
      <a
        href={product.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-between px-6 py-4 border-t border-purple-500/20 text-purple-300 hover:text-purple-100 transition-colors group-hover:bg-purple-800/30 mt-auto"
      >
        <span className="text-sm font-medium">Visit Website</span>
        <ArrowUpRight className="w-4 h-4" />
      </a>
    </motion.div>
  );
}

const products: Product[] = []

export default function ProductsModal({ isOpen, onClose }: ProductsModalProps) {
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
            className="relative w-full max-w-4xl mx-4 max-h-[85vh] bg-gradient-to-b from-purple-900 to-purple-950 rounded-2xl shadow-xl border border-purple-500/20 overflow-hidden flex flex-col"
          >
            <div className="p-6 border-b border-purple-500/20">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-purple-300 hover:text-purple-100 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              <h2 className="text-2xl font-bold text-purple-100">Our Products</h2>
            </div>
            
            <div className="p-6 overflow-y-auto">
              {products.length === 0 ? (
                <EmptyState />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product, index) => (
                    <ProductCard key={index} product={product} index={index} />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}