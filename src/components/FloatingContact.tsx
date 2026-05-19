import { Phone, MessageCircle } from "lucide-react";

// TODO: replace with your real WhatsApp number (with country code, no '+' or spaces)
// and the phone number you want click-to-call to dial.
const WHATSAPP_NUMBER = "919900000000";
const PHONE_NUMBER = "+918045678910";
const WHATSAPP_MESSAGE = "Hi Chiguru Builders! I'd like to discuss a construction project in Bengaluru.";

export function FloatingContact() {
  const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
  const telHref = `tel:${PHONE_NUMBER.replace(/\s/g, "")}`;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      <a
        href={waHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="group flex items-center gap-2 bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-black/20 transition hover:brightness-110"
      >
        <MessageCircle className="h-5 w-5" />
        <span className="hidden sm:inline">Chat on WhatsApp</span>
      </a>
      <a
        href={telHref}
        aria-label="Call us now"
        className="group flex items-center gap-2 bg-accent px-4 py-3 text-sm font-semibold text-accent-foreground shadow-lg shadow-black/20 transition hover:brightness-95"
      >
        <Phone className="h-5 w-5" />
        <span className="hidden sm:inline">Call Now</span>
      </a>
    </div>
  );
}
