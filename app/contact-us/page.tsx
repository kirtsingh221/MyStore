'use client'
import { NextPage } from "next";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const Contact: NextPage = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    setErrors({ ...errors, [id]: "" }); // Clear error on change
  };

  const validate = () => {
    let valid = true;
    const newErrors = { name: "", email: "", message: "" };

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      valid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address";
      valid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message cannot be empty";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess("");

    if (!validate()) return;

    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSuccess("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        const data = await res.json();
        alert(data.error || "Something went wrong");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-16 space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold">Contact Us</h1>
        <p className="text-muted-foreground text-lg md:text-xl">
          Have a question or want to work together? Fill out the form below or reach us via email.
        </p>
        {success && <p className="text-green-500 font-medium">{success}</p>}
      </section>

      {/* Contact Form */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle>Send Us a Message</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="grid gap-6" onSubmit={handleSubmit}>
              <div>
                <Label htmlFor="name" className="mb-2 block">Name</Label>
                <Input
                  id="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  className={errors.name ? "border-red-500" : ""}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <Label htmlFor="email" className="mb-2 block">Email</Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <Label htmlFor="message" className="mb-2 block">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Write your message here..."
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className={errors.message ? "border-red-500" : ""}
                />
                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>

      {/* Contact Info Section */}
      <section className="grid gap-6 md:grid-cols-2">
        <Card className="text-center">
          <CardContent>
            <h3 className="font-bold text-xl mb-2">Email Us</h3>
            <p className="text-muted-foreground">support@example.com</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent>
            <h3 className="font-bold text-xl mb-2">Call Us</h3>
            <p className="text-muted-foreground">+1 234 567 890</p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default Contact;