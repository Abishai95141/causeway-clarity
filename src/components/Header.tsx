import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'SILO OVERVIEW' },
    { path: '/workflow', label: 'CAUSAL WORKFLOW' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background border-b-2 border-charcoal">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Causeway Branding */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary text-primary-foreground flex items-center justify-center font-extrabold text-xl">
              C
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-extrabold tracking-tight text-white bg-charcoal px-2 py-0.5">
                CAUSEWAY
              </h1>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground mt-0.5">
                Causal Decision Intelligence
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'px-4 py-2 text-sm font-bold uppercase tracking-wide transition-colors',
                  location.pathname === item.path
                    ? 'bg-charcoal text-white'
                    : 'hover:bg-muted'
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Status Indicator */}
          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-bold uppercase text-primary">SYSTEM ACTIVE</span>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border animate-fade-in">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  'block px-4 py-3 text-sm font-bold uppercase tracking-wide',
                  location.pathname === item.path
                    ? 'bg-charcoal text-white'
                    : 'hover:bg-muted'
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
