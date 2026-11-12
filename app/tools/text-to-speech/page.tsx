import type { Metadata } from "next";
import ToolShell from "../../../components/ToolShell";
import TextToSpeech from "../../../components/tools/TextToSpeech";
import { getTool } from "../../../lib/tools";

const tool = getTool("text-to-speech");

export const metadata: Metadata = {
  title: tool.title,
  description: tool.description,
};

export default function Page() {
  return (
    <ToolShell tool={tool}>
      <TextToSpeech />
    </ToolShell>
  );
}
