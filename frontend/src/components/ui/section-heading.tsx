type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="max-w-3xl space-y-5">
      <p className="text-[11px] font-light uppercase tracking-[0.34em] text-stone-500">
        {eyebrow}
      </p>
      <h2 className="font-serif text-3xl leading-tight text-stone-900 sm:text-4xl lg:text-[3.2rem]">
        {title}
      </h2>
      <p className="max-w-2xl text-sm font-light leading-8 text-stone-600 sm:text-base">
        {description}
      </p>
    </div>
  );
}
