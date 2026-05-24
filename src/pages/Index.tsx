import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import TechStackSection from "@/components/TechStackSection";
import SectionHeader from "@/components/SectionHeader";
import ResumeSection from "@/components/ResumeSection";
import SocialLinks from "@/components/SocialLinks";
import SiteHeader from "@/components/SiteHeader";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import type { JobData } from "@/components/JobCodeWindow";
import profileImage from "@/assets/my-profile.png";

type PortfolioData = {
  personal: {
    name: string;
    title: string;
    tagline?: string;
    summary: string;
    about?: string[];
    email: string;
    phone: string;
    location:
    | string
    | {
      city?: string;
      state?: string;
      pincode?: string;
    };
    social?: {
      linkedin?: string;
      github?: string;
      upwork?: string;
    };
    linkedin?: string;
  };
  skills: Record<string, string[]>;
  experience: Array<{
    role: string;
    company: string;
    period:
    | string
    | {
      start?: string | null;
      end?: string | null;
      isCurrent?: boolean;
      display?: string;
    };
    highlights: string[];
    technologies: string[];
  }>;
  projects: Array<{
    title: string;
    period:
    | string
    | {
      start?: string | null;
      end?: string | null;
      isCurrent?: boolean;
      display?: string;
    };
    description: string[];
    technologies: string[];
  }>;
  education: Array<{
    degree: string;
    institute: string;
    university: string;
    period:
    | string
    | {
      start?: string | null;
      end?: string | null;
      isCurrent?: boolean;
      display?: string;
    };
    cgpa: string | number;
    location: string;
  }>;
  interests: string[];
};

type PortfolioResponse = {
  success: boolean;
  data: PortfolioData;
};

const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

const monthNames: Record<string, string> = {
  Jan: "January",
  Feb: "February",
  Mar: "March",
  Apr: "April",
  May: "May",
  Jun: "June",
  Jul: "July",
  Aug: "August",
  Sep: "September",
  Oct: "October",
  Nov: "November",
  Dec: "December",
};

const expandMonth = (value: string) => {
  const match = value.match(/^(\w{3})\s+(\d{4})$/);
  if (!match) return value;
  const full = monthNames[match[1]];
  return full ? `${full} ${match[2]}` : value;
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

const formatLocation = (
  location: PortfolioData["personal"]["location"] | undefined
) => {
  if (!location) return "";
  if (typeof location === "string") return location;

  const parts = [location.city, location.state, location.pincode].filter(
    (part): part is string => Boolean(part && part.trim())
  );

  return parts.join(", ");
};

const formatPeriod = (
  period:
    | PortfolioData["experience"][number]["period"]
    | PortfolioData["projects"][number]["period"]
    | PortfolioData["education"][number]["period"]
    | undefined
) => {
  if (!period) return "";
  if (typeof period === "string") return period;
  if (period.display) return period.display;

  const toMonthYear = (value?: string | null) => {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    return date.toLocaleDateString(undefined, {
      month: "short",
      year: "numeric",
    });
  };

  const start = toMonthYear(period.start);
  const end = period.isCurrent ? "Present" : toMonthYear(period.end);

  if (start && end) return `${start} - ${end}`;
  return start || end || "";
};

const splitPeriod = (periodLabel: string) => {
  const parts = periodLabel.split(/\s*[-–—]\s*/);
  if (parts.length >= 2) {
    return { from: parts[0].trim(), to: parts.slice(1).join(" - ").trim() };
  }
  return { from: periodLabel, to: "Present" };
};

const splitName = (fullName: string) => {
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 1) return { first: parts[0], last: "" };
  const last = parts.pop() ?? "";
  return { first: parts.join(" "), last };
};

const toJobData = (
  item: PortfolioData["experience"][number]
): JobData => {
  const periodLabel = formatPeriod(item.period);
  const { from, to } = splitPeriod(periodLabel);
  return {
    title: item.role,
    from: expandMonth(from),
    to: to === "Present" ? "Present" : expandMonth(to),
    company: item.company,
  };
};

