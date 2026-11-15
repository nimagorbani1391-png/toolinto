import type { Metadata } from "next";
import ToolShell from "../../../components/ToolShell";
import OcrTool from "../../../components/tools/OcrTool";
import { getTool } from "../../../lib/tools";

const tool = getTool("ocr-tool");

export const metadata: Metadata = {
  title: tool.title,
  description: tool.description,
};

export default function Page() {
  return (
    <ToolShell tool={tool}>
      <OcrTool />
    </ToolShell>
  );
}
