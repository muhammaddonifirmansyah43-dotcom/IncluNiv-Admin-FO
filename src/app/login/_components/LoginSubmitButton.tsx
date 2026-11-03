export default function LoginSubmitButton({ loading }: { loading: boolean }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="flex h-[54px] w-full items-center justify-center rounded-[24px] bg-[#3B82F6] text-[18px] font-bold text-white shadow-sm transition hover:bg-[#2F73E8] focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:opacity-70"
    >
      {loading ? "Memproses..." : "Masuk"}
    </button>
  );
}