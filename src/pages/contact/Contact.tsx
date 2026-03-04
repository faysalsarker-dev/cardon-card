import React from "react";

export default function Contact() {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <div className="bg-black text-white font-['Inter',sans-serif] min-h-screen py-24">
      <div className="max-w-140 mx-auto px-4">
        {/* Header */}
        <h1 className="text-[38px] font-black text-center mb-10 tracking-tight">
          Contact Us
        </h1>

        {/* Top contact details */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-center gap-10 mb-12">
          <div className="text-center md:text-left">
            <p className="text-[13px] font-bold text-[#999] uppercase tracking-[0.2em] mb-2">
              Phone
            </p>
            <p className="text-[15px] text-white">
              <a href="tel:+61450596920" className="hover:underline">
                +61 450 596 920
              </a>
            </p>
          </div>

          <div className="text-center md:text-left">
            <p className="text-[13px] font-bold text-[#999] uppercase tracking-[0.2em] mb-2">
              Email
            </p>
            <p className="text-[15px] text-white break-all">
              <a
                href="mailto:info@carboncoskins.com"
                className="hover:underline"
              >
                info@carboncoskins.com
              </a>
            </p>
          </div>
        </div>

        <div className="border-t border-[#2a2a2a] mb-10" />

        {/* Form */}
        <div className="max-w-xl mx-auto">
          <h2 className="text-[20px] font-semibold mb-6">Get In Touch</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[13px] text-[#999] mb-2">
                Your Name*
              </label>
              <input
                type="text"
                required
                className="w-full bg-black border-b border-white/20 text-[14px] py-3 outline-none focus:border-white transition-colors"
              />
            </div>

            <div>
              <label className="block text-[13px] text-[#999] mb-2">
                Email Address*
              </label>
              <input
                type="email"
                required
                className="w-full bg-black border-b border-white/20 text-[14px] py-3 outline-none focus:border-white transition-colors"
              />
            </div>

            <div>
              <label className="block text-[13px] text-[#999] mb-2">
                Message*
              </label>
              <textarea
                required
                rows={4}
                className="w-full bg-black border-b border-white/20 text-[14px] py-3 outline-none resize-none focus:border-white transition-colors"
              />
            </div>

            <button
              type="submit"
              className="mt-4 inline-flex items-center justify-center px-8 py-2.5 border border-white rounded-full text-[13px] tracking-[0.18em] uppercase hover:bg-white hover:text-black transition-colors"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

