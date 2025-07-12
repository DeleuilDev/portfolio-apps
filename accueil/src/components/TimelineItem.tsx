interface TimelineItemProps {
  title: string;
  company: string;
  period: string;
  description: string;
}

export default function TimelineItem({ title, company, period }: TimelineItemProps) {
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-base text-foreground flex-1 min-w-0">{company}</h3>
        <div className="text-sm text-gray-500 whitespace-nowrap flex-shrink-0">
          {period}
        </div>
      </div>
      <p className="text-sm text-gray-500">{title}</p>
    </div>
  );
} 