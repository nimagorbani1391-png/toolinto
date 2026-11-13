import type { Metadata } from "next";
import ToolShell from "../../../components/ToolShell";
import ColorPicker from "../../../components/tools/ColorPicker";
import { getTool } from "../../../lib/tools";

const tool = getTool("color-picker");

export const metadata: Metadata = {
  title: tool.title,
  description: tool.description,
};

export default function Page() {
  return (
    <ToolShell tool={tool}>
      <ColorPicker />
    </ToolShell>
  );
}
