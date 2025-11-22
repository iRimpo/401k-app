import './App.css';
import { useState } from "react";
import { ContributionCard } from "@/components/ui/ContributionTypeToggle"; 
import { Toaster } from "sonner"; 
import { Navbar } from "@/components/ui/Navbar";
import { YearToDateSummaryCard } from "@/components/ui/YearToDate";
import { UserInfoCard } from "@/components/ui/UserInfo";

function App() {
  const [contributionType, setContributionType] = useState<"percentage" | "dollar">("percentage");
  const [contributionAmount, setContributionAmount] = useState<number>(0);

  const salary = 67676; 
  const payPeriodsSoFar = 20; // Hard-coded/mock, update as needed
  const perPaycheckAmount = contributionType === "percentage"
    ? (salary / 26) * (contributionAmount / 100)
    : contributionAmount;

  // Calculate YTD
  const ytdContributions = perPaycheckAmount * payPeriodsSoFar;

  return (
    
  <div className="min-h-screen bg-muted"> 
    <Navbar /> 
    <div> 
      <h2 className="text-left text-4xl font-bold text-foreground mb-2 p-4">
        401(k) Contribution Settings
      </h2>
      <p className="text-left text-muted-foreground text-lg px-4">
        Manage your retirement savings and see how your contributions grow over time
      </p>
    </div>
    <div className="items-center justify-center p-4 grid grid-cols-2 md:grid-cols-2 grid-rows-3">
      <ContributionCard
        contributionType={contributionType}
        contributionAmount={contributionAmount}
        salary={salary}
        onContributionTypeChange={setContributionType}
        onContributionAmountChange={setContributionAmount}
      />
      <div className="flex flex-col gap-6">
            <UserInfoCard 
              name="Richard Azucenas"
              employeeId="EMP-12345"
              salary={salary}
            />
            <YearToDateSummaryCard ytdAmount={ytdContributions} />
      </div>
    </div>
    <Toaster />
  </div>
);

}

export default App;
