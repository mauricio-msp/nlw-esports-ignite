import React from 'react'

import * as TooltipPrimitive from '@radix-ui/react-tooltip'

interface TooltipProps {
  children: React.ReactNode
  title: string
}

export function Tooltip({ children, title }: TooltipProps) {
  return (
    <TooltipPrimitive.Provider>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Content
          sideOffset={4}
          className="bg-violet-500 px-4 py-2 rounded"
        >
          <TooltipPrimitive.Arrow className="fill-current text-violet-500" />
          <span className="block text-xs leading-none text-white">{title}</span>
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  )
}

export default Tooltip
