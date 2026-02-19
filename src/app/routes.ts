import { createBrowserRouter } from "react-router";
import { Landing } from "./pages/Landing";
import { DashboardLayout } from "./components/DashboardLayout";
import { DashboardHome } from "./pages/DashboardHome";
import { PatientIntake } from "./pages/PatientIntake";
import { VCFUpload } from "./pages/VCFUpload";
import { DrugSelection } from "./pages/DrugSelection";
import { AnalysisLoading } from "./pages/AnalysisLoading";
import { ResultsDashboard } from "./pages/ResultsDashboard";
import { ExportCenter } from "./pages/ExportCenter";
import { AuditLog } from "./pages/AuditLog";
import { Settings } from "./pages/Settings";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Landing,
  },
  {
    path: "/dashboard",
    Component: DashboardLayout,
    children: [
      { index: true, Component: DashboardHome },
      { path: "intake", Component: PatientIntake },
      { path: "upload", Component: VCFUpload },
      { path: "drug-selection", Component: DrugSelection },
      { path: "analyzing", Component: AnalysisLoading },
      { path: "results", Component: ResultsDashboard },
      { path: "export", Component: ExportCenter },
      { path: "audit", Component: AuditLog },
      { path: "settings", Component: Settings },
    ],
  },
]);
