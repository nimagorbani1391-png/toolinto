import type { Metadata } from "next";
import ToolShell from "../../../components/ToolShell";
import ReactionTest from "../../../components/tools/ReactionTest";
import { getTool } from "../../../lib/tools";

const tool = getTool("reaction-test");

export const metadata: Metadata = {
  title: tool.title,
  description: tool.description,
};

export default function Page() {
  return (
    <ToolShell tool={tool}>
      <ReactionTest />
    </ToolShell>
  );
}
