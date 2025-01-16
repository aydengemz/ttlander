"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Alert, AlertDescription } from "./components/alert";
import { DollarSign, Clock, ChevronRight } from "lucide-react";

const names = [
  'Ava R.', 'Ethan T.', 'Luna W.', 'Caleb R.', 'Aria K.',
  'Julian P.', 'Piper S.', 'Gabriel L.', 'Sofia G.', 'Alexander T.',
  'Mia M.', 'Logan D.', 'Isabella W.', 'Benjamin R.', 'Charlotte K.',
  'Oliver P.', 'Abigail S.', 'Elijah L.', 'Emily G.', 'William T.',
  'Harper M.', 'Lucas D.', 'Amelia W.', 'Mason R.', 'Evelyn K.',
  'Liam P.', 'Hannah S.', 'Noah L.', 'Abigail G.', 'Ethan T.',
];

const RecentWinner = () => {
  const [visible, setVisible] = useState(true);
  const [currentName, setCurrentName] = useState(names[0]);
  const [showAlert, setShowAlert] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      console.log('Window resized, showAlert:', window.innerHeight > 600);
      setShowAlert(window.innerHeight > 600);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrentName(names[Math.floor(Math.random() * names.length)]);
        setVisible(true);
      }, 400);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  if (!showAlert) {
    console.log('showAlert is false, alert will not be rendered.');
    return null;
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed top-4 inset-x-0 mx-auto max-w-xs z-50"
        >
          <Alert className="w-full max-w-xs bg-white shadow-md text-sm sm:text-base p-4 rounded-lg backdrop-blur text-black">
            <div className="flex items-center gap-3">
              <DollarSign className="w-6 h-6 text-[#FE2C55]" />
              <AlertDescription className="font-medium">
                <span className="text-[#FE2C55] font-semibold">{currentName}</span> just received $750!
              </AlertDescription>
            </div>
          </Alert>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const MainContent = () => {
  const [timeLeft, setTimeLeft] = useState({ minutes: 29, seconds: 59 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds === 0) {
          return prev.minutes === 0 ? prev : { minutes: prev.minutes - 1, seconds: 59 };
        }
        return { ...prev, seconds: prev.seconds - 1 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleAffiliateClick = async () => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    window.location.href = "https://glstrck.com/aff_c?offer_id=1242&aff_id=11848";
  };

  return (
    <div className="min-h-screen bg-[#010101] flex flex-col items-center justify-center font-sans p-4">
      <RecentWinner />
      
      <motion.div 
        className="w-full max-w-md bg-[#121212] rounded-2xl shadow-xl p-6 space-y-6 relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          onClick={handleAffiliateClick} 
          whileHover={{ scale: 1.05 }} 
          className="cursor-pointer flex justify-center"
        >
          <img src="/shop.jpg" alt="Cash Rewards" className="w-4/5 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300" />
        </motion.div>

        <div className="flex items-center justify-center gap-2 bg-[#FE2C55] text-white py-3 px-4 rounded-lg shadow-md">
          <Clock className="w-5 h-5" />
          <span className="font-bold text-lg">
            {String(timeLeft.minutes).padStart(2, "0")}:
            {String(timeLeft.seconds).padStart(2, "0")}
          </span>
        </div>

        <motion.div 
          className="bg-[#1D1D1D] p-5 rounded-xl shadow-sm space-y-3"
          onClick={handleAffiliateClick}
          whileHover={{ scale: 1.01 }}
        >
          <h2 className="font-bold text-white text-xl flex items-center">
            Quick Start Guide <ChevronRight className="ml-2 w-5 h-5 text-[#FE2C55]" />
          </h2>
          <ul className="space-y-3">
            {[
              { text: "Complete 2-3 required deals", highlight: "Earn up to $750" },
              { text: "Provide a valid email address", highlight: "For instant notification" },
              { text: "Ensure you are 18 years or older", highlight: "Required" }
            ].map((item, index) => (
              <li key={index} className="flex items-center bg-[#252525] p-3 rounded-lg shadow-sm">
                <div className="h-7 w-7 bg-[#FE2C55] rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
                  ✓
                </div>
                <div>
                  <div className="font-medium text-white">{item.text}</div>
                  <div className="text-sm text-[#FE2C55] font-medium">{item.highlight}</div>
                </div>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.button
          onClick={handleAffiliateClick}
          className="w-full bg-[#FE2C55] hover:bg-[#FF1F4C] text-white py-4 rounded-xl text-lg font-bold relative overflow-hidden flex items-center justify-center shadow-lg sticky bottom-8"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{
              scale: 2,
              opacity: [0, 0.3, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeOut",
            }}
            style={{
              background: "radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 70%)"
            }}
          />
          <span className="mr-2">Start Earning Now</span>
          <ChevronRight className="w-6 h-6 text-white" />
        </motion.button>
      </motion.div>
    </div>
  );
};

export default MainContent;
