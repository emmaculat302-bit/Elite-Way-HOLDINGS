import { Routes, Route, Link, NavLink, useLocation, useParams, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Menu, X, ArrowRight, Cpu, Megaphone, Palette, Globe, Sparkles, Shield, Activity, Database, Briefcase, HeartPulse, Users, Mail, Play } from 'lucide-react'
import { IconInstagram, IconLinkedIn, IconX, IconWhatsApp, IconCall } from './Icons'
import DataSystem from './systems/DataSystem'
import CRM from './systems/CRM'
import Healthcare from './systems/Healthcare'
import Business from './systems/Business'
import MotionFX, { CountUp } from './MotionFX'
import SiteChat from './SiteChat'
import Stars from './Stars'

const asset = (p) => `${import.meta.env.BASE_URL}${String(p).replace(/^\//, '')}`

const IMG = 'https://res.cloudinary.com/f4lhkjhs/image/upload/f_auto,q_auto/eliteway'
const SITE = 'https://www.eliteway.co.za'

function setMeta(attr, key, value) {
  if (!value) return
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', value)
}

function SeoHead() {
  const loc = useLocation()
  useEffect(() => {
    const path = loc.pathname
    let title = 'Elite Way Holdings — Pretoria software house | web from R1 500'
    let desc = 'Still running on a WhatsApp status? Pretoria software house. 2.5M+ Embedded views, 100 GDE East halls, 500+ Club SA. Web from R1 500. WhatsApp 076 342 5896.'
    let image = `${SITE}/logo-mark.png`
    if (path.startsWith('/work/')) {
      const c = CASES.find((x) => x.slug === path.split('/')[2])
      if (c) {
        title = `${c.brand} — Elite Way Holdings case study`
        desc = `${c.kpi}. ${c.result}`.slice(0, 160)
        if (c.img) image = c.img
      }
    } else if (path === '/work') {
      title = 'Case studies — Elite Way Holdings'
      desc = 'ART Close the Gap at Shell Okgonne, Soshanguve school halls, Edu School Communicator, Embedded 2.5M views, Foreal, Luyuanda Ngququ.'
    } else if (path.startsWith('/services')) {
      title = 'Packages — Elite Way Holdings'
      desc = 'Web & software from R1 500. AI from R2 000. Pretoria. Elite Way Holdings.'
    } else if (path.startsWith('/systems')) {
      title = 'SaaS labs — Elite Way Holdings'
      desc = 'Clearline, Housebook, Wardlight, Tillhouse. Software you can click. Elite Way Holdings, Pretoria.'
    } else if (path === '/contact') {
      title = 'Contact Elite Way Holdings'
      desc = 'WhatsApp 076 342 5896. info@eliteway.co.za. Pretoria.'
    } else if (path === '/about') {
      title = 'About — Elite Way Holdings'
      desc = 'Pretoria software house. Elite Way Holdings, Marketing, Club SA. Same operator. Proof first.'
    } else if (path === '/faq') {
      title = 'FAQ — Elite Way Holdings'
      desc = 'Prices, Pretoria, proof, Close the Gap, who owns the work. WhatsApp 076 342 5896.'
    } else if (path === '/brightmind') {
      title = 'BrightMind — Elite Way Holdings'
      desc = 'South African AI tutoring for Grades R–12. CAPS. Free 70-family pilot until 2 December 2026. brightmind.eliteway.co.za'
    } else if (path === '/method') {
      title = 'How House, Closer and Marketing OS run client growth — Elite Way Holdings'
      desc = 'Three internal desks. AI short and pinned. Leads from this site to WhatsApp. Calendar and kits. No staff URLs. Pretoria.'
    }
    document.title = title
    setMeta('name', 'description', desc)
    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', desc)
    setMeta('property', 'og:url', SITE + path)
    setMeta('property', 'og:image', image)
    setMeta('name', 'twitter:title', title)
    setMeta('name', 'twitter:description', desc)
    let link = document.head.querySelector('link[rel="canonical"]')
    if (!link) {
      link = document.createElement('link')
      link.rel = 'canonical'
      document.head.appendChild(link)
    }
    link.href = SITE + (path === '/' ? '/' : path)
  }, [loc.pathname])
  return null
}

const SOCIAL = {
  linkedin: 'https://www.linkedin.com/company/elite-way-holding/',
  twitter: 'https://x.com/EliteWayHolding',
  instagram: 'https://www.instagram.com/eliteway_club.sa/',
}

function OutLink({ href, className = '', children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`cursor-pointer pointer-events-auto ${className}`}
      onClick={(e) => {
        e.stopPropagation()
        window.open(href, '_blank', 'noopener,noreferrer')
      }}
    >
      {children}
    </a>
  )
}
const WA = 'https://wa.me/27763425896'
const CALL = 'tel:0500376323'
const MAIL = 'mailto:info@eliteway.co.za'

const fade = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}
const stagger = { show: { transition: { staggerChildren: 0.08 } } }

