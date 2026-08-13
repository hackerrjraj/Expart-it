import { Bot, Code2, FileText, Megaphone, Palette, Shirt } from "lucide-react";
import { skillsData } from "./skillsData";

const FEATURES = {
  "web-development": [
    "Custom Web Applications",
    "Laravel & React Development",
    "API Integration",
    "Performance Optimization",
  ],
  "3d-garments": [
    "3D Garment Visualization",
    "Virtual Fitting & Draping",
    "Fabric & Texture Simulation",
    "Rapid Sample Iteration",
  ],
  "tech-pack-design": [
    "Detailed Measurement Specs",
    "Bill of Materials (BOM)",
    "Construction Notes",
    "Grading & Size Charts",
  ],
  "digital-marketing": [
    "SEO & Content Strategy",
    "Paid Social Campaigns",
    "Analytics & Reporting",
    "Brand Growth Strategy",
  ],
  "graphics-design": [
    "Brand Identity Design",
    "Marketing Collateral",
    "Packaging Design",
    "Print & Digital Assets",
  ],
  "ai-automation": [
    "Custom AI Agents",
    "Workflow Automation",
    "Chatbot Integration",
    "Third-Party API Automation",
  ],
};

const ICONS = {
  "web-development": Code2,
  "3d-garments": Shirt,
  "tech-pack-design": FileText,
  "digital-marketing": Megaphone,
  "graphics-design": Palette,
  "ai-automation": Bot,
};

export const servicesData = skillsData.map((skill) => ({
  id: skill.id,
  title: skill.title,
  subtitle: skill.subtitle,
  description: skill.description,
  image: skill.image,
  icon: ICONS[skill.id],
  features: FEATURES[skill.id],
}));
