"use client";

import Image from "next/image";
import { capabilities, certifications, copy, experience, projects, skillGroups, type Language } from "@/lib/portfolio-data";
import { cv, email, portrait, projectPhotos, socialLinks } from "@/lib/portfolio-media";
import { Arrow, Globe, MagneticLink, RevealText, Socials } from "./site-elements";
import { SiteLink } from "./site-link";
import { ProjectGallery } from "./project-gallery";

export function About({ language }: { language: Language }) {
  return <div className="about-page">
    <section className="page-heading"><div className="medium-container"><h1 data-once>{copy.section.about[language]}</h1></div></section>
    <div className="about-rule medium-container" data-once><span className="about-globe-ball" aria-hidden="true"><Globe /></span></div>
    <section className="about-image-section">
      <div className="about-image-band" aria-hidden="true" />
      <div className="about-image-row wide-container">
        <div className="about-image-copy" data-once><Arrow down /><p>{copy.about.body[language]}</p><MagneticLink href={cv} download className="pill-button" strength={25} textStrength={15}>{copy.action.cv[language]}</MagneticLink></div>
        <div className="about-image-column" data-once><div className="about-portrait-frame"><div className="about-portrait-parallax" data-parallax data-speed="-2" data-position="top"><Image src={portrait} alt="Trần Minh Quân" fill priority sizes="(max-width: 840px) 90vw, 55vw" /></div></div></div>
      </div>
    </section>
    <section className="about-services-section section-space"><div className="wide-container">
      <h2><RevealText>{language === "en" ? "I can help you with…" : "Mình có thể giúp bạn với…"}</RevealText></h2>
      <div className="about-services-grid">{capabilities.map((item) => <article key={item.number}><span className="about-service-number">{item.number}</span><div className="about-service-stripe" /><h3>{item.title[language]}</h3><p>{item.body[language]}</p></article>)}</div>
    </div></section>
    <section className="about-experience-section section-space"><div className="wide-container about-content-split">
      <h2><RevealText>{copy.section.experience[language]}</RevealText></h2>
      <div className="about-experience-list">{experience.map((item) => <article key={item.company}><p className="about-small-label">{item.period}</p><h3>{item.title[language]}</h3><p>{item.company}</p></article>)}</div>
    </div></section>
    <section className="about-learning-section section-space"><div className="wide-container about-content-split">
      <h2><RevealText>{copy.labels.technology[language]}</RevealText></h2>
      <div><div className="about-skills-grid">{skillGroups.map((group) => <article key={group.label.en}><h3>{group.label[language]}</h3><p>{group.items.join(" · ")}</p></article>)}</div>
        <div className="about-certifications"><h3>{language === "en" ? "Certifications" : "Chứng chỉ"}</h3>{certifications.map((item) => <article key={item.name}><p>{item.name}</p><span className="about-small-label">{item.date}</span></article>)}</div>
      </div>
    </div></section>
  </div>;
}

export function Contact({ language }: { language: Language }) {
  const contacts = [
    { label: copy.labels.email[language], value: email, href: `mailto:${email}` },
    { label: "GitHub", value: "github.com/micharel09", href: socialLinks[0].href },
    { label: "LinkedIn", value: "linkedin.com/in/quân-trần", href: socialLinks[1].href },
    { label: "Facebook", value: "facebook.com/silentguy", href: socialLinks[2].href },
    { label: language === "en" ? "Curriculum vitae" : "Hồ sơ năng lực", value: copy.action.cv[language], href: cv, download: true },
  ];
  return <section className="contact-page"><div className="medium-container">
    <div className="contact-heading-row">
      <h1 data-once><span className="contact-inline-portrait"><Image src={portrait} alt="Trần Minh Quân" fill sizes="64px" /></span>{copy.section.contact[language]}</h1>
      <div className="contact-heading-aside" data-once><div className="contact-portrait"><Image src={portrait} alt="Trần Minh Quân" fill priority sizes="120px" /></div><Arrow down /></div>
    </div>
    <div className="contact-content-row">
      <div className="contact-primary" data-once>
        <div className="contact-action-list">{contacts.map((item, index) => <a key={item.label} href={item.href} download={item.download} target={item.href.startsWith("https:") ? "_blank" : undefined} rel={item.href.startsWith("https:") ? "noreferrer" : undefined}><span className="contact-action-number">0{index + 1}</span><span className="contact-action-content"><span className="contact-action-label">{item.label}</span><span className="contact-action-value">{item.value}</span></span><Arrow /></a>)}</div>
      </div>
      <aside className="contact-details" data-once><div><h2>{language === "en" ? "Contact details" : "Thông tin liên hệ"}</h2><a href={`mailto:${email}`}>{email}</a><a href={cv} download>{copy.action.cv[language]}</a></div><div><h2>{language === "en" ? "Details" : "Thông tin"}</h2><p>Trần Minh Quân</p><p>Full-stack Developer</p><p>{language === "en" ? "Ho Chi Minh City, Vietnam" : "TP. Hồ Chí Minh, Việt Nam"}</p></div><div className="contact-aside-socials"><h2>Socials</h2><Socials /></div></aside>
    </div>
  </div></section>;
}

export function ProjectDetail({ language, slug }: { language: Language; slug?: string }) {
  const project = projects.find((item) => item.slug === slug);
  if (!project) return null;
  const photos = projectPhotos(project.slug);
  const cover = photos[0];
  return <article className={`case-page case-page-${project.tone}`}>
    <section className="case-heading"><div className="medium-container"><SiteLink href="/projects" className="case-back-link" data-once>← {copy.action.caseStudies[language]}</SiteLink><h1 data-once>{project.title}</h1></div></section>
    <section className="case-metadata"><div className="medium-container case-metadata-grid" data-once><div><h2>{language === "en" ? "Organization" : "Đơn vị"}</h2><p>{project.organization}</p></div><div><h2>{copy.labels.role[language]}</h2><p>{project.category[language]}</p></div><div><h2>{language === "en" ? "Year" : "Năm"}</h2><p>{project.year}</p></div></div></section>
    <section className="case-cover-section"><div className="wide-container" data-once><div className="case-cover-frame"><div className="case-cover-parallax" data-parallax data-speed="-1"><Image src={cover.src} alt={cover.alt} quality={cover.quality} fill priority sizes="(max-width: 720px) 100vw, 90vw" /></div></div></div></section>
    <section className="case-story section-space"><div className="medium-container"><h2><RevealText>{project.summary[language]}</RevealText></h2><div className="case-story-columns"><div><h3>{copy.labels.brief[language]}</h3><p>{project.brief[language]}</p><h3>{copy.labels.contribution[language]}</h3><ul>{project.contribution.map((item) => <li key={item.en}>{item[language]}</li>)}</ul></div><div><h3>{copy.labels.technology[language]}</h3><ul className="case-stack">{project.stack.map((item) => <li key={item}>{item}</li>)}</ul></div></div></div></section>
    <section className="case-gallery-section section-space"><div className="wide-container"><h2>{language === "en" ? "Project photos" : "Ảnh dự án"}</h2><ProjectGallery photos={photos} language={language} /></div></section>
  </article>;
}
