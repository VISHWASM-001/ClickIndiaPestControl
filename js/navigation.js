/* ============================================
   Navigation
   - Sticky header shadow on scroll
   - Active link highlighting
   - Mobile hamburger + slide-in menu
   - Outside click / Esc to close, keyboard accessible
   ============================================ */

import { icons } from './icons.js'

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

export function initNavigation() {
  setActiveLink()
  initStickyHeader()
  initMobileMenu()
  initBackToTop()
  injectIcons()
}
