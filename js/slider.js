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

export function initSliders() {
  // Hero slider
  const hero = document.querySelector('.hero')
  if (hero) createSlider(hero, { type: 'fade', interval: 5000 })

  // Testimonials slider
  const testimonial = document.querySelector('.testimonial-slider')
  if (testimonial) createSlider(testimonial, { type: 'slide', interval: 6000 })

  initParallax()
}
