import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

const baseClasses = "inline-flex items-center justify-center border-2 border-[#543F3A] rounded-[50px] px-[30px] py-[10px] hover:bg-[#DACAB8] transition-all duration-200";

type ButtonProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className"> & {
  className?: string;
  children: ReactNode;
};

export function Button({ className, children, ...props }: ButtonProps) {
  const classes = `${baseClasses}${className ? ` ${className}` : ""}`;
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}

type ButtonLinkProps = Omit<ComponentProps<typeof Link>, "className"> & {
  className?: string;
  children: ReactNode;
};

export function ButtonLink({ className, children, ...props }: ButtonLinkProps) {
  const classes = `${baseClasses}${className ? ` ${className}` : ""}`;
  return (
    <Link className={classes} {...props}>
      {children}
    </Link>
  );
}

export default Button;

