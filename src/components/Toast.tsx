import { CheckCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

export default function Toast({ message, isVisible, onClose }: ToastProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[100] bg-dark-text text-white px-6 py-4 rounded-2xl shadow-xl flex items-center gap-3 min-w-[300px]"
        >
          <CheckCircle className="text-success" size={24} />
          <span className="flex-1 font-medium">{message}</span>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={20} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
