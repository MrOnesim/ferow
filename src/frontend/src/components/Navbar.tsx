import { cn } from "@/lib/utils";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";
import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronRight, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { href: "/#apropos", label: "Notre Mission", hash: "apropos" },
  { href: "/#valeurs", label: "Nos Valeurs", hash: "valeurs" },
  { href: "/#actions", label: "Actions", hash: "actions" },
  { href: "/galerie", label: "Galerie", hash: "" },
  { href: "/membres", label: "Leaders", hash: "" },
  { href: "/blog", label: "Blog", hash: "" },
  { href: "/#rejoindre", label: "Nous rejoindre", hash: "rejoindre" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated, isInitializing, isLoggingIn, login, clear } =
    useInternetIdentity();
  const queryClient = useQueryClient();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleAuth = () => {
    if (isAuthenticated) {
      clear();
      queryClient.clear();
    } else {
      login();
    }
  };

  const handleNavClick = (_href: string, hash: string) => {
    setIsOpen(false);
    if (hash && currentPath === "/") {
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-card/95 backdrop-blur-md border-b border-border/40 shadow-subtle"
          : "bg-transparent",
      )}
      data-ocid="navbar"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5 group"
          data-ocid="navbar.logo"
        >
          <div className="w-9 h-9 rounded-lg overflow-hidden border-2 border-primary shadow-glow group-hover:shadow-glow-lg transition-shadow flex-shrink-0">
            <img
              src="/assets/pantheon-logo.jpeg"
              alt="Pantheon logo"
              className="w-full h-full object-cover object-center"
            />
          </div>
          <span className="font-display font-bold text-foreground text-xl tracking-tight hidden sm:block">
            Pantheon
          </span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Navigation principale" className="hidden lg:block">
          <ul className="flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  to={link.href}
                  className={cn(
                    "nav-link",
                    currentPath === link.href.split("#")[0] && link.hash === ""
                      ? "active text-foreground"
                      : "",
                  )}
                  onClick={() => handleNavClick(link.href, link.hash)}
                  data-ocid={`navbar.link.${link.label
                    .toLowerCase()
                    .replace(/\s+/g, "_")
                    .replace(
                      /[àâäéèêëîïôùûüç]/g,
                      (c) =>
                        ({
                          à: "a",
                          â: "a",
                          ä: "a",
                          é: "e",
                          è: "e",
                          ê: "e",
                          ë: "e",
                          î: "i",
                          ï: "i",
                          ô: "o",
                          ù: "u",
                          û: "u",
                          ü: "u",
                          ç: "c",
                        })[c] ?? c,
                    )}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Auth + mobile toggle */}
        <div className="flex items-center gap-3">
          {isAuthenticated && (
            <Link
              to="/admin"
              className="hidden md:inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors border border-border/40 rounded-full px-3 py-1"
              data-ocid="navbar.admin_link"
            >
              Admin
            </Link>
          )}
          <button
            type="button"
            onClick={handleAuth}
            disabled={isInitializing || isLoggingIn}
            className={cn(
              "hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold font-display transition-smooth",
              isAuthenticated
                ? "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                : "bg-primary text-primary-foreground hover:opacity-90 shadow-elevated",
            )}
            data-ocid="navbar.auth_button"
          >
            {isInitializing
              ? "..."
              : isLoggingIn
                ? "Connexion..."
                : isAuthenticated
                  ? "Déconnexion"
                  : "Espace administrateur"}
          </button>

          <button
            type="button"
            aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
            className="lg:hidden p-2 rounded-lg hover:bg-foreground/10 transition-smooth"
            onClick={() => setIsOpen(!isOpen)}
            data-ocid="navbar.mobile_toggle"
          >
            {isOpen ? (
              <X className="w-5 h-5 text-foreground" />
            ) : (
              <Menu className="w-5 h-5 text-foreground" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            aria-label="Navigation mobile"
            className="lg:hidden bg-card/98 backdrop-blur-md border-b border-border/40 overflow-hidden"
            data-ocid="navbar.mobile_menu"
          >
            <ul className="container mx-auto px-4 py-4 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="flex items-center justify-between w-full px-4 py-3 rounded-lg hover:bg-foreground/5 transition-smooth text-foreground/80 hover:text-foreground font-medium"
                    onClick={() => handleNavClick(link.href, link.hash)}
                    data-ocid={`navbar.mobile.link.${link.label.toLowerCase().replace(/\s+/g, "_")}`}
                  >
                    {link.label}
                    <ChevronRight className="w-4 h-4 opacity-50" />
                  </Link>
                </li>
              ))}
              <li className="pt-2 border-t border-border/30 mt-2">
                {isAuthenticated && (
                  <Link
                    to="/admin"
                    className="flex items-center gap-2 px-4 py-3 rounded-lg text-muted-foreground hover:text-foreground transition-smooth"
                    onClick={() => setIsOpen(false)}
                    data-ocid="navbar.mobile.admin_link"
                  >
                    Dashboard Admin
                  </Link>
                )}
                <button
                  type="button"
                  onClick={() => {
                    handleAuth();
                    setIsOpen(false);
                  }}
                  disabled={isInitializing || isLoggingIn}
                  className="w-full mt-1 px-4 py-3 rounded-lg bg-primary text-primary-foreground font-semibold font-display text-sm hover:opacity-90 transition-smooth disabled:opacity-50"
                  data-ocid="navbar.mobile.auth_button"
                >
                  {isAuthenticated ? "Se déconnecter" : "Espace administrateur"}
                </button>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
