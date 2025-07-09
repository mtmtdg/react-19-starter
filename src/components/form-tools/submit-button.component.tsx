import { Button, type ButtonProps } from '@mui/material';
import { type Control, useFormState } from 'react-hook-form';

interface SubmitButtonProps extends ButtonProps {
  // biome-ignore lint/suspicious/noExplicitAny: 为降低类型声明复杂度
  control: Control<any>;
}

export function SubmitButton({ children, disabled, control, ...buttonProps }: SubmitButtonProps) {
  const { isValid, isSubmitting, isDirty } = useFormState({ control });

  const isDisabled = !isValid || isSubmitting || !isDirty || disabled;

  return (
    <Button {...buttonProps} type='submit' disabled={isDisabled}>
      {children}
    </Button>
  );
}
