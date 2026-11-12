import type { Metadata } from "next";
import ToolShell from "../../../components/ToolShell";
import DateDifference from "../../../components/tools/DateDifference";
import { getTool } from "../../../lib/tools";

const tool = getTool("date-difference");

export const metadata: Metadata = {
  title: tool.title,
  description: tool.description,
};

export default function Page() {
  return (
    <ToolShell tool={tool}>
      <DateDifference />
    </ToolShell>
  );
}
