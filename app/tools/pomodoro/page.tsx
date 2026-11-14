import type { Metadata } from "next";
import ToolShell from "../../../components/ToolShell";
import Pomodoro from "../../../components/tools/Pomodoro";
import { getTool } from "../../../lib/tools";

const tool = getTool("pomodoro");

export const metadata: Metadata = {
  title: tool.title,
  description: tool.description,
};

export default function Page() {
  return (
    <ToolShell tool={tool}>
      <Pomodoro />
    </ToolShell>
  );
}
