import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";

import conceptImg   from "@/assets/lifecycle/concept.png";
import designImg    from "@/assets/lifecycle/design.png";
import prototypeImg from "@/assets/lifecycle/prototype.png";
import validationImg from "@/assets/lifecycle/validation.png";
import productionImg from "@/assets/lifecycle/production.png";
import launchImg    from "@/assets/lifecycle/launch.png";

const phases = [
  {
    image: conceptImg,
    title: "Concept",
    description: "Initial ideation and requirements analysis",
    color: "from-primary to-primary/70",
    points: [
      "Concept",
      "Concept Validation",
      "Product Specification Development",
      "System Architecture",
    ],
  },
  {
    image: designImg,
    title: "Design",
    description: "Schematic, layout, and simulation",
    color: "from-primary/70 to-accent",
    points: [
      "Hardware Design & Firmware Development",
      "HW High & Low Level Design",
      "Component Engineering",
      "Board Bring-Up",
    ],
  },
  {
    image: prototypeImg,
    title: "Prototype",
    description: "Rapid prototyping and iteration",
    color: "from-accent to-accent/70",
    points: [
      "PCB Design",
      "PCB Layout Design",
      "Signal / Power / Thermal Integrity Analysis",
      "High-Speed Design (HDI and ATI Boards)",
    ],
  },
  {
    image: validationImg,
    title: "Validation",
    description: "Testing and verification",
    color: "from-accent/70 to-highlight",
    points: [
      "Mechanical Design and Development",
      "Enclosure Design",
      "Mechanical / Industrial Design",
      "Enclosure Fabrication",
      "Mass Fabrication for SS, MS",
    ],
  },
  {
    image: productionImg,
    title: "Production",
    description: "Manufacturing and quality control",
    color: "from-highlight to-highlight/70",
    points: [
      "Electronics and Manufacturing Service",
      "Printed Circuit Board Manufacturing",
      "Printed Circuit Board Assembly",
    ],
  },
  {
    image: launchImg,
    title: "Launch",
    description: "Market-ready deployment",
    color: "from-highlight/70 to-primary",
    points: [
      "Box Building / Regulatory Compliance",
      "Power ON Testing",
      "Box Building",
      "Cable Harness",
      "EMI/EMC Consulting",
    ],
  },
];

export function LifecycleSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="relative py-24">
      {/* Background */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background: `
            radial-gradient(ellipse at 0% 50%, rgba(0,219,135,0.04) 0%, transparent 50%),
            radial-gradient(ellipse at 100% 50%, rgba(0,219,135,0.03) 0%, transparent 50%)
          `,
        }}
      />

      <div className="container mx-auto px-4 relative" ref={containerRef}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full card text-sm text-muted-foreground mb-4">
            Our Process
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Product Development{" "}
            <span className="gradient-text-bright">Lifecycle</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A proven methodology that takes your product from initial concept
            to market-ready solution
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">

          {/* Phases Grid */}
          {/* Outer wrapper: fixed height holds layout space. Inner card: absolute, expands freely on hover. */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-4 pb-32">
            {phases.map((phase, index) => {
              const isHovered = hoveredIndex === index;
              return (
                /* ── OUTER WRAPPER ──────────────────────────────────────────────
                   Fixed height = collapsed card height.
                   Stays in document flow → arrows & siblings never shift.     */
                <motion.div
                  key={phase.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="relative"
                  style={{ height: "208px" }}       /* fixed collapsed height */
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* ── INNER CARD ────────────────────────────────────────────────
                      position:absolute so it can grow beyond the wrapper's fixed
                      height without pushing anything in the grid.               */}
                  <motion.div
                    className="absolute inset-x-0 top-0 rounded-2xl card text-center overflow-hidden cursor-default"
                    animate={{
                      scale: isHovered ? 1.05 : 1,
                      boxShadow: isHovered
                        ? "0 24px 48px -8px rgba(0,0,0,0.35)"
                        : "0 0px 0px 0px rgba(0,0,0,0)",
                      zIndex: isHovered ? 30 : 1,
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    style={{
                      transformOrigin: "top center",
                      height: isHovered ? "auto" : "100%",      /* uniform when collapsed, free when hovered */
                    }}
                  >
                    <div className="p-6">
                      {/* Image */}
                      <div className="w-16 h-16 mx-auto mb-4 rounded-xl overflow-hidden">
                        <img
                          src={phase.image}
                          alt={phase.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Phase Number */}
                      <span className="text-xs text-muted-foreground mb-2 block">
                        Phase {index + 1}
                      </span>

                      {/* Title */}
                      <h3 className={`font-display font-semibold mb-2 transition-colors ${
                        isHovered ? "text-highlight" : "text-foreground"
                      }`}>
                        {phase.title}
                      </h3>

                      {/* Description — visible when not hovered */}
                      <p className={`text-xs text-muted-foreground leading-relaxed transition-all duration-200 ${
                        isHovered ? "opacity-0 h-0 overflow-hidden mb-0" : "opacity-100"
                      }`}>
                        {phase.description}
                      </p>

                      {/* Bullet points — visible when hovered */}
                      <motion.ul
                        initial={false}
                        animate={isHovered ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="text-xs text-muted-foreground text-left space-y-1.5 overflow-hidden"
                      >
                        <div className="pt-1">
                          {phase.points.map((p, i) => (
                            <li key={i} className="before:content-['•'] before:mr-2 before:text-highlight list-none">
                              {p}
                            </li>
                          ))}
                        </div>
                      </motion.ul>
                    </div>
                  </motion.div>

                  {/* Arrow — Desktop (lives in the outer wrapper, always in flow) */}
                  {index < phases.length - 1 && (
                    <div className="hidden lg:flex absolute top-1/2 -right-4 -translate-y-1/2 z-10">
                      <ArrowRight size={16} className="text-highlight" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}