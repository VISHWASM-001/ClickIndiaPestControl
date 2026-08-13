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

export function initAnimations() {
  initRevealObserver()
  initStaggeredReveals()
  initCounters()
  initFAQ()
  initContactForm()
}
