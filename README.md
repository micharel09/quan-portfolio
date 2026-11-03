# Tran Minh Quan — Portfolio

Personal portfolio for **Tran Minh Quan**, a Full-stack Developer. The site presents selected professional work, experience, technical toolkit, and contact paths in a focused case-study format.

**Live site:** [quantm.is-a.dev](https://quantm.is-a.dev)
**GitHub:** [@micharel09](https://github.com/micharel09)

## Highlights

- Bilingual interface: English and Vietnamese
- Case studies for FPT Telecom, ITD Solutions, the Eigakan graduation project, and Quan Dev Journal
- Personal-project and experience/academic filters reuse the existing list/grid collection
- Project galleries with keyboard-accessible lightbox controls
- Smooth scrolling, scroll progress feedback, and motion that respects reduced-motion preferences
- Responsive layout and production-ready metadata, favicon, and Open Graph image

## Identity and metadata

- The primary domain is `https://quantm.is-a.dev`. `src/lib/site-metadata.ts` shares this URL between page metadata, sitemap, and robots.
- All 8 pages (home, About, Contact, Projects, and four project case studies) have their own English title, description, canonical URL, and Open Graph URL. Project metadata uses the existing project title and English summary; unknown slugs return 404.
- Open Graph and Twitter use the shared 1200×630 image at `/opengraph-image`, with absolute image URLs on the primary domain. It keeps the existing dark layout and lime accent, using the same circular avatar crop as the favicon, sourced from the 180×180 PNG.
- Next.js metadata routes serve `/sitemap.xml` and `/robots.txt`. The sitemap includes the four main pages and reads project slugs from `src/lib/portfolio-data.ts`; robots allows indexing and points to the primary-domain sitemap.
- The initial HTML and metadata are English. The English/Vietnamese interface preference stays in local storage (`portfolio-language`), with no separate language URLs.
- The Vercel address remains accessible. Canonical metadata identifies the primary domain; this change does not configure hosting redirects.

## Built with

- [Next.js 16](https://nextjs.org/)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Framer Motion](https://www.framer.com/motion/)
- [Lenis](https://lenis.darkroom.engineering/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [Vercel](https://vercel.com/) for deployment

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Introduction, skills, experience, and selected work |
| `/projects` | Full project index |
| `/projects/[slug]` | Individual project case study and photo gallery |
| `/projects/quan-dev-journal` | Personal journal case study; product links appear only after publication and verification |
| `/about` | Professional background and approach |
| `/contact` | Contact information and social links |

## Run locally

Prerequisites: Node.js 20.9 or newer and npm.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Quality checks

```bash
npm run lint
npx tsc --noEmit
npm run build
```

Node.js builds in the Codex working environment run on Ubuntu through `ssh fly-server`.

## Quan Dev Journal integration

The Journal is maintained separately at `E:/RepoGit/quan-dev-journal`. This portfolio reuses `ProjectCollection` for its personal-project filter, `ProjectDetail` for the case study, and the existing `MagneticLink`/`footer-actions` composition for optional `sourceUrl` and `demoUrl` buttons. No new layout or motion system is introduced. Projects without product images omit the cover/gallery and image preview while retaining normal case-study navigation.

The case study identifies the Brocoders, Karhdo and Conduit adaptations and the local integration decisions. Product implementation sources, fixed revisions, licenses, verification commands and technical articles are recorded in the Journal README. The Journal is not publicly released yet: this portfolio does not manufacture source/demo links or product screenshots.

Local verification on 2026-11-03 used the Ubuntu production preview: English and Vietnamese at 1440px and 390px, the personal filter returning one Journal project, case-study/back navigation, no horizontal overflow, and no browser page errors. The removed `/projects/fly-talent-dj`, `/projects/fly-jobs` and `/projects/fly-labour` routes still return HTTP 404. The shared existing image/gallery projects remain available. This evidence concerns the local preview; it does not claim that this change is deployed.

## Deployment

The repository is connected to Vercel. A push to `main` triggers a production deployment.

To deploy from the CLI instead:

```bash
npx vercel --prod
```

## Repository notes

- Content and project data are maintained in the application source so the portfolio stays lightweight and easy to update.
- Personal and company images are stored in `public/assets` and are used only to document the represented work experience.
- This is a personal portfolio. Reuse of its content, photographs, or identity assets requires permission.
