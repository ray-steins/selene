'use client';
import AuthForm from "../components/AuthForm";
import { Input } from "@/components/ui/inputs/Input";

function submitSection(pending: boolean) {
  return (
    <button type='submit' disabled={pending}>Sign In</button>
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
      />    
    </>
  )
}

export default function SignInPageClient() {
  async function handleSubmit(_state: void, formData: FormData) {
    const payload = {
      email: formData.get('email'),
      password: formData.get('password')
    }

    const res = await fetch('/api/auth/signin', {
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