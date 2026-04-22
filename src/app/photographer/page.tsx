import { StatsCards } from "@/components/photographer/stats-cards";
// import { RecentClients } from "@/components/photographer/recent-clients";
import { QuickActions } from "@/components/photographer/quick-actions";

export default function PhotographerPage() {
  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Manage wedding photo selection business.
        </p>
      </section>

      <StatsCards />

      <section className="grid gap-6 lg:grid-cols-3">
        {/* <div className="lg:col-span-2">
          <RecentClients />
        </div> */}
        <QuickActions />
      </section>
    </div>
  );
}
