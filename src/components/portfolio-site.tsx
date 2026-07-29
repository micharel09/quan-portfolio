"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FaDatabase, FaTowerBroadcast } from "react-icons/fa6";
import { DiDotnet, DiMsqlServer, DiRedis } from "react-icons/di";
import { SiDocker, SiGithub, SiGitlab, SiMongodb, SiNextdotjs, SiReact, SiTailwindcss, SiTypescript } from "react-icons/si";
import { capabilities, certifications, copy, experience, type Language, projects, skillGroups } from "@/lib/portfolio-data";

type Page = "home" | "projects" | "project" | "about" | "contact";

const navItems = [
  { href: "/", key: "home" },
  { href: "/projects", key: "projects" },
  { href: "/about", key: "about" },
  { href: "/contact", key: "contact" },
] as const;

const organizations = [
  { name: "FPT Telecom", logo: "/assets/fpt-telecom.jpg" },
  { name: "ITD Solutions", logo: "/assets/itd-solutions.jpg" },
  { name: "FPT Software", logo: "/assets/fpt-software.jpg" },
];

function text(value: Record<Language, string>, language: Language) {
  return value[language];
}

function Arrow() {
  return <span aria-hidden="true" className="arrow">↗</span>;
}

function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ delay, duration: 0.65, ease: [0.2, 0.75, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

function TechIcon({ name, large = false }: { name: string; large?: boolean }) {
  const className = large ? "tech-logo tech-logo-large" : "tech-logo";
  if (name.includes("ASP.NET") || name === "C#") return <DiDotnet className={className} style={{ color: "#a78bfa" }} />;
  if (name === "SignalR") return <FaTowerBroadcast className={className} style={{ color: "#60a5fa" }} />;
  if (name === "React") return <SiReact className={className} style={{ color: "#61dafb" }} />;
  if (name === "TypeScript") return <SiTypescript className={className} style={{ color: "#3178c6" }} />;
  if (name === "Next.js") return <SiNextdotjs className={className} />;
  if (name === "Tailwind CSS") return <SiTailwindcss className={className} style={{ color: "#38bdf8" }} />;
  if (name === "SQL Server") return <DiMsqlServer className={className} style={{ color: "#ef4444" }} />;
  if (name === "MongoDB") return <SiMongodb className={className} style={{ color: "#47a248" }} />;
  if (name === "Redis") return <DiRedis className={className} style={{ color: "#ff4438" }} />;
  if (name === "GitHub") return <SiGithub className={className} />;
  if (name === "GitLab") return <SiGitlab className={className} style={{ color: "#fc6d26" }} />;
  if (name === "Docker") return <SiDocker className={className} style={{ color: "#2496ed" }} />;
  return <FaDatabase className={className} style={{ color: "#f97316" }} />;
}

function Header({ page, language, setLanguage }: { page: Page; language: Language; setLanguage: (language: Language) => void }) {
  return <header className="site-header">
    <Link href="/" className="brand"><span className="brand-mark">TMQ</span><span><strong>Tran Minh Quan</strong><small>Full-stack developer</small></span></Link>
    <nav className="site-nav">{navItems.map((item, index) => <Link key={item.key} href={item.href} className={page === item.key ? "active" : ""}><i>0{index + 1}</i>{copy.nav[language][index]}</Link>)}</nav>
    <div className="language-switch"><button className={language === "en" ? "active" : ""} onClick={() => setLanguage("en")}>EN</button><span>/</span><button className={language === "vi" ? "active" : ""} onClick={() => setLanguage("vi")}>VI</button></div>
  </header>;
}

function Hero({ language }: { language: Language }) {
  return <section className="hero section-grid">
    <Reveal className="hero-copy">
      <p className="eyebrow">01 / {language === "en" ? "Available for work" : "Sẵn sàng cho cơ hội mới"}</p>
      <h1>{text(copy.hero.title, language)}</h1>
      <p className="hero-body">{text(copy.hero.body, language)}</p>
      <div className="hero-actions"><Link className="button button-primary" href="/projects">{text(copy.action.work, language)} <Arrow /></Link><a className="button button-secondary" href="/assets/tran-minh-quan-cv.pdf" download>{text(copy.action.cv, language)} ↓</a></div>
    </Reveal>
    <motion.div className="portrait-frame" initial={{ x: 44, rotate: 2 }} animate={{ x: 0, rotate: 0 }} transition={{ type: "spring", stiffness: 88, damping: 18, delay: 0.15 }} whileHover={{ y: -8, rotate: -1 }}>
      <div className="frame-top"><span>full-stack / 2026</span><span>tmq.log</span></div>
      <div className="portrait-lines">C# / .NET<br />React / TypeScript<br />SQL / Redis<br />SignalR / APIs</div>
      <Image src="/assets/tran-minh-quan.jpg" alt="Tran Minh Quan" fill priority unoptimized sizes="(max-width: 800px) 80vw, 40vw" className="portrait" />
      <div className="company-badges" aria-label="Companies">
        {organizations.map((organization) => <Image key={organization.name} src={organization.logo} alt={organization.name} width={42} height={42} unoptimized className="company-logo" />)}
      </div>
    </motion.div>
    <motion.div className="tech-rail" initial="hidden" whileInView="show" viewport={{ once: true }} variants={{ hidden: {}, show: { transition: { delayChildren: 0.2, staggerChildren: 0.08 } } }}>
      {organizations.map((organization, index) => <motion.div key={organization.name} variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }} transition={{ type: "spring", stiffness: 170, damping: 18 }} whileHover={{ y: -6, backgroundColor: "#1a1d18" }}><span>0{index + 1}</span><Image src={organization.logo} alt={organization.name} width={42} height={42} className="company-logo" /><strong>{organization.name}</strong></motion.div>)}
      <motion.div variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }} transition={{ type: "spring", stiffness: 170, damping: 18 }} whileHover={{ y: -6, backgroundColor: "#1a1d18" }}><span>00</span><strong>{language === "en" ? "Open to collaborate" : "Sẵn sàng hợp tác"}</strong></motion.div>
    </motion.div>
  </section>;
}

