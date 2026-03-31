"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import confetti from "canvas-confetti";

const content = {
  ID: {
    subtitle: "Mari Berkolaborasi",
    title1: "Punya Ide",
    title2: "Luar Biasa?",
    desc: "Apakah Anda mencari pendidik yang adaptif, atau ingin berkolaborasi dalam proyek media pembelajaran? Jangan ragu untuk mengirim pesan. Saya selalu terbuka untuk diskusi baru!",
    successMsg: "Pesan berhasil terkirim! Terima kasih telah menghubungi saya.",
    errorMsg: "Oops! Terjadi kesalahan saat mengirim. Silakan coba lagi.",
    form: {
      nameLabel: "Nama Lengkap",
      namePlaceholder: "Contoh: Budi Santoso",
      emailLabel: "Alamat Email",
      emailPlaceholder: "Contoh: budi@sekolah.com",
      messageLabel: "Isi Pesan",
      messagePlaceholder: "Halo, saya tertarik untuk mengajak Bapak berkolaborasi dalam...",
      sending: "Mengirim...",
      sendBtn: "Kirim Pesan Sekarang"
    }
  },
  EN: {
    subtitle: "Let's Collaborate",
    title1: "Have a Brilliant",
    title2: "Idea?",
    desc: "Are you looking for an adaptive educator, or want to collaborate on learning media projects? Don't hesitate to send a message. I'm always open to new discussions!",
    successMsg: "Message sent successfully! Thank you for reaching out.",
    errorMsg: "Oops! Something went wrong while sending. Please try again.",
    form: {
      nameLabel: "Full Name",
      namePlaceholder: "Example: John Doe",
      emailLabel: "Email Address",
      emailPlaceholder: "Example: john@school.com",
      messageLabel: "Message Content",
      messagePlaceholder: "Hello, I am interested in inviting you to collaborate on...",
      sending: "Sending...",
      sendBtn: "Send Message Now"
    }
  }
};

