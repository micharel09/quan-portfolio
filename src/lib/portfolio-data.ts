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
  group: "product" | "experience";
  featured?: boolean;
  tone?: "fcr" | "itd" | "eigakan";
};

export const projects: Project[] = [
  {
    slug: "fly-talent-dj", number: "01", title: "Fly Talent DJ", organization: "Fly",
    group: "product", year: "2026",
    category: { en: "DJ booking marketplace", vi: "Nền tảng đặt lịch DJ" },
    summary: { en: "A DJ marketplace connecting clients with artists through profiles, availability, booking, and chat.", vi: "Nền tảng kết nối khách hàng với DJ qua hồ sơ, lịch hoạt động, booking và chat." },
    brief: { en: "Bring discovery, scheduling, and direct client–DJ communication into one web and mobile product, with clear booking states.", vi: "Kết nối tìm kiếm DJ, lịch diễn và trao đổi khách hàng–DJ trong một sản phẩm web và mobile với trạng thái booking rõ ràng." },
    contribution: [
      { en: "Developed React/Vite marketplace interfaces and NestJS booking workflows.", vi: "Phát triển giao diện marketplace React/Vite và luồng booking NestJS." },
      { en: "Worked on real-time chat, profile and availability flows across the web and Flutter app.", vi: "Phát triển chat thời gian thực, hồ sơ và lịch hoạt động trên web và ứng dụng Flutter." },
      { en: "Prepared public web delivery and addressed release and App Review requirements.", vi: "Chuẩn bị triển khai web public và xử lý yêu cầu phát hành, App Review." },
    ],
    stack: ["React", "Vite", "NestJS", "TypeORM", "PostgreSQL", "Redis", "Socket.IO", "Flutter"],
  },
  {
    slug: "fly-jobs", number: "02", title: "Fly Jobs", organization: "Fly",
    group: "product", year: "2026",
    category: { en: "Recruitment platform", vi: "Nền tảng tuyển dụng" },
    summary: { en: "A multi-company recruitment platform for candidates, employers, recruiters, and administrators.", vi: "Nền tảng tuyển dụng đa doanh nghiệp dành cho ứng viên, nhà tuyển dụng, recruiter và quản trị viên." },
    brief: { en: "Support job discovery, applications and CV handling while keeping company workspaces and recruitment stages clear.", vi: "Hỗ trợ tìm việc, ứng tuyển và quản lý CV, đồng thời phân tách không gian doanh nghiệp và các bước tuyển dụng rõ ràng." },
    contribution: [
      { en: "Developed Next.js interfaces and NestJS APIs for candidate and company workflows.", vi: "Phát triển giao diện Next.js và API NestJS cho luồng ứng viên và doanh nghiệp." },
      { en: "Worked on CV storage, application management, and administrative workflows.", vi: "Phát triển lưu trữ CV, quản lý ứng tuyển và các luồng quản trị." },
      { en: "Implemented Flutter candidate and management flows and prepared verified TestFlight builds.", vi: "Triển khai luồng ứng viên, quản lý bằng Flutter và chuẩn bị các bản TestFlight đã kiểm chứng." },
    ],
    stack: ["Next.js", "NestJS", "TypeORM", "PostgreSQL", "Redis", "BullMQ", "Google Cloud Storage", "Flutter"],
  },
  {
    slug: "fly-labour", number: "03", title: "Fly Labour", organization: "Fly",
    group: "product", year: "2026",
    category: { en: "Recruitment & education", vi: "Tuyển dụng & giáo dục" },
    summary: { en: "A platform bringing recruitment, study-abroad opportunities, courses, and certificate catalogs together.", vi: "Nền tảng kết nối tuyển dụng, cơ hội du học, khóa học và danh mục chứng chỉ." },
    brief: { en: "Make opportunities and training information accessible through a shared web, API, and mobile experience.", vi: "Giúp người dùng tiếp cận cơ hội việc làm và thông tin đào tạo qua web, API và trải nghiệm mobile dùng chung dữ liệu." },
    contribution: [
      { en: "Developed training-partner showcases, course pricing interfaces, and certificate topic menus.", vi: "Phát triển khu vực đối tác đào tạo, giao diện học phí khóa học và menu nhóm chứng chỉ." },
      { en: "Added the Lien Viet training certificate catalog across the React interface and NestJS backend. The wider project also includes a React Native/Expo app.", vi: "Bổ sung danh mục chứng chỉ đào tạo Liên Việt trên giao diện React và backend NestJS. Dự án còn có ứng dụng React Native/Expo." },
    ],
    stack: ["React", "NestJS", "TypeORM", "PostgreSQL", "React Native", "Expo"],
  },
  {
    slug: "fcr-customer-request-system",
    number: "04",
    group: "experience",
    featured: true,
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
    number: "05",
    group: "experience",
    featured: true,
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
      { en: "Used Docker to package and deploy services for the project environment.", vi: "Sử dụng Docker để đóng gói và triển khai service cho môi trường dự án." },
      { en: "Gained hands-on experience with real-time data, event processing, and cross-team delivery.", vi: "Tích lũy kinh nghiệm thực tế về dữ liệu thời gian thực, xử lý sự kiện và phối hợp liên nhóm." },
    ],
    stack: ["C#", "ASP.NET Core", "Docker", "Real-time events", "SQL Server"],
    year: "2026",
    tone: "itd",
  },
  {
    slug: "eigakan-movie-sharing-platform",
    number: "06",
    group: "experience",
    featured: true,
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
      en: "I build backend APIs, web interfaces, and mobile apps, connecting practical product workflows with data, AI, and delivery.",
      vi: "Mình xây backend API, giao diện web và ứng dụng mobile, kết nối luồng sản phẩm thực tế với dữ liệu, AI và triển khai.",
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
      en: "I am a full-stack developer working across ASP.NET Core and NestJS APIs, React web interfaces, and Flutter and React Native mobile apps. My Fly projects span recruitment, DJ booking, and AI-assisted language practice, from PostgreSQL and real-time workflows to mobile build and delivery.",
      vi: "Mình là lập trình viên full-stack, làm từ API ASP.NET Core và NestJS, giao diện web React đến ứng dụng Flutter và React Native. Các sản phẩm Fly trải dài từ tuyển dụng, đặt lịch DJ đến luyện ngôn ngữ có hỗ trợ AI, từ PostgreSQL và luồng thời gian thực đến build, triển khai mobile.",
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
    body: { en: "Build APIs and recruitment and booking workflows with ASP.NET Core and NestJS, and process background jobs with BullMQ.", vi: "Phát triển API và luồng nghiệp vụ tuyển dụng, đặt lịch với ASP.NET Core và NestJS; xử lý tác vụ nền bằng BullMQ." },
  },
  {
    number: "02",
    title: { en: "Web & mobile", vi: "Web & mobile" },
    body: { en: "Build websites with React and Next.js, and mobile apps with Flutter and React Native. Build and distribute iOS apps through TestFlight and Android apps through Google Play Console.", vi: "Phát triển website với React, Next.js và ứng dụng mobile với Flutter, React Native. Build và phân phối ứng dụng iOS qua TestFlight, Android qua Google Play Console." },
  },
  {
    number: "03",
    title: { en: "Data, real-time & AI", vi: "Dữ liệu, thời gian thực & AI" },
    body: { en: "Handle data and caching with PostgreSQL and Redis, build real-time chat and synchronization with SignalR and Socket.IO, and integrate Gemini and Whisper for AI-assisted scoring and speech recognition.", vi: "Xử lý dữ liệu và cache với PostgreSQL, Redis; xây dựng chat và đồng bộ thời gian thực với SignalR, Socket.IO; tích hợp Gemini và Whisper cho chấm điểm có hỗ trợ AI và nhận dạng giọng nói." },
  },
];

