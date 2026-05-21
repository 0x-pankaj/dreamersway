"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CheckCircle2, AlertTriangle, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { siteConfig } from "@/lib/site-config";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  current_country: string;
  interested_country_code: string;
  interested_stream_code: string;
  preferred_intake: string;
  message: string;
}

const INITIAL: ContactFormData = {
  name: "",
  email: "",
  phone: "",
  current_country: "",
  interested_country_code: "",
  interested_stream_code: "",
  preferred_intake: "",
  message: "",
};

interface Props {
  defaultCountry?: string;
  defaultStream?: string;
  variant?: "card" | "inline";
}

export function ContactForm({ defaultCountry, defaultStream, variant = "card" }: Props) {
  const [formData, setFormData] = useState<ContactFormData>({
    ...INITIAL,
    interested_country_code: defaultCountry || "",
    interested_stream_code: defaultStream || "",
  });
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    try {
      const payload = {
        name: formData.name,
        email: formData.email || null,
        phone: formData.phone,
        current_country: formData.current_country || null,
        interested_country_code: formData.interested_country_code || null,
        interested_stream_code: formData.interested_stream_code || null,
        preferred_intake: formData.preferred_intake || null,
        message: formData.message,
      };
      const { error } = await supabase.from("contacts").insert([payload]);
      if (error) throw error;
      setFormData({ ...INITIAL, interested_country_code: defaultCountry || "", interested_stream_code: defaultStream || "" });
      setSubmitStatus("success");
      setTimeout(() => setSubmitStatus("idle"), 6000);
    } catch (err) {
      console.error("Contact submit error", err);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const inner = (
    <form className="space-y-3" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Input name="name" value={formData.name} onChange={handleChange} placeholder="Full name *" required />
        <Input name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="WhatsApp / phone *" required />
      </div>
      <Input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email address" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <select
          name="current_country"
          value={formData.current_country}
          onChange={handleChange}
          className="h-10 rounded-md border bg-background px-3 text-sm text-foreground"
        >
          <option value="">I am currently in...</option>
          <option value="India">🇮🇳 India</option>
          <option value="Nepal">🇳🇵 Nepal</option>
          <option value="Other">🌍 Other</option>
        </select>
        <select
          name="interested_country_code"
          value={formData.interested_country_code}
          onChange={handleChange}
          className="h-10 rounded-md border bg-background px-3 text-sm text-foreground"
        >
          <option value="">I want to study in...</option>
          {siteConfig.countries.map((c) => (
            <option key={c.code} value={c.code}>
              {c.flag} {c.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <select
          name="interested_stream_code"
          value={formData.interested_stream_code}
          onChange={handleChange}
          className="h-10 rounded-md border bg-background px-3 text-sm text-foreground"
        >
          <option value="">Stream of interest</option>
          {siteConfig.streams.map((s) => (
            <option key={s.code} value={s.code}>
              {s.name}
            </option>
          ))}
        </select>
        <select
          name="preferred_intake"
          value={formData.preferred_intake}
          onChange={handleChange}
          className="h-10 rounded-md border bg-background px-3 text-sm text-foreground"
        >
          <option value="">Preferred intake</option>
          <option>Spring 2026</option>
          <option>Fall 2026</option>
          <option>Spring 2027</option>
          <option>Fall 2027</option>
          <option>Not sure yet</option>
        </select>
      </div>

      <Textarea
        name="message"
        value={formData.message}
        onChange={handleChange}
        placeholder="Tell us a bit about your goals, budget, or anything you'd like help with *"
        rows={4}
        required
      />

      <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Sending…
          </>
        ) : (
          "Get Free Consultation"
        )}
      </Button>

      {submitStatus === "success" && (
        <div className="p-3 rounded-lg bg-green-50 border border-green-200 text-green-800 flex items-start gap-2 text-sm">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-bold">Thank you!</p>
            <p>Our counsellor will reach out within 24 hours.</p>
          </div>
        </div>
      )}
      {submitStatus === "error" && (
        <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-800 flex items-start gap-2 text-sm">
          <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-bold">Couldn&apos;t send.</p>
            <p>
              Please try again or call us at <a href={`tel:${siteConfig.contact.phonePrimary.replace(/\s/g, "")}`} className="underline font-semibold">{siteConfig.contact.phonePrimary}</a>.
            </p>
          </div>
        </div>
      )}
    </form>
  );

  if (variant === "inline") return inner;

  return (
    <Card className="p-6 sm:p-8 border-gray-100 shadow-xl bg-white dark:bg-gray-950">
      <div className="mb-6">
        <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-1 font-mont">Free consultation</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">No fees. No spam. Just honest guidance.</p>
      </div>
      {inner}
    </Card>
  );
}