const SERVICES = [
  {
    slug: 'web-software',
    Icon: Globe,
    title: 'Web & software development',
    blurb: 'Custom platforms, SaaS products and systems that scale.',
    from: 'R1 500',
    custom: false,
    whyTitle: 'Why your business needs a real system — not a template',
    why: `If a client cannot find you, tap you, or pay you in three seconds, they leave. A WhatsApp status is not a company. A borrowed Wix theme is not an asset. Web and software is Elite Way’s core because it is the only layer that keeps working at 2am: your story, your leads, your product, sitting on infrastructure you own.

Pretoria businesses still lose deals to “I’ll send the link” — and then there is no link. Students at Foreal enrolled because the path was obvious. World Apps reached 100 GDE schools because the product had a place to live. We build that place: sites, portals, SaaS, internal tools. Starting at R1 500 so a spaza-to-studio brand can start, and scaling to custom software when you are ready to run the city.`,
    proof: 'Core focus of Elite Way Holdings. Built for brands that outgrew a bio link.',
    close: 'Every day without a site, someone else’s site answers the search. Start at R1 500. Own the door.',
    packages: [
      { name: 'Launch site', price: 'From R1 500', why: 'You need to exist online this week — clean, fast, with a WhatsApp button that actually converts.', items: ['One-page or starter site', 'Mobile-first layout', 'WhatsApp + contact path', '7-day first draft'] },
      { name: 'Business platform', price: 'From R4 500', why: 'You have offers, a team, and repeat clients. You need pages, forms and a back office — not another brochure.', items: ['Multi-page site or portal', 'CMS / admin basics', 'Forms to our backend', 'SEO foundations'] },
      { name: 'Custom software', price: 'Quoted', why: 'Your process does not fit Shopify. CRM, data, healthcare, ops — we architect the system.', items: ['SaaS / internal systems', 'Auth, data, dashboards', 'Integrations', 'Optional support'] },
    ],
  },
  {
    slug: 'ai-tooling',
    Icon: Cpu,
    title: 'AI & modern tooling',
    blurb: 'Google AI fundamentals, HeyGen, Claude, automation in the stack.',
    from: 'R2 000',
    custom: false,
    whyTitle: 'Why AI is no longer optional for a Pretoria operator',
    why: `Your competitors are not working longer hours. They are letting models draft captions, cut video, answer FAQs and chase invoices while they sleep. If you are still doing every task by hand, you are paying a hidden tax.

Elite Way already lives in this stack — Google AI Fundamentals, HeyGen, Claude, CapCut, Canva. We do not sell fear. We install the tools, train your people, and leave you with a workflow that ships. Packages start at R2 000 because the first win should be cheap enough to try and sharp enough to feel.`,
    proof: 'Trained on Google AI, Claude Academy, HeyGen — then used on real campaigns.',
    close: 'The brands that learn the tools this year will look unfair next year. Start at R2 000.',
    packages: [
      { name: 'AI starter', price: 'From R2 000', why: 'You have heard of ChatGPT. You have not bent it around your actual business yet.', items: ['Tooling audit', 'Claude / Gemini / HeyGen setup', 'One automated workflow', 'Team walkthrough'] },
      { name: 'Ops automation', price: 'From R5 500', why: 'Content, support or admin is eating the week. We chain the tools so the week comes back.', items: ['Multi-step automations', 'Content or support bots', 'Dashboard of runs', 'Handover docs'] },
      { name: 'Embedded AI', price: 'Quoted', why: 'You want intelligence inside the product — not a sidebar gimmick.', items: ['AI inside your product', 'Prompts & guardrails', 'Data handling', 'Iteration sprints'] },
    ],
  },
  {
    slug: 'digital-influencer',
    Icon: Megaphone,
    title: 'Digital & influencer marketing',
    blurb: 'Campaigns that trend — 2M+ views, real enrolments, real communities.',
    from: 'R2 500',
    custom: false,
    whyTitle: 'Why posting into the void never built a brand',
    why: `The feed does not owe you a living. Without a campaign architecture — hook, creator, distribution, convert — you are decorating. Elite Way ran a video for Embedded Clothing past two million views and sent legging sets into a trend. Foreal’s DJ competition did not “raise awareness”; it filled classrooms.

Influencers are not decoration. They are distribution we already know how to brief. Packages start at R2 500 so a real campaign is cheaper than another month of guessing.`,
    proof: '2M+ views. Trending product. Enrolments. Not vanity metrics.',
    close: 'If the market has not heard you, it will buy the loudest neighbour. Start at R2 500.',
    packages: [
      { name: 'Pulse campaign', price: 'From R2 500', why: 'You need a moment — one idea, creators, and a week that actually moves.', items: ['Concept + 3 content pieces', '1–2 creator placements', 'Posting calendar', 'Performance readout'] },
      { name: 'Trend engine', price: 'From R7 500', why: 'You are launching a drop or a course. You need architecture, not a single post.', items: ['Full campaign architecture', 'Influencer roster', 'Paid + organic mix', 'Weekly optimisation'] },
      { name: 'Always-on', price: 'Quoted monthly', why: 'Growth is a habit. We stay in the feed so you stay in the culture.', items: ['Retainer content + talent', 'Community replies', 'Drop / launch support', 'Reporting'] },
    ],
  },
  {
    slug: 'community',
    Icon: Users,
    title: 'Community building',
    blurb: 'From Elite Way Club to Holdings — members first.',
    from: 'R900',
    custom: false,
    whyTitle: 'Why customers forget you — and members do not',
    why: `A sale is a handshake. A community is a house. Through Elite Way Club we did not just host rooms — we learned the youth: over 500 contacts, mostly Pretoria, then Johannesburg, then scattered. That book is not a mailing list. It is a map of who actually showed up.

If your WhatsApp is a broadcast list, you do not have a community. You have noise. Packages start at R900 because the first room should be affordable to open.`,
    proof: '500+ youth contacts from the Club era — Pretoria first, Johannesburg second.',
    close: 'Paid ads rent attention. Community owns it. Start at R900.',
    packages: [
      { name: 'Community spark', price: 'From R900', why: 'You have fans but no room. We open the channel and the welcome.', items: ['Channel setup', 'Welcome ritual', 'First 14-day content', 'Member rules'] },
      { name: 'Member house', price: 'From R3 200', why: 'You are ready for events, UGC and a culture people screenshot.', items: ['Experiential event design', 'UGC loops', 'Moderation playbook', 'Growth targets'] },
      { name: 'House retain', price: 'Quoted monthly', why: 'A house without a host dies. We keep the lights on.', items: ['Ongoing community ops', 'Events calendar', 'Creator members', 'Health metrics'] },
    ],
  },
  {
    slug: 'brand-content',
    Icon: Palette,
    title: 'Brand, content & design',
    blurb: 'Strategy, graphic design, video editing, Canva, CapCut.',
    from: 'R1 250',
    custom: false,
    whyTitle: 'Why looking “almost professional” is still invisible',
    why: `People decide in a scroll. Mismatched fonts, stretched logos, and phone videos with no cut tell the market you are not ready for their money. Brand is not vanity — it is trust, compressed.

We do strategy, graphic design, video editing. Canva and CapCut so your team can keep shipping after we leave. Packages start at R1 250: enough to look inevitable, not enough to stall the dream.`,
    proof: 'Campaign creative that dressed 2M-view moments and academy launches.',
    close: 'If they cannot feel you in one frame, they will not book the call. Start at R1 250.',
    packages: [
      { name: 'Identity spark', price: 'From R1 250', why: 'You need a face: colour, type, templates, a one-pager you can send today.', items: ['Logo lockup use', 'Colour + type', '3 social templates', 'Brand one-pager'] },
      { name: 'Content studio', price: 'From R3 800', why: 'The feed is hungry. We shoot or edit a pack you can run for weeks.', items: ['Shoot or edit pack', 'Reels / shorts set', 'Graphic kit', 'Caption bank'] },
      { name: 'Brand system', price: 'Quoted', why: 'You are building a house brand. You need rules, campaigns, a language.', items: ['Full strategy', 'Guidelines', 'Campaign creative', 'Ongoing design'] },
    ],
  },
  {
    slug: 'secure-growth',
    Icon: Shield,
    title: 'Secure growth systems',
    blurb: 'Cisco cybersecurity literacy + disciplined delivery.',
    from: 'Custom',
    custom: true,
    whyTitle: 'Why growth without security is just a louder target',
    why: `The more visible you become, the more interesting you are to people who should not have your data. Shared passwords, no backups, staff on public Wi-Fi — this is how a good month becomes a closed shop.

Elite Way carries Cisco Introduction to Cybersecurity literacy into every build. We do not scare you into a product. We scope the real surface: access, backups, delivery, people. Pricing is custom because a salon and a school app do not share a threat model. If we printed a fake “from R…” here, we would be lying.`,
    proof: 'Cisco-informed practice. Security as part of delivery, not a sticker.',
    close: 'Ask for a scoped quote. The cost of guessing is always higher.',
    packages: [
      { name: 'Posture review', price: 'Custom', why: 'You do not know what you do not know. We show you, then the quick wins.', items: ['Access & tooling audit', 'Risk notes', 'Quick wins', 'Cisco-informed hygiene'] },
      { name: 'Hardened delivery', price: 'Custom', why: 'You are shipping software or handling client data. Build it so it does not leak.', items: ['Secure SDLC for your build', 'Backups & roles', 'Incident basics', 'Staff briefing'] },
      { name: 'Ongoing guardian', price: 'Custom retainer', why: 'Threats update. So should you.', items: ['Monthly checks', 'Patch cadence', 'Policy updates', 'On-call path'] },
    ],
  },
]

