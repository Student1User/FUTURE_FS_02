import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import { WeatherData } from '../utils/api';
import { getLifeIndex } from '../utils/api';

interface LifeIndexProps {
  data: WeatherData;
}

const LifeIndex: React.FC<LifeIndexProps> = ({ data }) => {
  const lifeIndexMessages = getLifeIndex(data);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="w-full bg-gray-900/40 backdrop-blur-md rounded-xl overflow-hidden border border-white/10 shadow-xl mt-6"
    >
      <div className="p-4">
        <div className="flex items-center mb-4">
          <AlertCircle className="text-yellow-400 mr-2" size={20} />
          <h3 className="text-xl font-semibold text-white">Life Index</h3>
        </div>
        
        <div className="space-y-3">
          {lifeIndexMessages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white/5 p-3 rounded-lg"
            >
              <p className="text-white">{message}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default LifeIndex;