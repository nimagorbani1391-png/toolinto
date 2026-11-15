import ToolSearch from "../components/ToolSearch";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:py-12">
      <section className="mb-8 text-center">
        <h1 className="text-3xl font-black leading-snug text-[var(--text-main)] sm:text-4xl">
          ابزارهای کوچک ، برای کارهای روزمره
        </h1>
      </section>

      <ToolSearch />
    </div>
  );
}
