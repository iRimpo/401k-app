import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { TrendingUp, Calculator } from "lucide-react";

interface RetirementProjectionProps {
  currentAge: number;
  retirementAge: number;
  contributionType: 'dollar' | 'percentage';
  contributionAmount: number;
  salary: number;
}

export const RetirementProjection = ({
  currentAge,
  retirementAge,
  contributionType,
  contributionAmount,
  salary,
}: RetirementProjectionProps) => {
  const yearsToRetirement = retirementAge - currentAge;
  const annualReturn = 0.07; // 7% average annual return
  
  const biweeklyContribution = contributionType === 'percentage'
    ? (salary / 26) * (contributionAmount / 100)
    : contributionAmount;
  
  const annualContribution = biweeklyContribution * 26;

  // Calculate future value with compound interest
  const calculateFutureValue = (years: number, annualContrib: number) => {
    let total = 0;
    for (let i = 0; i < years; i++) {
      total = (total + annualContrib) * (1 + annualReturn);
    }
    return total;
  };

  const projectedValue = calculateFutureValue(yearsToRetirement, annualContribution);
  
  // Calculate what 1% more would be worth
  const onePercentMore = contributionType === 'percentage'
    ? (salary / 26) * ((contributionAmount + 1) / 100) * 26
    : annualContribution + (salary * 0.01);
  
  const onePercentMoreValue = calculateFutureValue(yearsToRetirement, onePercentMore);
  const additionalValue = onePercentMoreValue - projectedValue;

  // Generate chart data
  const chartData = [];
  for (let year = 0; year <= yearsToRetirement; year += 5) {
    chartData.push({
      age: currentAge + year,
      current: calculateFutureValue(year, annualContribution),
      increased: calculateFutureValue(year, onePercentMore),
    });
  }
  // Always include the final year
  if (chartData[chartData.length - 1].age !== retirementAge) {
    chartData.push({
      age: retirementAge,
      current: projectedValue,
      increased: onePercentMoreValue,
    });
  }

  const chartConfig = {
    current: {
      label: "Current Rate",
      color: "hsl(var(--chart-1))",
    },
    increased: {
      label: "With 1% More",
      color: "hsl(var(--chart-2))",
    },
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-primary" />
          Retirement Projection
        </CardTitle>
        <CardDescription className="text-left">
          See how your savings will grow by age {retirementAge}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-primary/10 border-2 border-primary/20">
            <p className="text-left text-sm text-muted-foreground mb-1">Projected Balance at {retirementAge}</p>
            <p className="text-left text-3xl font-bold text-primary">
              ${projectedValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </p>
          </div>

          <div className="p-4 rounded-lg bg-green-200 border-2 border-green-600">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-left text-sm text-muted-foreground mb-1">
                  If you save 1% more per year
                </p>
                <p className="text-left text-green-600 text-2xl font-bold text-accent">
                  +${additionalValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-accent text-green-600" />
            </div>
            <p className="text-left text-xs text-muted-foreground mt-2">
              That's an extra ${(additionalValue / yearsToRetirement).toLocaleString(undefined, { maximumFractionDigits: 0 })} per year
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-foreground">Growth Projection</h4>
          <ChartContainer config={chartConfig} className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="age" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line 
                  type="monotone" 
                  dataKey="current" 
                  stroke="#2563eb" 
                  strokeWidth={3}
                  dot={false}
                />
                <Line 
                  type="monotone" 
                  dataKey="increased" 
                  stroke="#16a34a"
                  strokeWidth={3}
                  dot={false}
                  strokeDasharray="5 5"
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>

        <div className="pt-4 border-t border-border space-y-1">
          <p className="text-xs text-muted-foreground">
            * Assumes 7% average annual return
          </p>
          <p className="text-xs text-muted-foreground">
            * Does not include employer matching contributions
          </p>
          <p className="text-xs text-muted-foreground">
            * Projections are estimates and actual results may vary
          </p>
        </div>
      </CardContent>
    </Card>
  );
};