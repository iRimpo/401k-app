import './App.css';
import { useState } from "react";
import { ContributionCard } from "@/components/ui/ContributionTypeToggle"; 
import { Toaster } from "sonner"; 

function App() {
  const [contributionType, setContributionType] = useState<"percentage" | "dollar">("percentage");
  const [contributionAmount, setContributionAmount] = useState<number>(0);

  const salary = 75000; 

  return (
    <div className="min-h-screen bg-muted flex items-center justify-center p-4">
      <ContributionCard
        contributionType={contributionType}
        contributionAmount={contributionAmount}
        salary={salary}
        onContributionTypeChange={setContributionType}
        onContributionAmountChange={setContributionAmount}
      />
      <Toaster />
    </div>
  );
}

export default App;
