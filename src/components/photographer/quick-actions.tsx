import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function QuickActions() {
 return (
  <Card>
   <CardHeader><CardTitle>Quick Actions</CardTitle></CardHeader>
   <CardContent className="space-y-3">
    <Button className="w-full">Add Client</Button>
    <Button variant="outline" className="w-full">Upload Photos</Button>
    <Button variant="outline" className="w-full">Create Share Link</Button>
   </CardContent>
  </Card>
 );
}
