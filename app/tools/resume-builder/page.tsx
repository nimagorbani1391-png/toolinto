import type { Metadata } from "next";
import ToolShell from "../../../components/ToolShell";
import ResumeBuilder from "../../../components/tools/ResumeBuilder";
import { getTool } from "../../../lib/tools";

const tool = getTool("resume-builder");

export const metadata: Metadata = {
  title: tool.title,
  description: tool.description,
};

export default function Page() {
  return (
    <ToolShell tool={tool}>
      <ResumeBuilder />
    </ToolShell>
  );
}
