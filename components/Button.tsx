import Link from "next/link";

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  variant?: "solid" | "outline";
  type?: "button" | "submit";
  className?: string;
};

export function Button({ children, href, variant = "solid", type = "button", className = "" }: Readonly<ButtonProps>) {
  const buttonClassName = [
    "inline-flex items-center justify-center rounded-[20px] border px-6 py-3 text-[11px] font-bold tracking-[0.02em] transition-all duration-200 active:translate-y-px",
    variant === "solid"
      ? "border-black bg-orange text-white"
      : "border-black bg-transparent text-black hover:bg-orange hover:text-white",
    className
  ].join(" ");

  return href ? <Link href={href} className={buttonClassName}>{children}</Link> : <button type={type} className={buttonClassName}>{children}</button>;
}
