"use client";

import Image from "next/image";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { copy, projects, type Language } from "@/lib/portfolio-data";
import { cv, email, heroPortrait, portrait, projectPhotos } from "@/lib/portfolio-media";
import { gsap, ScrollTrigger } from "@/lib/motion";
import { SiteLink } from "./site-link";
import { useLanguage } from "./site-provider";
import { MenuDialog } from "./menu-dialog";
import { Arrow, Globe, MagneticButton, MagneticLink, RevealText, Socials } from "./site-elements";
import { NameTicker, useSiteScrollMotion } from "./site-scroll-motion";
import { ProjectCollection } from "./project-list";
import { About, Contact, ProjectDetail } from "./portfolio-pages";

type Page = "home" | "projects" | "project" | "about" | "contact";
const navItems = ["/", "/projects", "/about", "/contact"];

function LanguageSwitch() {
  const { language, setLanguage } = useLanguage();
  return <div className="language-switch" aria-label={language === "en" ? "Language" : "Ngôn ngữ"}>{(["en", "vi"] as const).map((lang) => <button key={lang} type="button" aria-pressed={language === lang} onClick={() => setLanguage(lang)}>{lang.toUpperCase()}</button>)}</div>;
}

function Header({ page }: { page: Page }) {
  const { language } = useLanguage();
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLDivElement>(null);
  const closeMenu = useCallback(() => setOpen(false), []);
  useLayoutEffect(() => {
    const context = gsap.context(() => {
      ScrollTrigger.create({ start: () => innerHeight * 0.3, end: "max", onToggle: (self) => toggle.current?.classList.toggle("is-visible", self.isActive) });
    });
    return () => context.revert();
  }, []);
  const activeIndex = page === "home" ? 0 : page === "about" ? 2 : page === "contact" ? 3 : 1;
  return <>
    <header className={`site-header ${page === "home" || page === "contact" ? "header-light" : ""}`}>
      <SiteLink href="/" className="brand" aria-label="Trần Minh Quân — Home"><span className="brand-copyright">©</span><span className="brand-label">{language === "en" ? "Code by" : "Code bởi"} <span className="brand-name">Trần Minh Quân</span></span></SiteLink>
      <nav className="site-nav" aria-label={language === "en" ? "Main navigation" : "Điều hướng chính"}>{navItems.slice(1).map((href, index) => <MagneticLink key={href} className="nav-link" strength={24} textStrength={12} href={href} aria-current={activeIndex === index + 1 ? "page" : undefined}>{copy.nav[language][index + 1]}</MagneticLink>)}</nav>
      <LanguageSwitch /><button type="button" className="mobile-menu" aria-expanded={open} aria-controls="site-navigation" onClick={() => setOpen(true)}><span />Menu</button>
    </header>
    <div ref={toggle} className="menu-toggle-position"><MagneticButton type="button" className="menu-toggle round-button dark-button" strength={50} textStrength={25} aria-label={language === "en" ? "Open menu" : "Mở menu"} aria-expanded={open} aria-controls="site-navigation" onClick={() => setOpen(true)}><span className="menu-bars"><span /><span /></span></MagneticButton></div>
    <MenuDialog open={open} onClose={closeMenu} label={language === "en" ? "Navigation menu" : "Menu điều hướng"} closeControl={<div className="menu-close-position"><MagneticButton type="button" className="menu-close round-button dark-button" strength={50} textStrength={25} onClick={() => setOpen((value) => !value)} data-open={open} aria-label={language === "en" ? open ? "Close menu" : "Open menu" : open ? "Đóng menu" : "Mở menu"}><span className="menu-bars"><span /><span /></span></MagneticButton></div>}>
      <p className="label">{language === "en" ? "Navigation" : "Điều hướng"}</p>
      <nav className="drawer-nav" inert={!open} aria-label={language === "en" ? "Menu navigation" : "Điều hướng menu"}>{navItems.map((href, index) => <SiteLink key={href} href={href} aria-current={activeIndex === index ? "page" : undefined} onNavigate={() => setOpen(false)}>{copy.nav[language][index]}</SiteLink>)}</nav>
      <div className="menu-bottom" inert={!open}><p className="label">Socials</p><Socials /><LanguageSwitch /></div>
    </MenuDialog>
  </>;
}

function Hero({ language }: { language: Language }) {
  return <section className="hero">
    <div className="hero-image-entry" data-once><div className="hero-image-parallax" data-parallax data-speed="-3" data-position="top"><Image className="hero-portrait" src={heroPortrait} alt="Trần Minh Quân" fill priority quality={90} sizes="(max-width: 720px) max(100vw, 206svh), max(100vw, 225svh)" /></div></div>
    <div className="hero-shade" />
    <div className="location-pill" data-once><span>{language === "en" ? <>Located in<br />Ho Chi Minh City</> : <>Sinh sống tại<br />TP. Hồ Chí Minh</>}</span><Globe /></div>
    <div className="hero-role" data-once><Arrow down /><p>Full-stack<br />Developer</p></div>
    <div className="hero-name-entry" data-once><div className="hero-name-parallax" data-parallax data-speed="4" data-position="top" data-direction="horizontal"><NameTicker /></div></div>
  </section>;
}

