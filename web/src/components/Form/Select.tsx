import { CaretDown, CaretUp } from 'phosphor-react'
import { FieldError } from 'react-hook-form'
import cx from 'classnames'

import * as PrimitiveSelect from '@radix-ui/react-select'

import { HelperText } from '~/components/Form/HelperText'

interface Options {
  value: string
  label: string
}

interface SelectProps {
  title?: string
  name: string
  options: Array<Options>
  placeholder?: string
  onSelect: (value: string) => void
  error?: FieldError
}

export function Select({
  title,
  name,
  options,
  placeholder,
  onSelect,
  error,
}: SelectProps) {
  return (
    <div className="flex flex-col gap-2">
      {!!title && (
        <label htmlFor={name} className="font-semibold">
          {title}
        </label>
      )}

      <PrimitiveSelect.Root onValueChange={onSelect}>
        <PrimitiveSelect.Trigger
          className={cx(
            'bg-zinc-900 py-3 px-4 rounded text-sm',
            'flex items-center justify-between',
            '[&[data-placeholder]]:text-zinc-500 border-2',
            !!error ? 'border-red-600' : 'border-transparent',
          )}
        >
          <PrimitiveSelect.Value placeholder={placeholder} />
          <PrimitiveSelect.Icon>
            <CaretDown size={20} weight="bold" className="text-zinc-400" />
          </PrimitiveSelect.Icon>
        </PrimitiveSelect.Trigger>

        <PrimitiveSelect.Portal>
          <PrimitiveSelect.Content className="overflow-hidden bg-zinc-900 rounded relative">
            <PrimitiveSelect.ScrollUpButton className="flex items-center justify-center p-2">
              <CaretUp size={20} className="text-white" />
            </PrimitiveSelect.ScrollUpButton>

            <PrimitiveSelect.Viewport>
              {options.map(({ value, label }) => (
                <PrimitiveSelect.Item
                  key={value}
                  value={value}
                  className="flex items-center py-3 px-4 text-zinc-300 cursor-pointer [&[data-highlighted]]:bg-violet-500 [&[data-state=checked]]:bg-violet-500 [&[data-highlighted]]:text-white [&[data-state=checked]]:text-white"
                >
                  <PrimitiveSelect.ItemText>{label}</PrimitiveSelect.ItemText>
                </PrimitiveSelect.Item>
              ))}
            </PrimitiveSelect.Viewport>
            <PrimitiveSelect.ScrollDownButton className="flex items-center justify-center p-2">
              <CaretDown size={20} className="text-white" />
            </PrimitiveSelect.ScrollDownButton>
          </PrimitiveSelect.Content>
        </PrimitiveSelect.Portal>
      </PrimitiveSelect.Root>

      {!!error && <HelperText text={error.message} />}
    </div>
  )
}
