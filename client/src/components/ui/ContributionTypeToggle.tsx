import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save, Percent, DollarSign } from "lucide-react"; // If using lucide for icons

interface Props {
  contributionType: "percentage" | "dollar";
  contributionAmount: number;
  sliderMax: number;
  sliderStep: number;
  isLoading: boolean;
  salary: number;
  onContributionTypeChange: (type: "percentage" | "dollar") => void;
  onContributionAmountChange: (amount: number) => void;
  handleSave: () => void;
}

export function ContributionSettingsCard({
  contributionType,
  contributionAmount,
  sliderMax,
  sliderStep,
  isLoading,
  salary,
  onContributionTypeChange,
  onContributionAmountChange,
  handleSave,
}: Props) {
  return (
    <Card className="shadow-lg max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Save className="h-5 w-5 text-primary" />
          Contribution Settings
        </CardTitle>
        <CardDescription>
          Choose how you'd like to contribute to your 401(k)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Contribution Type</Label>
          <Tabs
            value={contributionType}
            onValueChange={(val) => onContributionTypeChange(val as "percentage" | "dollar")}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="percentage" className="gap-2">
                <Percent className="h-4 w-4" />
                Percentage
              </TabsTrigger>
              <TabsTrigger value="dollar" className="gap-2">
                <DollarSign className="h-4 w-4" />
                Dollar Amount
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>
              {contributionType === "percentage"
                ? "Contribution Percentage"
                : "Contribution Amount (per paycheck)"}
            </Label>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                value={contributionAmount}
                onChange={(e) => onContributionAmountChange(parseFloat(e.target.value) || 0)}
                className="w-24 text-right"
                min={0}
                max={sliderMax}
                step={sliderStep}
              />
              <span className="text-muted-foreground">
                {contributionType === "percentage" ? "%" : "$"}
              </span>
            </div>
          </div>
          <Slider
            value={[contributionAmount]}
            onValueChange={([value]) => onContributionAmountChange(value)}
            max={sliderMax}
            step={sliderStep}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>0{contributionType === "percentage" ? "%" : "$"}</span>
            <span>
              {sliderMax}
              {contributionType === "percentage" ? "%" : "$"}
            </span>
          </div>
        </div>
        {contributionType === "percentage" && (
          <div className="rounded-lg bg-muted p-4">
            <p className="text-sm text-muted-foreground">
              Per paycheck contribution:{" "}
              <span className="font-semibold text-foreground">
                ${((salary / 26) * (contributionAmount / 100)).toFixed(2)}
              </span>
            </p>
          </div>
        )}
        {contributionType === "dollar" && (
          <div className="rounded-lg bg-muted p-4">
            <p className="text-sm text-muted-foreground">
              Percentage of salary:{" "}
              <span className="font-semibold text-foreground">
                {((contributionAmount / (salary / 26)) * 100).toFixed(2)}%
              </span>
            </p>
          </div>
        )}
        <Button
          onClick={handleSave}
          disabled={isLoading}
          className="w-full"
          size="lg"
        >
          <Save className="mr-2 h-4 w-4" />
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </CardContent>
    </Card>
  );
}
