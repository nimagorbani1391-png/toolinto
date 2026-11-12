import type { Metadata } from "next";
import ToolShell from "../../../components/ToolShell";
import Stopwatch from "../../../components/tools/Stopwatch";
import { getTool } from "../../../lib/tools";

const tool = getTool("stopwatch");

export const metadata: Metadata = {
  title: tool.title,
  description: tool.description,
};

export default function Page() {
  return (
    <ToolShell tool={tool}>
      <Stopwatch />
    </ToolShell>
  );
}