function Home({ language }: { language: Language }) {
  return <><Hero language={language} /><section className="home-intro medium-container section-space"><h2><RevealText>{copy.hero.title[language]}</RevealText></h2><div><p data-fade>{copy.hero.body[language]}</p><div className="intro-button-position"><div data-parallax data-speed="2"><MagneticLink href="/about" className="round-button dark-button">{language === "en" ? "About me" : "Về mình"}</MagneticLink></div></div></div></section><section className="work-section wide-container"><p className="label work-label">{language === "en" ? "Recent work" : "Dự án gần đây"}</p><ProjectCollection language={language} home /><div className="more-work"><MagneticLink href="/projects" className="pill-button" strength={25} textStrength={15}>{copy.action.allProjects[language]}<sup>{String(projects.length).padStart(2, "0")}</sup></MagneticLink></div></section></>;
}

function ProjectsIndex({ language }: { language: Language }) {
  return <><section className="page-heading medium-container"><h1 data-once>{copy.section.selected[language]}</h1></section><section className="wide-container work-section index-section"><ProjectCollection language={language} /></section></>;
}

function Footer({ language, page, slug }: { language: Language; page: Page; slug?: string }) {
  const [time, setTime] = useState("");
  useEffect(() => {
    const update = () => setTime(new Intl.DateTimeFormat(language === "en" ? "en-GB" : "vi-VN", { timeZone: "Asia/Ho_Chi_Minh", hour: "2-digit", minute: "2-digit" }).format(new Date()));
    update(); const interval = setInterval(update, 60000); return () => clearInterval(interval);
  }, [language]);
  const compact = page === "contact";
  const next = page === "project" ? projects[(projects.findIndex((project) => project.slug === slug) + 1) % projects.length] : null;
  return <div className={`footer-wrap ${compact ? "compact-footer" : ""} ${next ? "case-footer" : ""}`}>
    {!compact && <div className="footer-round" aria-hidden="true"><div /></div>}
    <footer className="site-footer" data-parallax={!compact || undefined} data-speed="-4" data-position="bottom">
      {!compact && (next ? <div className="next-case wide-container"><p className="label">{language === "en" ? "Next case" : "Dự án tiếp theo"}</p><SiteLink className="next-case-link" href={`/projects/${next.slug}`}><h2>{next.title}</h2><div className="next-case-preview"><div><Image src={projectPhotos(next.slug)[0].src} alt={next.organization} fill unoptimized sizes="(max-width: 540px) 70vw, 400px" /></div></div></SiteLink><div className="next-case-actions"><MagneticLink className="pill-button" href="/projects" strength={25} textStrength={15}>{copy.action.allProjects[language]}<sup>{projects.length}</sup></MagneticLink></div></div> : <div className="footer-contact medium-container"><div className="footer-title"><h2><Image src={portrait} alt="" width={90} height={90} />{copy.section.contact[language]}</h2><Arrow down /></div><div className="footer-rule"><div className="footer-button-position"><div data-parallax data-speed="-1" data-position="bottom" data-direction="horizontal"><MagneticLink href="/contact" className="round-button blue-button">{language === "en" ? "Get in touch" : "Liên hệ"}</MagneticLink></div></div></div><div className="footer-actions"><MagneticLink className="pill-button" href={`mailto:${email}`} strength={25} textStrength={15}>{email}</MagneticLink><MagneticLink className="pill-button" href={cv} download strength={25} textStrength={15}>{copy.action.cv[language]} ↓</MagneticLink></div></div>)}
      <div className="footer-bottom"><div><p className="label">{language === "en" ? "Version" : "Phiên bản"}</p><p>{new Date().getFullYear()} © Trần Minh Quân</p></div><div><p className="label">{language === "en" ? "Local time" : "Giờ địa phương"}</p><p>{time || "—"} GMT+7</p></div><div className="footer-social"><p className="label">Socials</p><Socials /></div></div>
    </footer>
  </div>;
}

export function PortfolioSite({ page, slug }: { page: Page; slug?: string }) {
  const { language } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  useSiteScrollMotion(ref, language);
  return <div ref={ref} className={`portfolio-shell ${page === "contact" ? "contact-theme" : ""}`}><a className="skip-link" href="#main-content">{language === "en" ? "Skip to content" : "Đến nội dung"}</a><Header page={page} /><main id="main-content" tabIndex={-1}>{page === "home" ? <Home language={language} /> : page === "projects" ? <ProjectsIndex language={language} /> : page === "project" ? <ProjectDetail language={language} slug={slug} /> : page === "about" ? <About language={language} /> : <Contact language={language} />}</main><Footer language={language} page={page} slug={slug} /></div>;
}
