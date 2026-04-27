import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import type { ReactNode } from "react";
import { SiFacebook, SiInstagram, SiX, SiYoutube } from "react-icons/si";
import { Navbar } from "./Navbar";

interface LayoutProps {
  children: ReactNode;
  hideNav?: boolean;
}

export function Layout({ children, hideNav = false }: LayoutProps) {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "pantheon.org";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {!hideNav && <Navbar />}

      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-card border-t border-border/30 pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-10 h-10 rounded-lg overflow-hidden border-2 border-primary shadow-glow flex-shrink-0">
                  <img
                    src="/assets/pantheon-logo.jpeg"
                    alt="Pantheon logo"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <span className="font-display font-bold text-foreground text-2xl">
                  Pantheon
                </span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mb-6">
                L'excellence au service de l'Afrique. Un mouvement dédié à la
                formation, l'inspiration et la mobilisation d'une nouvelle
                génération de leaders d'exception.
              </p>
              <div className="flex items-center gap-3">
                {[
                  { Icon: SiFacebook, href: "#", label: "Facebook" },
                  { Icon: SiX, href: "#", label: "Twitter/X" },
                  { Icon: SiInstagram, href: "#", label: "Instagram" },
                  { Icon: SiYoutube, href: "#", label: "YouTube" },
                ].map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-smooth"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div>
              <h3 className="font-display font-bold text-foreground text-sm uppercase tracking-widest mb-4">
                Navigation
              </h3>
              <ul className="space-y-2.5">
                {[
                  { label: "Accueil", href: "/" },
                  { label: "À propos", href: "/#apropos" },
                  { label: "Nos Actions", href: "/#actions" },
                  { label: "Membres", href: "/membres" },
                  { label: "Galerie", href: "/galerie" },
                  { label: "Blog & Actualités", href: "/blog" },
                  { label: "Rejoindre Pantheon", href: "/#rejoindre" },
                ].map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-display font-bold text-foreground text-sm uppercase tracking-widest mb-4">
                Contact
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2.5 text-muted-foreground text-sm">
                  <MapPin className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                  <span>Cotonou, République du Bénin</span>
                </li>
                <li className="flex items-center gap-2.5 text-muted-foreground text-sm">
                  <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                  <a
                    href="mailto:contact@pantheon.org"
                    className="hover:text-foreground transition-colors"
                  >
                    contact@pantheon.org
                  </a>
                </li>
                <li className="flex items-center gap-2.5 text-muted-foreground text-sm">
                  <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                  <a
                    href="tel:+22900000000"
                    className="hover:text-foreground transition-colors"
                  >
                    +229 00 00 00 00
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/22900000000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-2 px-4 py-2 bg-emerald-900/30 text-emerald-400 border border-emerald-400/30 rounded-lg text-sm font-semibold hover:bg-emerald-900/50 transition-smooth"
                  >
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-8 border-t border-border/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
            <p>
              © {year} Pantheon — L'excellence au service de l'Afrique. Tous
              droits réservés.
            </p>
            <p>
              Built with love using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-accent transition-colors"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp button */}
      <a
        href="https://wa.me/22900000000"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Nous contacter sur WhatsApp"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-emerald-500 hover:bg-emerald-400 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-smooth hover:scale-110 animate-pulse-glow"
        data-ocid="whatsapp.floating_button"
        style={{ boxShadow: "0 0 20px rgba(52, 211, 153, 0.4)" }}
      >
        <MessageCircle className="w-7 h-7" />
      </a>
    </div>
  );
}
