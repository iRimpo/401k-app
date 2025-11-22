import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DollarSign, Percent, Save } from "lucide-react";
import { toast } from "sonner";

interface ContributionCardProps {
  contributionType: 'dollar' | 'percentage';
  contributionAmount: number;
  onContributionTypeChange: (type: 'dollar' | 'percentage') => void;
  onContributionAmountChange: (amount: number) => void;
  salary: number;
}

export const ContributionCard = ({
  contributionType,
  contributionAmount,
  onContributionTypeChange,
  onContributionAmountChange,
  salary,
}: ContributionCardProps) => {
  const [isLoading, setIsLoading] = useState(false);

  // Load saved settings from localStorage on mount
  useEffect(() => {
    const savedType = localStorage.getItem('contributionType');
    const savedAmount = localStorage.getItem('contributionAmount');
    
    if (savedType) {
      onContributionTypeChange(savedType as 'dollar' | 'percentage');
    }
    if (savedAmount) {
      onContributionAmountChange(parseFloat(savedAmount));
    }
  }, []);

  const handleSave = () => {
    setIsLoading(true);
    try {
      localStorage.setItem('contributionType', contributionType);
      localStorage.setItem('contributionAmount', contributionAmount.toString());

      toast.success("Settings Saved", {
        description: "Your contribution preferences have been updated successfully.",
        icon: <Save className="h-5 w-5 text-primary" />
      });
    } catch (error) {
      console.error('Error saving settings:', error);
      toast.error("Error", {
        description: "Failed to save your settings. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const maxDollar = Math.floor(salary / 26); // Biweekly
  const maxPercentage = 100;

  const sliderMax = contributionType === 'dollar' ? maxDollar : maxPercentage;
  const sliderStep = contributionType === 'dollar' ? 50 : 0.5;

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Save className="h-5 w-5 text-primary " />
          Contribution Settings
        </CardTitle>
        <CardDescription className="text-left">
          Choose how you'd like to contribute to your 401(k)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Contribution Type</Label>
          <Tabs 
            value={contributionType} 
            onValueChange={(value) => onContributionTypeChange(value as 'dollar' | 'percentage')}
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
          <div className="flex items-center justify-between min-w-[500px]">
            <Label>
              {contributionType === 'percentage' 
                ? 'Contribution Percentage' 
                : 'Contribution Amount (per paycheck)'}
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
                {contributionType === 'percentage' ? '%' : '$'}
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
            <span>0{contributionType === 'percentage' ? '%' : '$'}</span>
            <span>{sliderMax}{contributionType === 'percentage' ? '%' : '$'}</span>
          </div>
        </div>

        {contributionType === 'percentage' && (
          <div className="rounded-lg bg-muted p-4">
            <p className="text-left text-sm text-muted-foreground">
              Per paycheck contribution:{' '}
              <span className="font-semibold text-foreground">
                ${((salary / 26) * (contributionAmount / 100)).toFixed(2)}
              </span>
            </p>
          </div>
        )}

        {contributionType === 'dollar' && (
          <div className="rounded-lg bg-muted p-4">
            <p className="text-left text-sm text-muted-foreground">
              Percentage of salary:{' '}
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
          {isLoading ? 'Saving...' : 'Save Changes'}
        </Button>
      </CardContent>
    </Card>
  );
};