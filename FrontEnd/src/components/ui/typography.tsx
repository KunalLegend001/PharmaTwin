import { cn } from "@/lib/utils";

interface TypographyProps {
  text: string;
  className?: string;
}

export function TypographyH1({ text, className }: TypographyProps) {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance",
        className
      )}
    >
      {text}
    </h1>
  );
}

export function TypographyH2({ text, className }: TypographyProps) {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-center text-3xl font-extrabold tracking-tight text-balance",
        className
      )}
    >
      {text}
    </h1>
  );
}

export function TypographyH3({ text, className }: TypographyProps) {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-2xl font-semibold tracking-tight text-balance",
        className
      )}
    >
      {text}
    </h1>
  );
}
