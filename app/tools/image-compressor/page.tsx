import type { Metadata } from "next";
import ToolShell from "../../../components/ToolShell";
import ImageCompressor from "../../../components/tools/ImageCompressor";
import { getTool } from "../../../lib/tools";

const tool = getTool("image-compressor");

export const metadata: Metadata = {
  title: tool.title,
  description: tool.description,
};

export default function Page() {
  return (
    <ToolShell tool={tool}>
      <ImageCompressor />
    </ToolShell>
  );
}