function TechSystem({ language }: { language: Language }) {
  const groups = [
    ["Backend", ["ASP.NET Core", "C#", "SignalR"]],
    ["Frontend", ["React", "TypeScript", "Next.js", "Tailwind CSS"]],
    [language === "en" ? "Data" : "Dữ liệu", ["SQL Server", "MongoDB", "Redis"]],
    [language === "en" ? "Workflow" : "Quy trình", ["GitHub", "GitLab"]],
  ];
  return <section className="tech-system section-grid">
    <Reveal className="tech-system-intro"><p className="eyebrow">04 / {language === "en" ? "Stack" : "Công nghệ"}</p><h2>{language === "en" ? "The tools behind the work." : "Công nghệ đứng sau sản phẩm."}</h2><p>{language === "en" ? "A practical stack for APIs, interfaces, data, and real-time workflows." : "Stack thực dụng cho API, giao diện, dữ liệu và luồng real-time."}</p></Reveal>
    <div className="tech-system-rows">{groups.map(([label, items], groupIndex) => <Reveal key={label as string} delay={groupIndex * 0.08}><article><p>0{groupIndex + 1} / {label}</p><div>{(items as string[]).map((item, index) => <motion.span key={item} initial={{ opacity: 0, scale: 0.78 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.06, type: "spring", stiffness: 220, damping: 17 }} whileHover={{ y: -10, scale: 1.05, rotate: index % 2 ? -2 : 2 }}><TechIcon name={item} large /><strong>{item}</strong></motion.span>)}</div></article></Reveal>)}</div>
  </section>;
}

function ProjectMedia({ tone }: { tone: "fcr" | "itd" | "eigakan" }) {
  return <div className={`project-media ${tone}`} aria-hidden="true"><span /><span /><span /></div>;
}