export const skillGroups = [
  { label: { en: "Languages", vi: "Ngôn ngữ" }, items: ["C#", "JavaScript", "TypeScript", "Dart", "Python"] },
  { label: { en: "Backend", vi: "Backend" }, items: ["ASP.NET Core", "NestJS", "FastAPI", "Entity Framework", "TypeORM", "BullMQ"] },
  { label: { en: "Web", vi: "Web" }, items: ["React", "Next.js", "Vite", "Astro", "Tailwind CSS", "Ant Design", "Shadcn"] },
  { label: { en: "Mobile", vi: "Mobile" }, items: ["Flutter", "React Native", "Expo", "Capacitor"] },
  { label: { en: "Data & real-time", vi: "Dữ liệu & thời gian thực" }, items: ["PostgreSQL", "SQL Server", "Oracle", "MongoDB", "Redis", "SignalR", "Socket.IO", "Google Cloud Storage"] },
  { label: { en: "AI & delivery", vi: "AI & triển khai" }, items: ["Gemini", "Whisper", "Docker", "Railway", "TestFlight", "Google Play Console", "GitHub", "Figma", "Postman"] },
];

export const certifications = [
  { name: "Certified Ethical Emerging Technologist", date: "Jul 2023" },
  { name: "Web Design for Everybody: Basics of Web Development & Coding", date: "Mar 2023" },
];
