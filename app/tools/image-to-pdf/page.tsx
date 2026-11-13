import type { Metadata } from "next";
import ToolShell from "../../../components/ToolShell";
import ImageToPdf from "../../../components/tools/ImageToPdf";
import { getTool } from "../../../lib/tools";

const tool = getTool("image-to-pdf");

export const metadata: Metadata = {
  title: tool.title,
  description: tool.description,
};

export default function Page() {
  return (
    <ToolShell tool={tool}>
      <ImageToPdf />
    </ToolShell>
  );
}
