import type { Metadata } from "next";
import ToolShell from "../../../components/ToolShell";
import SportsWheel from "../../../components/tools/SportsWheel";
import { getTool } from "../../../lib/tools";

const tool = getTool("sports-wheel");

export const metadata: Metadata = {
  title: tool.title,
  description: tool.description,
};

export default function Page() {
  return (
    <ToolShell tool={tool}>
      <SportsWheel />
    </ToolShell>
  );
}
