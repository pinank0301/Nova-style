import Link from 'next/link';
import { ShoppingBag, User, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import type React from 'react';

const NavLink: React.FC<{ href: string; children: React.ReactNode; onClick?: () => void }> = ({ href, children, onClick }) => (
  <Link
    href={href}
    onClick={onClick}
    className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
  >
    {children}
  </Link>
);

export function Header() {
  const navItems = [
    { href: '/#shop', label: 'Shop' },
    { href: '/#try-on', label: 'Virtual Try-On' },
    { href: '/#recommendations', label: 'Style AI' },
    { href: '/about', label: 'About Us' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <ShoppingBag className="h-7 w-7 text-primary" />
          <span className="text-2xl font-bold text-foreground">NovaStyle</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <NavLink key={item.label} href={item.href}>{item.label}</NavLink>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" size="icon" aria-label="User Account">
            <User className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="sm" aria-label="Cart">
            <ShoppingBag className="h-5 w-5 mr-2" />
            Cart
          </Button>
        </div>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-background">
              <nav className="flex flex-col space-y-6 pt-10">
                {navItems.map((item) => (
                  <NavLink key={item.label} href={item.href}>{item.label}</NavLink>
                ))}
                <div className="border-t border-border/40 pt-6 flex flex-col space-y-4">
                   <Button variant="ghost" className="justify-start">
                    <User className="h-5 w-5 mr-3" />
                    Account
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <ShoppingBag className="h-5 w-5 mr-3" />
                    Cart
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
