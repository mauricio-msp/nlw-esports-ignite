import { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Input(props: InputProps) {
  return (
    <input
      {...props}
      className="form-input bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 appearance-none"
    />
  )
}