import type { Metadata } from "next";
import ToolShell from "../../../components/ToolShell";
import PasswordGenerator from "../../../components/tools/PasswordGenerator";
import { getTool } from "../../../lib/tools";

const tool = getTool("password-generator");

export const metadata: Metadata = {
  title: tool.title,
  description: tool.description,
};

export default function Page() {
  return (
    <ToolShell tool={tool}>
      <PasswordGenerator />
    </ToolShell>
  );
}
