import type { Metadata } from "next";
import ToolShell from "../../../components/ToolShell";
import WordCounter from "../../../components/tools/WordCounter";
import { getTool } from "../../../lib/tools";

const tool = getTool("word-counter");

export const metadata: Metadata = {
  title: tool.title,
  description: tool.description,
};

export default function Page() {
  return (
    <ToolShell tool={tool}>
      <WordCounter />
    </ToolShell>
  );
}
