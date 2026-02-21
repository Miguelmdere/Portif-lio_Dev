/* ═══════════════════════════════════════════════
   NAVBAR — scroll effect + hamburger + active link
═══════════════════════════════════════════════ */
const navbar = document.getElementById("navbar")
const hamburger = document.getElementById("hamburger")
const navLinks = document.getElementById("navLinks")

window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 30)
  updateActiveLink()
})

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open")
  navLinks.classList.toggle("open")
})

// fecha menu mobile ao clicar num link
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("open")
    navLinks.classList.remove("open")
  })
})

function updateActiveLink() {
  const sections = document.querySelectorAll("section[id]")
  const scrollY = window.scrollY + 100

  sections.forEach((section) => {
    const top = section.offsetTop
    const height = section.offsetHeight
    const id = section.getAttribute("id")
    const anchor = document.querySelector(`.nav-links a[href="#${id}"]`)

    if (anchor) {
      anchor.classList.toggle(
        "active",
        scrollY >= top && scrollY < top + height,
      )
    }
  })
}

/* ═══════════════════════════════════════════════
   TYPED TEXT — efeito de digitação no hero
═══════════════════════════════════════════════ */
const phrases = [
  "Full Stack Developer",
  "Analista QA",
  "React & Node.js",
  "Apaixonado por código",
]

let phraseIdx = 0
let charIdx = 0
let deleting = false
let pauseTimer = null
const typedEl = document.getElementById("typedText")

function type() {
  const current = phrases[phraseIdx]

  if (!deleting) {
    typedEl.textContent = current.slice(0, ++charIdx)
    if (charIdx === current.length) {
      deleting = true
      pauseTimer = setTimeout(type, 1800)
      return
    }
    setTimeout(type, 80)
  } else {
    typedEl.textContent = current.slice(0, --charIdx)
    if (charIdx === 0) {
      deleting = false
      phraseIdx = (phraseIdx + 1) % phrases.length
      setTimeout(type, 400)
      return
    }
    setTimeout(type, 40)
  }
}

type()

/* ═══════════════════════════════════════════════
   INTERSECTION OBSERVER — fade-in nos cards
═══════════════════════════════════════════════ */
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -40px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const el = entry.target
      const delay = el.dataset.delay ? parseInt(el.dataset.delay) : 0

      setTimeout(() => {
        el.classList.add("visible")
      }, delay)

      observer.unobserve(el)
    }
  })
}, observerOptions)

document.querySelectorAll(".skill-card, .projeto-card").forEach((el) => {
  observer.observe(el)
})

/* delay sequencial para projeto-cards */
document.querySelectorAll(".projeto-card").forEach((card, i) => {
  card.dataset.delay = i * 120
})

/* ═══════════════════════════════════════════════
   SMOOTH SCROLL com offset da navbar
═══════════════════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"))
    if (!target) return
    e.preventDefault()
    const navH = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue("--nav-h"),
    )
    const top = target.getBoundingClientRect().top + window.scrollY - navH
    window.scrollTo({ top, behavior: "smooth" })
  })
})
