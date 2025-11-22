import './App.css'

import React, { useState } from "react";
import { ContributionTypeToggle} from "@/components/ui/ContributionTypeToggle";
import type { ContributionType } from "@/components/ui/ContributionTypeToggle";

function App() {
  const [contributionType, setContributionType] = useState<ContributionType>("percent");

  return (
    <div className="p-8 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-2">Contribution Settings</h2>
      <p className="text-muted-foreground mb-4">
        Choose how you’d like to contribute to your 401(k)
      </p>
      <span className="block font-medium mb-2">Contribution Type</span>
      <ContributionTypeToggle value={contributionType} onChange={setContributionType} />
      {/* Continue with inputs for percentage/dollar, etc. */}
    </div>
  );
}


export default App
