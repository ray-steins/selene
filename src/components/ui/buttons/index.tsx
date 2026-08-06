import _Button from "./_button";
import { ButtonProps, ButtonVariants } from "./_button";

function createActionButtonVariant(variant: ButtonVariants) {
  return (props: Omit<ButtonProps, 'variant'>) => (
    <_Button variant={variant} {...props}/>
  )
}

export const PrimaryButton = createActionButtonVariant('primary');
export const GhostButton = createActionButtonVariant('ghost');
export const BlankButton = createActionButtonVariant('blank');