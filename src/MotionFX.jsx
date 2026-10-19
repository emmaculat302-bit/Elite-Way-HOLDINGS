import { IconWhatsApp } from './Icons'

const WA = 'https://wa.me/27763425896'

export default function MotionFX() {
  return (
    <a
      href={WA}
      target="_blank"
      rel="noopener noreferrer"
      className="wa-fab"
      aria-label="WhatsApp 076 342 5896"
      title="WhatsApp 076 342 5896"
    >
      <IconWhatsApp size={28} />
    </a>
  )
}

export function useTilt() {}

export function CountUp({ to, suffix = '', className = '' }) {
  return <span className={className}>{to}{suffix}</span>
}
