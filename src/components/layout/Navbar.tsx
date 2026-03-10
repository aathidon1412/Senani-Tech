import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";
import logoShort from "@/assets/logo_2.png";
import logoLong from "@/assets/logo_1.png";

const navItems = [
  { name: "Home", path: "/" },
  {
    name: "Services",
    path: "/services",
    dropdown: [
      { name: "Semiconductor Services", path: "/semiconductor-services" },
      { name: "Technology Services", path: "/technology-services" },
      { name: "Systems Solutions", path: "/systems-solutions" },
    ],
  },
  { name: "About Us", path: "/about" },
  { name: "Contact Us", path: "/contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "py-3 shadow-card bg-white/95 border-b border-default" : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="relative group inline-flex items-center gap-3">
            <motion.div whileHover={{ scale: 1.02 }} className="flex items-center gap-3">
              {/* Short logo for compact/small screens */}
              <img src={logoShort} alt="SenaniTech" className="w-16 h-16 object-contain sm:hidden" />

              {/* Long/full logo for larger screens */}
              <img src={logoLong} alt="SenaniTech" className="hidden sm:block h-20 object-contain" />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2">
            {navItems.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.dropdown && setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  to={item.path}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1",
                    location.pathname === item.path
                      ? "text-highlight"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {item.name}
                  {item.dropdown && (
                    <ChevronDown
                      size={14}
                      className={cn(
                        "transition-transform duration-200",
                        activeDropdown === item.name && "rotate-180"
                      )}
                    />
                  )}
                </Link>

                {/* Active indicator */}
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-1 left-4 right-4 h-0.5 bg-gradient-to-r from-primary to-accent rounded-full"
                  />
                )}

                {/* Dropdown */}
                <AnimatePresence>
                  {item.dropdown && activeDropdown === item.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-64 card rounded-xl p-2 shadow-xl border border-default"
                    >
                      {item.dropdown.map((subItem, index) => (
                        <Link
                          key={subItem.name}
                          to={subItem.path}
                          className={cn(
                            "block px-4 py-3 rounded-lg text-sm transition-all duration-200",
                            location.pathname === subItem.path
                              ? "bg-primary/20 text-highlight"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground"
                          )}
                        >
                          <motion.span
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            {subItem.name}
                          </motion.span>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Theme toggle + CTA Button */}
          <div className="hidden lg:flex items-center gap-2">
            {/* <ThemeToggle /> */}
            <Link to="/contact">
              <Button variant="hero" size="lg">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="lg:hidden fixed inset-0 z-40 bg-white/95 backdrop-blur-sm overflow-auto"
              >
                <div className="max-w-md w-full mx-auto pt-6 pb-12 px-6">
                  <div className="flex items-center justify-between mb-6">
                    <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-card">
                        <span className="text-primary-foreground font-bold text-xl font-display">S</span>
                      </div>
                      <span className="text-lg font-semibold gradient-text-bright">SenaniTech</span>
                    </Link>
                    <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 rounded-md">
                      <X size={22} />
                    </button>
                  </div>

                  <div className="space-y-4">
                    {navItems.map((item, index) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.06 }}
                      >
                        <Link
                          to={item.path}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={cn(
                            "block px-3 py-3 rounded-lg text-lg font-medium transition-all",
                            location.pathname === item.path
                              ? "bg-primary/10 text-highlight"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground"
                          )}
                        >
                          {item.name}
                        </Link>

                        {item.dropdown && (
                          <div className="pl-4 mt-2 space-y-1">
                            {item.dropdown.map((subItem) => (
                              <Link
                                key={subItem.name}
                                to={subItem.path}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={cn(
                                  "block px-3 py-2 rounded-lg text-sm transition-all",
                                  location.pathname === subItem.path
                                    ? "text-highlight"
                                    : "text-muted-foreground hover:text-foreground"
                                )}
                              >
                                {subItem.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    ))}

                    <div className="pt-4">
                      <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button variant="hero" size="lg" className="w-full">
                          Get Started
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}