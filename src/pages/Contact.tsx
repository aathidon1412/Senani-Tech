import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  Building,
  Factory,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import loadingLogo from "@/assets/loading_logo.png";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [fileData, setFileData] = useState<{ base64: string; name: string } | null>(null);
  const { toast } = useToast();
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setFileData(null);
      return;
    }

    // Vercel serverless has a payload limit of 4.5MB, so limit file to 3.5MB to be safe
    if (file.size > 3.5 * 1024 * 1024) {
      toast({
        variant: "destructive",
        title: "File too large",
        description: "Please upload a file smaller than 3.5MB.",
      });
      e.target.value = "";
      setFileData(null);
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      const base64Data = base64String.split(",")[1];
      setFileData({
        base64: base64Data,
        name: file.name,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      message: formData.get("message"),
      attachment: fileData?.base64 || null,
      attachmentName: fileData?.name || null,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message.");
      }

      setIsSubmitted(true);
      toast({
        title: "Message sent!",
        description: "We'll get back to you within 24 hours.",
      });
    } catch (error: any) {
      console.error("Error submitting form:", error);
      toast({
        variant: "destructive",
        title: "Error sending message",
        description: error.message || "Something went wrong. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section ref={heroRef} className="relative pt-32 pb-12 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-background" />
          <div className="absolute inset-0 circuit-pattern opacity-20" />

          <div className="container mx-auto px-4 relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="max-w-3xl mx-auto text-center"
            >
              <span className="inline-block px-4 py-1.5 rounded-full card text-sm text-muted-foreground mb-6">
                Contact Us
              </span>
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
                Connect with{" "}
                <span className="gradient-text-bright">SenaniTech</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Your worldwide partner in quality and innovation
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-10 md:py-12">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="p-8 rounded-2xl card relative overflow-hidden"
              >
                <h2 className="text-2xl font-display font-bold mb-6">
                  Send us a message
                </h2>

                {isSubmitted ? (
                  <div className="text-center py-12">
                    <CheckCircle
                      size={64}
                      className="text-highlight mx-auto mb-4"
                    />
                    <h3 className="text-xl font-semibold mb-2">Thank you!</h3>
                    <p className="text-muted-foreground">
                      We've received your message and will respond shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Name
                        </label>
                        <Input
                          name="name"
                          placeholder="Your name"
                          required
                          className="bg-muted/50 border-border focus:border-highlight"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Email
                        </label>
                        <Input
                          name="email"
                          type="email"
                          placeholder="your@email.com"
                          required
                          className="bg-muted/50 border-border focus:border-highlight"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Phone (Optional)
                      </label>
                      <Input
                        name="phone"
                        type="tel"
                        placeholder="+91 9876543210"
                        className="bg-muted/50 border-border focus:border-highlight"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Attachment (Optional, e.g. PDF, Images, Max 3.5MB)
                      </label>
                      <Input
                        name="attachment"
                        type="file"
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        onChange={handleFileChange}
                        className="bg-muted/50 border-border focus:border-highlight file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 cursor-pointer"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Message
                      </label>
                      <Textarea
                        name="message"
                        placeholder="Tell us about your project..."
                        rows={5}
                        required
                        className="bg-muted/50 border-border focus:border-highlight resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      variant="hero"
                      size="lg"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      <span className="flex items-center gap-2">
                        {isSubmitting ? "Sending..." : "Send Message"}
                        <Send size={18} />
                      </span>
                    </Button>
                  </form>
                )}

                <AnimatePresence>
                  {isSubmitting && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center z-30"
                    >
                      <div className="relative w-44 h-44 flex items-center justify-center mb-6">
                        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 144 144">
                          <rect
                            x="4"
                            y="4"
                            width="136"
                            height="136"
                            fill="none"
                            stroke="#545454"
                            strokeWidth="4"
                            className="opacity-10"
                          />
                          <motion.rect
                            x="4"
                            y="4"
                            width="136"
                            height="136"
                            fill="none"
                            stroke="#545454"
                            strokeWidth="4"
                            strokeLinecap="square"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                          />
                        </svg>
                        <img
                          src={loadingLogo}
                          alt="Loading logo"
                          className="w-[90%] h-[90%] object-contain relative z-10"
                        />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-1">
                        Sending Message
                      </h3>
                      <p className="text-sm text-muted-foreground text-center px-6">
                        Please wait while we connect to the server...
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                {/* Quick Contact */}
                <div className="p-6 rounded-2xl card">
                  <h3 className="font-display font-semibold mb-4">
                    Quick Contact
                  </h3>
                  <div className="space-y-4">
                    <a
                      href="mailto:info@senanitech.com"
                      className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <div className="w-10 h-10 rounded-lg bg-green-400 flex items-center justify-center">
                        <Mail size={20} className="text-white" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">
                          Email
                        </div>
                        <div className="font-medium text-black">
                          info@senanitech.com
                        </div>
                      </div>
                    </a>

                    <a
                      href="tel:+919486470817"
                      className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <div className="w-10 h-10 rounded-lg bg-green-400 flex items-center justify-center">
                        <Phone size={20} className="text-white" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">
                          Phone
                        </div>
                        <div className="font-medium text-black">
                          +91 9486470817
                        </div>
                      </div>
                    </a>
                  </div>
                </div>

                {/* Locations */}
                <div className="p-6 rounded-2xl card">
                  <h3 className="font-display font-semibold mb-4">
                    Our Locations
                  </h3>
                  <div className="space-y-4">
                    <a
                      href="https://maps.app.goo.gl/AEot2vSx5HQqR17B6"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors cursor-pointer group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-green-400 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                        <Building size={20} className="text-white" />
                      </div>
                      <div>
                        <div className="font-medium text-black transition-colors">
                          Engineering Delivery Center
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          SENANITECH
                        </div>
                        <div className="text-xs text-muted-foreground mt-2">
                          2nd floor, Sona Valliappa Block,
                          <br />
                          Junction Main Rd, Salem,
                          <br />
                          Tamil Nadu - 636005.
                        </div>
                      </div>
                    </a>

                    <a
                      href="https://maps.app.goo.gl/CcMGZQbRA8uFzjQP7"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors cursor-pointer group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-green-400 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                        <Building size={20} className="text-white" />
                      </div>
                      <div>
                        <div className="font-medium text-black transition-colors">
                          Registered Address
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          SENANITECH
                        </div>
                        <div className="text-xs text-muted-foreground mt-2">
                          212-6(3), Thirumalai Nagar, Narasothipatty,
                          <br />
                          Alagapuram, Salem,
                          <br />
                          Tamil Nadu - 636004.
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
