import type { Metadata } from "next";
import ToolShell from "../../../components/ToolShell";
import SnakeGame from "../../../components/tools/SnakeGame";
import { getTool } from "../../../lib/tools";

const tool = getTool("snake-game");

export const metadata: Metadata = {
  title: tool.title,
  description: tool.description,
};

export default function Page() {
  return (
    <ToolShell tool={tool}>
      <SnakeGame />
    </ToolShell>
  );
}
