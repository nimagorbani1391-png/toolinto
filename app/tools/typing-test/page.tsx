import type { Metadata } from "next";
import ToolShell from "../../../components/ToolShell";
import TypingTest from "../../../components/tools/TypingTest";
import { getTool } from "../../../lib/tools";

const tool = getTool("typing-test");

export const metadata: Metadata = {
  title: tool.title,
  description: tool.description,
};

export default function Page() {
  return (
    <ToolShell tool={tool}>
      <TypingTest />
    </ToolShell>
  );
}
