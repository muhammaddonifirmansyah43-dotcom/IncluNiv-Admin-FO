const weekdays = ["S", "S", "R", "K", "J", "S", "M"];

type Props = {
  year: number;
  month: number;
  selectedDay: number;
  onSelect: (day: number) => void;
};

export default function CalendarGrid({ year, month, selectedDay, onSelect }: Props) {
  // Minggu dimulai Senin
  const offset = (new Date(year, month, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days: (number | null)[] = [
    ...Array.from({ length: offset }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <div className="grid grid-cols-7 gap-y-2 text-center">
      {weekdays.map((day, index) => (
        <span key={`${day}-${index}`} className="pb-1 text-xs font-medium text-slate-400">
          {day}
        </span>
      ))}

      {days.map((day, index) => (
        <button
          key={`${year}-${month}-${index}`}
          type="button"
          disabled={day === null}
          onClick={() => day && onSelect(day)}
          className={`mx-auto flex h-7 w-7 items-center justify-center rounded-md text-xs transition ${
            day === selectedDay
              ? "bg-[#3B82F6] font-bold text-white"
              : "text-slate-600 hover:bg-blue-50"
          } disabled:cursor-default`}
        >
          {day ?? ""}
        </button>
      ))}
    </div>
  );
}