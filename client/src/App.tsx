import './App.css'

import { useState } from "react";
import { ContributionSettingsCard } from "@/components/ui/ContributionTypeToggle";

function App() {
  // You can adjust these based on your requirements
  const [contributionType, setContributionType] = useState<"percentage" | "dollar">("percentage");
  const [contributionAmount, setContributionAmount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);

  // For demo/mock, you might hard-code salary
  const salary = 75000; // Example annual salary

  // Slider behavior: adjust these as desired
  const sliderMax = contributionType === "percentage" ? 15 : 1500;
  const sliderStep = contributionType === "percentage" ? 0.5 : 10;

  // Handler for saving (add API logic here)
  const handleSave = async () => {
    setIsLoading(true);
    // TODO: Integrate actual API POST to backend here
    await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate network
    setIsLoading(false);
    alert(`Saved! Type: ${contributionType}, Amount: ${contributionAmount}`);
  };

  return (
    <div className="min-h-screen bg-muted flex items-center justify-center p-4">
      <ContributionSettingsCard
        contributionType={contributionType}
        contributionAmount={contributionAmount}
        salary={salary}
        sliderMax={sliderMax}
        sliderStep={sliderStep}
        isLoading={isLoading}
        onContributionTypeChange={setContributionType}
        onContributionAmountChange={setContributionAmount}
        handleSave={handleSave}
      />
    </div>
  );
}

export default App
