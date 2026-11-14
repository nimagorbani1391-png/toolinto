import type { Metadata } from "next";
import ToolShell from "../../../components/ToolShell";
import PersianCalendar from "../../../components/tools/PersianCalendar";
import { getTool } from "../../../lib/tools";

const tool = getTool("persian-calendar");

export const metadata: Metadata = {
  title: tool.title,
  description: tool.description,
};

export default function Page() {
  return (
    <ToolShell tool={tool}>
      <PersianCalendar />
    </ToolShell>
  );
}
