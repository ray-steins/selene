import { ROUTES } from "@/configs/app.config";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div>
        <nav>
          <a href={ROUTES.dashboard.assignments}>Assignments</a>
          <a href={ROUTES.dashboard.classes}>Classes</a>
        </nav>
      </div>
      <div>
        { children }
      </div>
    </>
  )
}