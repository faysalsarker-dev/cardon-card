/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */



export default function App() {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black">
      <div className="max-w-6xl mx-auto px-3 md:px-6 py-10 md:py-20">
        {/* Header */}
        <header className="text-center mb-10 md:mb-20">
          <h1 className="text-3xl md:text-5xl lg:text-7xl mt-4 md:mt-10 font-bold tracking-tight">Contact Us</h1>
        </header>

        {/* Contact Info Grid */}
        <div className="flex flex-col md:flex-row justify-start items-center gap-6 md:gap-20 lg:gap-40 md:ml-10 mb-8 md:mb-30">
          <div className="text-center">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium mb-2 md:mb-4">Phone</h2>
            <p className="text-neutral-600 text-base md:text-lg lg:text-xl font-semibold">+61 450 596 920</p>
          </div>
          <div className="text-center">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-medium mb-2 md:mb-4">Email</h2>
            <p className="text-neutral-600 text-base md:text-lg lg:text-xl font-semibold">info@carboncoskins.com</p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-zinc-800/80 mb-8 md:mb-16"></div>

        {/* Form Section */}
        <div className="max-w-2xl w-full">
          <h2 className="text-2xl md:text-4xl font-medium mb-6 md:mb-12">Get In Touch</h2>
          
          <form className="space-y-6 md:space-y-12" onSubmit={(e) => e.preventDefault()}>
            <div className="relative">
              <input
                type="text"
                id="name"
                placeholder="Your Name*"
                className="w-full bg-transparent border-b border-zinc-800 py-2 md:py-4 focus:outline-none focus:border-white transition-colors placeholder:text-zinc-600 text-base md:text-lg"
                required
              />
            </div>

            <div className="relative">
              <input
                type="email"
                id="email"
                placeholder="Email Address*"
                className="w-full bg-transparent border-b border-zinc-800 py-2 md:py-4 focus:outline-none focus:border-white transition-colors placeholder:text-zinc-600 text-base md:text-lg"
                required
              />
            </div>

            <div className="relative">
              <textarea
                id="message"
                placeholder="Message*"
                rows={1}
                className="w-full bg-transparent border-b border-zinc-800 py-2 md:py-6 focus:outline-none focus:border-white transition-colors placeholder:text-zinc-600 text-base md:text-lg resize-none overflow-hidden"
                required
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = 'auto';
                  target.style.height = `${target.scrollHeight}px`;
                }}
              />
            </div>

            <div className="pt-4 md:pt-8">
              <button
                type="submit"
                className="px-6 md:px-10 py-2 md:py-3 border border-white rounded-full text-white hover:bg-white hover:text-black transition-all duration-300 text-base md:text-lg font-medium active:scale-95"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
