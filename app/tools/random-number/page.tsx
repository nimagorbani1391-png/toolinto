import type { Metadata } from "next";
import ToolShell from "../../../components/ToolShell";
import RandomNumber from "../../../components/tools/RandomNumber";
import { getTool } from "../../../lib/tools";

const tool = getTool("random-number");

export const metadata: Metadata = {
  title: tool.title,
  description: tool.description,
};

export default function Page() {
  return (
    <ToolShell tool={tool}>
      <RandomNumber />
    </ToolShell>
  );
}
