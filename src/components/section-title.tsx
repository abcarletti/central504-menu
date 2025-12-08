import { Separator } from "./ui/separator";

interface SectionTitleProps {
  title: string;
  id?: string;
}

export default function SectionTitle({ title, id }: SectionTitleProps) {
  return (
    <div className="flex items-center justify-center gap-4 w-full">
      <Separator className="bg-primary flex-1" aria-hidden="true" />
      <h2 id={id} className="text-3xl font-bold text-center whitespace-nowrap">
        {title}
      </h2>
      <Separator className="bg-primary flex-1" aria-hidden="true" />
    </div>
  );
}
