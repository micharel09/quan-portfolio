export type Language = "en" | "vi";

type Copy = Record<Language, string>;

export type Project = {
  slug: string;
  number: string;
  title: string;
  category: Copy;
  organization: string;
  summary: Copy;
  brief: Copy;
  contribution: Copy[];
  stack: string[];
  year: string;
  tone: "fcr" | "itd" | "eigakan";
};

export const projects: Project[] = [
  {
    slug: "fcr-customer-request-system",
    number: "01",
    title: "FCR — FTI Customer Request System",
    category: { en: "Internal request management", vi: "Hệ thống quản lý yêu cầu nội bộ" },
    organization: "FPT Telecom",
    summary: {
      en: "A customer-request workflow system built during my FPT Telecom internship.",
      vi: "Hệ thống xử lý quy trình yêu cầu khách hàng, phát triển trong kỳ thực tập tại FPT Telecom.",
    },
    brief: {
      en: "The product needed reliable API workflows, clear validation, and a responsive interface for daily operational use.",
      vi: "Sản phẩm cần luồng API ổn định, kiểm tra dữ liệu rõ ràng và giao diện đáp ứng cho vận hành hằng ngày.",
    },
    contribution: [
      { en: "Contributed ASP.NET Core APIs for request lifecycles and business processing.", vi: "Tham gia phát triển API ASP.NET Core cho vòng đời yêu cầu và xử lý nghiệp vụ." },
      { en: "Built React and TypeScript features with Tailwind CSS, Ant Design, and Redux Toolkit.", vi: "Xây dựng chức năng React, TypeScript cùng Tailwind CSS, Ant Design và Redux Toolkit." },
      { en: "Worked with Oracle SQL and Redis to support data handling and performance work.", vi: "Làm việc với Oracle SQL và Redis cho xử lý dữ liệu và tối ưu hiệu năng." },
    ],
    stack: ["ASP.NET Core", "React", "TypeScript", "Oracle SQL", "Redis"],
    year: "2025",
    tone: "fcr",
  },
  {
    slug: "vds-ai-cctv-weighbridge",
    number: "02",
    title: "VDS & AI CCTV / Toll Weighbridge",
    category: { en: "Real-time transport systems", vi: "Hệ thống giao thông thời gian thực" },
    organization: "ITD Solutions",
    summary: {
      en: "Internship work on incident and event alerts for VDS and AI CCTV, plus a toll-station weighbridge system.",
      vi: "Công việc thực tập về cảnh báo sự cố/sự kiện từ VDS và AI CCTV, cùng hệ thống cân xe tại trạm thu phí.",
    },
    brief: {
      en: "The systems process operational events across devices and toll-station workflows where reliability and team coordination matter.",
      vi: "Các hệ thống xử lý sự kiện vận hành từ thiết bị và luồng nghiệp vụ trạm thu phí, nơi độ ổn định và phối hợp nhóm rất quan trọng.",
    },
    contribution: [
      { en: "Participated in developing incident and event alert functionality for VDS devices and AI CCTV cameras.", vi: "Tham gia phát triển chức năng cảnh báo sự cố và sự kiện cho thiết bị VDS và camera AI CCTV." },
      { en: "Contributed to a vehicle weighbridge system used in toll-station workflows.", vi: "Đóng góp vào hệ thống cân xe phục vụ quy trình tại trạm thu phí." },
      { en: "Gained hands-on experience with real-time data, event processing, and cross-team delivery.", vi: "Tích lũy kinh nghiệm thực tế về dữ liệu thời gian thực, xử lý sự kiện và phối hợp liên nhóm." },
    ],
    stack: ["C#", "ASP.NET Core", "Real-time events", "SQL Server"],
    year: "2026",
    tone: "itd",
  },
  {
    slug: "eigakan-movie-sharing-platform",
    number: "03",
    title: "Eigakan — Real-Time Movie Sharing",
    category: { en: "Graduation project", vi: "Đồ án tốt nghiệp" },
    organization: "FPT University",
    summary: {
      en: "A synchronized watch-party platform with video calls, publisher uploads, and advertising capabilities.",
      vi: "Nền tảng xem phim đồng bộ có video call, tải nội dung cho publisher và quản lý quảng cáo.",
    },
    brief: {
      en: "Eigakan explores the product and engineering challenges behind watching together online: synchronized playback, real-time communication, and media delivery.",
      vi: "Eigakan giải quyết trải nghiệm xem cùng nhau trực tuyến: đồng bộ phát phim, giao tiếp thời gian thực và phân phối media.",
    },
    contribution: [
      { en: "Built real-time synchronization with SignalR for interactive watch parties.", vi: "Xây dựng cơ chế đồng bộ thời gian thực bằng SignalR cho trải nghiệm xem chung." },
      { en: "Implemented publisher uploads and advertising-management functionality.", vi: "Triển khai chức năng tải nội dung cho publisher và quản lý quảng cáo." },
      { en: "Integrated AWS S3, BunnyCDN, and Cloudinary for media storage and delivery.", vi: "Tích hợp AWS S3, BunnyCDN và Cloudinary cho lưu trữ, xử lý và phân phối media." },
    ],
    stack: ["ASP.NET Core", "SignalR", "AWS S3", "BunnyCDN", "Cloudinary"],
    year: "2025",
    tone: "eigakan",
  },
];

