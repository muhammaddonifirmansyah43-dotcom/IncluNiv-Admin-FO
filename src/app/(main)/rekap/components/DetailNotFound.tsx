import DetailBackLink from "./DetailBackLink";

export default function DetailNotFound() {
  return (
    <div className="p-8">
      <div className="space-y-3 rounded-xl border border-[#E3EAF5] bg-white p-10 text-center">
        <h2 className="font-bold text-[#153D70]">Data pendamping tidak ditemukan</h2>
        <div className="flex justify-center">
          <DetailBackLink />
        </div>
      </div>
    </div>
  );
}