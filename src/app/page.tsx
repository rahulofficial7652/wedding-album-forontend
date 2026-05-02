import Link from "next/link";
import { ArrowRight, CheckCircle2, Heart, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ModeToggle } from "@/components/ui/modetoggle";

const features = [
  {
    title: "Curated client galleries",
    description: "Deliver elegant online galleries with fast loading and effortless navigation.",
    icon: Sparkles,
  },
  {
    title: "Selection made simple",
    description: "Let couples shortlist favorites with comments so final delivery is crystal clear.",
    icon: Heart,
  },
  {
    title: "Secure studio workflow",
    description: "Protect private memories with controlled sharing and polished studio-facing tools.",
    icon: ShieldCheck,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold tracking-wide">Wedding Album Suite</p>
          <div className="flex items-center gap-2">
            <ModeToggle/>
            <Button variant="ghost" asChild>
              <Link href="/login">Log in</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      <main>
        <section className="mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-24">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Luxury client experience</p>
            <h1 className="text-4xl leading-tight sm:text-5xl">
              Deliver wedding memories with elegance, clarity, and trust.
            </h1>
            <p className="max-w-xl text-base text-muted-foreground sm:text-lg">
              A premium SaaS workspace for photographers to publish albums, guide client selections,
              and deliver final moments beautifully.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button size="lg" asChild>
                <Link href="/signup">
                  Start Free
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/client">View client demo</Link>
              </Button>
            </div>
          </div>

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Product Preview</CardTitle>
              <CardDescription>Everything your studio needs in one premium dashboard.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              {[
                "Album creation and sharing in minutes",
                "Client shortlisting, comments, and approvals",
                "Organized project flow from upload to delivery",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 rounded-lg border bg-muted/40 px-3 py-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>{item}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        <section className="border-y bg-muted/30">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl">Why photographers love it</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {features.map(({ title, description, icon: Icon }) => (
                <Card key={title}>
                  <CardHeader>
                    <Icon className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">{title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl space-y-6 px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl">Client selection demo</h2>
          <Card>
            <CardContent className="space-y-3 p-6 text-sm text-muted-foreground">
              <p>• Couple opens their private link and views a refined responsive gallery.</p>
              <p>• They tap favorites, add notes, and submit selections with confidence.</p>
              <p>• Photographer receives clean selection data ready for final edits and delivery.</p>
            </CardContent>
          </Card>
        </section>

        <section className="bg-muted/30">
          <div className="mx-auto max-w-6xl space-y-5 px-4 py-14 text-center sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl">Testimonials (placeholder)</h2>
            <p className="text-muted-foreground">
              &ldquo;Our couples loved the experience — premium, simple, and emotional.&rdquo;
              {" "}&ldquo;Workflow is finally calm and production-ready.&rdquo;
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <Card className="border-primary/30 bg-primary/5">
            <CardContent className="flex flex-col items-start justify-between gap-4 p-6 sm:flex-row sm:items-center">
              <div>
                <h3 className="text-xl">Ready to upgrade your wedding delivery experience?</h3>
                <p className="mt-1 text-sm text-muted-foreground">Launch your premium client workflow today.</p>
              </div>
              <Button size="lg" asChild>
                <Link href="/signup">Create Account</Link>
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} Wedding Album Suite</p>
          <p>Crafted for timeless memories.</p>
        </div>
      </footer>
    </div>
  );
}
