import * as PrimitiveCheckbox from '@radix-ui/react-checkbox'
import { Check } from 'phosphor-react'

interface CheckboxProps {
  label: string
  checked: boolean
  onChecked: (checked: boolean | 'indeterminate') => void
}

export function Checkbox({ label, checked, onChecked }: CheckboxProps) {
  return (
    <>
      <label className="mt-2 flex items-center gap-2 text-sm">
        <PrimitiveCheckbox.Root
          id="useVoiceChannel"
          checked={!!checked}
          onCheckedChange={onChecked}
          className="w-6 h-6 p-1 rounded bg-zinc-900"
        >
          <PrimitiveCheckbox.Indicator>
            <Check className="w-4 h-4 text-emerald-400" />
          </PrimitiveCheckbox.Indicator>
        </PrimitiveCheckbox.Root>

        {label}
      </label>
    </>
  )
}
