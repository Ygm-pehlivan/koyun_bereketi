import { Link } from "@tanstack/react-router";
import { GENERAL_MESSAGE, INSTAGRAM_URL, waLink } from "@/lib/whatsapp";
import { InstagramIcon, WhatsAppIcon } from "./Icons";
import { Logo } from "./Logo";
import { NAV } from "./Header";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-3">
        <div>
          <Logo />
          <p className="mt-3 font-display italic opacity-85">Köyden Sofranıza, Doğallığın En Güzel Hali</p>
          <div className="mt-5 flex gap-3">
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="rounded-full border border-primary-foreground/40 p-2.5 transition hover:bg-primary-foreground/10"><InstagramIcon /></a>
            <a href={waLink(GENERAL_MESSAGE)} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="rounded-full border border-primary-foreground/40 p-2.5 transition hover:bg-primary-foreground/10"><WhatsAppIcon /></a>
          </div>
        </div>
        <div>
          <h3 className="mb-3 text-lg">Sayfalar</h3>
          <ul className="space-y-2 opacity-85">
            {NAV.map((n) => <li key={n.to}><Link to={n.to} className="hover:underline">{n.label}</Link></li>)}
          </ul>
        </div>
        <div>
          <h3 className="mb-3 text-lg">Yasal</h3>
          <ul className="space-y-2 opacity-85">
            <li><Link to="/gizlilik" className="hover:underline">Gizlilik Politikası</Link></li>
            <li><Link to="/kvkk" className="hover:underline">KVKK Aydınlatma Metni</Link></li>
            <li><Link to="/mesafeli-satis" className="hover:underline">Mesafeli Satış ve İade Koşulları</Link></li>
          </ul>
          <a href={waLink(GENERAL_MESSAGE)} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 rounded-full bg-whatsapp px-5 py-2.5 text-sm font-medium text-whatsapp-foreground">
            <WhatsAppIcon className="size-4" /> WhatsApp ile İletişim
          </a>
        </div>
      </div>
      <div className="border-t border-primary-foreground/15 py-4 text-center text-xs opacity-70">© {new Date().getFullYear()} Köyün Bereketi</div>
    </footer>
  );
}
