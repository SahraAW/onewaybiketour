import Link from "next/link";

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  variant?: "solid" | "outline";
  type?: "button" | "submit";
};

export function Button({ children, href, variant = "solid", type = "button" }: ButtonProps) {
  const className = `inline-flex items-center justify-center rounded-full px-6 py-3 text-[11px] font-bold transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0 ${variant === "solid" ? "bg-orange text-white hover:bg-[#da410a]" : "border border-ink/30 hover:border-orange hover:text-orange"}`;
  return href ? <Link href={href} className={className}>{children}</Link> : <button type={type} className={className}>{children}</button>;
}