function ProjectRows({ language, limit }: { language: Language; limit?: number }) {
  return <div className="project-rows">{(limit ? projects.slice(0, limit) : projects).map((project) => <Link key={project.slug} href={`/projects/${project.slug}`} className="project-row" data-reveal><span className="project-number">{project.number}</span><div className="project-summary"><p className="eyebrow">{project.organization} · {text(project.category, language)} · {project.year}</p><h3>{project.title}</h3><p>{text(project.summary, language)}</p><ul>{project.stack.slice(0, 4).map((item) => <li key={item}><TechIcon name={item} />{item}</li>)}</ul></div><ProjectMedia tone={project.tone} /><Arrow /></Link>)}</div>;
}

function Home({ language }: { language: Language }) {
  return <><Hero language={language} /><TechSystem language={language} /><section className="capabilities section-grid"><div className="section-title" data-reveal><p className="eyebrow">01 / {language === "en" ? "What I work on" : "Mình làm gì"}</p><h2>{language === "en" ? "Practical engineering, end to end." : "Làm sản phẩm thực tế, từ đầu đến cuối."}</h2></div><div className="capability-list">{capabilities.map((item) => <article key={item.number} data-reveal><span>{item.number}</span><h3>{text(item.title, language)}</h3><p>{text(item.body, language)}</p></article>)}</div></section><section className="content-section section-grid"><div className="section-title"><p className="eyebrow">02 / {language === "en" ? "Projects" : "Dự án"}</p><h2>{text(copy.section.selected, language)}</h2></div><ProjectRows language={language} limit={3} /><Link className="text-link" href="/projects">{text(copy.action.allProjects, language)} <Arrow /></Link></section><section className="experience-preview section-grid"><div><p className="eyebrow">03 / {text(copy.section.experience, language)}</p><h2>{language === "en" ? "Hands-on, team-built." : "Thực tế, đồng hành cùng team."}</h2></div><div className="experience-list">{experience.map((item) => <div key={item.company}><span>{item.period}</span><strong>{text(item.title, language)}</strong><p>{item.company}</p></div>)}</div></section></>;
}

function ProjectsIndex({ language }: { language: Language }) {
  return <section className="content-section section-grid project-index"><div className="section-title"><p className="eyebrow">01 / {language === "en" ? "Projects" : "Dự án"}</p><h1>{text(copy.section.selected, language)}</h1><p>{language === "en" ? "Three projects that reflect how I contribute across product, backend, and real-time workflows." : "Ba dự án thể hiện cách mình đóng góp từ sản phẩm, backend đến luồng real-time."}</p></div><ProjectRows language={language} /></section>;
}

function ProjectDetail({ language, slug }: { language: Language; slug?: string }) {
  const project = projects.find((item) => item.slug === slug) ?? projects[0];
  return <section className="project-detail"><div className="detail-hero section-grid"><div><Link className="back-link" href="/projects">← {text(copy.action.caseStudies, language)}</Link><p className="eyebrow">{project.organization} / Case study {project.number}</p><h1>{project.title}</h1><p>{text(project.summary, language)}</p><div className="role-line"><span>{text(copy.labels.role, language)}</span><strong>{project.organization} · {text(project.category, language)}</strong></div></div><ProjectMedia tone={project.tone} /></div><div className="detail-body section-grid"><article><p className="eyebrow">{text(copy.labels.brief, language)}</p><p className="detail-lead">{text(project.brief, language)}</p><p className="eyebrow contribution-label">{text(copy.labels.contribution, language)}</p><ul className="contribution-list">{project.contribution.map((item) => <li key={item.en}>{text(item, language)}</li>)}</ul></article><aside><p className="eyebrow">{text(copy.labels.technology, language)}</p><ul className="technology-list">{project.stack.map((item, index) => <li key={item}><span>0{index + 1}</span><TechIcon name={item} />{item}</li>)}</ul></aside></div></section>;
}

