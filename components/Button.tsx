import Link from "next/link";

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  variant?: "solid" | "outline";
  type?: "button" | "submit";
  className?: string;
};

export function Button({ children, href, variant = "solid", type = "button", className = "" }: Readonly<ButtonProps>) {
  const buttonClassName = `inline-flex items-center justify-center rounded-[10px] px-6 py-3 text-[11px] font-semibold transition-colors duration-200 active:translate-y-px ${variant === "solid" ? "bg-orange text-white hover:bg-[#d94f00]" : "border border-ink/30 hover:border-orange hover:text-orange"} ${className}`;
  return href ? <Link href={href} className={buttonClassName}>{children}</Link> : <button type={type} className={buttonClassName}>{children}</button>;
}
