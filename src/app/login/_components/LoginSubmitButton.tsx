export default function LoginSubmitButton({ loading }: { loading: boolean }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="flex h-[54px] w-full items-center justify-center rounded-[24px] bg-[#3B82F6] text-[18px] font-bold text-white shadow-sm transition hover:bg-[#2F73E8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-200 focus-visible:ring-offset-2 disabled:opacity-70"
    >
      {loading ? "Memproses..." : "Masuk"}
    </button>
  );
}
