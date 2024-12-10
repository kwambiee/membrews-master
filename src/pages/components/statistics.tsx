import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface StatisticCardProps {
  adminCount: number;
  memberCount: number;
  totalCount: number;
}

export function StatisticCard({ adminCount, memberCount, totalCount }: StatisticCardProps) {
  

  return (
    <div className="grid grid-cols-3 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Total Users</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>{totalCount}</CardDescription>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Total Members</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>{memberCount}</CardDescription>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Total Admin</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>{adminCount}</CardDescription>
        </CardContent>
      </Card>
    </div>
  );
}

export default StatisticCard;
