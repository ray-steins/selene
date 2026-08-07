'use client';

import { InputWrapper } from "./Input";

import style from './inputs.module.scss';

type TextAreaProps = {
  label?: string
} & React.ComponentProps<'textarea'>

export default function TextArea({
  label,
  className,
  name,
  id,
  ...props
}: TextAreaProps) {
  const txtareaId = !id ? `txtarea-id-${name}` : id

  return (
    <InputWrapper id={txtareaId} label={label}>
      <textarea 
        name={name}
        className={`${className} ${style['wrapper__input']}`}
        {...props}
      />
    </InputWrapper>
  )
}