export default function Contact() {
  const { language } = useLanguage();
  const t = content[language as keyof typeof content] || content.ID;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [resultMessage, setResultMessage] = useState<{ type: "success" | "error" | null, text: string }>({ type: null, text: "" });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResultMessage({ type: null, text: "" });

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: new FormData(e.target)
      });

      const data = await response.json();

      if (data.success) {
        setIsSuccess(true);
        setResultMessage({ type: "success", text: t.successMsg });
        e.target.reset(); // Kosongkan field form

        // Memicu efek confetti meletup-letup selama 3 detik
        const duration = 3000;
        const end = Date.now() + duration;

        const frame = () => {
          confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#43766C', '#FDFDF1', '#FFD700']
          });
          confetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#43766C', '#FDFDF1', '#FFD700']
          });

          if (Date.now() < end) {
            requestAnimationFrame(frame);
          }
        };
        frame();

        // Kembalikan tombol ke keadaan semula setelah sekitar 4 detik (setelah confetti selesai)
        setTimeout(() => setIsSuccess(false), 4000);

      } else {
        console.error("Web3Forms Error:", data);
        setResultMessage({ type: "error", text: t.errorMsg });
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      setResultMessage({ type: "error", text: t.errorMsg });
    } finally {
      setIsSubmitting(false);
      // Notifikasi hilang dalam 5 detik
      setTimeout(() => {
        setResultMessage({ type: null, text: "" });
      }, 5000);
    }
  };

  return (
    <section id="contact" className="w-full min-h-screen bg-[#FDFDF1] px-6 py-24 relative z-10 flex items-center">
      <div className="max-w-6xl mx-auto w-full">
        
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* ========================================================= */}
          {/* BAGIAN KIRI: Teks & Sosial Media                         */}
          {/* ========================================================= */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-1/2 flex flex-col justify-center text-center lg:text-left"
          >
            <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4 text-[#43766C]">
              {t.subtitle}
            </span>
            <h2 className="text-5xl md:text-6xl font-bold text-[#1B3022] mb-6 leading-tight">
              {t.title1} <br/> {t.title2}
            </h2>
            <p className="text-[#1B3022]/70 text-lg leading-relaxed mb-10 max-w-lg mx-auto lg:mx-0">
              {t.desc}
            </p>

            
            <div className="flex items-center justify-center lg:justify-start gap-5">
              
              <a href="https://www.instagram.com/hsmnandar/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white border border-[#1B3022]/10 flex items-center justify-center text-[#1B3022] hover:bg-[#43766C] hover:text-white hover:border-[#43766C] transition-all duration-300 shadow-sm group">
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="https://linkedin.com/in/hasmunandar" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white border border-[#1B3022]/10 flex items-center justify-center text-[#1B3022] hover:bg-[#43766C] hover:text-white hover:border-[#43766C] transition-all duration-300 shadow-sm group">
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="https://github.com/nandarjr660" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white border border-[#1B3022]/10 flex items-center justify-center text-[#1B3022] hover:bg-[#43766C] hover:text-white hover:border-[#43766C] transition-all duration-300 shadow-sm group">
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </motion.div>

          {/* ========================================================= */}
          {/* BAGIAN KANAN: Kartu Form Raksasa                         */}
          {/* ========================================================= */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full lg:w-1/2"
          >
            <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-2xl border border-[#1B3022]/5 relative overflow-hidden">
              
              {/* Notifikasi Sukses / Gagal Mengirim */}
              <AnimatePresence>
                {resultMessage.type === "success" && (
                  <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="absolute top-0 left-0 w-full bg-[#43766C] text-white p-4 text-center font-semibold text-sm flex items-center justify-center gap-2 z-10"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    {resultMessage.text}
                  </motion.div>
                )}
                {resultMessage.type === "error" && (
                  <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="absolute top-0 left-0 w-full bg-red-500 text-white p-4 text-center font-semibold text-sm flex items-center justify-center gap-2 z-10"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    {resultMessage.text}
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} method="POST" className="flex flex-col gap-6">
                
                {/* Akses Key Web3Forms */}
                <input type="hidden" name="access_key" value="dcf59fb6-b2ff-48db-82f4-63ae4a7e2431" />
                
                {/* Input Nama */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-sm font-bold text-[#1B3022] ml-2">{t.form.nameLabel}</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    required
                    placeholder={t.form.namePlaceholder}
                    className="w-full bg-[#FDFDF1] px-6 py-4 rounded-2xl border border-[#1B3022]/10 focus:outline-none focus:border-[#43766C] focus:ring-2 focus:ring-[#43766C]/20 transition-all text-[#1B3022] placeholder:text-[#1B3022]/50"
                  />
                </div>

                {/* Input Email */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm font-bold text-[#1B3022] ml-2">{t.form.emailLabel}</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    required
                    placeholder={t.form.emailPlaceholder}
                    className="w-full bg-[#FDFDF1] px-6 py-4 rounded-2xl border border-[#1B3022]/10 focus:outline-none focus:border-[#43766C] focus:ring-2 focus:ring-[#43766C]/20 transition-all text-[#1B3022] placeholder:text-[#1B3022]/50"
                  />
                </div>

                {/* Input Pesan */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-sm font-bold text-[#1B3022] ml-2">{t.form.messageLabel}</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    required
                    rows={5}
                    placeholder={t.form.messagePlaceholder}
                    className="w-full bg-[#FDFDF1] px-6 py-4 rounded-2xl border border-[#1B3022]/10 focus:outline-none focus:border-[#43766C] focus:ring-2 focus:ring-[#43766C]/20 transition-all text-[#1B3022] placeholder:text-[#1B3022]/50 resize-none"
                  ></textarea>
                </div>

                {/* Tombol Kirim */}
                <button 
                  type="submit"
                  disabled={isSubmitting || isSuccess}
                  className={`mt-4 w-full py-4 rounded-2xl font-bold tracking-wider uppercase transition-all duration-300 flex justify-center items-center gap-2 ${
                    isSubmitting 
                    ? "bg-[#1B3022]/50 text-white cursor-not-allowed" 
                    : isSuccess
                    ? "bg-[#43766C] text-white cursor-not-allowed"
                    : "bg-[#1B3022] text-[#FDFDF1] hover:bg-[#43766C] shadow-lg hover:shadow-xl hover:-translate-y-1"
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <motion.div 
                        animate={{ rotate: 360 }} 
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                      {t.form.sending}
                    </>
                  ) : isSuccess ? (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {language === "ID" ? "Berhasil Terkirim!" : "Successfully Sent!"}
                    </>
                  ) : (
                    <>
                      {t.form.sendBtn}
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                      </svg>
                    </>
                  )}
                </button>

              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}