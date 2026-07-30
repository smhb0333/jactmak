import { useState, useId } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "./Icons.jsx";

export default function Accordion({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();
  return (
    <div className="acc">
      <button className="acc-b" aria-expanded={open} aria-controls={id} onClick={() => setOpen(o => !o)}>
        {title}<span className="acc-i"><Plus /></span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div id={id} key="c"
            initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: .38, ease: [.22,1,.36,1] }}
            style={{ overflow: "hidden" }}>
            <div className="acc-body">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
