import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'profile',
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./user-profile/user-profile.module').then(
        (m) => m.UserProfileModule
      ),
  },
  {
    path: 'create-patent',
    loadChildren: () =>
      import('./create-patent/create-patent.module').then(
        (m) => m.CreatePatentModule
      ),
  },
  {
    path: 'shared',
    loadChildren: () =>
      import('./tokens-shared/tokens-shared.module').then(
        (m) => m.TokensSharedModule
      ),
  },
  {
    path: 'transfered',
    loadChildren: () =>
      import('./tokens-transfered/tokens-transfered.module').then(
        (m) => m.TokensTransferedModule
      ),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
