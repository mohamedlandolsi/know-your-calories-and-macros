"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const RadioGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("flex gap-2", className)}
      role="radiogroup"
      {...props}
    />
  )
})
RadioGroup.displayName = "RadioGroup"

interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  label?: string;
  onChange?: (value: string) => void;
}

const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ className, label, onChange, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange && e.target.checked) {
        onChange(e.target.value);
      }
    };

    return (
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="radio"
          className={cn(
            "h-4 w-4 cursor-pointer rounded-full border border-primary text-primary focus:outline-none focus-visible:ring-1 focus-visible:ring-ring",
            className
          )}
          ref={ref}
          onChange={handleChange}
          {...props}
        />
        {label && <span className="text-sm font-medium">{label}</span>}
      </label>
    )
  }
)
Radio.displayName = "Radio"

export { RadioGroup, Radio }
