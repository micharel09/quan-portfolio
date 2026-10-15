"use client";

import type { IconType } from "react-icons";
import { GrOracle } from "react-icons/gr";
import { DiMsqlServer } from "react-icons/di";
import { TbBrain, TbBrandAws, TbBroadcast, TbDatabase, TbListDetails, TbTestPipe } from "react-icons/tb";
import {
  SiAntdesign, SiAstro, SiBunnydotnet, SiCapacitor, SiCloudinary, SiDart,
  SiDocker, SiDotnet, SiExpo, SiFastapi, SiFigma, SiFlutter, SiGithub,
  SiGooglecloudstorage, SiGooglegemini, SiGoogleplay, SiJavascript, SiMongodb, SiNestjs,
  SiNextdotjs, SiPostgresql, SiPostman, SiPython, SiRailway, SiReact,
  SiRedis, SiShadcnui, SiSocketdotio, SiTailwindcss, SiTypeorm, SiTypescript, SiVite,
} from "react-icons/si";

import { LinkPreview } from "./link-preview";

const technologies: Record<string, { icon?: IconType; color: string; url: string; preview: string }> = {
  "C#": { color: "#512bd4", url: "https://learn.microsoft.com/en-us/dotnet/csharp/", preview: "/assets/technology/csharp.webp" },
  "JavaScript": { icon: SiJavascript, color: "#776a08", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript", preview: "/assets/technology/javascript.webp" },
  "TypeScript": { icon: SiTypescript, color: "#2968ae", url: "https://www.typescriptlang.org/", preview: "/assets/technology/typescript.webp" },
  "Dart": { icon: SiDart, color: "#006db6", url: "https://dart.dev/", preview: "/assets/technology/dart.webp" },
  "Python": { icon: SiPython, color: "#316a9b", url: "https://www.python.org/", preview: "/assets/technology/python.webp" },
  "ASP.NET Core": { icon: SiDotnet, color: "#512bd4", url: "https://learn.microsoft.com/en-us/aspnet/core/", preview: "/assets/technology/aspnet.webp" },
  "NestJS": { icon: SiNestjs, color: "#cb1f45", url: "https://nestjs.com/", preview: "/assets/technology/nestjs.webp" },
  "FastAPI": { icon: SiFastapi, color: "#00766b", url: "https://fastapi.tiangolo.com/", preview: "/assets/technology/fastapi.webp" },
  "Entity Framework": { icon: TbDatabase, color: "#512bd4", url: "https://learn.microsoft.com/en-us/ef/", preview: "/assets/technology/entity-framework.webp" },
  "TypeORM": { icon: SiTypeorm, color: "#d10200", url: "https://typeorm.io/", preview: "/assets/technology/typeorm.webp" },
  "BullMQ": { icon: TbListDetails, color: "#1c1d20", url: "https://bullmq.io/", preview: "/assets/technology/bullmq.webp" },
  "React": { icon: SiReact, color: "#2e6f81", url: "https://react.dev/", preview: "/assets/technology/react.webp" },
  "React Native": { icon: SiReact, color: "#2e6f81", url: "https://reactnative.dev/", preview: "/assets/technology/react-native.webp" },
  "Next.js": { icon: SiNextdotjs, color: "#1c1d20", url: "https://nextjs.org/", preview: "/assets/technology/nextjs.webp" },
  "Vite": { icon: SiVite, color: "#5258d2", url: "https://vite.dev/", preview: "/assets/technology/vite.webp" },
  "Astro": { icon: SiAstro, color: "#953ebd", url: "https://astro.build/", preview: "/assets/technology/astro.webp" },
  "Tailwind CSS": { icon: SiTailwindcss, color: "#007184", url: "https://tailwindcss.com/", preview: "/assets/technology/tailwind.webp" },
  "Ant Design": { icon: SiAntdesign, color: "#0061df", url: "https://ant.design/", preview: "/assets/technology/ant-design.webp" },
  "Shadcn": { icon: SiShadcnui, color: "#1c1d20", url: "https://ui.shadcn.com/", preview: "/assets/technology/shadcn.webp" },
  "Flutter": { icon: SiFlutter, color: "#02569b", url: "https://flutter.dev/", preview: "/assets/technology/flutter.webp" },
  "Expo": { icon: SiExpo, color: "#1c1d20", url: "https://expo.dev/", preview: "/assets/technology/expo.webp" },
  "Capacitor": { icon: SiCapacitor, color: "#066db2", url: "https://capacitorjs.com/", preview: "/assets/technology/capacitor.webp" },
  "PostgreSQL": { icon: SiPostgresql, color: "#3d61d3", url: "https://www.postgresql.org/", preview: "/assets/technology/postgresql.webp" },
  "SQL Server": { icon: DiMsqlServer, color: "#c52725", url: "https://www.microsoft.com/en-us/sql-server", preview: "/assets/technology/sql-server.webp" },
  "Oracle": { icon: GrOracle, color: "#d30000", url: "https://www.oracle.com/database/", preview: "/assets/technology/oracle.webp" },
  "Oracle SQL": { icon: GrOracle, color: "#d30000", url: "https://docs.oracle.com/en/database/oracle/oracle-database/23/sqlrf/", preview: "/assets/technology/oracle-sql.webp" },
  "MongoDB": { icon: SiMongodb, color: "#317432", url: "https://www.mongodb.com/", preview: "/assets/technology/mongodb.webp" },
  "Redis": { icon: SiRedis, color: "#c43328", url: "https://redis.io/", preview: "/assets/technology/redis.webp" },
  "SignalR": { icon: TbBroadcast, color: "#512bd4", url: "https://learn.microsoft.com/en-us/aspnet/core/signalr/introduction", preview: "/assets/technology/signalr.webp" },
  "Real-time events": { icon: TbBroadcast, color: "#1c1d20", url: "https://developer.mozilla.org/en-US/docs/Web/Events", preview: "/assets/technology/events.webp" },
  "Socket.IO": { icon: SiSocketdotio, color: "#1c1d20", url: "https://socket.io/", preview: "/assets/technology/socketio.webp" },
  "Google Cloud Storage": { icon: SiGooglecloudstorage, color: "#586780", url: "https://cloud.google.com/storage", preview: "/assets/technology/gcs.webp" },
  "Gemini": { icon: SiGooglegemini, color: "#745e92", url: "https://ai.google.dev/gemini-api/docs", preview: "/assets/technology/gemini.webp" },
  "Whisper": { icon: TbBrain, color: "#1c1d20", url: "https://github.com/openai/whisper", preview: "/assets/technology/whisper.webp" },
  "Docker": { icon: SiDocker, color: "#186aaa", url: "https://www.docker.com/", preview: "/assets/technology/docker.webp" },
  "Railway": { icon: SiRailway, color: "#1c1d20", url: "https://railway.com/", preview: "/assets/technology/railway.webp" },
  "TestFlight": { icon: TbTestPipe, color: "#0062d2", url: "https://developer.apple.com/testflight/", preview: "/assets/technology/testflight.webp" },
  "Google Play Console": { icon: SiGoogleplay, color: "#1c1d20", url: "https://google.play/business/", preview: "/assets/technology/google-play-console.webp" },
  "GitHub": { icon: SiGithub, color: "#1c1d20", url: "https://github.com/", preview: "/assets/technology/github.webp" },
  "Figma": { icon: SiFigma, color: "#ba3a16", url: "https://www.figma.com/", preview: "/assets/technology/figma.webp" },
  "Postman": { icon: SiPostman, color: "#b24921", url: "https://www.postman.com/", preview: "/assets/technology/postman.webp" },
  "AWS S3": { icon: TbBrandAws, color: "#3f7521", url: "https://aws.amazon.com/s3/", preview: "/assets/technology/s3.webp" },
  "BunnyCDN": { icon: SiBunnydotnet, color: "#925e24", url: "https://bunny.net/", preview: "/assets/technology/bunny.webp" },
  "Cloudinary": { icon: SiCloudinary, color: "#3448c5", url: "https://cloudinary.com/", preview: "/assets/technology/cloudinary.webp" },
};

const technologyNames = Object.keys(technologies).sort((a, b) => b.length - a.length);
const technologyPattern = new RegExp(`(${technologyNames.map((name) => name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "g");

export function TechnologyText({ text }: { text: string }) {
  const parts = text.split(technologyPattern);
  return parts.map((part, index) => {
    if (index % 2 === 0) return index === 0 ? part : part.replace(/^[,.;:!?]/, "");
    const punctuation = parts[index + 1]?.match(/^[,.;:!?]/)?.[0];
    return <span key={index} style={{ whiteSpace: "nowrap" }}><Technology name={part} />{punctuation}</span>;
  });
}

export function Technology({ name }: { name: string }) {
  const technology = technologies[name];
  if (!technology) return <span className="technology">{name}</span>;
  const Icon = technology.icon;
  return <LinkPreview url={technology.url} imageSrc={technology.preview} isStatic name={name} color={technology.color}>{Icon && <Icon aria-hidden="true" focusable="false" />}<span>{name}</span></LinkPreview>;
}
