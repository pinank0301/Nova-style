import Link from 'next/link';
import { Github, Twitter, Instagram, ShoppingBag } from 'lucide-react';
import type React from 'react';

export function Footer() {
  const socialLinks = [
    { icon: <Github className="h-5 w-5" />, href: '#', label: 'Github' },
    { icon: <Twitter className="h-5 w-5" />, href: '#', label: 'Twitter' },
    { icon: <Instagram className="h-5 w-5" />, href: '#', label: 'Instagram' },
  ];

  const footerLinks = [
    { href: '/about', label: 'About NovaStyle' },
    { href: '/contact', label: 'Contact Us' },
    { href: '/faq', label: 'FAQ' },
    { href: '/terms', label: 'Terms of Service' },
    { href: '/privacy', label: 'Privacy Policy' },
  ];

  return (
    <footer className="bg-card border-t border-border/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <ShoppingBag className="h-7 w-7 text-primary" />
              <span className="text-2xl font-bold text-foreground">NovaStyle</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Discover the future of fashion with NovaStyle. Virtual try-on, AI styling, and curated collections.
            </p>
          </div>
          <div>
            <h3 className="text-md font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {footerLinks.map(link => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-md font-semibold text-foreground mb-4">Connect With Us</h3>
            <div className="flex space-x-4 mb-4">
              {socialLinks.map(link => (
                <a key={link.label} href={link.href} aria-label={link.label} className="text-muted-foreground hover:text-primary transition-colors">
                  {link.icon}
                </a>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">Stay updated with our latest collections and offers.</p>
            {/* Newsletter Signup (Optional) */}
          </div>
        </div>
        <div className="mt-12 border-t border-border/40 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} NovaStyle. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
