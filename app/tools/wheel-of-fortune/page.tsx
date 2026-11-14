import type { Metadata } from "next";
import ToolShell from "../../../components/ToolShell";
import WheelOfFortune from "../../../components/tools/WheelOfFortune";
import { getTool } from "../../../lib/tools";

const tool = getTool("wheel-of-fortune");

export const metadata: Metadata = {
  title: tool.title,
  description: tool.description,
};

export default function Page() {
  return (
    <ToolShell tool={tool}>
      <WheelOfFortune />
    </ToolShell>
  );
}
