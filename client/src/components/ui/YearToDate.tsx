import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { CalendarCheck } from "lucide-react";

export function YearToDateSummaryCard({ ytdAmount = 3125 }) {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalendarCheck className="h-5 w-5 text-primary text-left" />
          Year-to-Date Summary
        </CardTitle>
        <CardDescription className="text-left">
          Your contribution progress for this year
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-3 bg-muted px-4 py-3 rounded-lg">
          <CalendarCheck className="h-6 w-6 text-green-600" />
          <div>
            <p className="text-left ext-xs text-muted-foreground">YTD Contributions</p>
            <div className="text-left text-2xl font-bold text-foreground">$4,175</div>
          </div>
        </div>
      </CardContent>
      <CardContent>
        <div className="flex items-center gap-3 bg-muted px-4 py-3 rounded-lg">
          <CalendarCheck className="h-6 w-6 text-primary" />
          <div>
            <p className="text-left ext-xs text-muted-foreground">Projected</p>
            <div className="text-left text-2xl font-bold text-foreground">${ytdAmount.toLocaleString()}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
