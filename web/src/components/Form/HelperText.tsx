interface HelperTextProps {
  text: string | undefined
}

export function HelperText({ text }: HelperTextProps) {
  return <span className="text-xs text-red-600 font-semibold">{text}</span>
}
