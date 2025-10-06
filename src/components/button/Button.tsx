import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'ghost' | 'danger';
  children: ReactNode;
};

export default function Button({
  children,
  className,
  variant = 'primary',
  ...rest
}: ButtonProps) {
  const base = 'btn';
  const variants: Record<string, string> = {
    primary: 'btn-primary',
    ghost: 'btn-ghost',
    danger: 'btn-danger',
  };

  const classes = [base, variants[variant], className].filter(Boolean).join(' ');

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
