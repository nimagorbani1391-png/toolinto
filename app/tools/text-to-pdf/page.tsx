import type { Metadata } from "next";
import ToolShell from "../../../components/ToolShell";
import TextToPdf from "../../../components/tools/TextToPdf";
import { getTool } from "../../../lib/tools";

const tool = getTool("text-to-pdf");

export const metadata: Metadata = {
  title: tool.title,
  description: tool.description,
};

export default function Page() {
  return (
    <ToolShell tool={tool}>
      <TextToPdf />
    </ToolShell>
  );
}