const CASES = [
  {
    slug: 'art-follow-up',
    brand: 'ART lost-to-follow-up · Shell Okgonne',
    img: IMG + '/health/h2.jpg',
    fit: 'contain',
    gallery: [IMG + '/health/h1.jpg', IMG + '/health/h2.jpg', IMG + '/health/h3.jpg', IMG + '/health/h4.jpg', IMG + '/health/h5.jpg', IMG + '/health/h6.jpg'],
    videos: [],
    kpi: '1.1M men',
    stats: [['17 Aug 2026', 'Shell Okgonne'], ['DoH · Wits RHI · HTS', 'one data room'], ['Ga-Rankuwa', 'Close the Gap']],
    tag: 'Health · Software',
    year: '2026',
    url: null,
    challenge: 'President Ramaphosa named the gap: about 1.1 million men in South Africa lost to follow-up on antiretroviral (ART) treatment. A local campaign had to move faster than paper. Stakeholders were on the same ground — and not on the same spreadsheet.',
    approach: 'Elite Way built the app for the teams. On 17 August 2026 at Shell Okgonne (Ga-Rankuwa), local HTS ran next to Wits RHI self-testing kits and a PEPFAR mobile clinic. Gauteng DoH screened blood sugar and blood pressure. SMU and Ga-Rankuwa Young Adults Against HIV/AIDS were on the ground. One product streamed the data so every stakeholder stayed in the loop, and fired automated reminders to patients about their appointments.',
    result: 'Not a poster. A live campaign: HTS, Wits RHI kits, DoH screenings, Shell Okgonne as ground. Software that made the queue, the test, and the next appointment belong to the same record.',
  },
  {
    slug: 'punyete',
    brand: 'PUNYETE Clothing',
    img: IMG + '/punyete/logo.jpg',
    fit: 'contain',
    gallery: [IMG + '/punyete/logo.jpg'],
    videos: [],
    kpi: 'Order OS',
    stats: [['After order', 'client link'], ['Sheet + DB', 'for the team'], ['Fewer', 'human errors']],
    tag: 'Software · Retail',
    year: 'Systems',
    url: null,
    challenge: 'Managing online sales by hand — DMs, notes, screenshots — is how orders get lost, sizes mix, and payments do not match the drop. Human error is not a personality flaw. It is the cost of no system.',
    approach: 'Elite Way built an order system for PUNYETE Clothing. After an order, the client gets a link to fill in their details. That form writes a populated sheet and a database the team can actually use — not a chat they have to hunt.',
    result: 'Online sales became easier to run. The team sees the order. The client fills the gap. The sheet fills itself. Same software discipline as the health field app, applied to a clothing house.',
  },
  {
    slug: 'soshanguve',
    brand: 'Soshanguve school give-back',
    img: IMG + '/soshanguve/s6.jpg',
    gallery: [IMG + '/soshanguve/s1.jpg', IMG + '/soshanguve/s2.jpg', IMG + '/soshanguve/s3.jpg', IMG + '/soshanguve/s4.jpg', IMG + '/soshanguve/s5.jpg', IMG + '/soshanguve/s6.jpg', IMG + '/soshanguve/s7.jpg'],
    videos: [],
    kpi: '2024 seed',
    stats: [['2024', 'Soshanguve'], ['Free cuts', 'learners'], ['Hall', 'not a stage']],
    tag: 'School tour · Community',
    year: '2024',
    url: null,
    challenge: 'A local school. No tour budget. A printing company and a barbershop who wanted to give something back, not post about it.',
    approach: 'Elite Way walked in with Stella Star 3D Printings and The Famous Barber. Step-and-repeat in the school hall. Clippers on. Learners in uniform. Tape running. Community first.',
    result: 'A day that actually happened. The first school we treated as a real room — and the muscle we later took into a hundred halls.',
  },
  {
    slug: 'edu-school-communicator',
    brand: 'World Apps · Edu School Communicator',
    img: IMG + '/brands/worldapps.jpg',
    gallery: [IMG + '/brands/worldapps.jpg'],
    videos: [
      { title: 'School tours — live', kind: 'youtube', id: 'NQEYYiFA7BE', href: 'https://www.youtube.com/live/NQEYYiFA7BE' },
    ],
    kpi: '100 schools',
    stats: [['100', 'GDE East schools'], ['NPC app', 'World Apps'], ['Halls', 'live tape']],
    tag: 'School tour · EdTech',
    year: 'District',
    url: 'https://play.google.com/store/apps/details?id=app.lovable.dbcab1931a3f4b638b21aba3ec25cd89',
    challenge: 'World Apps Developers needed more than a store listing. An NPC app dies if it never leaves the deck.',
    approach: 'The living layer: events, workshops, launches, school-hall tours. Influencers for reach. Operators for the last mile. Teachers and learners in the loop — in the hall, not a classroom pitch.',
    result: 'A pilot across 100 schools in Johannesburg East, Gauteng Department of Education. Software that survived the parking lot.',
  },
  {
    slug: 'embedded',
    brand: 'Embedded Clothing',
    img: IMG + '/embedded/e3.jpg',
    fit: 'contain',
    proof: IMG + '/embedded/proof.png',
    gallery: [IMG + '/embedded/e1.jpg', IMG + '/embedded/e2.jpg', IMG + '/embedded/e3.jpg'],
    videos: [
      { title: 'Behind the screen — campaign reel', kind: 'instagram', id: 'C45zTwHMb-x', href: 'https://www.instagram.com/reel/C45zTwHMb-x/' },
    ],
    kpi: '2.5M+',
    stats: [['2.5M+', 'combined organic'], ['2M', 'on one reel'], ['55.8K · 43.1K', 'sister cuts']],
    tag: 'Streetwear · Content',
    year: 'Campaign',
    url: 'https://shop.embeddedclothing.com/',
    challenge: 'The product was already in the culture. The feed was not treating it like a drop that had to sell out.',
    approach: 'We built one video as architecture, not content: hook, product, creators, matching-legging sets, a feed that behaved like a runway. The reel is the behind-the-screen of that rollout.',
    result: 'Over 2.5 million combined organic views on a single campaign rollout — one cut past 2M, sister pieces at 55.8K and 43.1K. The streets and the algorithm agreed.',
  },
  {
    slug: 'foreal',
    brand: 'Foreal DJ Academy',
    img: IMG + '/brands/foreal.jpg',
    gallery: [IMG + '/brands/foreal.jpg'],
    videos: [
      { title: 'Foreal DJ competition', kind: 'youtube', id: 'ZDe5Lxqwav0', href: 'https://youtu.be/ZDe5Lxqwav0' },
    ],
    kpi: 'DJ competition',
    stats: [['Ga-Rankuwa', 'academy'], ['Competition', 'tape'], ['YouTube', 'live window']],
    tag: 'Education · Competition',
    year: 'Education',
    url: 'https://www.timeslive.co.za/tshisa-live/tshisa-live/2024-06-11-deep-house-dj-adds-south-african-sound-in-his-djing-school/',
    challenge: 'Purpose was already there — kasi talent, real booths. The market still treated the academy like a rumour.',
    approach: 'A DJ competition with associated brands: stages, partners, content, a path from the room to the booth. The tape is the competition — not a mock-up.',
    result: 'The competition ran. The academy kept teaching house, hip-hop and amapiano. Watch the cut.',
  },
  {
    slug: 'luyuanda',
    brand: 'Luyuanda Ngququ',
    img: IMG + '/luyuanda/l1.jpg',
    gallery: [IMG + '/luyuanda/l1.jpg', IMG + '/luyuanda/l2.jpg', IMG + '/luyuanda/l3.jpg'],
    videos: [
      { title: 'Profile — Instagram', kind: 'igpost', id: 'DbA684iMdDJ', href: 'https://www.instagram.com/p/DbA684iMdDJ/' },
    ],
    kpi: 'Top 10 Teen Mr SA',
    stats: [['Top 10', 'Teen Mr South Africa'], ['Member', 'from day one'], ['Network', 'brands we walk']],
    tag: 'Member · Pageant',
    year: 'Talent',
    url: 'https://www.instagram.com/p/DbA684iMdDJ/',
    challenge: 'A young member in the house — not a finished headline. Brands in the network, shoots, discipline, a long walk before the sash.',
    approach: 'We worked with Luyuanda Ngququ from the beginning: brands in our network, content, the BENLUC and street looks, a profile that could carry a pageant. Hard work on both sides. No overnight story.',
    result: 'He is Top 10 Teen Mr South Africa. The member who stayed in the work. Open his Instagram profile from the header tape.',
  },
]

