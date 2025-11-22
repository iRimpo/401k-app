import './App.css';
import { useState } from "react";
import { ContributionCard } from "@/components/ui/ContributionTypeToggle"; 
import { Toaster } from "sonner"; 
import { Navbar } from "@/components/ui/Navbar";

function App() {
  const [contributionType, setContributionType] = useState<"percentage" | "dollar">("percentage");
  const [contributionAmount, setContributionAmount] = useState<number>(0);

  const salary = 75000; 

  return (
  <div className="min-h-screen bg-muted"> 
    <Navbar /> 
    <div className="items-center justify-center p-4 grid grid-cols-1 md:grid-cols-2">
      <ContributionCard
        contributionType={contributionType}
        contributionAmount={contributionAmount}
        salary={salary}
        onContributionTypeChange={setContributionType}
        onContributionAmountChange={setContributionAmount}
      />
    </div>
    <Toaster />
  </div>
);

}

export default App;
