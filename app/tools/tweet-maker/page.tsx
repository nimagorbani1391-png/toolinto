import type { Metadata } from "next";
import ToolShell from "../../../components/ToolShell";
import TweetMaker from "../../../components/tools/TweetMaker";
import { getTool } from "../../../lib/tools";

const tool = getTool("tweet-maker");

export const metadata: Metadata = {
  title: tool.title,
  description: tool.description,
};

export default function Page() {
  return (
    <ToolShell tool={tool}>
      <TweetMaker />
    </ToolShell>
  );
}
