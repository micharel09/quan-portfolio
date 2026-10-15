import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(ScrollTrigger, CustomEase);
CustomEase.create("menuEase", "0.7,0,0.2,1");
CustomEase.create("fastEase", "0.7,0,0.3,1");
CustomEase.create("previewEnterEase", "0.34,1,0.64,1");
CustomEase.create("previewLeaveEase", "0.36,0,0.66,0");

export { gsap, ScrollTrigger };

export const motionTokens = {
  ease: [0.7, 0, 0.3, 1] as const,
  fast: 0.3,
  menu: 0.8,
  menuCurve: "menuEase",
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
