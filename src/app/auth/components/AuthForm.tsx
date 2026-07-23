'use client'

import ActionStateForm from "@/components/ui/forms/ActionStateForm";

export default function AuthForm({
  children,
  submitSection,
  submitFunction,
}: {
  children: React.ReactNode,
  submitSection: (pending: boolean) => React.ReactNode
  submitFunction: (_state: void, formData: FormData) => void
}) {
  return (
    <ActionStateForm
      submitFunction={submitFunction}
      submitSection={submitSection}
    >
      { children }
    </ActionStateForm>
  )
}