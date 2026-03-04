import cardFront from "@/assets/images/card2.png";
import cardBack from "@/assets/images/card2.png";

export default function DesignMyOwn() {
  return (
    <div className="bg-background text-primary min-h-screen pt-36 pb-24">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-10">
          Design My Own
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,_1.1fr)_minmax(0,_1fr)] gap-10 lg:gap-16 items-start">
          {/* Left: Card preview */}
          <div className="flex flex-col items-center gap-8">
            <div className="w-full max-w-xl bg-[#111111] rounded-2xl px-8 py-10 shadow-[0_30px_80px_rgba(0,0,0,0.7)]">
              <div className="flex flex-col gap-10">
                <div className="w-full aspect-[16/9] rounded-2xl overflow-hidden bg-black relative">
                  <img
                    src={cardFront}
                    alt="Card front preview"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="w-full aspect-[16/9] rounded-2xl overflow-hidden bg-black relative">
                  <img
                    src={cardBack}
                    alt="Card back preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right: Configuration form */}
          <div className="w-full">
            <div className="border border-border rounded-xl bg-white/5 backdrop-blur-md">
              {/* Tabs */}
              <div className="flex border-b border-border text-sm font-medium">
                <button className="px-6 py-3 border-b-2 border-primary text-primary bg-black">
                  Edit Card Info
                </button>
                <button className="px-6 py-3 text-muted-foreground hover:text-primary transition-colors">
                  Choose Metal
                </button>
                <button className="px-6 py-3 text-muted-foreground hover:text-primary transition-colors">
                  Add Logo / Text
                </button>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8 space-y-6">
                <div className="space-y-1">
                  <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Card Holder Name (OPTIONAL)
                  </label>
                  <input
                    type="text"
                    placeholder="(Name Here)"
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      Card Number On:
                    </label>
                    <select className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary">
                      <option>Front</option>
                      <option>Back</option>
                      <option>None</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      Card Name On:
                    </label>
                    <select className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary">
                      <option>Front</option>
                      <option>Back</option>
                      <option>None</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Comment
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Add comment"
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none resize-none focus:ring-2 focus:ring-primary/60 focus:border-primary"
                  />
                </div>

                <div className="pt-2 space-y-2 text-sm">
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span>Card</span>
                    <span>$125 USD</span>
                  </div>
                  <div className="flex items-center justify-between font-medium text-base pt-1 border-t border-border">
                    <span>Total (USD)</span>
                    <span>$125 USD</span>
                  </div>
                </div>

                <div className="pt-4">
                  <button className="w-full md:w-auto inline-flex items-center justify-center px-8 py-3 rounded-full bg-primary text-black font-semibold text-sm tracking-wide hover:bg-primary/90 transition-colors">
                    Create Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

