import type { Language } from "@/lib/portfolio-data";

export const email = "tranminhquan.acc@gmail.com";
export const cv = "/assets/tran-minh-quan-cv.pdf";
export const portrait = "/assets/tran-minh-quan.jpg";
export const aboutPortrait = "/assets/tran-minh-quan-about.jpg";
export const heroPortrait = "/assets/tran-minh-quan-hero-studio.png";
export const socialLinks = [
  { label: "GitHub", href: "https://github.com/micharel09" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/qu%C3%A2n-tr%E1%BA%A7n-8b4249372/" },
  { label: "Facebook", href: "https://www.facebook.com/silentguy/" },
];
export type ProjectPhoto = { src: string; alt: Record<Language, string>; width: number; height: number; quality?: number };
export const photosByProject = {
  "fly-talent-dj": [{ src: "/assets/fly-talent-dj.webp", alt: { en: "Fly Talent DJ marketplace", vi: "Nền tảng kết nối và đặt lịch DJ Fly Talent DJ" }, width: 1440, height: 1000, quality: 90 }],
  "fly-jobs": [{ src: "/assets/fly-jobs-home.webp", alt: { en: "Fly Jobs recruitment platform", vi: "Nền tảng tuyển dụng Fly Jobs" }, width: 1440, height: 1000, quality: 90 }],
  "fly-labour": [{ src: "/assets/fly-labour.webp", alt: { en: "Fly Labour recruitment and education platform", vi: "Nền tảng tuyển dụng và giáo dục Fly Labour" }, width: 1440, height: 1000, quality: 90 }],
  "fcr-customer-request-system": [
    { src: "/assets/fpt-telecom-team-01.jpg", alt: { en: "FPT Telecom team moment", vi: "Khoảnh khắc cùng đội ngũ FPT Telecom" }, width: 1200, height: 900 },
    { src: "/assets/fpt-telecom-team-02.jpg", alt: { en: "FPT Telecom team at the office", vi: "Đội ngũ FPT Telecom tại văn phòng" }, width: 1200, height: 1600 },
    { src: "/assets/fpt-telecom-team-03.jpg", alt: { en: "FPT Telecom team group photo", vi: "Ảnh tập thể đội ngũ FPT Telecom" }, width: 1600, height: 1200 },
  ],
  "vds-ai-cctv-weighbridge": [{ src: "/assets/itd-team.jpg", alt: { en: "ITD Solutions team working together", vi: "Đội ngũ ITD Solutions làm việc cùng nhau" }, width: 1200, height: 1600 }],
  "eigakan-movie-sharing-platform": [{ src: "/assets/eigakan-team-sharpened.png", alt: { en: "Eigakan graduation project team", vi: "Nhóm thực hiện đồ án tốt nghiệp Eigakan" }, width: 1920, height: 2560, quality: 90 }],
} as const;
export function projectPhotos(slug: string): readonly ProjectPhoto[] { return photosByProject[slug as keyof typeof photosByProject]; }
