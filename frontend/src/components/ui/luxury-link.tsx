import type { ReactNode } from "react";

type LuxuryLinkProps = {
  children: ReactNode;
  accent?: boolean;
  className?: string;
};

export function LuxuryLink({
  children,
  accent = false,
  className = "",
}: LuxuryLinkProps) {
  return (
    <button
      type="button"
      className={[
        "group inline-flex items-center gap-3 text-[11px] font-light uppercase tracking-[0.28em] transition-colors duration-300",
        accent ? "text-[#F37021]" : "text-stone-800 hover:text-[#F37021]",
        className,
      ].join(" ")}
    >
      <span className="border-b border-current pb-1">{children}</span>
      <span className="text-[10px] transition-transform duration-300 group-hover:translate-x-1">
        01
      </span>
    </button>
  );
}
