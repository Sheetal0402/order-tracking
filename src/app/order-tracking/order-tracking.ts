import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatStepperModule } from '@angular/material/stepper';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Observable, catchError, of } from 'rxjs';
import { OrderTrackingService } from './order-tracking.service';
import type { OrderStatus } from './order-tracking.service';

@Component({
  selector: 'app-order-tracking',
  templateUrl: './order-tracking.html',
  styleUrls: ['./order-tracking.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatStepperModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatButtonModule
  ]
})
export class OrderTrackingComponent implements OnInit {
  orderId: string | null = null;
  orderStatus$: Observable<OrderStatus | null> = of(null);
  error: string | null = null;
  loading = true;

  readonly steps = [
    { label: 'Order Created', value: 'ORDER_CREATED' },
    { label: 'Order Confirmation', value: 'ORDER_CONFIRMED' },
    { label: 'Ready to Ship', value: 'READY_TO_SHIP' },
    { label: 'Delivered', value: 'DELIVERED' }
  ];

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderTrackingService
  ) {}

  ngOnInit(): void {
    this.orderId = this.route.snapshot.paramMap.get('orderId');
    if (this.orderId) {
      this.fetchOrderStatus(this.orderId);
    } else {
      this.error = 'Order ID is required';
      this.loading = false;
    }
  }

  private fetchOrderStatus(orderId: string): void {
    this.loading = true;
    this.error = null;
    
    this.orderStatus$ = this.orderService.getOrderStatus(orderId).pipe(
      catchError(error => {
        this.error = 'Failed to load order status. Please try again.';
        this.loading = false;
        return of(null);
      })
    );
    
    // Subscribe to handle loading state
    this.orderStatus$.subscribe({
      next: (status) => {
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load order status. Please try again.';
        this.loading = false;
      }
    });
  }

  getStepIndex(status: string): number {
    return this.steps.findIndex(step => step.value === status);
  }

  getStepState(stepValue: string, currentStatus: string): string {
    const stepIndex = this.getStepIndex(stepValue);
    const currentIndex = this.getStepIndex(currentStatus);
    
    if (stepIndex < currentIndex) {
      return 'done';
    } else if (stepIndex === currentIndex) {
      return 'number';
    } else {
      return 'number';
    }
  }

  getCurrentStepLabel(status: string): string {
    const step = this.steps.find(s => s.value === status);
    return step ? step.label : 'Unknown Status';
  }

  retryLoad(): void {
    if (this.orderId) {
      this.fetchOrderStatus(this.orderId);
    }
  }
}
