import { z } from 'zod'
import { useState } from 'react';

export type ValidationState = 'valid' | 'invalid' | 'unchecked'

export function useInputValidation(
  fieldSchema: z.ZodTypeAny,
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
) {
  const [errors, setErrors] = useState<string[]>([]);
  const [state, setState] = useState<ValidationState>('unchecked');

  const validate = (val: string) => {
    if (!val) {
      setState('unchecked');
      setErrors([]);
      return;
    }

    const parsed = fieldSchema.safeParse(val);

    if (!parsed.success) {
      setErrors(z.treeifyError(parsed.error).errors?.flat() ?? []);
      setState('invalid');
    } else {
      setErrors([]);
      setState('valid');
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    validate(e.target.value);
    onChange?.(e);
  }

  return {
    errors,
    state,
    onChangeFunc: handleChange,
  }
}