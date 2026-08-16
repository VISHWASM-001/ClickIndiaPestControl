/* ============================================
   Click India Pest Control — bundled site script
   Combines icons, navigation, slider, animations
   and gallery logic into a single classic script
   so it runs reliably on every browser/device,
   including when the page is opened directly as
   a local file (ES module imports are blocked by
   CORS in that case on most mobile browsers).
   ============================================ */
(function () {
  'use strict';

  /* ============================================
     Shared inline SVG icons
     Used across pages to keep markup clean & DRY
     ============================================ */
  
  const icons = {
    shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
    arrowRight: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>',
    arrowUp: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>',
    chevronLeft: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>',
    chevronRight: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>',
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>',
    star: '<svg viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>',
    mapPin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
    calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
    award: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>',
    users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    leaf: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/><path d="M2 21c0-3 1.85-5.36 5.08-6"/></svg>',
    target: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
    zap: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
    eye: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
    heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>',
    bug: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="6" width="8" height="14" rx="4"/><path d="M19 7l-3 2"/><path d="M5 7l3 2"/><path d="M19 13h-3"/><path d="M5 13h3"/><path d="M19 19l-3-2"/><path d="M5 19l3-2"/><path d="M12 6V4"/><path d="M8 4h8"/></svg>',
    rat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 5a4 4 0 0 0-4 4 4 4 0 0 0-4 4 4 4 0 0 0 4 4 4 4 0 0 0 4-4 4 4 0 0 0 4-4 4 4 0 0 0-4-4z"/><circle cx="17" cy="9" r="1"/><path d="M3 9c1-2 4-2 5 0"/><path d="M3 13c1-2 4-2 5 0"/></svg>',
    termite: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="12" rx="3" ry="5"/><path d="M12 7V3"/><path d="M9 9L5 7"/><path d="M15 9l4-2"/><path d="M9 15l-4 2"/><path d="M15 15l4 2"/><path d="M12 17v4"/></svg>',
    cockroach: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="12" rx="4" ry="6"/><path d="M8 8L4 5"/><path d="M16 8l4-3"/><path d="M8 12H3"/><path d="M16 12h5"/><path d="M8 16l-4 3"/><path d="M16 16l4 3"/><path d="M12 6V3"/></svg>',
    mosquito: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="2"/><path d="M12 10V4"/><path d="M10 8L4 4"/><path d="M14 8l6-4"/><path d="M10 12L2 10"/><path d="M14 12l8-2"/><path d="M10 16l-6 4"/><path d="M14 16l6 4"/><path d="M12 14v6"/></svg>',
    spider: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M9 9L4 4"/><path d="M15 9l5-5"/><path d="M9 15l-5 5"/><path d="M15 15l5 5"/><path d="M9 11H2"/><path d="M15 11h7"/><path d="M9 13H3"/><path d="M15 13h6"/></svg>',
    ant: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="6" r="2"/><circle cx="12" cy="11" r="2.5"/><circle cx="12" cy="17" r="3"/><path d="M10 5L6 3"/><path d="M14 5l4-2"/><path d="M9 11L4 9"/><path d="M15 11l5-2"/><path d="M9 17L4 19"/><path d="M15 17l5 2"/></svg>',
    home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
    building: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01M12 6h.01M16 6h.01M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01"/></svg>',
    facebook: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>',
    twitter: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>',
    spray: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 8h6v12H7z"/><path d="M7 4h6v4H7z"/><path d="M13 10h4v6h-4z"/><path d="M17 12h4M17 15h4M17 18h4"/></svg>',
    fly: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="11" r="2.5"/><ellipse cx="6.5" cy="8" rx="4" ry="2.4" transform="rotate(-25 6.5 8)"/><ellipse cx="17.5" cy="8" rx="4" ry="2.4" transform="rotate(25 17.5 8)"/><path d="M12 13.5V19"/><path d="M9.5 16.5L7 19"/><path d="M14.5 16.5L17 19"/></svg>',
    woodBorer: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="9" width="18" height="6" rx="1.5"/><circle cx="7.5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="16.5" cy="12" r="1"/><path d="M3 9V5M21 9V5M3 15v4M21 15v4"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
    alert: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',
    checkCircle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
    play: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>',
    videoCamera: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>',
  }
  /* ============================================
     Navigation
     - Sticky header shadow on scroll
     - Active link highlighting
     - Mobile hamburger + slide-in menu
     - Outside click / Esc to close, keyboard accessible
     ============================================ */
  
  
  function setActiveLink() {
    const path = window.location.pathname.split('/').pop() || 'index.html'
    document.querySelectorAll('.nav__link').forEach((link) => {
      const href = (link.getAttribute('href') || '').split('/').pop()
      if (href === path || (path === '' && href === 'index.html')) {
        link.classList.add('is-active')
        link.setAttribute('aria-current', 'page')
      }
    })
  }
  
  function initStickyHeader() {
    const header = document.querySelector('.header')
    if (!header) return
    const onScroll = () => {
      if (window.scrollY > 10) header.classList.add('header--scrolled')
      else header.classList.remove('header--scrolled')
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
  }
  
  function initMobileMenu() {
    const toggle = document.querySelector('.nav-toggle')
    const nav = document.querySelector('.nav')
    if (!toggle || !nav) return
  
    // Create overlay
    const overlay = document.createElement('div')
    overlay.className = 'nav-overlay'
    overlay.setAttribute('aria-hidden', 'true')
    document.body.appendChild(overlay)
  
    const openMenu = () => {
      toggle.classList.add('is-active')
      nav.classList.add('is-open')
      overlay.classList.add('is-visible')
      toggle.setAttribute('aria-expanded', 'true')
      document.body.style.overflow = 'hidden'
      // Focus first link for keyboard users
      const firstLink = nav.querySelector('a, button')
      if (firstLink) firstLink.focus()
    }
  
    const closeMenu = () => {
      toggle.classList.remove('is-active')
      nav.classList.remove('is-open')
      overlay.classList.remove('is-visible')
      toggle.setAttribute('aria-expanded', 'false')
      document.body.style.overflow = ''
    }
  
    toggle.addEventListener('click', () => {
      if (nav.classList.contains('is-open')) closeMenu()
      else openMenu()
    })
  
    overlay.addEventListener('click', closeMenu)
  
    // Close on Esc
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        closeMenu()
        toggle.focus()
      }
    })
  
    // Close when a nav link is clicked (mobile)
    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMenu)
    })
  
    // Reset on resize to desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth > 992) closeMenu()
    })
  }
  
  function initBackToTop() {
    const btn = document.querySelector('.back-to-top')
    if (!btn) return
    const onScroll = () => {
      if (window.scrollY > 400) btn.classList.add('is-visible')
      else btn.classList.remove('is-visible')
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    })
    onScroll()
  }
  
  /* Inject SVG icons into elements with data-icon attributes.
     For star-rating containers, render the icon N times (default 5). */
  function injectIcons() {
    document.querySelectorAll('[data-icon]').forEach((el) => {
      const name = el.getAttribute('data-icon')
      if (!icons[name]) return
      const count = el.hasAttribute('data-icon-repeat') ? parseInt(el.getAttribute('data-icon-repeat'), 10) || 5 : 1
      el.innerHTML = icons[name].repeat(count)
    })
  }
  
  function initNavigation() {
    setActiveLink()
    initStickyHeader()
    initMobileMenu()
    initBackToTop()
    injectIcons()
  }
  /* ============================================
     Reusable Slider
     - Hero background slider with fade transition
     - Testimonials slider with slide transition
     - Auto-advance, prev/next, pagination dots, keyboard accessible
     ============================================ */
  
  const SLIDER_DEFAULTS = {
    interval: 5000,
    type: 'fade', // 'fade' | 'slide'
    autoplay: true,
  }
  
  function debounce(fn, wait) {
    let t
    return (...args) => {
      clearTimeout(t)
      t = setTimeout(() => fn(...args), wait)
    }
  }
  
  /* Shared slider factory */
  function createSlider(root, options = {}) {
    const opts = { ...SLIDER_DEFAULTS, ...options }
    const slides = root.querySelectorAll('.hero__slide, .testimonial-slide')
    if (!slides.length) return null
  
    const isTestimonial = root.classList.contains('testimonial-slider')
    // A hero built from <video> slides plays each clip through to completion
    // instead of switching on a fixed timer, so the videos play one after another.
    const isVideoHero = !isTestimonial && slides[0].tagName === 'VIDEO'
    let current = 0
    let timer = null
  
    // Scope dots to this slider only (avoid matching dots from other sliders on the page)
    const dots = isTestimonial
      ? root.parentElement.querySelectorAll('.testimonial-dots .slider__dot')
      : root.querySelectorAll('.slider__dots .slider__dot')
  
    // Only the active video should ever be playing; every other clip stays paused
    // and reset so it starts from the beginning next time it becomes active.
    function syncVideoPlayback(index) {
      slides.forEach((slide, i) => {
        if (slide.tagName !== 'VIDEO') return
        if (i === index) {
          slide.currentTime = 0
          const playPromise = slide.play()
          if (playPromise && playPromise.catch) playPromise.catch(() => {})
        } else {
          slide.pause()
        }
      })
    }
  
    function goTo(index) {
      slides.forEach((slide, i) => {
        if (isTestimonial) {
          // slide transform
          const track = root.querySelector('.testimonial-slides') || root
          track.style.transform = `translateX(-${index * 100}%)`
        } else {
          slide.classList.toggle('is-active', i === index)
        }
      })
      dots.forEach((dot, i) => dot.classList.toggle('is-active', i === index))
      current = index
      if (isVideoHero) syncVideoPlayback(index)
    }
  
    function next() { goTo((current + 1) % slides.length) }
    function prev() { goTo((current - 1 + slides.length) % slides.length) }
  
    function start() {
      if (!opts.autoplay) return
      stop()
      // Video hero advances via the 'ended' event on each clip (see below),
      // not a fixed interval — each video plays fully before the next starts.
      if (!isVideoHero) timer = setInterval(next, opts.interval)
    }
    function stop() { if (timer) clearInterval(timer); timer = null }
  
    if (isVideoHero) {
      slides.forEach((slide) => {
        slide.addEventListener('ended', next)
        // Safety net: if a clip can't load or play, don't get stuck on it — move on.
        slide.addEventListener('error', next)
      })
    }
  
    // Arrow controls
    const prevBtn = root.parentElement.querySelector('.slider__arrow--prev')
    const nextBtn = root.parentElement.querySelector('.slider__arrow--next')
    if (prevBtn) prevBtn.addEventListener('click', () => { prev(); start() })
    if (nextBtn) nextBtn.addEventListener('click', () => { next(); start() })
  
    // Dots
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => { goTo(i); start() })
    })
  
    // Keyboard support on the slider root
    root.setAttribute('tabindex', '0')
    root.setAttribute('role', 'group')
    root.setAttribute('aria-label', 'Slider — use arrow keys to navigate')
    root.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); next(); start() }
      if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); start() }
    })
  
    // Pause on hover/focus
    const pauseOn = () => stop()
    const resumeOn = () => start()
    root.addEventListener('mouseenter', pauseOn)
    root.addEventListener('mouseleave', resumeOn)
    root.addEventListener('focusin', pauseOn)
    root.addEventListener('focusout', resumeOn)
  
    // Pause when tab not visible
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) stop()
      else start()
    })
  
    goTo(0)
    start()
  
    return { goTo, next, prev, start, stop }
  }
  
  /* Parallax for hero background slides */
  function initParallax() {
    const hero = document.querySelector('.hero__slides')
    if (!hero) return
    const onScroll = debounce(() => {
      const y = window.scrollY
      if (y > window.innerHeight) return
      hero.style.transform = `translateY(${y * 0.3}px)`
    }, 10)
    window.addEventListener('scroll', onScroll, { passive: true })
  }
  
  function initSliders() {
    // Hero slider
    const hero = document.querySelector('.hero')
    if (hero) createSlider(hero, { type: 'fade', interval: 5000 })
  
    // Testimonials slider
    const testimonial = document.querySelector('.testimonial-slider')
    if (testimonial) createSlider(testimonial, { type: 'slide', interval: 6000 })
  
    initParallax()
  }
  /* ============================================
     Scroll-triggered animations
     - Intersection Observer reveals (fade up/left/right/zoom)
     - Animated number counters for stats
     ============================================ */
  
  /* Shared observer for reveal-on-scroll elements */
  function initRevealObserver() {
    const els = document.querySelectorAll('.reveal')
    if (!els.length) return
  
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            obs.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )
  
    els.forEach((el) => observer.observe(el))
  }
  
  /* Stagger child reveals inside a grid */
  function initStaggeredReveals() {
    document.querySelectorAll('[data-stagger]').forEach((group) => {
      const children = group.querySelectorAll('.reveal')
      children.forEach((child, i) => {
        child.style.transitionDelay = `${i * 0.08}s`
      })
    })
  }
  
  /* Animated counters */
  function animateCounter(el) {
    const target = parseFloat(el.getAttribute('data-target')) || 0
    const suffix = el.getAttribute('data-suffix') || ''
    const decimals = (el.getAttribute('data-decimals') || '0') | 0
    const duration = 1800
    const start = performance.now()
  
    function frame(now) {
      const progress = Math.min((now - start) / duration, 1)
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
      const value = target * eased
      el.textContent = value.toFixed(decimals) + suffix
      if (progress < 1) requestAnimationFrame(frame)
      else el.textContent = target.toFixed(decimals) + suffix
    }
    requestAnimationFrame(frame)
  }
  
  function initCounters() {
    const counters = document.querySelectorAll('[data-target]')
    if (!counters.length) return
  
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target)
            obs.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.5 }
    )
  
    counters.forEach((c) => observer.observe(c))
  }
  
  /* FAQ accordion (contact page) */
  function initFAQ() {
    const items = document.querySelectorAll('.faq-item')
    if (!items.length) return
  
    items.forEach((item) => {
      const btn = item.querySelector('.faq-item__btn')
      const panel = item.querySelector('.faq-item__panel')
      if (!btn || !panel) return
  
      btn.setAttribute('aria-expanded', 'false')
      btn.setAttribute('aria-controls', panel.id || '')
  
      btn.addEventListener('click', () => {
        const isOpen = item.classList.contains('is-open')
        // Close all others (single-open accordion)
        items.forEach((other) => {
          if (other !== item) {
            other.classList.remove('is-open')
            other.querySelector('.faq-item__btn').setAttribute('aria-expanded', 'false')
            other.querySelector('.faq-item__panel').style.maxHeight = null
          }
        })
        if (isOpen) {
          item.classList.remove('is-open')
          btn.setAttribute('aria-expanded', 'false')
          panel.style.maxHeight = null
        } else {
          item.classList.add('is-open')
          btn.setAttribute('aria-expanded', 'true')
          panel.style.maxHeight = panel.scrollHeight + 'px'
        }
      })
    })
  }
  
  /* Contact form validation */
  function initContactForm() {
    const form = document.querySelector('#contactForm')
    if (!form) return
  
    const successBox = document.querySelector('#formSuccess')
  
    const validators = {
      name: (v) => v.trim().length >= 2 || 'Please enter your name (min 2 characters).',
      email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Please enter a valid email address.',
      phone: (v) => /^[\d\s()+\-]{7,}$/.test(v.trim()) || 'Please enter a valid phone number.',
      message: (v) => v.trim().length >= 10 || 'Please enter a message (min 10 characters).',
    }
  
    function validateField(field) {
      const name = field.getAttribute('name')
      const validator = validators[name]
      if (!validator) return true
      const result = validator(field.value)
      const errorEl = field.parentElement.querySelector('.form-error')
      if (result === true) {
        field.classList.remove('form-control--error')
        field.setAttribute('aria-invalid', 'false')
        if (errorEl) errorEl.classList.remove('is-visible')
        return true
      }
      field.classList.add('form-control--error')
      field.setAttribute('aria-invalid', 'true')
      if (errorEl) {
        errorEl.querySelector('span').textContent = result
        errorEl.classList.add('is-visible')
      }
      return false
    }
  
    // Live validation on blur
    form.querySelectorAll('.form-control').forEach((field) => {
      field.addEventListener('blur', () => validateField(field))
      field.addEventListener('input', () => {
        if (field.classList.contains('form-control--error')) validateField(field)
      })
    })
  
    form.addEventListener('submit', (e) => {
      e.preventDefault()
      let valid = true
      form.querySelectorAll('.form-control').forEach((field) => {
        if (!validateField(field)) valid = false
      })
      if (!valid) {
        const firstError = form.querySelector('.form-control--error')
        if (firstError) firstError.focus()
        return
      }
  
      const submitBtn = form.querySelector('button[type="submit"]')
      const originalBtnText = submitBtn ? submitBtn.textContent : ''
      if (submitBtn) {
        submitBtn.disabled = true
        submitBtn.textContent = 'Sending…'
      }
  
      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      })
        .then((response) => {
          if (response.ok) {
            if (successBox) {
              successBox.classList.add('is-visible')
              successBox.scrollIntoView({ behavior: 'smooth', block: 'center' })
            }
            form.reset()
            setTimeout(() => successBox && successBox.classList.remove('is-visible'), 6000)
          } else {
            alert("Sorry, something went wrong sending your message. Please call us or try again.")
          }
        })
        .catch(() => {
          alert("Sorry, something went wrong sending your message. Please call us or try again.")
        })
        .finally(() => {
          if (submitBtn) {
            submitBtn.disabled = false
            submitBtn.textContent = originalBtnText
          }
        })
    })
  }
  
  function initAnimations() {
    initRevealObserver()
    initStaggeredReveals()
    initCounters()
    initFAQ()
    initContactForm()
  }
  /* ============================================
     Gallery: filters, load-more pagination, lightbox
     ============================================ */
  
  const PAGE_SIZE = 12
  
  function initGallery() {
    const grid = document.querySelector('#galleryGrid')
    const loadMoreBtn = document.querySelector('#galleryLoadMore')
    const filterBtns = document.querySelectorAll('.gallery-filter')
    const lightbox = document.querySelector('#lightbox')
    const emptyState = document.querySelector('#galleryEmpty')
  
    if (!grid) return
  
    const allItems = Array.from(grid.querySelectorAll('.gallery-item'))
    let currentFilter = 'all'
    let visibleCount = PAGE_SIZE
    let renderToken = 0
  
    function matchesFilter(item) {
      return currentFilter === 'all' || item.dataset.type === currentFilter
    }
  
    function render() {
      const myToken = ++renderToken
      let shown = 0
      const toReveal = []
  
      allItems.forEach((item) => {
        const shouldShow = matchesFilter(item) && shown < visibleCount
  
        if (shouldShow) {
          shown++
          item.classList.remove('is-visible')
          item.style.display = ''
          toReveal.push(item)
        } else {
          item.classList.remove('is-visible')
          item.style.display = 'none'
        }
      })
  
      // Force a reflow so the browser registers the "hidden" starting
      // state before we add is-visible — otherwise no transition plays.
      void grid.offsetWidth
  
      // Double rAF: the first frame commits the reset state, the second
      // frame is where we add is-visible — this reliably re-triggers the
      // CSS transition every time (a single rAF is sometimes too early).
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (myToken !== renderToken) return // a newer render superseded this one
          toReveal.forEach((item, i) => {
            item.style.transitionDelay = `${i * 0.06}s`
            item.classList.add('is-visible')
          })
        })
      })
  
      const totalMatching = allItems.filter(matchesFilter).length
      if (loadMoreBtn) {
        loadMoreBtn.style.display = visibleCount < totalMatching ? '' : 'none'
      }
      if (emptyState) {
        emptyState.classList.toggle('is-visible', totalMatching === 0)
      }
      grid.style.display = totalMatching === 0 ? 'none' : ''
    }
  
    // Filter tab clicks
    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterBtns.forEach((b) => {
          b.classList.remove('is-active')
          b.setAttribute('aria-selected', 'false')
        })
        btn.classList.add('is-active')
        btn.setAttribute('aria-selected', 'true')
        currentFilter = btn.dataset.filter
        visibleCount = PAGE_SIZE
        render()
      })
    })
  
    // Load more
    if (loadMoreBtn) {
      loadMoreBtn.addEventListener('click', () => {
        visibleCount += PAGE_SIZE
        render()
      })
    }
  
    render()
  
    // ---- Lightbox ----
    if (!lightbox) return
    const content = lightbox.querySelector('.lightbox__content')
    const closeBtn = lightbox.querySelector('.lightbox__close')
  
    allItems.forEach((item) => {
      item.addEventListener('click', () => {
        const type = item.dataset.type
        const src = item.dataset.src
  
        content.innerHTML =
          type === 'video'
            ? `<video src="${src}" controls autoplay playsinline></video>`
            : `<img src="${src}" alt="" />`
  
        lightbox.classList.add('is-open')
      })
    })
  
    function close() {
      lightbox.classList.remove('is-open')
      content.innerHTML = ''
    }
  
    closeBtn.addEventListener('click', close)
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) close()
    })
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') close()
    })
  }

  function boot() {
    initNavigation();
    initSliders();
    initAnimations();
    initGallery();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
