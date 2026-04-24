import { ExternalLink, Github } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import project1 from "../assets/project-1.jpg";
import project2 from "../assets/project-2.jpg";
import project3 from "../assets/project-3.jpg";
import project4 from "../assets/project-4.jpg";

const Portfolio = () => {
  const projects = [
    {
      title: "E-Commerce Platform",
      category: "Web Development",
      description:
        "A modern e-commerce solution with seamless checkout experience",
      image: project1,
      tags: ["React", "Node.js", "MongoDB"],
      link: "#",
      github: "#",
    },
    {
      title: "Analytics Dashboard",
      category: "UI/UX Design",
      description: "Data visualization dashboard for business analytics",
      image: project2,
      tags: ["Vue.js", "D3.js", "Tailwind"],
      link: "#",
      github: "#",
    },
    {
      title: "Social Media App",
      category: "Mobile App",
      description: "Real-time social networking mobile application",
      image: project3,
      tags: ["React Native", "Firebase", "Redux"],
      link: "#",
      github: "#",
    },
    {
      title: "Creative Portfolio",
      category: "Web Design",
      description: "Minimalist portfolio website for creative professionals",
      image: project4,
      tags: ["Next.js", "Framer Motion", "CSS"],
      link: "#",
      github: "#",
    },
  ];

  return (
    <section id="portfolio" className="py-24 px-4 bg-secondary/30">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              My Recent Works
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Here are some of my recent projects that showcase my skills and
            creativity.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="group overflow-hidden bg-card border-border hover:border-primary/50 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                  <a
                    href={project.link}
                    className="w-12 h-12 rounded-full bg-primary hover:bg-primary/80 transition-colors flex items-center justify-center"
                    aria-label="View project"
                  >
                    <ExternalLink className="text-background" size={20} />
                  </a>
                  <a
                    href={project.github}
                    className="w-12 h-12 rounded-full bg-primary hover:bg-primary/80 transition-colors flex items-center justify-center"
                    aria-label="View on GitHub"
                  >
                    <Github className="text-background" size={20} />
                  </a>
                </div>
              </div>
              <div className="p-6">
                <div className="text-primary text-sm font-semibold mb-2">
                  {project.category}
                </div>
                <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <Badge
                      key={tagIndex}
                      variant="secondary"
                      className="bg-secondary hover:bg-primary/20"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