const collectSkills = (data: PortfolioData) => {
  const fromCategories = Object.values(data.skills).flat();
  const fromExperience = data.experience.flatMap((item) => item.technologies);
  const fromProjects = data.projects.flatMap((item) => item.technologies);
  return [...fromCategories, ...fromExperience, ...fromProjects];
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
      <div className="min-h-screen bg-black grid place-items-center text-lg text-white/80">
        Loading profile...
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="min-h-screen bg-black grid place-items-center text-lg text-red-400">
        Unable to load portfolio data.
      </div>
    );
  }

  const { first, last } = splitName(data.personal.name);
  const socialLinks = {
    linkedin:
      data.personal.social?.linkedin ??
      data.personal.linkedin ??
      "https://www.linkedin.com/in/lalitkatheriya369/",
    github:
      data.personal.social?.github ?? "https://github.com/Lalit-Katheirya",
    upwork:
      data.personal.social?.upwork ??
      "https://www.upwork.com/freelancers/~0187612674101e6384?mp_source=share",
  };
  const locationLabel = formatLocation(data.personal.location);
  const allSkills = collectSkills(data);
  const hasFreelancer = data.experience.some((item) =>
    item.role.toLowerCase().includes("freelancer")
  );
  const experienceList = hasFreelancer
    ? data.experience
    : [
      ...data.experience,
      {
        role: "Freelancer",
        company: "Self-Employed",
        period: "Jan 2025 - Present",
        highlights: [
          "Delivering freelance web and hybrid mobile projects for independent clients.",
          "Building end-to-end solutions with Angular, React, Ionic, and Node.js.",
        ],
        technologies: ["Angular", "React", "Node.js", "Ionic", "Firebase"],
      },
    ];
  const experienceJobs = experienceList.map(toJobData);
  const year = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-black text-white">
      <SiteHeader
        navItems={navItems}
        profileImage={profileImage}
        name={data.personal.name}
        firstName={first}
        lastName={last}
        social={socialLinks}
      />

      <main>
        <HeroSection
          first={first}
          last={last}
          title={data.personal.title}
          tagline={
            data.personal.tagline ??
            "Building scalable web & hybrid applications with modern technologies."
          }
          profileImage={profileImage}
          fullName={data.personal.name}
          skills={allSkills}
          projectCount={data.projects.length}
        />

        <AboutSection
          first={first}
          last={last}
          title={data.personal.title}
          summary={data.personal.summary}
          aboutParagraphs={data.personal.about}
          location={locationLabel}
          interests={data.interests}
          projectCount={data.projects.length}
        />

        <ExperienceTimeline jobs={experienceJobs} />

        <TechStackSection skills={data.skills} />

        <section id="projects" className="container mx-auto px-4 py-16 sm:py-20">
          <SectionHeader
            title="Featured Projects"
            subtitle="Selected work and case highlights"
            className="mb-10 sm:mb-12"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {data.projects.map((project, index) => (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: (index % 3) * 0.08 }}
                className="group relative flex flex-col rounded-xl border border-white/10 bg-[#0a0a0a] p-6 min-h-[220px] hover:border-primary/40 transition-colors"
              >
                <h3 className="text-lg font-semibold text-white mb-2 pr-8">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                  {project.description[0]}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <Badge
                      key={tech}
                      variant="outline"
                      className="border-white/15 text-white/70 text-xs"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
                <button
                  type="button"
                  aria-label={`View ${project.title}`}
                  className="absolute bottom-5 right-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/80 group-hover:border-primary group-hover:bg-primary group-hover:text-white transition-all"
                >
                  <ArrowUpRight size={16} />
                </button>
              </motion.article>
            ))}
          </div>
        </section>

        <ResumeSection
          name={data.personal.name}
          title={data.personal.title}
          resumeUrl="/resume.pdf"
        />

        <section id="education" className="container mx-auto px-4 py-16 sm:py-20 border-t border-white/10">
          <SectionHeader
            title="Education"
            subtitle="Academic background and qualifications"
            className="mb-10 sm:mb-12"
          />
          <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {data.education.map((item) => (
              <div
                key={item.degree}
                className="rounded-xl border border-white/10 bg-[#0a0a0a] p-6"
              >
                <h3 className="font-semibold text-lg text-white">
                  {item.degree}
                </h3>
                <p className="text-muted-foreground mt-1">{item.institute}</p>
                <p className="text-sm text-muted-foreground">{item.university}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-white/5 border-0">
                    {formatPeriod(item.period)}
                  </Badge>
                  <Badge variant="secondary" className="bg-white/5 border-0">
                    CGPA: {item.cgpa}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </section>

        <ContactSection
          phone={data.personal.phone}
          email={data.personal.email}
          location={locationLabel || undefined}
          social={socialLinks}
          form={form}
          onFormChange={(field, value) =>
            setForm((prev) => ({ ...prev, [field]: value }))
          }
          onSubmit={(event) => {
            event.preventDefault();
            contactMutation.mutate(form);
          }}
          isPending={contactMutation.isPending}
        />
      </main>

      <footer className="border-t border-white/[0.08] bg-black py-10 sm:py-12">
        <div className="container mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 text-center">
          <p className="text-sm text-white/45">
            Designed &amp; built by {data.personal.name} · {year}
          </p>
          <SocialLinks
            {...socialLinks}
            variant="compact"
            size="sm"
            className="justify-center"
          />
        </div>
      </footer>
    </div>
  );
};

export default Index;
