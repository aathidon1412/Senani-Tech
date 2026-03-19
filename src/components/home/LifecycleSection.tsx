import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { 
  Lightbulb, 
  PenTool, 
  Cpu, 
  TestTube, 
  Factory, 
  Rocket,
  ArrowRight 
} from "lucide-react";

const phases = [
  {
    icon: Lightbulb,
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
    icon: PenTool,
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
    icon: Cpu,
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
    icon: TestTube,
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
    icon: Factory,
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
    icon: Rocket,
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

  return (
    <section className="relative py-24 overflow-hidden">
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
          {/* Connection Line - Desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 -translate-y-1/2">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.5, delay: 0.5 }}
              className="w-full h-full bg-gradient-to-r from-primary via-accent to-highlight origin-left"
            />
          </div>

          {/* Phases Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-4">
            {phases.map((phase, index) => (
              <motion.div
                key={phase.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="relative group"
              >
                {/* Card */}
                <div className="relative p-6 rounded-2xl card transition-all duration-300 text-center h-full">
                  {/* Pulse effect */}
                  {/* <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                    className="absolute top-6 left-1/2 -translate-x-1/2 w-14 h-14 rounded-xl bg-highlight/20"
                  /> */}

                  {/* Icon */}
                  <div className={`relative w-14 h-14 mx-auto rounded-xl bg-gradient-to-br ${phase.color} p-[1px] mb-4`}>
                    <div className="w-full h-full rounded-xl bg-card flex items-center justify-center">
                      <phase.icon size={24} className="text-highlight" />
                    </div>
                  </div>

                  {/* Phase Number */}
                  <span className="text-xs text-muted-foreground mb-2 block">
                    Phase {index + 1}
                  </span>

                  {/* Title */}
                  <h3 className="font-display font-semibold text-foreground mb-2 group-hover:text-highlight transition-colors">
                    {phase.title}
                  </h3>

                  {/* Description (hidden on hover) */}
                  <p className="text-xs text-muted-foreground leading-relaxed group-hover:hidden">
                    {phase.description}
                  </p>

                  {/* Points list shown on hover/focus */}
                  {phase.points && (
                    <ul className="text-xs text-muted-foreground leading-relaxed hidden group-hover:block text-left mt-2 space-y-1">
                      {phase.points.map((p, i) => (
                        <li key={i} className="before:content-['•'] before:mr-2 before:text-highlight">
                          {p}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Arrow - Desktop */}
                {index < phases.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-4 -translate-y-1/2 z-10">
                    <ArrowRight size={16} className="text-highlight" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}