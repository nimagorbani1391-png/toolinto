import type { Metadata } from "next";
import ToolShell from "../../../components/ToolShell";
import AgeCalculator from "../../../components/tools/AgeCalculator";
import { getTool } from "../../../lib/tools";

const tool = getTool("age-calculator");

export const metadata: Metadata = {
  title: tool.title,
  description: tool.description,
};

export default function Page() {
  return (
    <ToolShell tool={tool}>
      <AgeCalculator />
    </ToolShell>
  );
}
