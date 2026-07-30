import { motion, useReducedMotion } from "framer-motion";

/* Scroll-triggered reveal. Wraps Framer Motion so every section
   animates identically and honours prefers-reduced-motion.        */
export default function Reveal({ children, y = 26, delay = 0, as = "div", className, ...rest }) {
  const reduce = useReducedMotion();
  const M = motion[as] || motion.div;
  if (reduce) return <M className={className} {...rest}>{children}</M>;
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: .75, delay, ease: [.22, 1, .36, 1] }}
      {...rest}
    >{children}</M>
  );
}

/* Stagger container — children reveal in sequence */
export function Stagger({ children, step = .07, className, ...rest }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className} {...rest}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -6% 0px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: step } } }}
      {...rest}
    >{children}</motion.div>
  );
}

export const item = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: .7, ease: [.22, 1, .36, 1] } }
};
