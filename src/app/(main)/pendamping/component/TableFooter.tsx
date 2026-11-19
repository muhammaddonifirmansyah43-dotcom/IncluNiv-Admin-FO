"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  shown: number;
  total: number;
  startItem: number;
  endItem: number;
  currentPage: number;
  pageCount: number;
  onPageChange: (page: number) => void;
};

export default function TableFooter({
  shown,
  total,
  startItem,
  endItem,
  currentPage,
  pageCount,
  onPageChange,
}: Props) {
  return (
    <div className="flex flex-col gap-4 border-t border-[#DCE6F2] bg-[#f8fafc] px-5 py-3.5 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-[#71829b]">
        Menampilkan{" "}
        <span className="font-semibold text-[#17365f]">
          {startItem}-{endItem}
        </span>{" "}
        dari{" "}
        <span className="font-semibold text-[#17365f]">
          {total} data pendamping
        </span>
      </p>

      {pageCount > 1 && (
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
            aria-label="Halaman sebelumnya"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#dce5ef] bg-white text-[#344866] transition hover:bg-[#eaf2ff] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft size={17} />
          </button>

          {Array.from({ length: pageCount }, (_, index) => index + 1).map(
            (page) => (
              <button
                key={page}
                type="button"
                onClick={() => onPageChange(page)}
                aria-label={`Halaman ${page}`}
                aria-current={currentPage === page ? "page" : undefined}
                className={`h-9 min-w-9 rounded-lg border px-2.5 text-sm font-medium transition ${
                  currentPage === page
                    ? "border-[#17365f] bg-[#17365f] text-white"
                    : "border-[#dce5ef] bg-white text-[#344866] hover:bg-[#eaf2ff]"
                }`}
              >
                {page}
              </button>
            )
          )}

          <button
            type="button"
            disabled={currentPage === pageCount}
            onClick={() => onPageChange(currentPage + 1)}
            aria-label="Halaman berikutnya"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#dce5ef] bg-white text-[#344866] transition hover:bg-[#eaf2ff] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronRight size={17} />
          </button>
        </div>
      )}
    </div>
  );
}
