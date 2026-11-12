import type { Metadata } from "next";
import ToolShell from "../../../components/ToolShell";
import QrGenerator from "../../../components/tools/QrGenerator";
import { getTool } from "../../../lib/tools";

const tool = getTool("qr-generator");

export const metadata: Metadata = {
  title: tool.title,
  description: tool.description,
};

export default function Page() {
  return (
    <ToolShell tool={tool}>
      <QrGenerator />
    </ToolShell>
  );
}
