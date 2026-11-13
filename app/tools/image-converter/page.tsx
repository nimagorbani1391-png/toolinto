import type { Metadata } from "next";
import ToolShell from "../../../components/ToolShell";
import ImageConverter from "../../../components/tools/ImageConverter";
import { getTool } from "../../../lib/tools";

const tool = getTool("image-converter");

export const metadata: Metadata = {
  title: tool.title,
  description: tool.description,
};

export default function Page() {
  return (
    <ToolShell tool={tool}>
      <ImageConverter />
    </ToolShell>
  );
}
