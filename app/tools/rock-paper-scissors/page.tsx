import type { Metadata } from "next";
import ToolShell from "../../../components/ToolShell";
import RockPaperScissors from "../../../components/tools/RockPaperScissors";
import { getTool } from "../../../lib/tools";

const tool = getTool("rock-paper-scissors");

export const metadata: Metadata = {
  title: tool.title,
  description: tool.description,
};

export default function Page() {
  return (
    <ToolShell tool={tool}>
      <RockPaperScissors />
    </ToolShell>
  );
}
