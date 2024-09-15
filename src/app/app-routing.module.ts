import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LogInGuard } from "../services/guards/log-in/log-in.guard";
import { ACCOUNT, LAYOUT, REGISTER } from "./shared/constants/routes-constant";
import { RegisterGuardGuard } from "src/services/guards/register-guard.guard";
import { AuthGuard } from "src/services/guards/auth-guard/auth-guard.guard";

export const routes: Routes = [
  { path: "", redirectTo: ACCOUNT, pathMatch: "full" },
  {
    path: ACCOUNT,
    loadChildren: () =>
      import("./modules/accounts/accounts.module").then(
        (m) => m.AccountsModule
      ),
    canLoad: [LogInGuard],
  },
  {
    path: REGISTER,
    loadChildren: () =>
      import("./modules/register-form/register-form.module").then(
        (m) => m.RegisterFormModule
      ),
    // canLoad: [RegisterGuardGuard],
  },
  {
    path: LAYOUT,
    loadChildren: () =>
      import("./modules/main/main.module").then((m) => m.MainModule),
    canLoad: [AuthGuard],
  },
  {
    path: "**",
    loadChildren: () =>
      import("./modules/not-found/not-found.module").then(
        (m) => m.NotFoundModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
