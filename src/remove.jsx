import "./remove.css";
import { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

// ==============================================
// ==============================================

function removeItem(arr, item) {
  const index = arr.indexOf(item);
  if (index > -1) arr.splice(index, 1);
}

// ==============================================
// ==============================================
// ==============================================
// ==============================================

export default function App() {
  const count = useRef(0);
  const [items, setItems] = useState([0]);

  return (
    <div className="example">

      {/* =================================== */}

      <div className="controls">
        <button
          onClick={() => {
            count.current++;
            setItems([...items, count.current]);
          }}
        >
          Add item
        </button>
      </div>

      {/* =================================== */}

      <ul>
        <AnimatePresence mode="popLayout">
          {items.map((id) => (
            <motion.li
              layout
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring" }}
              key={id}
              onClick={() => {
                const newItems = [...items];
                removeItem(newItems, id);
                setItems(newItems);
              }}
            />
          ))}
        </AnimatePresence>
      </ul>

      {/* =================================== */}

    </div>
  );
}
