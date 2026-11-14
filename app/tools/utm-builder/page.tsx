import type { Metadata } from "next";
import ToolShell from "../../../components/ToolShell";
import UtmBuilder from "../../../components/tools/UtmBuilder";
import { getTool } from "../../../lib/tools";

const tool = getTool("utm-builder");

export const metadata: Metadata = {
  title: tool.title,
  description: tool.description,
};

export default function Page() {
  return (
    <ToolShell tool={tool}>
      <UtmBuilder />
    </ToolShell>
  );
}
