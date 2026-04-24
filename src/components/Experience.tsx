import { Briefcase, GraduationCap } from "lucide-react";
import { Card } from "./ui/card";

const Experience = () => {
  const experiences = [
    {
      type: "work",
      title: "Lead Developer",
      company: "Tech Solutions Inc.",
      period: "2020 - Present",
      description:
        "Leading a team of developers in building scalable web applications and mentoring junior developers.",
    },
    {
      type: "work",
      title: "Full Stack Web Developer",
      company: "Digital Agency Co.",
      period: "2018 - 2020",
      description:
        "Developed and maintained multiple client websites and web applications using modern technologies.",
    },
    {
      type: "work",
      title: "UI Designer",
      company: "Creative Studio",
      period: "2016 - 2018",
      description:
        "Designed user interfaces for web and mobile applications with focus on user experience.",
    },
    {
      type: "work",
      title: "Junior Graphics Designer",
      company: "Design Hub",
      period: "2014 - 2016",
      description:
        "Created visual designs for various digital and print media projects.",
    },
  ];

  const education = [
    {
      title: "Programming Course",
      institution: "University of Oxford",
      period: "2020 - 2023",
    },
    {
      title: "Graphic Design Course",
      institution: "University of Cambridge",
      period: "2018 - 2020",
    },
    {
      title: "Web Design Course",
      institution: "MIT",
      period: "2016 - 2018",
    },
    {
      title: "Design & Technology",
      institution: "Stanford University",
      period: "2014 - 2016",
    },
  ];

  return (
    <section id="experience" className="py-24 px-4 bg-secondary/30">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              My Experience
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A journey through my professional career and educational background.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Work Experience */}
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center">
                <Briefcase className="text-background" size={24} />
              </div>
              <h3 className="text-2xl font-bold">My Experience</h3>
            </div>
            {experiences.map((exp, index) => (
              <Card
                key={index}
                className="p-6 bg-card border-border hover:border-primary/50 transition-all duration-300 group"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="text-sm text-primary font-semibold mb-1">
                      {exp.period}
                    </div>
                    <h4 className="text-xl font-bold group-hover:text-primary transition-colors">
                      {exp.title}
                    </h4>
                    <p className="text-muted-foreground">{exp.company}</p>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm mt-3">
                  {exp.description}
                </p>
              </Card>
            ))}
          </div>

          {/* Education */}
          <div
            className="space-y-6 animate-fade-in"
            style={{ animationDelay: "200ms" }}
          >
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center">
                <GraduationCap className="text-background" size={24} />
              </div>
              <h3 className="text-2xl font-bold">My Education</h3>
            </div>
            {education.map((edu, index) => (
              <Card
                key={index}
                className="p-6 bg-card border-border hover:border-primary/50 transition-all duration-300 group"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="text-sm text-primary font-semibold mb-1">
                      {edu.period}
                    </div>
                    <h4 className="text-xl font-bold group-hover:text-primary transition-colors">
                      {edu.title}
                    </h4>
                    <p className="text-muted-foreground">{edu.institution}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
