'use client';
import AuthForm from "../components/AuthForm";
import { Input } from "@/components/ui/inputs/Input";

import { AUTH_ERROR_MESSAGES } from "@/lib/errors/auth/errorMessages";
import { SignupSchema } from "@/lib/schemas/auth/SignupSchema";

function submitSection(pending: boolean) {
  return (
    <button type='submit' disabled={pending}>Create Account</button>
  )
}

function SignupFields() {
  return (
    <>
      <Input 
        label='Email'
        name='email'
        type='email'

        placeholder="example@gmail.com"
      />
      <Input
        label='Password'
        name='password'
        type='password'

        errorMessages={AUTH_ERROR_MESSAGES.password}
        fieldSchema={SignupSchema.shape.password}
      />    
    </>
  )
}

export default function SignUpPageClient() {
  async function handleSubmit(_state: void, formData: FormData) {
    const payload = {
      email: formData.get('email'),
      password: formData.get('password')
    }

    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
    });
  }

  return (
    <AuthForm
      submitFunction={handleSubmit}
      submitSection={submitSection}
    >
      <SignupFields />
    </AuthForm>
  )
}