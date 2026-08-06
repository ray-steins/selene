import { UIComponentSizes } from "@/types/UI"
import btnStyle from './buttons.module.scss';

export type ButtonVariants = 'primary' | 'ghost' | 'blank'

export type ButtonProps = {
  variant: ButtonVariants
  interactive?: boolean,
  size?: UIComponentSizes
} & React.ComponentProps<'button'>;

export default function _Button({
  className,
  size,
  variant,
  children,
  interactive = true,
  ...props
}: ButtonProps) {
  const classes = `
    ${btnStyle['btn']}
    ${btnStyle[`btn--${size}`]}
    ${btnStyle[`btn--${variant}`]}
    ${btnStyle[`btn--${variant}${interactive ? '--interactive' : ''}`]}
    ${className}
  `

  return (
    <>
      <button 
        className={classes}
        {...props}
      >
        { children }
      </button>
    </>
  )
}