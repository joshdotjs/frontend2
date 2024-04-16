import "./remove.css";
import { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

// ==============================================
// ==============================================
// ==============================================
// ==============================================

export default function App() {

  const [show, setShow] = useState(true);

  return (
    <div className="example">

      <ul>
        <AnimatePresence mode="popLayout">
            {
              show && <motion.li
                layout
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring" }}
                key='item-1'
                onClick={() => {

                }}
              /> // show
            }

            <motion.li
              layout
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring" }}
              key='item-0'
              onClick={() => {
                setShow(prev => !prev);
              }}
              style={{ display: 'grid', placeItems: 'center'}}
            >
              CLICK
            </motion.li>

        </AnimatePresence>
      </ul>

    </div>
  );
}
