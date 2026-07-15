import type { Metadata } from "next";
import HVACLanding from "./HVACLanding";

export const metadata: Metadata = {
  title: "HVAC Contractors — Stop Losing Jobs to Missed Calls | BookedSolid",
  description:
    "We install a Missed Call Text-Back system for GTA HVAC contractors in 7 days. $97 setup (first 5 only). One saved job pays for the year.",
};

export default function HVACPage() {
  return <HVACLanding />;
}
