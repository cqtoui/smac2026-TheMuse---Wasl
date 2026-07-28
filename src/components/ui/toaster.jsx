import { AnimatePresence, motion } from "framer-motion";
import { Check, AlertCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Compact, single, non-blocking toast pinned to the top of the screen.
// Fades in/out automatically, stays 3s, no close button, never stacks.
export function Toaster() {
  const { activeToast } = useToast();
  const destructive = activeToast?.variant === "destructive";

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] flex justify-center pointer-events-none px-6 pt-4">
      <AnimatePresence>
        {activeToast && (
          <motion.div
            key="toast"
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className={`pointer-events-none flex items-center gap-2.5 bg-white shadow-md rounded-2xl px-4 py-2.5 max-w-sm w-full border ${
              destructive ? "border-red-200" : "border-wasl-soft"
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                destructive ? "bg-red-50" : "bg-wasl-success/10"
              }`}
            >
              {destructive ? (
                <AlertCircle size={13} className="text-red-500" strokeWidth={2.5} />
              ) : (
                <Check size={13} className="text-wasl-success" strokeWidth={2.5} />
              )}
            </div>
            <span className="text-sm font-medium text-wasl-navy leading-tight">
              {activeToast.title}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}