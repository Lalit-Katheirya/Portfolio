import { useState } from "react";
import { Palette, Code, Smartphone, ArrowUpRight } from "lucide-react";
import { Card } from "./ui/card";

const Services = () => {
  const [expandedService, setExpandedService] = useState<number | null>(null);

  const services = [
    {
      icon: Palette,
      title: "Branding Design",
      description:
        "I break down complex user experience problems to create integrity-focused solutions that connect billions of people.",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Code,
      title: "UI/UX Design",
      description:
        "Creating intuitive and engaging user interfaces with a focus on user experience and modern design principles.",
      color: "from-blue-500 to-purple-500",
    },
    {
      icon: Smartphone,
      title: "Web Design",
      description:
        "Building responsive, performant websites using modern technologies and best practices for optimal user experience.",
      color: "from-green-500 to-blue-500",
    },
    {
      icon: Code,
      title: "App Design",
      description:
        "Designing and developing mobile applications with native-like performance and beautiful user interfaces.",
      color: "from-pink-500 to-purple-500",
    },
  ];

  return (
    <section id="services" className="py-24 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              My Quality Services
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We put your ideas and thus your wishes in the form of a unique web
            project that inspires you and your customers.
          </p>
        </div>

        <div className="space-y-4">
          {services.map((service, index) => (
            <Card
              key={index}
              className="relative overflow-hidden bg-card border-border hover:border-primary/50 transition-all duration-300 cursor-pointer group"
              onClick={() =>
                setExpandedService(expandedService === index ? null : index)
              }
            >
              <div className="p-8">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-6 flex-1">
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <service.icon className="text-white" size={32} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>
                      <p
                        className={`text-muted-foreground transition-all duration-300 ${
                          expandedService === index
                            ? "opacity-100 max-h-40"
                            : "opacity-0 max-h-0 overflow-hidden"
                        }`}
                      >
                        {service.description}
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight
                    className={`text-primary transition-all duration-300 ${
                      expandedService === index ? "rotate-45" : "rotate-0"
                    } group-hover:translate-x-1 group-hover:-translate-y-1`}
                    size={24}
                  />
                </div>
              </div>
              <div
                className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${
                  service.color
                } transition-all duration-300 ${
                  expandedService === index
                    ? "w-full"
                    : "w-0 group-hover:w-full"
                }`}
              ></div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
