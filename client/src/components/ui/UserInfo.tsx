import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { User } from "lucide-react";

export function UserInfoCard({
  name = "John Doe",
  employeeId = "EMP-12345",
  salary = 75000
}) {
  return (
    <Card className="shadow-lg mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5 text-primary" />
          Employee Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Name</span>
            <span className="font-medium text-foreground">{name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Employee ID</span>
            <span className="font-medium text-foreground">{employeeId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Annual Salary</span>
            <span className="font-bold text-primary">${salary.toLocaleString()}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
