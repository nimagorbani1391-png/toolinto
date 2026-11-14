import type { Metadata } from "next";
import ToolShell from "../../../components/ToolShell";
import FancyText from "../../../components/tools/FancyText";
import { getTool } from "../../../lib/tools";

const tool = getTool("fancy-text");

export const metadata: Metadata = {
  title: tool.title,
  description: tool.description,
};

export default function Page() {
  return (
    <ToolShell tool={tool}>
      <FancyText />
    </ToolShell>
  );
}
