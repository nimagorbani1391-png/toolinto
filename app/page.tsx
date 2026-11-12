import ToolSearch from "@/components/ToolSearch";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:py-12">
      <section className="mb-10 text-center">
        <h1 className="text-3xl font-black leading-snug text-[var(--text-main)] sm:text-4xl">
          ابزارهای کوچک، برای کارهای روزمره
        </h1>
        <p className="mx-auto mt-3 max-w-lg text-sm text-slate-600 dark:text-slate-300 sm:text-base">
          سریع، رایگان و بدون نیاز به ثبت‌نام. ابزار مورد نظرت رو انتخاب کن.
        </p>
      </section>

      <ToolSearch />
    </div>
  );
}
