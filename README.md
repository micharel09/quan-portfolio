# Tran Minh Quan — Portfolio

Personal portfolio for **Tran Minh Quan**, a Full-stack Developer. The site presents selected professional work, experience, technical toolkit, and contact paths in a focused case-study format.

**Live site:** [quan-portfolio-ten.vercel.app](https://quan-portfolio-ten.vercel.app)
**GitHub:** [@micharel09](https://github.com/micharel09)

## Highlights

- Bilingual interface: English and Vietnamese
- Case studies for work at FPT Telecom, ITD Solutions, and FPT Software
- Project galleries with keyboard-accessible lightbox controls
- Smooth scrolling, scroll progress feedback, and motion that respects reduced-motion preferences
- Responsive layout and production-ready metadata, favicon, and Open Graph image

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
npm run build
```

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
