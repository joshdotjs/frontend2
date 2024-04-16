// import "./remove.css";
import { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

// ==============================================
// ==============================================
// ==============================================
// ==============================================

export default function SmoothShow({ always_visible, hidden, show }) {

  return (
    <div
      style={{ 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        // outline: 'dashed rgba(255, 0, 255, 0.5)',
        width: '80vw',
        maxWidth: '800px',
        marginTop: show ? '5vh' : '-25vh',
      }}
    >
      <AnimatePresence mode="popLayout">
        <motion.div
          layout
          key='item-0'
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring" }}
        >
          { always_visible }
        </motion.div>

        {
          show && <motion.div
            layout
            key='item-1'
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring" }}
            style={{ 
              height: '50vh',
              width: '100%',
              // outline: 'solid rgba(255, 255, 255, 0.5) 15px',
            }}
          >
            { hidden }
          </motion.div>
        }

      </AnimatePresence>
    </div>
  );
}
