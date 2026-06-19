"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function ContactForm() {
  const [result, setResult] = useState("");

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResult("Sedang mengirim...");
    
    const formData = new FormData(event.currentTarget);
    formData.append("access_key", "bc434b7e-e03f-43a1-b20c-f61bc69e6fc0");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();
      if (data.success) {
        setResult("Pesan berhasil dikirim!");
        event.currentTarget.reset();
      } else {
        setResult("Terjadi kesalahan, coba lagi.");
      }
    } catch {
      setResult("Gagal mengirim pesan.");
    }
  };

  return (
    <motion.form 
      onSubmit={onSubmit}
      className="flex flex-col gap-5 w-full max-w-[700px] mt-6"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        <div className="flex flex-col gap-1.5 w-full">
          <label htmlFor="contact-name" className="text-xs sm:text-sm font-semibold text-text-primary/70 font-body">Nama Anda</label>
          <input 
            id="contact-name"
            type="text" 
            name="name" 
            placeholder="Nama Anda"
            required
            className="bg-interaction/10 border border-interaction/30 rounded-[9px] px-4 sm:px-5 py-3 text-sm sm:text-base text-text-primary placeholder:text-text-primary/50 font-body focus:outline-none focus:border-interaction focus:ring-1 focus:ring-interaction transition-colors"
          />
        </div>
        <div className="flex flex-col gap-1.5 w-full">
          <label htmlFor="contact-email" className="text-xs sm:text-sm font-semibold text-text-primary/70 font-body">Email Anda</label>
          <input 
            id="contact-email"
            type="email" 
            name="email" 
            placeholder="Email Anda"
            required
            className="bg-interaction/10 border border-interaction/30 rounded-[9px] px-4 sm:px-5 py-3 text-sm sm:text-base text-text-primary placeholder:text-text-primary/50 font-body focus:outline-none focus:border-interaction focus:ring-1 focus:ring-interaction transition-colors"
          />
        </div>
      </div>
      <div className="flex flex-col gap-1.5 w-full">
        <label htmlFor="contact-message" className="text-xs sm:text-sm font-semibold text-text-primary/70 font-body">Pesan Anda</label>
        <textarea 
          id="contact-message"
          name="message" 
          placeholder="Pesan Anda"
          required 
          rows={5}
          className="bg-interaction/10 border border-interaction/30 rounded-[9px] px-4 sm:px-5 py-3 text-sm sm:text-base text-text-primary placeholder:text-text-primary/50 font-body focus:outline-none focus:border-interaction focus:ring-1 focus:ring-interaction transition-colors resize-none"
        ></textarea>
      </div>
      <div className="flex items-center gap-5">
        <button 
          type="submit"
          className="bg-interaction text-background font-body font-semibold px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base rounded-[9px] hover:bg-interaction/90 transition-colors shadow-lg cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-interaction focus-visible:ring-offset-2 outline-none"
        >
          Kirim Pesan
        </button>
        {result && (
          <span className="text-[16px] font-body text-interaction font-medium italic">
            {result}
          </span>
        )}
      </div>
    </motion.form>
  );
}
