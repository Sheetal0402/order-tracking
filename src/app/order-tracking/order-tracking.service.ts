import { Injectable } from '@angular/core';
import { Observable, of, delay, throwError } from 'rxjs';

export interface OrderStatus {
  currentStatus: 'ORDER_CREATED' | 'ORDER_CONFIRMED' | 'READY_TO_SHIP' | 'DELIVERED';
  timestamp: string;
  orderId: string;
  details?: string;
  customerName?: string;
  orderValue?: number;
  estimatedDelivery?: string;
}

@Injectable({
  providedIn: 'root'
})
export class OrderTrackingService {
  private mockOrders: { [key: string]: OrderStatus } = {
    '123': {
      orderId: '123',
      currentStatus: 'ORDER_CONFIRMED',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      details: 'Your order has been confirmed and is being processed',
      customerName: 'John Doe',
      orderValue: 299.99,
      estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString()
    },
    '456': {
      orderId: '456',
      currentStatus: 'READY_TO_SHIP',
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      details: 'Your order is packed and ready for shipping',
      customerName: 'Jane Smith',
      orderValue: 149.99,
      estimatedDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString()
    },
    '789': {
      orderId: '789',
      currentStatus: 'DELIVERED',
      timestamp: new Date().toISOString(),
      details: 'Your order has been delivered successfully',
      customerName: 'Bob Johnson',
      orderValue: 499.99,
      estimatedDelivery: new Date().toISOString()
    },
    'error': {
      orderId: 'error',
      currentStatus: 'ORDER_CREATED',
      timestamp: new Date().toISOString(),
      details: 'This will cause an error'
    }
  };

  getOrderStatus(orderId: string): Observable<OrderStatus> {
    // Simulate error case
    if (orderId === 'error') {
      return throwError(() => new Error('Order not found'));
    }
    
    // Simulate API delay
    return of(this.mockOrders[orderId] || {
      orderId: orderId,
      currentStatus: 'ORDER_CREATED',
      timestamp: new Date().toISOString(),
      details: 'New order created',
      customerName: 'Customer',
      orderValue: 99.99,
      estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString()
    }).pipe(delay(1500)); // 1.5 second delay to simulate network request
  }
}
