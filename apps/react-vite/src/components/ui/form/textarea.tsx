import type { TextareaHTMLAttributes } from 'react'
import { forwardRef } from 'react'
import type { UseFormRegisterReturn } from 'react-hook-form'

import { cn } from '@/utils/cn'

import type { FieldWrapperPassThroughProps } from './field-wrapper'
import { FieldWrapper } from './field-wrapper'

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> &
  FieldWrapperPassThroughProps & {
    className?: string
    registration: Partial<UseFormRegisterReturn>
  }

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, registration, ...props }, ref) => {
    return (
      <FieldWrapper label={label} error={error}>
        <textarea
          className={cn(
            'flex min-h-[60px] w-full rounded-sm border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          ref={ref}
          {...registration}
          {...props}
        />
      </FieldWrapper>
    )
  }
)
Textarea.displayName = 'Textarea'

export { Textarea }
