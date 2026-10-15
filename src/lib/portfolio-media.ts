export const email = "tranminhquan.acc@gmail.com";
export const cv = "/assets/tran-minh-quan-cv.pdf";
export const portrait = "/assets/tran-minh-quan.jpg";
export const heroPortrait = "/assets/tran-minh-quan-hero-studio.png";
export const socialLinks = [
  { label: "GitHub", href: "https://github.com/micharel09" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/qu%C3%A2n-tr%E1%BA%A7n-8b4249372/" },
  { label: "Facebook", href: "https://www.facebook.com/silentguy/" },
];
export const photosByProject = {
  "fcr-customer-request-system": [
    { src: "/assets/fpt-telecom-team-01.jpg", alt: "FPT Telecom team moment", width: 1200, height: 900 },
    { src: "/assets/fpt-telecom-team-02.jpg", alt: "FPT Telecom team at the office", width: 1200, height: 1600 },
    { src: "/assets/fpt-telecom-team-03.jpg", alt: "FPT Telecom team group photo", width: 1600, height: 1200 },
  ],
  "vds-ai-cctv-weighbridge": [{ src: "/assets/itd-team.jpg", alt: "ITD Solutions team working together", width: 1200, height: 1600 }],
  "eigakan-movie-sharing-platform": [{ src: "/assets/eigakan-team-enhanced.png", alt: "Eigakan graduation project team", width: 1086, height: 1448 }],
} as const;
export function projectPhotos(slug: string) { return photosByProject[slug as keyof typeof photosByProject]; }
