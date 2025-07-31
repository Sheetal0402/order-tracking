import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'track-order/:orderId',
    loadComponent: () => import('./order-tracking/order-tracking').then(m => m.OrderTrackingComponent)
  },
  {
    path: '',
    redirectTo: '/track-order/123',
    pathMatch: 'full'
  }
];
