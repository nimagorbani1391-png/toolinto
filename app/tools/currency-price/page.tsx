import type { Metadata } from "next";
import ToolShell from "../../../components/ToolShell";
import CurrencyPrice from "../../../components/tools/CurrencyPrice";
import { getTool } from "../../../lib/tools";

const tool = getTool("currency-price");

export const metadata: Metadata = {
  title: tool.title,
  description: tool.description,
};

export default function Page() {
  return (
    <ToolShell tool={tool}>
      <CurrencyPrice />
    </ToolShell>
  );
}
