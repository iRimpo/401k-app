import './App.css';
import { ContributionCard } from "@/components/ui/ContributionTypeToggle"; 
import { Toaster } from "sonner"; 
import { Navbar } from "@/components/ui/Navbar";
import { YearToDateSummaryCard } from "@/components/ui/YearToDate";
import { UserInfoCard } from "@/components/ui/UserInfo";
import { RetirementProjection } from "@/components/ui/Retirement";
import { useEffect, useState } from "react";

function App() {
  const [contributionType, setContributionType] = useState<"percentage" | "dollar">("percentage");
  const [contributionAmount, setContributionAmount] = useState<number>(0);

  // Only use a real userId if you have authentication
  const userId = "EMP-12345";

  const currentAge = 30;
  const retirementAge = 65;
  const salary = 67676; 
  const payPeriodsSoFar = 20; // Hard-coded/mock, update as needed
  const perPaycheckAmount = contributionType === "percentage"
    ? (salary / 26) * (contributionAmount / 100)
    : contributionAmount;

  // Calculate YTD
  const ytdContributions = perPaycheckAmount * payPeriodsSoFar;

  // ------ ADD: Load rate from backend on page load ------
  useEffect(() => {
    async function fetchRate() {
      try {
        const res = await fetch(`http://localhost:3001/api/contribution-rate?userId=${userId}`);
        if (res.ok) {
          const data = await res.json();
          if (data.type) setContributionType(data.type);
          if (data.amount !== undefined) setContributionAmount(Number(data.amount));
        }
      } catch (error) {
        // Optionally handle error (e.g., toast, console.log)
        console.error("Failed to load contribution rate:", error);
      }
    }
    fetchRate();
  }, []);
  // ------------------------------------------------------

  // ------ ADD: Function to save rate to backend ------
  async function handleSave() {
    try {
      await fetch("http://localhost:3001/api/contribution-rate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: userId,
          type: contributionType,
          amount: contributionAmount
        })
      });
      // Optionally show success notification
      // e.g., toast.success("Saved!")
    } catch (error) {
      // Optionally show error notification
      console.error("Failed to save contribution rate:", error);
    }
  }
  // ---------------------------------------------------

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
      <main className="container mx-auto max-w-5xl px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Left column: stacked summary cards */}
          <div className="flex flex-col gap-6">
            {/* Pass handleSave to your card or button */}
            <ContributionCard
              contributionType={contributionType}
              contributionAmount={contributionAmount}
              salary={salary}
              onContributionTypeChange={setContributionType}
              onContributionAmountChange={setContributionAmount}
              onSave={handleSave}
            />
            <YearToDateSummaryCard ytdAmount={ytdContributions} />
            <UserInfoCard
              name="Richard Azucenas"
              employeeId={userId}
              salary={salary}
            />
          </div>
          <RetirementProjection
            currentAge={currentAge}
            retirementAge={retirementAge}
            contributionType={contributionType}
            contributionAmount={contributionAmount}
            salary={salary}
          />
        </div>
      </main>
      <Toaster />
    </div>
  );
}

export default App;
