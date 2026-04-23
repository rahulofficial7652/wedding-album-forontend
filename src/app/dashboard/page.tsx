import { CalendarDays, CheckCircle2, ImageIcon, Users } from "lucide-react";
import { QuickActions } from "@/components/photographer/quick-actions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const metricCards = [
  { label: "Total albums", value: "24", trend: "+12% this month", icon: ImageIcon },
  { label: "Active clients", value: "18", trend: "4 awaiting selection", icon: Users },
  { label: "Pending approvals", value: "9", trend: "3 due this week", icon: CalendarDays },
  { label: "Delivered projects", value: "112", trend: "98% on-time", icon: CheckCircle2 },
];

export default function PhotographerPage() {
  return (
    <div className="space-y-6">
      <section className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Dashboard</h1>
        <p className="text-sm text-muted-foreground sm:text-base">
          Manage your albums and client delivery workflows.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metricCards.map(({ label, value, trend, icon: Icon }) => (
          <Card key={label}>
            <CardHeader className="flex flex-row items-start justify-between space-y-0">
              <div>
                <CardDescription>{label}</CardDescription>
                <CardTitle className="mt-2 text-2xl">{value}</CardTitle>
              </div>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">{trend}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.7fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Recent Client Activity</CardTitle>
            <CardDescription>Responsive table for delivery pipeline health.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead>Album</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Updated</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  ["Emma & Liam", "Sunset Ceremony", "Selection Open", "2h ago"],
                  ["Olivia & Noah", "Reception", "Awaiting Approval", "Yesterday"],
                  ["Sophia & Ethan", "Highlights", "Delivered", "2 days ago"],
                ].map(([client, album, status, updated]) => (
                  <TableRow key={client}>
                    <TableCell className="font-medium">{client}</TableCell>
                    <TableCell>{album}</TableCell>
                    <TableCell>{status}</TableCell>
                    <TableCell className="text-right text-muted-foreground">{updated}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <QuickActions />
      </section>
    </div>
  );
}
