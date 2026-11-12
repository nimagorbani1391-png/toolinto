import type { Metadata } from "next";
import ToolShell from "../../../components/ToolShell";
import DateConverter from "../../../components/tools/DateConverter";
import { getTool } from "../../../lib/tools";

const tool = getTool("date-converter");

export const metadata: Metadata = {
  title: tool.title,
  description: tool.description,
};

export default function Page() {
  return (
    <ToolShell tool={tool}>
      <DateConverter />
    </ToolShell>
  );
}
