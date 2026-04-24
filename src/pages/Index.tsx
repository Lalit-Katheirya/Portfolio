import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Briefcase, GraduationCap, Mail, MapPin, Phone } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import profileImage from "@/assets/my-profile.png";
import { motion } from "framer-motion";

type PortfolioData = {
  personal: {
    name: string;
    title: string;
    summary: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
  };
  skills: Record<string, string[]>;
  experience: Array<{
    role: string;
    company: string;
    period: string;
    highlights: string[];
    technologies: string[];
  }>;
  projects: Array<{
    title: string;
    period: string;
    description: string[];
    technologies: string[];
  }>;
  education: Array<{
    degree: string;
    institute: string;
    university: string;
    period: string;
    cgpa: string;
    location: string;
  }>;
  interests: string[];
};

type PortfolioResponse = {
  success: boolean;
  data: PortfolioData;
};

const fetchPortfolio = async (): Promise<PortfolioData> => {
  const response = await fetch("/api/portfolio");
  if (!response.ok) {
    throw new Error("Unable to load portfolio content.");
  }
  const payload: PortfolioResponse = await response.json();
  return payload.data;
};

const submitMessage = async (data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) => {
  const response = await fetch("/api/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Message submission failed.");
  }
};

const navItems = [
  { id: "home", label: "Home" },
  { id: "summary", label: "Summary" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

const skillCategoryLabels: Record<string, string> = {
  frontend: "Frontend Skills",
  backend: "Backend Skills",
  cloudDevOps: "Cloud & DevOps",
  stateManagement: "State Management",
  tools: "Tools",
  aiTools: "AI & Automation Tools",
  softSkills: "Soft Skills",
};

const Index = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const { data, isLoading, isError } = useQuery({
    queryKey: ["portfolio-data"],
    queryFn: fetchPortfolio,
  });

  const contactMutation = useMutation({
    mutationFn: submitMessage,
    onSuccess: () => {
      toast({
        title: "Message sent",
        description: "Thanks for reaching out. I will get back to you soon.",
      });
      setForm({ name: "", email: "", subject: "", message: "" });
    },
    onError: () => {
      toast({
        title: "Submission failed",
        description: "Please try again in a moment.",
        variant: "destructive",
      });
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background grid place-items-center text-lg">
        Loading profile...
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="min-h-screen bg-background grid place-items-center text-lg text-destructive">
        Unable to load portfolio data.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="font-bold text-xl">{data.personal.name}</div>
          <nav className="hidden md:flex gap-6">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <a
            href={`mailto:${data.personal.email}`}
            className="text-sm font-medium text-primary border border-primary/60 px-4 py-2 rounded-full hover:bg-primary/10 transition-colors"
          >
            Hire Me
          </a>
        </div>
      </header>

      <main className="container mx-auto px-4 py-10 space-y-10">
        <section id="home" className="py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border border-border bg-gradient-to-b from-slate-950 to-slate-900 p-6 md:p-10"
          >
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div className="space-y-6">
                <p className="inline-flex items-center rounded-full border border-primary/40 px-3 py-1 text-sm text-primary">
                  Available for freelance and full-time roles
                </p>
                <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight">
                  {data.personal.name}
                </h1>
                <h2 className="text-2xl md:text-3xl font-semibold text-primary">
                  Full Stack Developer & AI Engineer
                </h2>
                <p className="text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed">
                  {data.personal.summary}
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={`mailto:${data.personal.email}`}
                    className="rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
                  >
                    Hire Me
                  </a>
                  <a
                    href={data.personal.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-lg border border-primary/50 px-5 py-3 text-sm font-semibold text-primary hover:bg-primary/10 transition-colors"
                  >
                    View LinkedIn
                  </a>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">{data.personal.location}</Badge>
                  <Badge variant="secondary">{data.personal.phone}</Badge>
                  <Badge variant="secondary">{data.personal.email}</Badge>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-cyan-500/40 to-primary/40 blur-xl opacity-60" />
                <div className="relative rounded-3xl overflow-hidden border border-border bg-black">
                  <img
                    src={profileImage}
                    alt={`${data.personal.name} profile`}
                    className="w-full h-[420px] md:h-[520px] object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 rounded-xl border border-white/20 bg-black/55 backdrop-blur p-4">
                    <p className="text-primary font-semibold">Professional Summary</p>
                    <p className="text-sm text-white/85 mt-1">
                      {data.projects.length}+ projects delivered with strong focus on
                      performance, scalability, and clean architecture.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <section id="skills" className="space-y-4">
          <h2 className="text-3xl font-bold">Core Skills</h2>
          <div className="grid lg:grid-cols-2 gap-5">
            {Object.entries(data.skills).map(([key, values]) => (
              <Card key={key} className="p-5 bg-card/60 border-border">
                <h3 className="font-semibold mb-3">
                  {skillCategoryLabels[key] ?? key}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {values.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section id="projects" className="space-y-4">
          <h2 className="text-3xl font-bold">Projects</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {data.projects.map((project) => (
              <Card key={project.title} className="p-6 bg-card/60 border-border">
                <p className="text-xs text-primary mb-1">{project.period}</p>
                <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
                <ul className="list-disc pl-5 text-muted-foreground space-y-1 mb-4">
                  {project.description.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="outline">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section id="experience" className="space-y-4">
          <h2 className="text-3xl font-bold flex items-center gap-2">
            <Briefcase className="text-primary" size={26} /> Experience
          </h2>
          <div className="space-y-5">
            {data.experience.map((item) => (
              <Card key={item.role} className="p-6 bg-card/60 border-border">
                <div className="flex flex-wrap justify-between gap-3 mb-4">
                  <div>
                    <h3 className="font-semibold text-xl">{item.role}</h3>
                    <p className="text-muted-foreground">{item.company}</p>
                  </div>
                  <Badge variant="secondary">{item.period}</Badge>
                </div>
                <ul className="list-disc pl-5 text-muted-foreground space-y-1 mb-4">
                  {item.highlights.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                  {item.technologies.map((tech) => (
                    <Badge key={tech} variant="outline">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section id="education" className="space-y-4">
          <h2 className="text-3xl font-bold flex items-center gap-2">
            <GraduationCap className="text-primary" size={26} /> Education
          </h2>
          <div className="grid md:grid-cols-2 gap-5">
            {data.education.map((item) => (
              <Card key={item.degree} className="p-6 bg-card/60 border-border">
                <h3 className="font-semibold text-lg">{item.degree}</h3>
                <p className="text-muted-foreground mt-1">{item.institute}</p>
                <p className="text-muted-foreground text-sm">{item.university}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge variant="secondary">{item.period}</Badge>
                  <Badge variant="secondary">CGPA: {item.cgpa}</Badge>
                  <Badge variant="secondary">{item.location}</Badge>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-3xl font-bold">Interests</h2>
          <div className="flex flex-wrap gap-2">
            {data.interests.map((interest) => (
              <Badge key={interest} variant="secondary">
                {interest}
              </Badge>
            ))}
          </div>
        </section>

        <section id="contact" className="grid lg:grid-cols-3 gap-5">
          <Card className="p-6 bg-card/60 border-border space-y-4">
            <h2 className="text-2xl font-bold">Contact</h2>
            <div className="space-y-3 text-sm">
              <p className="flex items-center gap-2">
                <Phone size={16} className="text-primary" /> {data.personal.phone}
              </p>
              <p className="flex items-center gap-2">
                <Mail size={16} className="text-primary" /> {data.personal.email}
              </p>
              <p className="flex items-center gap-2">
                <MapPin size={16} className="text-primary" /> {data.personal.location}
              </p>
            </div>
          </Card>

          <Card className="p-6 bg-card/60 border-border lg:col-span-2">
            <form
              className="space-y-4"
              onSubmit={(event) => {
                event.preventDefault();
                contactMutation.mutate(form);
              }}
            >
              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  required
                  placeholder="Your name"
                  value={form.name}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, name: event.target.value }))
                  }
                />
                <Input
                  required
                  type="email"
                  placeholder="Your email"
                  value={form.email}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, email: event.target.value }))
                  }
                />
              </div>
              <Input
                required
                placeholder="Subject"
                value={form.subject}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, subject: event.target.value }))
                }
              />
              <Textarea
                required
                rows={5}
                placeholder="Message"
                value={form.message}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, message: event.target.value }))
                }
              />
              <Button
                type="submit"
                disabled={contactMutation.isPending}
                className="w-full"
              >
                {contactMutation.isPending ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default Index;
