import { InputHTMLAttributes } from 'react'
import { FieldError } from 'react-hook-form'
import cx from 'classnames'

import { HelperText } from '~/components/Form/HelperText'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: FieldError
}

export function Input({ error, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-2">
      <input
        {...props}
        className={cx(
          'form-input bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 appearance-none',
          'focus:ring-violet-500 focus:border-violet-500 focus:outline-none',
          !!error
            ? 'border-red-600 focus:ring-red-600 focus:border-red-600'
            : 'border-transparent',
        )}
      />
      {!!error && <HelperText text={error.message} />}
    </div>
  )
}
