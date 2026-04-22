
import { Card, CardContent } from "@/components/ui/card";
export function StatsCards() {
 const data = [
  ["Total Clients", "24"],
  ["Pending Selections", "08"],
  ["Delivered Albums", "16"],
  ["Revenue", "₹1.2L"],
 ];

 return (
  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
   {data.map(([title, value]) => (
    <Card key={title}>
     <CardContent className="p-6">
      <p className="text-sm text-muted-foreground">{title}</p>
      <p className="text-2xl font-bold mt-2">{value}</p>
     </CardContent>
    </Card>
   ))}
  </div>
 );
}
