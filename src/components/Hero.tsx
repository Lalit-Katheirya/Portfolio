import { ArrowRight, Github, Linkedin, Mail, Twitter } from "lucide-react";
import { Button } from "./ui/button";
import profileImage from "../assets/my-profile.png";

const Hero = () => {
  const stats = [
    { value: "14+", label: "Years Experience" },
    { value: "50+", label: "Projects Completed" },
    { value: "1.5K", label: "Happy Clients" },
    { value: "14", label: "Awards Won" },
  ];

  const socialLinks = [
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Mail, href: "#contact", label: "Email" },
  ];

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center pt-20 px-4"
    >
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in">
            <div>
              <p className="text-primary font-semibold mb-2 text-lg">
                Software Developer
              </p>
              <h1 className="text- text-5xl lg:text-7xl font-bold mb-4">
                <span className="bg-gradient-primary bg-clip-text">
                  Hello I'm
                </span>
                <br />
                <span className="text-primary">Lalit katheriya</span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-lg">
                I break down complex user experience problems to create
                integrity-focused solutions that connect billions of people.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <Button className="bg-gradient-primary hover:opacity-90 transition-opacity group">
                Download CV
                <ArrowRight
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                  size={20}
                />
              </Button>
              <div className="flex items-center space-x-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="w-10 h-10 rounded-full bg-secondary hover:bg-primary transition-all duration-300 flex items-center justify-center group"
                    aria-label={social.label}
                  >
                    <social.icon
                      className="text-foreground group-hover:text-background transition-colors"
                      size={20}
                    />
                  </a>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="text-3xl lg:text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground text-sm mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Profile Image */}
          <div className="relative animate-fade-in-scale">
            <div className="relative w-full max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-primary rounded-3xl blur-3xl opacity-30 animate-glow"></div>
              <div className="relative rounded-full overflow-hidden border-2 border-primary">
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
