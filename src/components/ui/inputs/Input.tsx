import { UIComponentSizes } from "@/types/UI"
import { useInputValidation } from "@/hooks/useInputValidation";
import { ErrorGroup } from "@/types/FieldErrors";

import style from './inputs.module.scss';
import { z } from "zod";
import { useState } from "react";

type NoValidation = {
  errorMessages?: never
  checklistTitle?: never
  fieldSchema?: never
}

type HasValidation = {
  errorMessages: ErrorGroup
  checklistTitle?: string
  fieldSchema: z.ZodTypeAny
}

export type InputProps =
  (HasValidation | NoValidation)
  & {
  label?: string
  uisize?: UIComponentSizes
} & React.ComponentProps<'input'>

export function InputWrapper({
  id,
  label,
  children
}: { 
  id: string,
  label?: string,
  children: React.ReactNode
}) {
  return (
    <div className={style['wrapper']}>
      {label && 
        <label
          htmlFor={id}
          
          className={style['wrapper__label']}
        > 
          { label }
        </label>
      }
      <div>
        { children }
      </div>
    </div>
  )
}

export function Input({
  children,
  label,
  name,
  id,
  uisize = 'md',
  className,
  errorMessages,
  fieldSchema,
  checklistTitle,
  onChange,
  ...props
}: InputProps) {
  const [showChecklist, setShowChecklist] = useState(false);
  const inputId = !id ? `ipt-id-${name}` : id 

  const validation = fieldSchema ? useInputValidation(fieldSchema, onChange) : null;
  const { onChangeFunc, state, errors } = validation ?? {}
  const actualOnChange = onChangeFunc ?? onChange;

  const handleFocus = () => {
    setShowChecklist(true);
  }

  const handleBlur = () => {
    const keepChecklist = state === 'invalid';
    setShowChecklist(keepChecklist);
  }

  return (
    <InputWrapper id={inputId} label={label}>
      <input 
        {...props}

        name={name}

        onChange={actualOnChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        suppressHydrationWarning
        className={`${className} ${style['wrapper__input']}`}
        style={{
          borderColor: state === 'invalid' ? 'var(--color-semantic-warning) !important' : undefined
        }}
      />
      <div
        className={style['checklist-container']}
        style={{display: showChecklist ? 'block' : 'none'}}
      >
        {errorMessages && (
          <div>
            <span>{checklistTitle ?? `${label} must:`}</span>
            <div>
              {Object.entries(errorMessages).map((v, i) => {
                const hasError = state === 'unchecked' ? true : errors!.includes(v[1].error.toString());
                const color = hasError && state !== 'unchecked' ? 'var(--color-semantic-warning)' : 'var(--color-foreground)'

                return (
                  <div key={`${v}-${i}`}>
                    <input type='checkbox'
                      checked={!hasError}
                      onClick={(e) => {e.preventDefault()}}
                      onKeyDown={(e) => {e.preventDefault()}}

                      readOnly
                    />
                    <span style={{color: color}}>{v[1].shorthand?.toString()}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </InputWrapper>
  )
}