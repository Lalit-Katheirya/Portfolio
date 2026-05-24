import type { FormEvent } from "react";
import { motion } from "framer-motion";
import { Loader2, Mail, MapPin, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import SectionHeader from "@/components/SectionHeader";
import SocialLinks, { type SocialLinksData } from "@/components/SocialLinks";
import { cn } from "@/lib/utils";

type ContactForm = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type ContactSectionProps = {
  phone: string;
  email: string;
  location?: string;
  social: SocialLinksData;
  form: ContactForm;
  onFormChange: (field: keyof ContactForm, value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  isPending?: boolean;
};

const contactFieldClass =
  "h-11 rounded-xl border-white/12 bg-black/40 text-white placeholder:text-white/35 focus-visible:border-primary/50 focus-visible:ring-primary/25 sm:h-12";

const ContactRow = ({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: typeof Phone;
  label: string;
  value: string;
  href?: string;
}) => {
  const content = (
    <div className="flex min-w-0 items-start gap-3 sm:gap-4">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-primary">
        <Icon size={18} aria-hidden />
      </span>
      <div className="min-w-0 pt-0.5">
        <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/40">
          {label}
        </p>
        <p className="mt-0.5 truncate text-sm text-white/85 sm:text-[15px]">
          {value}
        </p>
      </div>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        className="group block rounded-xl border border-transparent p-3 transition-colors hover:border-white/10 hover:bg-white/[0.03]"
      >
        {content}
      </a>
    );
  }

  return (
    <div className="rounded-xl border border-transparent p-3">{content}</div>
  );
};

const ContactSection = ({
  phone,
  email,
  location,
  social,
  form,
  onFormChange,
  onSubmit,
  isPending = false,
}: ContactSectionProps) => (
  <section id="contact" className="scroll-mt-24 border-t border-white/[0.06] py-16 sm:py-20">
    <div className="container mx-auto px-4">
      <SectionHeader
        title="Contact"
        subtitle="Let's build something great together"
        className="mb-10 sm:mb-12"
      />

      <div className="mx-auto grid max-w-5xl gap-5 lg:grid-cols-5 lg:gap-6">
        <motion.aside
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.45 }}
          className="flex flex-col gap-4 lg:col-span-2"
        >
          <div className="rounded-2xl border border-white/10 bg-[#0a0a0a] p-4 sm:p-5">
            <p className="mb-1 text-sm font-semibold text-white">Get in touch</p>
            <p className="mb-4 text-xs leading-relaxed text-white/50 sm:text-sm">
              Open to full-time roles and freelance projects. I usually reply within 24 hours.
            </p>

            <div className="space-y-1 divide-y divide-white/[0.06]">
              <ContactRow
                icon={Phone}
                label="Phone"
                value={phone}
                href={`tel:${phone.replace(/\s/g, "")}`}
              />
              <ContactRow
                icon={Mail}
                label="Email"
                value={email}
                href={`mailto:${email}`}
              />
              {location ? (
                <ContactRow icon={MapPin} label="Location" value={location} />
              ) : null}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0a0a0a] p-4 sm:p-5">
            <p className="mb-3 text-sm font-semibold text-white">Connect</p>
            <SocialLinks {...social} variant="compact" size="sm" />
          </div>
        </motion.aside>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.45, delay: 0.06 }}
          onSubmit={onSubmit}
          className={cn(
            "flex flex-col gap-4 rounded-2xl border border-white/10 bg-[#0a0a0a] p-4 sm:p-6 lg:col-span-3"
          )}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label htmlFor="contact-name" className="text-xs font-medium text-white/55">
                Your name
              </label>
              <Input
                id="contact-name"
                required
                placeholder="John Doe"
                value={form.name}
                onChange={(e) => onFormChange("name", e.target.value)}
                className={contactFieldClass}
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="contact-email" className="text-xs font-medium text-white/55">
                Your email
              </label>
              <Input
                id="contact-email"
                required
                type="email"
                placeholder="you@email.com"
                value={form.email}
                onChange={(e) => onFormChange("email", e.target.value)}
                className={contactFieldClass}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="contact-subject" className="text-xs font-medium text-white/55">
              Subject
            </label>
            <Input
              id="contact-subject"
              required
              placeholder="Project inquiry"
              value={form.subject}
              onChange={(e) => onFormChange("subject", e.target.value)}
              className={contactFieldClass}
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="contact-message" className="text-xs font-medium text-white/55">
              Message
            </label>
            <Textarea
              id="contact-message"
              required
              rows={5}
              placeholder="Tell me about your project..."
              value={form.message}
              onChange={(e) => onFormChange("message", e.target.value)}
              className={cn(contactFieldClass, "min-h-[140px] resize-none py-3")}
            />
          </div>

          <Button
            type="submit"
            disabled={isPending}
            className="mt-1 h-12 w-full rounded-xl bg-gradient-to-r from-primary to-[hsl(262_83%_58%)] text-sm font-semibold text-white shadow-glow-primary hover:opacity-90 disabled:opacity-60"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                Send Message
                <Send className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </motion.form>
      </div>
    </div>
  </section>
);

export default ContactSection;
