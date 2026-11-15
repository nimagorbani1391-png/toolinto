import type { Metadata } from "next";
import ToolShell from "../../../components/ToolShell";
import MemoryTest from "../../../components/tools/MemoryTest";
import { getTool } from "../../../lib/tools";

const tool = getTool("memory-test");

export const metadata: Metadata = {
  title: tool.title,
  description: tool.description,
};

export default function Page() {
  return (
    <ToolShell tool={tool}>
      <MemoryTest />
    </ToolShell>
  );
}
