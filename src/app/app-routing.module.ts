import {NgModule} from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';

import {LayoutComponent} from './layout/layout.component';

import {AdminGuard} from './admin.guard';
import {AuthGuard} from './auth.guard';

// Estrategia manual de precarga
import {PreloadStrategyService} from './core/services/preload-strategy.service';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
        data: {preloadManual: true}  //  Flag manual para verificar que rutas precargar y cuales no
      },
      {
        path: 'products',
        loadChildren: () => import('./product/product.module').then(m => m.ProductModule)
      },
      {
        path: 'contact',
        loadChildren: () => import('./contact/contact.module').then(m => m.ContactModule)
      },
      {
        path: 'order',
        loadChildren: () => import('./order/order.module').then(m => m.OrderModule),
        data: {preloadManual: true}
      },
      {
        path: 'demo',
        loadChildren: () => import('./demo/demo.module').then(m => m.DemoModule),
        data: {preloadManual: true}
      },
    ]
  },
  {
    path: 'admin',
    canActivate: [AdminGuard],
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'auth',
    canActivate: [AuthGuard],
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '**',
    loadChildren: () => import('./page-not-found/page-not-found.module').then(m => m.PageNotFoundModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // preloadingStrategy: PreloadAllModules  // Precarga todos los modulos
    preloadingStrategy: PreloadStrategyService   // Le pasamos nuestro servicio que tiene la estrategia manual
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
