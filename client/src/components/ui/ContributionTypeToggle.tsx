// import * as React from "react";
import { Button } from "@/components/ui/button";

export type ContributionType = "percent" | "dollar";

interface ContributionTypeToggleProps {
  value: ContributionType;
  onChange: (val: ContributionType) => void;
}

// Simple icon placeholder (replace with SVG or shadcn/ui Icon)
const PercentIcon = () => <span className="mr-1">%</span>;
const DollarIcon = () => <span className="mr-1">$</span>;

export function ContributionTypeToggle({ value, onChange }: ContributionTypeToggleProps) {
  return (
    <div className="flex gap-2 bg-muted rounded-lg p-1 w-full">
      <Button
        variant={value === "percent" ? "default" : "outline"}
        size="lg"
        onClick={() => onChange("percent")}
        className={`flex-1 rounded-md font-medium ${value === "percent" ? "" : "bg-background"}`}
      >
        <PercentIcon /> Percentage
      </Button>
      <Button
        variant={value === "dollar" ? "default" : "outline"}
        size="lg"
        onClick={() => onChange("dollar")}
        className={`flex-1 rounded-md font-medium ${value === "dollar" ? "" : "bg-background"}`}
      >
        <DollarIcon /> Dollar Amount
      </Button>
    </div>
  );
}