const FAQS = [
  ['What is Elite Way Holdings?', 'A Pretoria software and growth house. Same operator as Elite Way Marketing and Elite Way Club SA. Club was the community. Holdings is the software vessel. Not a template agency.'],
  ['Are you an agency or a tech company?', 'Software is the core: sites, systems, SaaS labs (Clearline, Housebook, Wardlight, Tillhouse). Campaigns and community hang off a place that exists at 2am. We are not “posts for hire”.'],
  ['How much does a website or system cost?', 'Packages start at R1 500 for a launch site, R2 000 for AI tooling, R2 500 for a pulse campaign, R900 for a community spark, R1 250 for identity. Custom software and secure growth are quoted. Scope is agreed in writing before we start.'],
  ['How long does a project take?', 'A launch site is drafted in about seven days. Campaigns and district work take the time the room needs — you see drafts; you do not vanish into a six-week black box.'],
  ['Do I need an app, a website, or both?', 'If people cannot find you, tap you, or pay you in three seconds, start with a real site. If the work is in the field — like Close the Gap ART follow-up or a school-hall app — we build the system the teams actually use.'],
  ['How do you measure results?', 'Numbers that happened: 2.5M+ combined organic views for Embedded Clothing; 100 GDE East schools; Close the Gap at Shell Okgonne; 500+ youth contacts from Elite Way Club (Pretoria first, Johannesburg second); a live order system for PUNYETE Clothing. Not vanity likes.'],
  ['Do you only work in Pretoria?', 'The house is Pretoria-born. The work is national: Johannesburg East GDE, Ga-Rankuwa, Soshanguve, charts, WhatsApp from anywhere. WhatsApp 076 342 5896.'],
  ['Who owns the work when we are done?', 'Your site, your system, your story — on infrastructure you own. We handover, train, and stay if you want the house staffed. We do not hold your keys hostage.'],
  ['Will you train our team on AI?', 'Yes. Google AI, Claude, HeyGen, CapCut, Canva — we install the tools, walk the people, leave a workflow that ships. AI starter from R2 000.'],
  ['Do you do branding and video as well as code?', 'Yes. Brand, content, design, CapCut, Canva. The 2.5M Embedded reel sat next to product. Creative without a convert path is decoration.'],
  ['How do you handle data and security?', 'Cisco-informed practice. Secure growth is custom because a salon and a school or health app do not share a threat model. Access, backups, roles — not a sticker.'],
  ['What is Close the Gap?', 'A local health campaign after President Ramaphosa named ~1.1 million men lost to ART follow-up. On 17 August 2026 at Shell Okgonne, Ga-Rankuwa, we ran the field app so HTS, Wits RHI, and DoH shared one record and patients got appointment reminders.'],
  ['Can a small brand afford you?', 'Starting prices exist so a spaza-to-studio brand can start. R1 500 is the web floor. WhatsApp if the page is longer than your patience.'],
  ['Why not just hire influencers?', 'Influencers are distribution we already brief. Without architecture — hook, creator, convert — you are decorating. Embedded’s matching sets trended because the video was a system, not a favour.'],
  ['What is BrightMind?', 'BrightMind is Elite Way’s South African AI tutoring app for Grades R–12, CAPS-aligned. Homework help, whiteboard, past-paper style drills, week-by-week plans. Live at brightmind.eliteway.co.za. A 70-family free pilot runs until 2 December 2026. No card during the pilot.'],
  ['How do you run leads and the house?', 'Internally we run three desks: House (founder view, partner thread and pins), Closer (sales pipeline, WhatsApp-first quotes), and Marketing OS (calendar, kits, captions). They are staff tools, not public products. No staff URLs on this site. Your door is this site, WhatsApp 076 342 5896, or the chat. A public question can become a lead we follow up — we do not publish pipeline, keys, or banking. Full record: /method.'],
  ['How does AI help your clients grow?', 'House AI is short: one thread plus pins so the brief does not scatter. Closer turns a site form or public chat into a WhatsApp card so follow-up is a person, not a void. Marketing OS keeps the week: kits, captions, calendar. Observe is a never-sleeps brief on House only — rule-based, not a public bot dumping internal data. The client never logs into a desk.'],
]

function Nav() {
  const [open, setOpen] = useState(false)
  const loc = useLocation()
  useEffect(() => setOpen(false), [loc])
  const links = [['/', 'Home'], ['/services', 'Packages'], ['/work', 'Work'], ['/brightmind', 'BrightMind'], ['/method', 'How we run'], ['/about', 'About'], ['/contact', 'Contact']]
  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="mx-auto max-w-7xl px-3 py-2 flex items-center justify-between glass mt-2 mx-3">
        <Link to="/" className="flex items-center gap-2">
          <img src={asset('logo-mark.png')} alt="" className="h-8 w-8 object-contain" />
          <span className="font-black tracking-tight text-sm hidden sm:block">Elite Way Holdings</span>
        </Link>
        <nav className="hidden md:flex items-center gap-5 text-sm" aria-label="Primary">
          {links.map(([to, label]) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                'pb-0.5 border-b ' + (isActive ? 'text-white border-white' : 'text-white/55 border-transparent hover:text-white')
              }
            >{label}</NavLink>
          ))}
        </nav>
        <button className="md:hidden" type="button" aria-label="Menu" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      </div>
      {open && (
        <nav className="md:hidden glass mx-3 mt-2 p-4 flex flex-col gap-3 text-sm" aria-label="Mobile">
          {links.map(([to, label]) => <Link key={to} to={to}>{label}</Link>)}
        </nav>
      )}
    </header>
  )
}

function Footer() {
  return (
    <footer className="border-t border-white/10 mt-12 py-8 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-6 text-sm">
        <div>
          <img src={asset('logo-full.png')} alt="Elite Way Holdings" className="h-16 object-contain bg-transparent" />
          <p className="text-white/50 text-xs mt-2">Pretoria software house. All rights reserved.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Go</h4>
          <div className="grid gap-1 text-white/70">
            <Link to="/services">Packages</Link>
            <Link to="/work">Work</Link>
            <Link to="/brightmind">BrightMind</Link>
            <Link to="/about">About</Link>
            <Link to="/faq">FAQ</Link>
            <Link to="/method">How we run</Link>
            <Link to="/systems">SaaS labs</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Contact</h4>
          <OutLink className="flex items-center gap-2 text-white/70 underline" href={MAIL}><Mail size={14} /> info@eliteway.co.za</OutLink>
          <a className="flex items-center gap-2 text-white/70 underline" href={CALL}><IconCall size={14} /> 0500 376 323</a>
          <OutLink className="flex items-center gap-2 text-white/70 underline" href={WA}><IconWhatsApp size={14} /> 076 342 5896</OutLink>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Social</h4>
          <OutLink className="flex items-center gap-2 text-white/70 underline" href={SOCIAL.instagram}><IconInstagram size={14} /> Instagram</OutLink>
          <OutLink className="flex items-center gap-2 text-white/70 underline" href={SOCIAL.linkedin}><IconLinkedIn size={14} /> LinkedIn</OutLink>
          <OutLink className="flex items-center gap-2 text-white/70 underline" href={SOCIAL.twitter}><IconX size={12} /> X</OutLink>
        </div>
      </div>
      <p className="text-center text-white/30 text-xs mt-10 max-w-3xl mx-auto leading-relaxed">
        © {new Date().getFullYear()} Elite Way Holdings. All rights reserved. Elite Way, Elite Way Holdings, Elite Way Marketing, Elite Way Club SA, and all related marks, copy, case studies, software, photography, and systems on this site are the property of Elite Way Holdings. No part may be copied, reproduced, or used without prior written permission.
      </p>
    </footer>
  )
}

