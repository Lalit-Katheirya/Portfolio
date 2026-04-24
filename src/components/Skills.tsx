import {
  Code2,
  Figma,
  Palette,
  Database,
  Layers,
  Smartphone,
} from "lucide-react";
import { Progress } from "./ui/progress";

const Skills = () => {
  const skills = [
    { name: "Figma", level: 90, icon: Figma },
    { name: "React", level: 95, icon: Code2 },
    { name: "UX Design", level: 88, icon: Palette },
    { name: "WordPress", level: 85, icon: Layers },
    { name: "Node.js", level: 92, icon: Database },
    { name: "React Native", level: 87, icon: Smartphone },
  ];

  return (
    <section id="skills" className="py-24 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              My Skills
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We put your ideas and thus your wishes in the form of a unique web
            project that inspires you and your customers.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="space-y-4 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center">
                    <skill.icon className="text-background" size={24} />
                  </div>
                  <span className="text-lg font-semibold">{skill.name}</span>
                </div>
                <span className="text-primary font-bold text-xl">
                  {skill.level}%
                </span>
              </div>
              <Progress value={skill.level} className="h-2" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
