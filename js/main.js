/* ============================================
   Click India Pest Control Pest Control — Main entry
   Bootstraps all modules on every page
   ============================================ */

import { initNavigation } from "./navigation.js";
import { initSliders } from "./slider.js";
import { initAnimations } from "./animations.js";

function boot() {
  initNavigation();
  initSliders();
  initAnimations();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}