function About({ language }: { language: Language }) {
  return <><section className="about-intro section-grid"><div><p className="eyebrow">02 / {language === "en" ? "About" : "Giới thiệu"}</p><h1>{text(copy.section.about, language)}</h1><p className="detail-lead">{text(copy.about.body, language)}</p></div><div className="about-portrait"><Image src="/assets/tran-minh-quan.jpg" alt="Tran Minh Quan" fill sizes="(max-width: 800px) 80vw, 36vw" /></div></section><section className="timeline section-grid"><div><p className="eyebrow">03 / {text(copy.section.experience, language)}</p></div><div>{experience.map((item) => <article key={item.company}><span>{item.period}</span><h2>{text(item.title, language)}</h2><p>{item.company}</p></article>)}</div></section><section className="about-facts section-grid"><div><p className="eyebrow">04 / {language === "en" ? "Stack & learning" : "Công nghệ & học tập"}</p><h2>{language === "en" ? "Tools I use with purpose." : "Công cụ mình dùng có mục đích."}</h2></div><div className="facts-content"><div className="skill-groups">{skillGroups.map((group) => <article key={group.label.en}><h3>{text(group.label, language)}</h3><p>{group.items.join(" · ")}</p></article>)}</div><div className="certifications"><p className="eyebrow">{language === "en" ? "Certifications" : "Chứng chỉ"}</p>{certifications.map((item) => <div key={item.name}><strong>{item.name}</strong><span>{item.date}</span></div>)}</div></div></section></>;
}

function Contact({ language }: { language: Language }) {
  const contacts = [{ label: text(copy.labels.email, language), value: "tranminhquan.acc@gmail.com", href: "mailto:tranminhquan.acc@gmail.com" }, { label: text(copy.labels.github, language), value: "github.com/micharel09", href: "https://github.com/micharel09" }, { label: "Facebook", value: "facebook.com/silentguy", href: "https://www.facebook.com/silentguy/" }, { label: language === "en" ? "Curriculum vitae" : "Hồ sơ năng lực", value: text(copy.action.cv, language), href: "/assets/tran-minh-quan-cv.pdf", download: true }];
  return <section className="contact-section section-grid"><div><p className="eyebrow">04 / {language === "en" ? "Contact" : "Liên hệ"}</p><h1>{text(copy.section.contact, language)}</h1><p>{language === "en" ? "I’m open to full-stack engineering opportunities and practical product collaboration." : "Mình sẵn sàng cho cơ hội full-stack engineering và hợp tác làm sản phẩm thực tế."}</p></div><div className="contact-links">{contacts.map((contact) => <a key={contact.label} href={contact.href} target={contact.download ? undefined : "_blank"} rel={contact.download ? undefined : "noreferrer"} download={contact.download}><span>{contact.label}</span><strong>{contact.value}</strong><Arrow /></a>)}</div></section>;
}

export function PortfolioSite({ page, slug }: { page: Page; slug?: string }) {
  const [language, setLanguage] = useState<Language>("en");
  useEffect(() => { const elements = document.querySelectorAll<HTMLElement>("[data-reveal]"); const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); } }), { threshold: 0.12 }); elements.forEach((element) => observer.observe(element)); return () => observer.disconnect(); }, [page, slug]);
  const content = page === "home" ? <Home language={language} /> : page === "projects" ? <ProjectsIndex language={language} /> : page === "project" ? <ProjectDetail language={language} slug={slug} /> : page === "about" ? <About language={language} /> : <Contact language={language} />;
  return <main className="portfolio-shell"><Header page={page} language={language} setLanguage={setLanguage} />{content}{page !== "contact" && <Contact language={language} />}<footer className="site-footer"><span>© {new Date().getFullYear()} Tran Minh Quan</span><span>{language === "en" ? "Built with care in Ho Chi Minh City." : "Được xây chỉn chu tại TP. Hồ Chí Minh."}</span></footer></main>;
}
