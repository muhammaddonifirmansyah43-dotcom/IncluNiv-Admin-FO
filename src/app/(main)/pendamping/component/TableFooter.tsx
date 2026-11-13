type Props = {
  shown: number;
  total: number;
};

export default function TableFooter({ shown, total }: Props) {
  return (
    <div className="border-t border-[#e1e8f0] bg-[#f8fafc] px-5 py-3.5">
      <p className="text-xs text-[#71829b]">
        Menampilkan <span className="font-semibold text-[#17365f]">{shown}</span>{" "}
        dari{" "}
        <span className="font-semibold text-[#17365f]">{total} data pendamping</span>
      </p>
    </div>
  );
}