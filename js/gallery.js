/* ============================================
   Gallery: filters, load-more pagination, lightbox
   ============================================ */

const PAGE_SIZE = 12

export function initGallery() {
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
