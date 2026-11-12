interface TableFooterProps {
  shown: number;
  total: number;
  label?: string;
}

export default function TableFooter({
  shown,
  total,
  label = "data mahasiswa",
}: TableFooterProps) {
  return (
    <div className="border-t border-[#e0e7ef] bg-[#f8fafc] px-5 py-4">
      <p className="text-sm text-[#71829b]">
        Menampilkan{" "}
        <span className="font-semibold text-[#17365f]">{shown}</span> dari{" "}
        <span className="font-semibold text-[#17365f]">
          {total} {label}
        </span>
      </p>
    </div>
  );
}