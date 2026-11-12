import type { Metadata } from "next";
import ToolShell from "../../../components/ToolShell";
import BmiCalculator from "../../../components/tools/BmiCalculator";
import { getTool } from "../../../lib/tools";

const tool = getTool("bmi-calculator");

export const metadata: Metadata = {
  title: tool.title,
  description: tool.description,
};

export default function Page() {
  return (
    <ToolShell tool={tool}>
      <BmiCalculator />
    </ToolShell>
  );
}
