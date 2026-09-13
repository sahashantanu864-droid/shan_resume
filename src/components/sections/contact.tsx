"use client";

import React, { useState } from "react";
import SectionWrapper from "../ui/section-wrapper";
import SectionHeader from "./section-header";
import { config } from "@/data/config";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useToast } from "../ui/use-toast";
import confetti from "canvas-confetti";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Copy,
  Check,
  Send,
  ArrowUpRight,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";
import { MagneticButton, MagneticFollowButton } from "../ui/magnetic-button";
import { ScrollFollow, ScrollFollowStroke } from "../ui/scroll-follow";
import { ScrollText } from "../ui/scroll-text";

export const ContactSection = () => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(config.email);
    setCopied(true);
    toast({
      title: "Email Copied!",
      description: `${config.email} copied to your clipboard.`,
    });
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Missing Fields",
        description: "Please fill in your name, email, and message.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // Send to internal API route
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      setLoading(false);
      setSubmitted(true);

      // Trigger celebration confetti
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
      });

      toast({
        title: "Message Prepared / Sent!",
        description: "Thanks for reaching out! Shantanu will get back to you promptly.",
      });

      // Also provide a direct mailto fallback
      const mailtoUrl = `mailto:${config.email}?subject=${encodeURIComponent(
        formData.subject || "Contact from Portfolio"
      )}&body=${encodeURIComponent(
        `From: ${formData.name} (${formData.email})\n\n${formData.message}`
      )}`;
      window.open(mailtoUrl, "_blank");
    } catch {
      setLoading(false);
      // Direct mailto fallback
      const mailtoUrl = `mailto:${config.email}?subject=${encodeURIComponent(
        formData.subject || "Contact from Portfolio"
      )}&body=${encodeURIComponent(
        `From: ${formData.name} (${formData.email})\n\n${formData.message}`
      )}`;
      window.location.href = mailtoUrl;
    }
  };

  return (
    <SectionWrapper id="contact">
      <SectionHeader
        id="contact"
        badge="Get In Touch"
        title="Let's Build Together"
        desc="Whether you have an opportunity, an engineering query, or want to collaborate on real-world software, feel free to reach out."
      />

      <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Skiper19 Connecting Stroke */}
        <div className="hidden lg:block absolute -left-8 top-12 opacity-40 pointer-events-none">
          <ScrollFollowStroke height={350} strokeWidth={2} strokeColor="rgba(255,255,255,0.3)" />
        </div>

        {/* Contact Info Cards (Left Column) with Skiper19 Scroll-Follow */}
        <div className="lg:col-span-5 space-y-4">
          <ScrollFollow speed={-6} className="w-full space-y-4 block">
            {/* Email Direct Card */}
            <Card className="border border-white/10 bg-[#08080a]/90 hover:border-white/25 transition-all shadow-lg backdrop-blur-md">
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/15 flex items-center justify-center text-white shrink-0 shadow-inner">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-mono uppercase tracking-wider text-zinc-500 block">
                        Email Address
                      </span>
                      <a
                        href={`mailto:${config.email}`}
                        className="text-sm sm:text-base font-semibold text-white hover:text-zinc-300 transition-colors truncate block"
                      >
                        {config.email}
                      </a>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleCopyEmail}
                    className="shrink-0 h-9 w-9 rounded-lg border-white/15 bg-white/5 text-zinc-300 hover:bg-white/10 hover:text-white hover:border-white/30"
                    aria-label="Copy Email Address"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4 text-zinc-400" />
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Phone Card */}
            <Card className="border border-white/10 bg-[#08080a]/90 hover:border-white/25 transition-all shadow-lg backdrop-blur-md">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/15 flex items-center justify-center text-white shrink-0 shadow-inner">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-zinc-500 block">
                      Phone / WhatsApp
                    </span>
                    <a
                      href={`tel:${config.phone}`}
                      className="text-sm sm:text-base font-semibold text-white hover:text-zinc-300 transition-colors block"
                    >
                      +91 {config.phone}
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Location Card */}
            <Card className="border border-white/10 bg-[#08080a]/90 shadow-lg backdrop-blur-md">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/15 flex items-center justify-center text-white shrink-0 shadow-inner">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-zinc-500 block">
                      Location
                    </span>
                    <span className="text-sm sm:text-base font-semibold text-white block">
                      {config.location}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Profiles Card */}
            <Card className="border border-white/10 bg-[#08080a]/90 shadow-lg backdrop-blur-md">
              <CardContent className="p-6 space-y-4">
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-500 block">
                  Connect Online
                </span>

                {/* Aceternity Magnetic Follow Button */}
                <div className="w-full">
                  <MagneticFollowButton
                    href={config.social.github}
                    label="Follow @sahashantanu864-droid"
                    className="w-full justify-center py-2.5"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <MagneticButton strength={0.2} className="w-full">
                    <Link
                      href={config.social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full"
                    >
                      <Button
                        variant="outline"
                        className="w-full justify-between rounded-xl text-xs font-medium border-white/15 bg-white/5 text-zinc-200 hover:bg-white/10 hover:border-white/30 hover:text-white"
                      >
                        <span className="flex items-center gap-2">
                          <Github className="w-4 h-4" />
                          <span>GitHub</span>
                        </span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
                      </Button>
                    </Link>
                  </MagneticButton>

                  <MagneticButton strength={0.2} className="w-full">
                    <Link
                      href={config.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full"
                    >
                      <Button
                        variant="outline"
                        className="w-full justify-between rounded-xl text-xs font-medium border-white/15 bg-white/5 text-zinc-200 hover:bg-white/10 hover:border-white/30 hover:text-white"
                      >
                        <span className="flex items-center gap-2">
                          <Linkedin className="w-4 h-4 text-zinc-300" />
                          <span>LinkedIn</span>
                        </span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
                      </Button>
                    </Link>
                  </MagneticButton>
                </div>
              </CardContent>
            </Card>
          </ScrollFollow>
        </div>

        {/* Interactive Contact Form (Right Column) */}
        <Card className="lg:col-span-7 border border-white/15 bg-[#08080a]/95 backdrop-blur-md shadow-2xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold flex items-center gap-2.5 font-display text-white">
              <MessageSquare className="w-5 h-5 text-zinc-300" />
              <span>Send a Message</span>
            </CardTitle>
            <CardDescription className="text-zinc-400 w-full">
              <ScrollText as="p" offset={["start 0.9", "start 0.5"]} className="w-full text-zinc-400 text-sm leading-relaxed">
                Drop a note directly to Shantanu Saha. All inquiries receive a prompt reply.
              </ScrollText>
            </CardDescription>
          </CardHeader>

          <CardContent>
            {submitted ? (
              <div className="p-8 text-center space-y-4 border border-white/15 rounded-xl bg-white/5">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/30">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold font-display text-white">
                  Thank you for reaching out!
                </h3>
                <p className="text-sm text-zinc-400 max-w-md mx-auto leading-relaxed">
                  Your message has been initiated. If your mail client didn’t open automatically, feel free to email directly at{" "}
                  <a href={`mailto:${config.email}`} className="text-white underline font-medium">
                    {config.email}
                  </a>.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: "", email: "", subject: "", message: "" });
                  }}
                  className="border-white/15 bg-white/5 text-zinc-200 hover:bg-white/10 hover:text-white"
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-medium text-zinc-300">
                      Your Name *
                    </label>
                    <Input
                      required
                      placeholder="e.g. Alex Miller"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="border-white/15 bg-[#0e0e11]/90 text-white placeholder:text-zinc-500 focus-visible:border-white/40 focus-visible:ring-white/20"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-medium text-zinc-300">
                      Email Address *
                    </label>
                    <Input
                      required
                      type="email"
                      placeholder="alex@company.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="border-white/15 bg-[#0e0e11]/90 text-white placeholder:text-zinc-500 focus-visible:border-white/40 focus-visible:ring-white/20"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-medium text-zinc-300">
                    Subject
                  </label>
                  <Input
                    placeholder="Full-Stack Opportunity / Project Collaboration"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    className="border-white/15 bg-[#0e0e11]/90 text-white placeholder:text-zinc-500 focus-visible:border-white/40 focus-visible:ring-white/20"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-medium text-zinc-300">
                    Message *
                  </label>
                  <Textarea
                    required
                    rows={4}
                    placeholder="Tell me about your team, system requirements, or project vision..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="border-white/15 bg-[#0e0e11]/90 text-white placeholder:text-zinc-500 focus-visible:border-white/40 focus-visible:ring-white/20 leading-relaxed"
                  />
                </div>

                <MagneticButton strength={0.2} className="w-full sm:w-auto">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto gap-2 rounded-xl text-sm font-semibold px-8 shadow-lg bg-white text-black hover:bg-zinc-200 transition-all"
                  >
                    {loading ? (
                      <span>Sending...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </Button>
                </MagneticButton>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </SectionWrapper>
  );
};

export default ContactSection;
