import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { AnimatePresence, motion } from 'motion/react'
import Lenis from 'lenis'
import { ArrowUpRight, Clock, MapPin, MessageCircle, Phone, Send, Star } from 'lucide-react'
import { siteConfig } from './data/siteConfig'

gsap.registerPlugin(ScrollTrigger)

const easeOutExpo = [0.23, 1, 0.32, 1]

export default function App() {
  const rootRef = useRef(null)
  const [activeCategory, setActiveCategory] = useState(siteConfig.priceCategories[0].id)

  const currentCategory =
    siteConfig.priceCategories.find((cat) => cat.id === activeCategory) ||
    siteConfig.priceCategories[0]

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return undefined

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    lenis.on('scroll', ScrollTrigger.update)

    const tick = (time) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
    }
  }, [])

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('.hero-stagger', {
          y: 26,
          opacity: 0,
          duration: 0.9,
          stagger: 0.09,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
        })

        gsap.to('.hero-parallax-img', {
          yPercent: 12,
          scale: 1.08,
          ease: 'none',
          scrollTrigger: {
            trigger: '.hero-section',
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })

        gsap.utils.toArray('.reveal-block').forEach((el) => {
          gsap.from(el, {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
            clearProps: 'transform,opacity',
            scrollTrigger: {
              trigger: el,
              start: 'top 84%',
              once: true,
            },
          })
        })

        gsap.utils.toArray('.parallax-frame img').forEach((img) => {
          gsap.fromTo(
            img,
            { scale: 1.1 },
            {
              scale: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: img.parentElement,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            }
          )
        })
      })

      return () => mm.revert()
    },
    { scope: rootRef }
  )

  return (
    <div ref={rootRef} className="min-h-screen bg-[#050505] text-[#F2EFE9] selection:bg-[#C8A96A]/25">
      <div className="grain-overlay" aria-hidden="true" />

      <header className="fixed inset-x-0 top-0 z-40 border-b border-[#F2EFE9]/[0.08] bg-[#050505]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <a href="#top" className="flex items-baseline gap-2.5">
            <span className="font-serif-display text-2xl font-medium tracking-wide text-[#F2EFE9]">
              {siteConfig.brandName}
            </span>
            <span className="hidden font-mono-num text-[11px] uppercase tracking-[0.18em] text-[#938E84] sm:inline">
              {siteConfig.city}
            </span>
          </a>

          <nav className="hidden items-center gap-8 text-sm text-[#938E84] md:flex">
            <a href="#studio" className="link-subtle">
              О студии
            </a>
            <a href="#prices" className="link-subtle">
              Прайс
            </a>
            <a href="#contacts" className="link-subtle">
              Контакты
            </a>
          </nav>

          <a
            href={siteConfig.contacts.telegramBookingUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-tactile btn-ghost-hover inline-flex items-center gap-2 rounded-full border border-[#F2EFE9]/15 px-4 py-2 text-xs font-medium tracking-wide text-[#F2EFE9]"
          >
            <Send className="h-3.5 w-3.5 text-[#C8A96A]" />
            <span>Telegram</span>
          </a>
        </div>
      </header>

      <main id="top">
        <section className="hero-section relative flex min-h-screen items-end overflow-hidden pt-28 pb-14 sm:pb-20">
          <div className="absolute inset-0">
            <img
              src={siteConfig.hero.image}
              alt={siteConfig.hero.imageAlt}
              className="hero-parallax-img h-full w-full object-cover object-center opacity-70 will-change-transform"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(180deg, rgba(5,5,5,0.62) 0%, rgba(5,5,5,0.28) 42%, rgba(5,5,5,0.92) 86%, #050505 100%)',
              }}
            />
          </div>

          <div className="relative z-10 mx-auto w-full max-w-6xl px-5 sm:px-8">
            <div className="max-w-3xl">
              <div className="hero-stagger mb-6 inline-flex items-center gap-3 rounded-full border border-[#F2EFE9]/12 bg-[#0A0A0C]/75 px-4 py-1.5 backdrop-blur-sm">
                <span className="font-mono-num text-[11px] uppercase tracking-[0.18em] text-[#C8A96A]">
                  {siteConfig.hero.eyebrow}
                </span>
                <span className="h-3 w-px bg-[#F2EFE9]/15" />
                <a
                  href={siteConfig.rating.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-[#F2EFE9]/90"
                >
                  <Star className="h-3 w-3 fill-[#C8A96A] text-[#C8A96A]" />
                  <span className="font-mono-num">{siteConfig.rating.score}</span>
                  <span className="text-[#938E84]">· {siteConfig.rating.reviewsCount}</span>
                </a>
              </div>

              <h1 className="hero-stagger font-serif-display text-5xl leading-[0.98] font-normal tracking-tight text-[#F2EFE9] sm:text-7xl md:text-[84px]">
                {siteConfig.hero.headline}
              </h1>

              <p className="hero-stagger mt-6 max-w-xl text-base leading-relaxed text-[#C7C2B8] sm:text-lg">
                {siteConfig.hero.description}
              </p>

              <div className="hero-stagger mt-9 flex flex-wrap items-center gap-3.5">
                <a
                  href={siteConfig.contacts.telegramBookingUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-tactile btn-primary-hover inline-flex items-center gap-2.5 rounded-full bg-[#C8A96A] px-6 py-3.5 text-sm font-semibold text-[#0A0A0C]"
                >
                  <Send className="h-4 w-4" />
                  <span>{siteConfig.hero.primaryCta}</span>
                </a>
                <a
                  href={siteConfig.contacts.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-tactile btn-ghost-hover inline-flex items-center gap-2.5 rounded-full border border-[#F2EFE9]/20 bg-[#0A0A0C]/65 px-6 py-3.5 text-sm font-medium text-[#F2EFE9] backdrop-blur-sm"
                >
                  <MessageCircle className="h-4 w-4 text-[#C8A96A]" />
                  <span>{siteConfig.hero.secondaryCta}</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="studio" className="border-t border-[#F2EFE9]/[0.08] bg-[#0A0A0C] py-24 sm:py-32">
          <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:items-center lg:gap-14">
            <div className="reveal-block lg:col-span-6">
              <p className="font-mono-num text-xs uppercase tracking-[0.22em] text-[#C8A96A]">
                {siteConfig.studio.label}
              </p>
              <h2 className="mt-4 font-serif-display text-4xl leading-[1.06] font-normal text-[#F2EFE9] sm:text-5xl">
                {siteConfig.studio.title}
              </h2>
              <p className="mt-6 text-base leading-relaxed text-[#938E84]">
                {siteConfig.studio.text}
              </p>

              <div className="mt-10 grid grid-cols-1 gap-6 border-t border-[#F2EFE9]/[0.09] pt-8 sm:grid-cols-3">
                {siteConfig.studio.highlights.map((item) => (
                  <div key={item.label}>
                    <div className="font-serif-display text-3xl text-[#F2EFE9]">{item.value}</div>
                    <p className="mt-1.5 text-xs leading-relaxed text-[#938E84]">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="reveal-block lg:col-span-6">
              <div className="parallax-frame relative aspect-[4/5] overflow-hidden rounded-2xl border border-[#F2EFE9]/[0.08] bg-[#111114]">
                <img
                  src={siteConfig.studio.image}
                  alt={siteConfig.studio.imageAlt}
                  loading="lazy"
                  className="h-full w-full object-cover will-change-transform"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#050505]/85 via-[#050505]/20 to-transparent p-6">
                  <div className="font-mono-num text-[11px] uppercase tracking-[0.18em] text-[#C8A96A]">
                    {siteConfig.rating.photosCount} работ в {siteConfig.rating.sourceLabel}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="prices" className="border-t border-[#F2EFE9]/[0.08] bg-[#050505] py-24 sm:py-32">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="reveal-block flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className="font-mono-num text-xs uppercase tracking-[0.22em] text-[#C8A96A]">
                  Услуги и стоимость
                </p>
                <h2 className="mt-3 font-serif-display text-4xl font-normal text-[#F2EFE9] sm:text-5xl">
                  Прайс-лист студии
                </h2>
              </div>
              <p className="max-w-sm text-sm leading-relaxed text-[#938E84]">
                Итоговая цена зависит от класса автомобиля и состояния лака. Точный расчет даем после
                осмотра или по фото в мессенджере.
              </p>
            </div>

            <div className="reveal-block mt-10 flex flex-wrap gap-2 border-b border-[#F2EFE9]/[0.09] pb-4">
              {siteConfig.priceCategories.map((cat) => {
                const isActive = cat.id === activeCategory
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveCategory(cat.id)}
                    className={`btn-tactile relative rounded-full px-5 py-2.5 text-sm font-medium ${
                      isActive ? 'text-[#0A0A0C]' : 'text-[#938E84] hover:text-[#F2EFE9]'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="creamActiveTab"
                        transition={{ duration: 0.25, ease: easeOutExpo }}
                        className="absolute inset-0 rounded-full bg-[#C8A96A]"
                      />
                    )}
                    <span className="relative z-10">{cat.title}</span>
                  </button>
                )
              })}
            </div>

            <div className="mt-8 min-h-[360px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentCategory.id}
                  initial={{ opacity: 0, scale: 0.985 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.985 }}
                  transition={{ duration: 0.22, ease: easeOutExpo }}
                  className="rounded-2xl border border-[#F2EFE9]/[0.09] bg-[#0A0A0C] p-5 sm:p-8"
                >
                  <div className="mb-6 flex flex-col justify-between gap-3 border-b border-[#F2EFE9]/[0.08] pb-5 sm:flex-row sm:items-center">
                    <div>
                      <h3 className="font-serif-display text-3xl text-[#F2EFE9]">
                        {currentCategory.title}
                      </h3>
                      <p className="mt-1 text-sm text-[#938E84]">{currentCategory.note}</p>
                    </div>
                    <a
                      href={siteConfig.contacts.telegramBookingUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-tactile btn-ghost-hover inline-flex items-center gap-2 self-start rounded-full border border-[#F2EFE9]/15 px-4 py-2 text-xs font-medium text-[#F2EFE9] sm:self-auto"
                    >
                      <span>Уточнить стоимость</span>
                      <ArrowUpRight className="h-3.5 w-3.5 text-[#C8A96A]" />
                    </a>
                  </div>

                  <ul className="divide-y divide-[#F2EFE9]/[0.07]">
                    {currentCategory.items.map((item) => (
                      <li
                        key={item.name}
                        className="price-row-hover flex items-baseline justify-between gap-4 rounded-lg px-2 py-4 transition-colors duration-200"
                      >
                        <span className="text-sm text-[#E7E2D9] sm:text-base">{item.name}</span>
                        <span className="font-mono-num shrink-0 text-sm font-medium text-[#C8A96A] sm:text-base">
                          {item.price}
                        </span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>

        <section className="border-t border-[#F2EFE9]/[0.08] bg-[#0A0A0C] py-24 sm:py-28">
          <div className="mx-auto grid max-w-6xl gap-8 px-5 sm:px-8 md:grid-cols-2">
            {siteConfig.gallery.map((card) => (
              <article
                key={card.title}
                className="reveal-block overflow-hidden rounded-2xl border border-[#F2EFE9]/[0.08] bg-[#111114]"
              >
                <div className="parallax-frame aspect-[16/10] overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.alt}
                    loading="lazy"
                    className="h-full w-full object-cover will-change-transform"
                  />
                </div>
                <div className="p-6 sm:p-8">
                  <h3 className="font-serif-display text-3xl text-[#F2EFE9]">{card.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-[#938E84]">{card.caption}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer id="contacts" className="border-t border-[#F2EFE9]/[0.09] bg-[#050505] py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="reveal-block grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <p className="font-mono-num text-xs uppercase tracking-[0.22em] text-[#C8A96A]">
                Запись и контакты
              </p>
              <h2 className="mt-3 font-serif-display text-4xl font-normal text-[#F2EFE9] sm:text-5xl">
                Напишите нам, подберем удобное время
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-[#938E84]">
                {siteConfig.contacts.bookingNote}. Отвечаем в Telegram и WhatsApp, можно сразу
                прислать фото автомобиля для предварительной оценки.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={siteConfig.contacts.telegramBookingUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-tactile btn-primary-hover inline-flex items-center gap-2.5 rounded-full bg-[#C8A96A] px-6 py-3.5 text-sm font-semibold text-[#0A0A0C]"
                >
                  <Send className="h-4 w-4" />
                  <span>Написать в Telegram</span>
                </a>
                <a
                  href={siteConfig.contacts.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-tactile btn-ghost-hover inline-flex items-center gap-2.5 rounded-full border border-[#F2EFE9]/20 px-6 py-3.5 text-sm font-medium text-[#F2EFE9]"
                >
                  <MessageCircle className="h-4 w-4 text-[#C8A96A]" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:col-span-6">
              <div className="rounded-2xl border border-[#F2EFE9]/[0.08] bg-[#0A0A0C] p-6">
                <MapPin className="h-4 w-4 text-[#C8A96A]" />
                <div className="mt-4 text-sm font-medium text-[#F2EFE9]">
                  {siteConfig.contacts.address}
                </div>
                <div className="mt-1 text-xs text-[#938E84]">{siteConfig.contacts.district}</div>
                <a
                  href={siteConfig.rating.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 text-xs text-[#C8A96A]"
                >
                  <span>Открыть в 2ГИС</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>

              <div className="rounded-2xl border border-[#F2EFE9]/[0.08] bg-[#0A0A0C] p-6">
                <Clock className="h-4 w-4 text-[#C8A96A]" />
                <div className="mt-4 text-sm font-medium text-[#F2EFE9]">
                  {siteConfig.contacts.hours}
                </div>
                <div className="mt-1 text-xs text-[#938E84]">{siteConfig.contacts.dayOff}</div>
                <a
                  href={siteConfig.contacts.phoneHref}
                  className="mt-4 inline-flex items-center gap-2 font-mono-num text-xs text-[#F2EFE9]"
                >
                  <Phone className="h-3.5 w-3.5 text-[#C8A96A]" />
                  <span>{siteConfig.contacts.phoneDisplay}</span>
                </a>
              </div>
            </div>
          </div>

          <div className="mt-16 flex flex-col justify-between gap-4 border-t border-[#F2EFE9]/[0.08] pt-6 text-xs text-[#938E84] sm:flex-row sm:items-center">
            <span>{siteConfig.brandName} · {siteConfig.city}</span>
            <div className="flex items-center gap-6">
              <a
                href={siteConfig.contacts.telegramChannelUrl}
                target="_blank"
                rel="noreferrer"
                className="link-subtle"
              >
                Канал в Telegram
              </a>
              <a
                href={siteConfig.contacts.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="link-subtle"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
