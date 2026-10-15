import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(ScrollTrigger, CustomEase);
CustomEase.create("dennisMenu", "0.7,0,0.2,1");
CustomEase.create("dennisFast", "0.7,0,0.3,1");
CustomEase.create("dennisPreviewIn", "0.34,1,0.64,1");
CustomEase.create("dennisPreviewOut", "0.36,0,0.66,0");

export { gsap, ScrollTrigger };

// Source: Dennis /assets/js/index-new.js, style-new.css and styleguide.css.
export const motionTokens = {
  ease: [0.7, 0, 0.3, 1] as const,
  fast: 0.3,
  menu: 0.8,
  menuCurve: "dennisMenu",
  menuStagger: 0.03,
  curtainIn: 0.5,
  curtainOut: 0.8,
  curtainLeaveAt: 1.15,
  contentEnterAt: 1.3,
  magnetic: 1.5,
  fill: 0.6,
  preview: 0.4,
  previewSlide: 0.6,
  tickerSeconds: 18,
};
