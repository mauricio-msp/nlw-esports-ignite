import { FieldError } from 'react-hook-form'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import cx from 'classnames'

import { Tooltip } from '~/components/Tooltip'
import { HelperText } from '~/components/Form/HelperText'
import { weekdays } from '~/helpers/weekdays'

interface SelectWeekdaysProps {
  selected: string[]
  onSelect: (weekday: string[]) => void
  error?: FieldError
}

export function SelectWeekdays({
  selected,
  onSelect,
  error,
}: SelectWeekdaysProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="weekdays">Quando costuma jogar?</label>

      <ToggleGroup.Root
        type="multiple"
        className="grid grid-cols-4 gap-2"
        value={selected}
        onValueChange={onSelect}
      >
        {weekdays.map(({ value, title }) => (
          <Tooltip key={value} title={title}>
            <ToggleGroup.Item
              value={value}
              className={cx(
                'w-8 h-8 rounded',
                selected?.includes(value) ? 'bg-violet-500' : 'bg-zinc-900',
              )}
            >
              {title.charAt(0)}
            </ToggleGroup.Item>
          </Tooltip>
        ))}
      </ToggleGroup.Root>

      {!!error && <HelperText text={error.message} />}
    </div>
  )
}
