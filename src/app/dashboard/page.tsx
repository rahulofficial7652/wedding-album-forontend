import { QuickActions } from "@/components/photographer/quick-actions";

export default function PhotographerPage() {
  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Manage your albums and client delivery workflows.
        </p>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <QuickActions />
      </section>
    </div>
  );
}