export const copy = {
  nav: { en: ["Home", "Projects", "About", "Contact"], vi: ["Trang chủ", "Dự án", "Giới thiệu", "Liên hệ"] },
  hero: {
    eyebrow: { en: "Full-stack developer · Ho Chi Minh City", vi: "Lập trình viên full-stack · TP. Hồ Chí Minh" },
    title: { en: "Building software that works in the real world.", vi: "Xây phần mềm vận hành tốt ngoài đời thực." },
    body: {
      en: "I work across backend APIs and responsive interfaces to turn practical requirements into maintainable products.",
      vi: "Mình làm từ backend API đến giao diện đáp ứng, biến yêu cầu thực tế thành sản phẩm dễ bảo trì.",
    },
  },
  action: {
    work: { en: "View selected work", vi: "Xem dự án nổi bật" },
    cv: { en: "Download CV", vi: "Tải CV" },
    allProjects: { en: "All projects", vi: "Tất cả dự án" },
    caseStudies: { en: "All case studies", vi: "Tất cả case study" },
  },
  section: {
    selected: { en: "Selected work.", vi: "Dự án nổi bật." },
    experience: { en: "Experience", vi: "Kinh nghiệm" },
    about: { en: "I build reliable systems.", vi: "Mình xây những hệ thống đáng tin cậy." },
    contact: { en: "Let’s build something useful.", vi: "Cùng làm ra thứ hữu ích." },
  },
  about: {
    body: {
      en: "I am a full-stack developer with hands-on experience in ASP.NET Core, React, relational databases, and real-time product workflows. I care about clarity, dependable delivery, and making software easier for teams to work with.",
      vi: "Mình là lập trình viên full-stack có kinh nghiệm thực tế với ASP.NET Core, React, cơ sở dữ liệu quan hệ và các luồng sản phẩm thời gian thực. Mình ưu tiên sự rõ ràng, triển khai đáng tin cậy và phần mềm dễ làm việc cho cả team.",
    },
  },
  labels: {
    role: { en: "Role", vi: "Vai trò" },
    brief: { en: "The brief", vi: "Bài toán" },
    contribution: { en: "My contribution", vi: "Phần đóng góp" },
    technology: { en: "Technology", vi: "Công nghệ" },
    email: { en: "Email", vi: "Email" },
    github: { en: "GitHub", vi: "GitHub" },
    linkedin: { en: "LinkedIn", vi: "LinkedIn" },
  },
} as const;

export const experience = [
  { period: "Aug 2025 — Feb 2026", title: { en: "Full Stack Developer Intern", vi: "Thực tập sinh Full Stack Developer" }, company: "FPT Telecom" },
  { period: "Nov 2023 — May 2024", title: { en: "Back-End Developer Intern", vi: "Thực tập sinh Back-End Developer" }, company: "FPT Software" },
  { period: "2021 — 2025", title: { en: "Bachelor of Software Engineering", vi: "Cử nhân Kỹ thuật Phần mềm" }, company: "FPT University, HCMC" },
];

export const capabilities = [
  {
    number: "01",
    title: { en: "Backend systems", vi: "Hệ thống backend" },
    body: { en: "ASP.NET Core APIs, business workflows, Entity Framework, REST integration, and maintainable service code.", vi: "API ASP.NET Core, luồng nghiệp vụ, Entity Framework, REST integration và service code dễ bảo trì." },
  },
  {
    number: "02",
    title: { en: "Product interfaces", vi: "Giao diện sản phẩm" },
    body: { en: "Responsive React interfaces with TypeScript, Tailwind CSS, Ant Design, and Redux Toolkit.", vi: "Giao diện React responsive với TypeScript, Tailwind CSS, Ant Design và Redux Toolkit." },
  },
  {
    number: "03",
    title: { en: "Data & real-time", vi: "Dữ liệu & thời gian thực" },
    body: { en: "SQL Server, Oracle, MongoDB, Redis, SignalR, and event-oriented application workflows.", vi: "SQL Server, Oracle, MongoDB, Redis, SignalR và các luồng ứng dụng hướng sự kiện." },
  },
];

export const skillGroups = [
  { label: { en: "Languages", vi: "Ngôn ngữ" }, items: ["C#", "JavaScript", "TypeScript"] },
  { label: { en: "Backend", vi: "Backend" }, items: ["ASP.NET Core", "RESTful API", "SignalR", "Entity Framework"] },
  { label: { en: "Frontend", vi: "Frontend" }, items: ["React", "Next.js", "Tailwind CSS", "Ant Design", "Shadcn"] },
  { label: { en: "Data & tools", vi: "Dữ liệu & công cụ" }, items: ["SQL Server", "Oracle", "MongoDB", "Redis", "GitHub", "Figma", "Postman"] },
];

export const certifications = [
  { name: "Certified Ethical Emerging Technologist", date: "Jul 2023" },
  { name: "Web Design for Everybody: Basics of Web Development & Coding", date: "Mar 2023" },
];
