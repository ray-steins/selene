'use client'

import { useActionState, startTransition } from "react";

import style from './forms.module.scss';

type ActionStateFormProps = {
  children: React.ReactNode,
  submitSection: (pending: boolean) => React.ReactNode
  submitFunction: (_state: void, formData: FormData) => void
  className?: string,
  persist?: boolean
} & React.ComponentProps<'form'>

export default function ActionStateForm({
  children,
  submitSection,
  submitFunction,
  className,
  persist = false,
  ...props
}: ActionStateFormProps) {
  const [state, action, pending] = useActionState(submitFunction, undefined);

  const submitHandler = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.stopPropagation(); 
    startTransition(async () => {
      e.preventDefault();
      action(new FormData(e.currentTarget));
    });
  }

  return (
    <>
      <form
        onSubmit={persist ? submitHandler : undefined}
        action={action}
        className={`${style['form']} ${className}`}
        {...props}
      >
        { children }
        <div>
          { submitSection(pending) }
        </div>
      </form>
    </>
  )
}