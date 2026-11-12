import type { Metadata } from "next";
import ToolShell from "../../../components/ToolShell";
import UrlShortener from "../../../components/tools/UrlShortener";
import { getTool } from "../../../lib/tools";

const tool = getTool("url-shortener");

export const metadata: Metadata = {
  title: tool.title,
  description: tool.description,
};

export default function Page() {
  return (
    <ToolShell tool={tool}>
      <UrlShortener />
    </ToolShell>
  );
}
