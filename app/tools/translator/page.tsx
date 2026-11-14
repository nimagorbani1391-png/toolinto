import type { Metadata } from "next";
import ToolShell from "../../../components/ToolShell";
import Translator from "../../../components/tools/Translator";
import { getTool } from "../../../lib/tools";

const tool = getTool("translator");

export const metadata: Metadata = {
  title: tool.title,
  description: tool.description,
};

export default function Page() {
  return (
    <ToolShell tool={tool}>
      <Translator />
    </ToolShell>
  );
}
