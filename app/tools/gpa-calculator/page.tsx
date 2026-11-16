import type { Metadata } from "next";
import ToolShell from "../../../components/ToolShell";
import GpaCalculator from "../../../components/tools/GpaCalculator";
import { getTool } from "../../../lib/tools";

const tool = getTool("gpa-calculator");

export const metadata: Metadata = {
  title: tool.title,
  description: tool.description,
};

export default function Page() {
  return (
    <ToolShell tool={tool}>
      <GpaCalculator />
    </ToolShell>
  );
}
