import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Copy, ShieldCheck, Sparkles, Wand2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [length, setLength] = useState(12);
  const [numbersAllowed, setNumbersAllowed] = useState(true);
  const [symbolsAllowed, setSymbolsAllowed] = useState(true);
  const [password, setPassword] = useState("");
  const [history, setHistory] = useState([]);
  const [showPassword, setShowPassword] = useState(true);

  const passwordRef = useRef(null);

  const shellVariants = {
    hidden: { opacity: 0, y: 24, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const generatePassword = () => {
    let chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numbersAllowed) {
      chars += "0123456789";
    }

    if (symbolsAllowed) {
      chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";
    }

    let pass = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(
        Math.random() * chars.length
      );

      pass += chars[randomIndex];
    }

    setPassword(pass);

    setHistory((prev) => [
      pass,
      ...prev.slice(0, 4),
    ]);
  };

  const copyPassword = () => {
    passwordRef.current?.select();

    navigator.clipboard.writeText(password);

    toast.success(
      "Password copied successfully 🚀"
    );
  };

  function getStrength() {
    let score = 0;

    if (length >= 8) score++;
    if (length >= 12) score++;
    if (numbersAllowed) score++;
    if (symbolsAllowed) score++;

    if (score <= 2) {
      return {
        text: "Weak",
        bar: "33%",
        color: "text-red-400",
      };
    }

    if (score === 3) {
      return {
        text: "Medium",
        bar: "66%",
        color: "text-yellow-400",
      };
    }

    return {
      text: "Strong",
      bar: "100%",
      color: "text-green-400",
    };
  }

  useEffect(() => {
    generatePassword();
  }, [length, numbersAllowed, symbolsAllowed]);

  const strength = getStrength();

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "rgba(2, 6, 23, 0.92)",
            color: "#f8fafc",
            border: "1px solid rgba(251, 191, 36, 0.18)",
          },
        }}
      />

      <motion.div
        variants={shellVariants}
        initial="hidden"
        animate="visible"
        className="relative min-h-screen overflow-hidden bg-[#030712] px-4 py-10 text-white"
      >
        <div className="absolute inset-0">
          <motion.div
            animate={{
              x: [0, 12, 0],
              y: [0, -8, 0],
            }}
            transition={{
              duration: 16,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="absolute left-[-8rem] top-16 h-72 w-72 rounded-full bg-sky-400/12 blur-3xl"
          />
          <motion.div
            animate={{
              x: [0, -12, 0],
              y: [0, 10, 0],
            }}
            transition={{
              duration: 18,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="absolute right-[-6rem] top-24 h-80 w-80 rounded-full bg-violet-400/10 blur-3xl"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.14),transparent_36%),radial-gradient(circle_at_bottom,rgba(99,102,241,0.12),transparent_34%)]" />
        </div>

        <div className="relative z-10 mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-6xl items-center justify-center">
          <motion.div
            variants={shellVariants}
            className="w-full max-w-4xl overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.06] shadow-[0_30px_120px_rgba(3,7,18,0.75)] backdrop-blur-[28px]"
          >
            <div className="grid gap-0 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="relative p-8 sm:p-10 lg:p-12">
                <motion.div
                  variants={itemVariants}
                      className="mb-8 inline-flex items-center gap-2 rounded-full border border-sky-300/20 bg-sky-300/10 px-4 py-2 text-sm text-sky-100"
                >
                  <Sparkles size={16} />
                      Classic password generator
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-4">
                  <div className="inline-flex items-center gap-2 text-sky-200/90">
                    <ShieldCheck size={18} />
                    <span className="text-sm uppercase tracking-[0.35em]">Secure by design</span>
                  </div>

                  <h1 className="max-w-xl text-4xl font-semibold leading-tight text-white sm:text-5xl">
                        Clean password generation with a timeless finish.
                  </h1>

                  <p className="max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
                        Create stronger passwords, preview strength instantly, and keep the whole experience polished for a classic portfolio showcase.
                  </p>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="mt-10 space-y-4"
                >
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <div className="flex min-w-0 flex-1 items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-4 shadow-inner shadow-black/20">
                      <input
                        ref={passwordRef}
                        type={showPassword ? "text" : "password"}
                        value={password}
                        readOnly
                        className="min-w-0 flex-1 bg-transparent text-lg font-medium tracking-[0.12em] text-white outline-none placeholder:text-slate-500"
                        aria-label="Generated password"
                      />
                    </div>

                    <div className="flex gap-3">
                      <motion.button
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={() => setShowPassword(!showPassword)}
                        className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-4 text-white transition-colors hover:bg-white/12"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.03, y: -1 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={copyPassword}
                            className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-sky-300 via-cyan-300 to-blue-400 px-5 py-4 font-semibold text-slate-950 shadow-lg shadow-sky-500/20 transition"
                      >
                        <Copy size={18} />
                        Copy
                      </motion.button>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 text-sm text-slate-300">
                    <span className="rounded-full border border-white/10 bg-white/6 px-3 py-1">{length} characters</span>
                    <span className="rounded-full border border-white/10 bg-white/6 px-3 py-1">{numbersAllowed ? "Numbers enabled" : "Numbers off"}</span>
                    <span className="rounded-full border border-white/10 bg-white/6 px-3 py-1">{symbolsAllowed ? "Symbols enabled" : "Symbols off"}</span>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="mt-10">
                  <div className="mb-3 flex items-center justify-between text-sm text-slate-300">
                    <span>Password length</span>
                    <span className="font-medium text-white">{length}</span>
                  </div>

                  <input
                    type="range"
                    min="6"
                    max="30"
                    value={length}
                    onChange={(e) => setLength(Number(e.target.value))}
                    className="password-range w-full cursor-pointer"
                  />
                </motion.div>

                <motion.div variants={itemVariants} className="mt-8 grid gap-4 sm:grid-cols-2">
                  <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-4 text-slate-100 transition hover:bg-white/[0.09]">
                    <input
                      type="checkbox"
                      checked={numbersAllowed}
                      onChange={() => setNumbersAllowed(!numbersAllowed)}
                      className="h-4 w-4 accent-sky-300"
                    />
                    Include numbers
                  </label>

                  <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-4 text-slate-100 transition hover:bg-white/[0.09]">
                    <input
                      type="checkbox"
                      checked={symbolsAllowed}
                      onChange={() => setSymbolsAllowed(!symbolsAllowed)}
                      className="h-4 w-4 accent-sky-300"
                    />
                    Include symbols
                  </label>
                </motion.div>
              </div>

              <aside className="border-t border-white/10 bg-slate-950/40 p-8 sm:p-10 lg:border-l lg:border-t-0 lg:p-12">
                <motion.div variants={itemVariants} className="space-y-4">
                  <div className="flex items-center gap-2 text-sm uppercase tracking-[0.3em] text-slate-400">
                    <Wand2 size={16} />
                    Live strength meter
                  </div>

                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className={`text-3xl font-semibold ${strength.color}`}>{strength.text}</p>
                      <p className="mt-1 text-sm text-slate-400">Generated password quality</p>
                    </div>

                    <span className="rounded-full border border-white/10 bg-white/6 px-3 py-1 text-xs uppercase tracking-[0.24em] text-slate-300">
                      Updated live
                    </span>
                  </div>

                  <div className="h-3 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      key={`${length}-${numbersAllowed}-${symbolsAllowed}`}
                      initial={{ width: 0 }}
                      animate={{ width: strength.bar }}
                      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                      className={`h-full rounded-full ${strength.color === "text-red-400" ? "bg-red-400" : strength.color === "text-yellow-400" ? "bg-sky-300" : "bg-emerald-400"}`}
                    />
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="mt-10">
                  <h3 className="mb-4 text-sm uppercase tracking-[0.3em] text-slate-400">Recent passwords</h3>

                  <div className="space-y-3">
                    {history.length > 0 ? (
                      history.map((item, index) => (
                        <motion.div
                          key={`${item}-${index}`}
                          initial={{ opacity: 0, x: 16 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.35, delay: index * 0.05 }}
                          className="rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-4 text-sm break-all text-slate-200"
                        >
                          {item}
                        </motion.div>
                      ))
                    ) : (
                      <p className="text-sm text-slate-400">Your latest generated passwords will appear here.</p>
                    )}
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="mt-10 rounded-2xl border border-sky-300/10 bg-gradient-to-r from-sky-300/10 to-indigo-400/10 p-4 text-sm text-slate-300">
                      A calmer interface, softer easing, and a stronger visual hierarchy keep this feeling classic and presentation-ready.
                </motion.div>

                <motion.footer variants={itemVariants} className="mt-10 border-t border-white/10 pt-5 text-sm text-slate-500">
                  © Made by Shashikar Saurabh
                </motion.footer>
              </aside>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}

export default App;