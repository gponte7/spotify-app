import { CircleNotch } from 'phosphor-react'

export function Spinner() {
  return (
    <CircleNotch
      size={28}
      weight="bold"
      className="text-zinc-100 animate-spin"
    />
  )
}
