import { Github, Linkedin, Twitter, Mail, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Mail, href: '#contact', label: 'Email' },
  ];

  return (
    <footer className="bg-secondary/30 py-12 px-4 border-t border-border">
      <div className="container mx-auto">
        <div className="flex flex-col items-center space-y-6">
          {/* Logo */}
          <div className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Portfolio
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="w-10 h-10 rounded-full bg-secondary hover:bg-primary transition-all duration-300 flex items-center justify-center group"
                aria-label={social.label}
              >
                <social.icon className="text-foreground group-hover:text-background transition-colors" size={20} />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-center text-muted-foreground text-sm">
            <p className="flex items-center justify-center gap-2">
              © {currentYear} Portfolio. Made with <Heart className="text-primary" size={16} fill="currentColor" /> by Developer
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