function VideoWindow({ v }) {
  const src = v.kind === 'youtube'
    ? `https://www.youtube.com/embed/${v.id}`
    : `https://www.instagram.com/reel/${v.id}/embed`
  return (
    <div className="rounded-3xl overflow-hidden border border-white/15 bg-black">
      <div className="relative w-full bg-black" style={{ paddingTop: v.kind === 'instagram' ? '125%' : '56.25%' }}>
        <iframe
          className="absolute inset-0 w-full h-full"
          src={src}
          title={v.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
      <div className="px-4 py-3 flex items-center justify-between gap-3">
        <div className="text-sm font-bold">{v.title}</div>
        <OutLink href={v.href} className="text-blue-300 text-xs underline inline-flex items-center gap-1">
          Open in a window <ArrowRight size={12} />
        </OutLink>
      </div>
    </div>
  )
}

function CaseCard({ c, i }) {
  return (
    <Link to={`/work/${c.slug}`} className="block">
      <motion.article variants={fade} whileHover={{ y: -6 }} className="glass overflow-hidden group h-full">
        <div className="relative h-64 overflow-hidden bg-gradient-to-br from-indigo-900/80 via-[#0a0814] to-teal-900/40">
          {c.img ? (
            <img src={c.img} alt={c.brand} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center px-6">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-black tracking-[0.2em]">{c.brand.split(' ')[0]}</div>
                <div className="text-[10px] tracking-[0.35em] uppercase text-white/50 mt-2">{c.tag}</div>
              </div>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#07060c] to-transparent" />
          <div className="absolute bottom-4 left-4">
            <div className="text-[10px] tracking-[0.25em] uppercase text-violet-200 mb-1">{c.year} · {c.tag}</div>
            <div className="text-3xl font-black drop-shadow">{c.kpi}</div>
          </div>
        </div>
        <div className="p-6">
          <p className="text-[10px] tracking-[0.3em] uppercase text-blue-300 mb-1">Case 0{i + 1}</p>
          <h3 className="text-xl font-black mb-2">{c.brand}</h3>
          <p className="text-sm text-white/60 line-clamp-3">{c.result}</p>
          <span className="inline-flex items-center gap-1 text-sm text-blue-300 mt-4">Open the study <ArrowRight size={14} /></span>
        </div>
      </motion.article>
    </Link>
  )
}

function CaseStudy() {
  const { slug } = useParams()
  const c = CASES.find((x) => x.slug === slug)
  if (!c) return <Navigate to="/work" replace />
  const shots = (c.gallery && c.gallery.length) ? c.gallery : (c.img ? [c.img] : [])
  const others = CASES.filter((x) => x.slug !== c.slug)
  return (
    <div className="pt-32 max-w-6xl mx-auto px-6 min-h-screen pb-20">
      <Link to="/work" className="text-sm text-white/50">← All case studies</Link>
      <p className="text-[10px] tracking-[0.3em] uppercase text-violet-300 mt-6 mb-2">{c.year} · {c.tag}</p>
      <h1 className="text-4xl md:text-6xl font-black mb-3">{c.brand}</h1>
      <p className="text-3xl font-black text-blue-300 mb-10">{c.kpi}</p>

      <div className="grid grid-cols-3 gap-3 mb-10">
        {c.stats.map(([n, l]) => (
          <div key={l} className="glass px-4 py-4">
            <div className="text-xl font-black">{n}</div>
            <div className="text-[10px] text-white/45 uppercase tracking-wide mt-1">{l}</div>
          </div>
        ))}
      </div>

      <div className={`grid gap-4 mb-6 ${c.fit === 'contain' ? 'md:grid-cols-2' : 'md:grid-cols-3'}`}>
        {shots.map((src) => (
          <div
            key={src}
            className={c.fit === 'contain'
              ? 'rounded-2xl overflow-hidden border border-white/10 bg-black/40 flex items-center justify-center min-h-[280px] p-2'
              : 'rounded-2xl overflow-hidden border border-white/10 aspect-[4/5]'}
          >
            <img
              src={src}
              alt={c.brand}
              className={c.fit === 'contain' ? 'max-h-[70vh] w-full h-auto object-contain' : 'w-full h-full object-cover'}
            />
          </div>
        ))}
      </div>
      {c.proof && (
        <div className="mb-12 max-w-2xl rounded-2xl overflow-hidden border border-white/15 bg-white/5 p-3">
          <p className="text-[10px] tracking-[0.25em] uppercase text-violet-300 mb-2">Data proof</p>
          <img src={c.proof} alt="Over 2.5 million combined organic views" className="w-full h-auto object-contain" />
        </div>
      )}

      {c.videos?.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-black mb-4">Tape</h2>
          <div className={`grid gap-6 ${c.videos.length > 1 ? 'lg:grid-cols-2' : 'max-w-xl'}`}>
            {c.videos.map((v) => <VideoWindow key={v.id} v={v} />)}
          </div>
        </section>
      )}

      <div className="glass p-8 space-y-5 mb-10">
        <p className="text-white/75 leading-relaxed"><span className="text-violet-300 font-semibold">The brief. </span>{c.challenge}</p>
        <p className="text-white/75 leading-relaxed"><span className="text-violet-300 font-semibold">What we did. </span>{c.approach}</p>
        <p className="text-white/75 leading-relaxed"><span className="text-violet-300 font-semibold">What moved. </span>{c.result}</p>
        <div className="flex flex-wrap gap-3 pt-2">
          {c.url && <OutLink href={c.url} className="btn-ghost text-sm">Brand world</OutLink>}
          <Link to="/contact" className="btn-primary text-sm">Work like this</Link>
        </div>
      </div>

      <h2 className="text-xl font-black mb-4">More studies</h2>
      <div className="grid md:grid-cols-2 gap-5">
        {others.map((o, i) => <CaseCard key={o.slug} c={o} i={i} />)}
      </div>
    </div>
  )
}

function Method() {
  const desks = [
    {
      name: 'House',
      role: 'The founder seat',
      points: [
        'One partner thread plus pins. The brief stays short. Memory is not a pile of chats.',
        'Observe never-sleeps brief lives here only — a rule-based night watch, not a public model and not a dump of keys or banking.',
        'Pipeline view for the operator. Keys stay in the House server file. They are never on this website.',
      ],
    },
    {
      name: 'Closer',
      role: 'WhatsApp-first sales',
      points: [
        'A form or public chat on this site becomes a card: name, number, what they asked.',
        'Path is WhatsApp → call → demo → invoice. A human follows up on 076 342 5896.',
        'Staff desk. No public URL. You do not log in. You message us.',
      ],
    },
    {
      name: 'Marketing OS',
      role: 'The week’s growth surface',
      points: [
        'Calendar, kits, captions — so client growth is a week, not a vibe.',
        'AI here is for drafts the operator ships, not auto-posts that invent funding or remaining BrightMind seats.',
        'Staff desk. No public URL. Your campaign still lives on Work when it is proof.',
      ],
    },
  ]
  return (
    <div className="pt-28 max-w-4xl mx-auto px-6 min-h-screen pb-20">
      <p className="text-[10px] tracking-[0.3em] uppercase text-violet-300 mb-3">Operating record</p>
      <h1 className="text-4xl md:text-5xl font-black mb-4">How House, Closer and Marketing OS grow a client</h1>
      <p className="text-white/70 leading-relaxed mb-8">
        Elite Way Holdings runs three internal desks. They are not products we sell and they have no public staff URLs. They exist so AI stays on the growth of the client — short, pinned, followed up — instead of a chatbot that forgets the brief or publishes the house.
      </p>
      <div className="space-y-4 mb-12">
        {desks.map((d) => (
          <section key={d.name} className="glass p-6">
            <p className="text-xs tracking-widest uppercase text-blue-300">{d.role}</p>
            <h2 className="text-2xl font-black mt-1 mb-3">{d.name}</h2>
            <ul className="space-y-2 text-sm text-white/65">
              {d.points.map((p) => <li key={p.slice(0, 40)}>• {p}</li>)}
            </ul>
          </section>
        ))}
      </div>
      <section className="mb-12">
        <h2 className="text-2xl font-black mb-3">What the client actually feels</h2>
        <ol className="space-y-3 text-sm text-white/70 list-decimal pl-5">
          <li>They land here or on WhatsApp. The ugly truth first. Listen.</li>
          <li>House pins the brief. Closer owns the next human message.</li>
          <li>We architect the smallest system that still wins. Price on the floor you already saw.</li>
          <li>Marketing OS puts the week on a calendar so growth has a date.</li>
          <li>They own the work. We handover. Desks stay ours.</li>
        </ol>
      </section>
      <p className="text-xs text-white/40 mb-8">We do not publish pipeline, keys, banking, or desk logins. Crawlers: see /llms.txt.</p>
      <Link to="/contact" className="btn-primary">WhatsApp the house</Link>
    </div>
  )
}

function About() {
  return (
    <div className="pt-32 max-w-4xl mx-auto px-6 min-h-screen pb-20">
      <p className="text-[10px] tracking-[0.3em] uppercase text-violet-300 mb-3">The house</p>
      <h1 className="text-4xl md:text-6xl font-black mb-6">One house. Three names.</h1>
      <p className="text-white/70 leading-relaxed mb-4">Elite Way Holdings. Elite Way Marketing. Elite Way Club SA. Same Pretoria operator. Club was the community. Holdings is the software vessel. Marketing is how the city hears us. Not a template agency.</p>
      <p className="text-white/70 leading-relaxed mb-4">We did not skip the community to become a tech firm. Club came first: rooms, shoots, people who turned a follow into a wage. 500+ youth contacts — Pretoria first, Johannesburg second. Software is the core because it still works when the event lights go off.</p>
      <p className="text-white/70 leading-relaxed mb-8">Craft in the week: Google Hustle Academy, Cisco cybersecurity, Google AI Fundamentals, NEMISA costing, freeCodeCamp, Canva, CapCut, HeyGen, Claude. Not a certificate wall. Tools we use.</p>
      <div className="grid md:grid-cols-3 gap-4 mb-10">
        <div className="glass p-5"><h3 className="font-bold mb-2">Guru in the making</h3><p className="text-sm text-white/60">Proof first: 2.5M organic, 100 GDE East halls, members who became careers. No invented funding.</p></div>
        <div className="glass p-5"><h3 className="font-bold mb-2">Investable trajectory</h3><p className="text-sm text-white/60">SaaS labs you can click. District distribution. Pretoria-born, national already — on the verge of a breakthrough.</p></div>
        <div className="glass p-5"><h3 className="font-bold mb-2">You own the work</h3><p className="text-sm text-white/60">Site, system, story — on infrastructure you own. We handover and train. We do not hold keys hostage.</p></div>
      </div>
      <div className="glass p-6 mb-10">
        <h3 className="font-bold mb-2">How the house actually runs</h3>
        <p className="text-sm text-white/65 leading-relaxed">Three internal desks — not public products, no staff URLs. Full record on <Link to="/method" className="text-blue-300">How we run</Link>. You talk to us here or on WhatsApp 076 342 5896.</p>
      </div>
      <Link to="/contact" className="btn-primary">WhatsApp the house</Link>
    </div>
  )
}

function FaqPage() {
  return (
    <div className="pt-32 max-w-5xl mx-auto px-6 min-h-screen pb-20">
      <p className="text-[10px] tracking-[0.3em] uppercase text-violet-300 mb-3">Answers from the work</p>
      <h1 className="text-4xl md:text-6xl font-black mb-4">FAQ</h1>
      <p className="text-white/55 mb-10 max-w-2xl">The questions this industry actually asks. WhatsApp 076 342 5896 if the page is longer than your patience.</p>
      <div className="grid md:grid-cols-2 gap-6" itemScope itemType="https://schema.org/FAQPage">
        {FAQS.map(([q, a]) => (
          <div key={q} className="glass p-6" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
            <p itemProp="name" className="font-semibold text-sm mb-2">{q}</p>
            <p itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer" className="text-sm text-white/65 leading-relaxed"><span itemProp="text">{a}</span></p>
          </div>
        ))}
      </div>
    </div>
  )
}

function BrightMind() {
  return (
    <div className="pt-32 max-w-4xl mx-auto px-6 min-h-screen pb-20">
      <p className="text-[10px] tracking-[0.3em] uppercase text-violet-300 mb-3">Product · Elite Way Holdings</p>
      <h1 className="text-4xl md:text-6xl font-black mb-4">BrightMind</h1>
      <p className="text-xl text-white/70 leading-relaxed mb-6">South African AI tutoring for Grades R–12. CAPS-aligned. Homework step by step, interactive whiteboard, past-paper style drills, week-by-week study plans. Built by this house.</p>
      <p className="text-white/60 leading-relaxed mb-8">Now in a <strong className="text-white">free 70-family pilot until 2 December 2026</strong>. No card, no payments, no catch during the window. One seat per family, banded by the oldest child’s grade. Approvals go by email with a code like PILOT-XXXXXX. In return: use it, tap feedback, three 2-minute parent surveys (weeks 2, 6, 10). Quiet seats pass to the next family. After 2 Dec, BrightMind launches publicly — launch plans go to pilot families first.</p>
      <div className="grid sm:grid-cols-3 gap-3 mb-10">
        <div className="glass p-4"><div className="text-2xl font-black">R0</div><div className="text-xs text-white/45">pilot cost</div></div>
        <div className="glass p-4"><div className="text-2xl font-black">70</div><div className="text-xs text-white/45">family seats</div></div>
        <div className="glass p-4"><div className="text-2xl font-black">R–12</div><div className="text-xs text-white/45">all CAPS subjects</div></div>
      </div>
      <div className="flex flex-wrap gap-3 mb-12">
        <OutLink href="https://brightmind.eliteway.co.za/" className="btn-primary">Open BrightMind</OutLink>
        <OutLink href="https://brightmind.eliteway.co.za/#waitlist" className="btn-ghost">Join the waitlist</OutLink>
        <OutLink href="https://brightmind.eliteway.co.za/donate" className="btn-ghost">BrightMind Fund</OutLink>
      </div>
      <p className="text-xs text-white/40">Facts from brightmind.eliteway.co.za. We do not invent remaining-seat counts here — they move on that site.</p>
    </div>
  )
}

function Home() {
  const news = [
    { when: '17 Aug 2026', t: 'Close the Gap at Shell Okgonne', d: 'ART lost-to-follow-up field day, Ga-Rankuwa. We ran the shared record and reminder app.', to: '/work/art-follow-up' },
    { when: 'To 2 Dec 2026', t: 'BrightMind CAPS pilot', d: '70 families. Grades R–12. No remaining-seat count here — that lives on the product site.', to: '/brightmind' },
    { when: 'Campaign', t: 'Embedded Clothing 2.5M+', d: 'Combined organic views. One reel past 2M.', to: '/work/embedded' },
    { when: 'Pilot', t: '100 GDE East halls', d: 'Edu School Communicator with World Apps. School halls, not classrooms.', to: '/work/edu-school-communicator' },
  ]
  const field = [
    { to: '/work/art-follow-up', t: 'ART field app', d: 'Shared data + appointment reminders at Shell Okgonne.' },
    { to: '/work/punyete', t: 'PUNYETE tracking', d: 'Online order tracking for the clothing brand.' },
    { to: '/work/edu-school-communicator', t: 'Edu School Communicator', d: 'Living layer around the app. 100 GDE East halls.' },
    { to: '/brightmind', t: 'BrightMind', d: 'CAPS tutoring product. Pilot to 2 Dec 2026.' },
  ]
  const labs = [
    { to: '/systems/data', t: 'Clearline', d: 'Data lab' },
    { to: '/systems/crm', t: 'Housebook', d: 'CRM lab' },
    { to: '/systems/health', t: 'Wardlight', d: 'Healthcare lab' },
    { to: '/systems/business', t: 'Tillhouse', d: 'Business OS lab' },
  ]
  const rooms = [
    ['01', 'Listen', 'WhatsApp, a call, or a form. The ugly truth first.'],
    ['02', 'Architect', 'The smallest system that still wins. Price on the floor you already saw.'],
    ['03', 'Make', 'You see drafts. You do not vanish into a six-week black box.'],
    ['04', 'Keep', 'Handover and training. We stay if you want the house staffed.'],
  ]
  return (
    <div className="pt-24 pb-20 px-6 max-w-7xl mx-auto space-y-14">
      <section className="grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-black leading-tight max-w-3xl">
            Still running the business on a WhatsApp status?
          </h1>
          <p className="mt-4 text-white/70 max-w-xl text-lg">Pretoria software house. A real site and a convert path — not a bio link.</p>
          <dl className="mt-8 grid grid-cols-3 gap-4 max-w-xl">
            <div><dt className="text-2xl font-black">2.5M+</dt><dd className="text-xs text-white/45">Embedded organic views</dd></div>
            <div><dt className="text-2xl font-black">100</dt><dd className="text-xs text-white/45">GDE East school halls</dd></div>
            <div><dt className="text-2xl font-black">500+</dt><dd className="text-xs text-white/45">Club SA contacts</dd></div>
          </dl>
        </div>
        <div className="hidden lg:flex justify-center">
          <img src={asset('logo-mark.png')} alt="" className="w-64 h-64 object-contain float-logo drop-shadow-[0_0_36px_rgba(91,124,255,0.35)]" />
        </div>
      </section>

      <section>
        <div className="flex items-end justify-between mb-4">
          <h2 className="text-2xl font-black">News</h2>
          <Link to="/work" className="text-sm text-blue-300">Work archive →</Link>
        </div>
        <div className="grid md:grid-cols-2 gap-3">
          {news.map((n) => (
            <Link key={n.t} to={n.to} className="glass p-5 block">
              <p className="text-[10px] tracking-widest uppercase text-violet-300">{n.when}</p>
              <h3 className="font-bold mt-1">{n.t}</h3>
              <p className="text-sm text-white/55 mt-1">{n.d}</p>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-end justify-between mb-4">
          <h2 className="text-2xl font-black">Work</h2>
          <Link to="/work" className="text-sm text-blue-300">All work →</Link>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {CASES.filter((c) => ['art-follow-up', 'embedded', 'edu-school-communicator'].includes(c.slug)).map((c, i) => (
            <CaseCard key={c.slug} c={c} i={i} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-black mb-2">Systems we built</h2>
        <p className="text-sm text-white/50 mb-4">Shipped in the field. Labs are clickable previews, not live products.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
          {field.map((s) => (
            <Link key={s.t} to={s.to} className="glass p-5 block">
              <h3 className="font-bold">{s.t}</h3>
              <p className="text-sm text-white/55 mt-1">{s.d}</p>
            </Link>
          ))}
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {labs.map((s) => (
            <Link key={s.t} to={s.to} className="border border-white/10 rounded-2xl p-4 block">
              <p className="text-[10px] tracking-widest uppercase text-white/35">Preview</p>
              <h3 className="font-bold mt-1">{s.t}</h3>
              <p className="text-sm text-white/50">{s.d}</p>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-end justify-between mb-4 gap-4">
          <h2 className="text-2xl font-black">How we work</h2>
          <Link to="/method" className="text-sm text-blue-300 shrink-0">House · Closer · Marketing OS →</Link>
        </div>
        <div className="grid md:grid-cols-4 gap-3">
          {rooms.map(([n, t, d]) => (
            <div key={n} className="glass p-5">
              <div className="text-blue-400 font-black text-sm">{n}</div>
              <h3 className="font-bold mt-1">{t}</h3>
              <p className="text-sm text-white/55 mt-2">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="glass p-6 md:p-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black">WhatsApp 076 342 5896</h2>
          <p className="text-sm text-white/55">Packages from R1 500. FAQ if you want it in writing.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link to="/services" className="btn-ghost">Packages</Link>
          <Link to="/contact" className="btn-ghost">Contact</Link>
        </div>
      </section>
    </div>
  )
}

function ServicePage() {
  const { slug } = useParams()
  const s = SERVICES.find((x) => x.slug === slug)
  if (!s) return <Navigate to="/services" replace />
  const Icon = s.Icon
  return (
    <div className="pt-32 max-w-5xl mx-auto px-6 min-h-screen pb-16">
      <Link to="/" className="text-sm text-white/50">← Home</Link>
      <div className="flex items-center gap-3 mt-6 mb-2">
        <Icon className="text-blue-400" />
        <h1 className="text-4xl md:text-5xl font-black">{s.title}</h1>
      </div>
      <p className="text-3xl font-black text-blue-300 mb-8">{s.custom ? 'Custom pricing' : `Packages start at ${s.from}`}</p>

        {s.whyTitle && (
      <div className="glass p-8 mb-8 relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent" />
        <h2 className="text-2xl font-black mb-4">{s.whyTitle}</h2>
        {(s.why || '').split('\n\n').map((para) => (
          <p key={para.slice(0, 40)} className="text-white/75 leading-relaxed mb-4 last:mb-0">{para}</p>
        ))}
        {s.proof && <p className="text-sm text-violet-300 mt-6">{s.proof}</p>}
      </div>
        )}

      <h2 className="text-2xl font-black mb-2">Choose how we start</h2>
      <p className="text-white/55 mb-6">Price is the floor. Scope is agreed in writing before we begin.</p>
      <div className="grid md:grid-cols-3 gap-5">
        {s.packages.map((p) => (
          <div key={p.name} className="glass p-6 flex flex-col">
            <div className="text-xs tracking-widest uppercase text-violet-300 mb-1">Package</div>
            <h3 className="text-xl font-bold">{p.name}</h3>
            <p className="text-2xl text-blue-300 font-black my-3">{p.price}</p>
            <p className="text-sm text-white/70 mb-4 leading-relaxed">{p.why}</p>
            <ul className="text-sm text-white/65 space-y-2 flex-1">
              {p.items.map((i) => <li key={i}>• {i}</li>)}
            </ul>
            <Link to="/contact" className="btn-primary text-center mt-6 text-sm">I want this package</Link>
          </div>
        ))}
      </div>

      <div className="glass p-8 mt-10">
        <p className="text-lg text-white/85 leading-relaxed">{s.close}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <OutLink href={WA} className="btn-primary">WhatsApp — let’s scope it</OutLink>
          <Link to="/contact" className="btn-ghost">Request a demo</Link>
          <Link to="/services" className="btn-ghost">All architects</Link>
        </div>
      </div>
    </div>
  )
}

function ServicesIndex() {
  return (
    <div className="pt-32 max-w-6xl mx-auto px-6 min-h-screen pb-16">
      <h1 className="text-4xl font-black mb-3">Packages</h1>
      <p className="text-white/60 mb-4 max-w-2xl">Starting prices in ZAR. Final scope is confirmed before we start. Each card is a door into the why — not a menu you have to decode alone. If you are not sure which architect you need, start with web & software. That is our core. Everything else hangs off a place that exists.</p>
      <p className="text-white/45 text-sm mb-10">Pretoria time. WhatsApp if the page is longer than your patience — 076 342 5896.</p>
      <div className="grid md:grid-cols-2 gap-5">
        {SERVICES.map((s) => {
          const Icon = s.Icon
          return (
            <Link key={s.slug} to={`/services/${s.slug}`} className="glass p-8 block hover:-translate-y-1 transition">
              <Icon className="text-blue-400 mb-3" />
              <h2 className="text-xl font-bold">{s.title}</h2>
              <p className="text-white/60 text-sm my-2">{s.blurb}</p>
              <p className="text-blue-300 font-semibold">{s.custom ? 'Custom pricing' : `From ${s.from}`}</p>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

function Work() {
  return (
    <div className="pt-32 max-w-6xl mx-auto px-6 min-h-screen pb-16">
      <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-black mb-4">Proof in the community</motion.h1>
      <p className="text-white/70 mb-6 max-w-3xl leading-relaxed">Campaigns that moved numbers, people and product. Influencers for reach. Members who turned social into careers. Brands that now pay the rent. Read each study slowly — the number is the headline; the paragraph is why we still talk about it.</p>
      <p className="text-white/50 mb-10 max-w-3xl text-sm leading-relaxed">From Brits streetwear to Pretoria ink, Ga-Rankuwa decks to Johannesburg East school halls: we do not collect logos. We collect proof that a community plus a system outlives a single post.</p>
      <div className="grid md:grid-cols-2 gap-6">
        {CASES.map((c, i) => <CaseCard key={c.brand} c={c} i={i} />)}
      </div>
    </div>
  )
}

function SystemsHub() {
  return (
    <div className="pt-32 max-w-6xl mx-auto px-6 min-h-screen pb-16">
      <h1 className="text-4xl font-black mb-3">Products you can feel</h1>
      <p className="text-white/60 mb-10 max-w-2xl leading-relaxed">Four Elite Way SaaS previews. Each is a room you can walk. Buttons change the story. When you are ready for the real thing, we build it on your data — starting from the same software packages on this site.</p>
      <div className="grid md:grid-cols-2 gap-6">
        {[
          ['/systems/data', 'Clearline', 'Your files, in English.', 'Bring in a till. Ask if anything is weird. Watch a school feed go green.'],
          ['/systems/crm', 'Housebook', 'People, not leads.', 'A demo walks in. You move Kagiso forward. You remember who hates email.'],
          ['/systems/health', 'Wardlight', 'The board from the door.', 'Admit a walk-in. Finish ICU. Send Amira home with a pack.'],
          ['/systems/business', 'Tillhouse', 'Friday, and the dream.', 'Embedded pays. You pulse the week. You pay fourteen people.'],
        ].map(([to, t, line, d]) => (
          <Link key={to} to={to} className="glass p-8 block hover:-translate-y-1 transition">
            <h2 className="text-2xl font-black mb-1">{t}</h2>
            <p className="text-violet-200 italic mb-3">{line}</p>
            <p className="text-white/60 text-sm leading-relaxed">{d}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', message: '', type: 'demo' })
  const [status, setStatus] = useState(null)
  const on = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  async function submit(e) {
    e.preventDefault()
    setStatus('sending')
    try {
      const r = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const j = await r.json()
      setStatus(j.ok ? 'ok' : j.error || 'error')
    } catch {
      setStatus('Network error — try WhatsApp or email.')
    }
  }
  return (
    <div className="pt-32 max-w-5xl mx-auto px-6 min-h-screen pb-20">
      <h1 className="text-4xl font-black mb-3">Get ahold of us</h1>
      <p className="text-white/60 mb-10">WhatsApp-first. Your name and number become a closer card on House. Demo, partnership, or a system.</p>
      <div className="grid md:grid-cols-2 gap-8">
        <form onSubmit={submit} className="glass p-8 space-y-4">
          <h2 className="font-bold">Request a demo</h2>
          <select name="type" value={form.type} onChange={on}>
            <option value="demo">Demo request</option>
            <option value="contact">General contact</option>
            <option value="saas">SaaS interest</option>
          </select>
          <input name="name" placeholder="Name" required value={form.name} onChange={on} />
          <input name="email" type="email" placeholder="Email (optional)" value={form.email} onChange={on} />
          <input name="phone" placeholder="WhatsApp number" required value={form.phone} onChange={on} />
          <input name="company" placeholder="Company" value={form.company} onChange={on} />
          <textarea name="message" rows={4} placeholder="What should we show you?" required value={form.message} onChange={on} />
          <button className="btn-primary w-full" type="submit">{status === 'sending' ? 'Sending…' : 'Send request'}</button>
          {status === 'ok' && <p className="text-emerald-400 text-sm">Received. We follow up on WhatsApp.</p>}
          {status && status !== 'ok' && status !== 'sending' && <p className="text-rose-300 text-sm">{status}</p>}
        </form>
        <div className="space-y-4">
          <OutLink href={WA} className="glass p-6 flex gap-4 items-center hover:border-green-400/40">
            <IconWhatsApp size={28} className="text-[#25D366]" />
            <div><div className="font-bold">WhatsApp</div><div className="text-sm text-white/50">076 342 5896</div></div>
          </OutLink>
          <a href={MAIL} className="glass p-6 flex gap-4 items-center">
            <Mail className="text-blue-400" />
            <div><div className="font-bold">Email</div><div className="text-sm text-white/50">info@eliteway.co.za</div></div>
          </a>
          <a href={CALL} className="glass p-6 flex gap-4 items-center">
            <IconCall size={26} className="text-violet-300" />
            <div><div className="font-bold">Call</div><div className="text-sm text-white/50">0500 376 323</div></div>
          </a>
          <OutLink href={SOCIAL.instagram} className="glass p-6 flex gap-4 items-center">
            <IconInstagram size={26} className="text-pink-400" />
            <div><div className="font-bold">Instagram</div><div className="text-sm text-white/50">@eliteway_club.sa</div></div>
          </OutLink>
          <OutLink href={SOCIAL.linkedin} className="glass p-6 flex gap-4 items-center">
            <IconLinkedIn size={26} className="text-[#0A66C2]" />
            <div><div className="font-bold">LinkedIn</div><div className="text-sm text-white/50">Elite Way Holding</div></div>
          </OutLink>
          <OutLink href={SOCIAL.twitter} className="glass p-6 flex gap-4 items-center">
            <IconX size={22} className="text-white" />
            <div><div className="font-bold">X</div><div className="text-sm text-white/50">Elite Way Holding</div></div>
          </OutLink>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const loc = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [loc.pathname])
  return (
    <div className="min-h-screen">
      <SeoHead />
      <Stars />
      <MotionFX />
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/method" element={<Method />} />
          <Route path="/brightmind" element={<BrightMind />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/services" element={<ServicesIndex />} />
          <Route path="/services/:slug" element={<ServicePage />} />
          <Route path="/work" element={<Work />} />
          <Route path="/work/:slug" element={<CaseStudy />} />
          <Route path="/systems" element={<SystemsHub />} />
          <Route path="/systems/data" element={<DataSystem />} />
          <Route path="/systems/crm" element={<CRM />} />
          <Route path="/systems/health" element={<Healthcare />} />
          <Route path="/systems/business" element={<Business />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
      <SiteChat />
    </div>
  )
}
