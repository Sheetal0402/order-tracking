# Order Tracking App

An Angular-based single-page application that provides a comprehensive order tracking UI component for displaying order progress through a 4-step delivery process.

## Project Overview

This project is a UI-only implementation of an order tracking system designed to be integrated into existing Angular applications. The application displays order status progress through four distinct stages:

1. **Order Created** - Initial order placement
2. **Order Confirmation** - Order has been confirmed and processed
3. **Ready to Ship** - Order is prepared and ready for shipping
4. **Delivered** - Order has been successfully delivered

The component is designed to work with external APIs and can be easily integrated into any existing Angular application.

## Features

- ✅ **4-Step Progress Tracking** - Visual progress indicator for order status
- ✅ **Responsive Design** - Works on desktop and mobile devices
- ✅ **Angular Material Integration** - Modern, consistent UI components
- ✅ **Service-based Architecture** - Modular design for easy API integration
- ✅ **Standalone Component** - Can be easily imported into existing projects
- ✅ **TypeScript Support** - Full type safety and modern development experience
- ✅ **Unit Testing** - Comprehensive test coverage with Karma/Jasmine

## Technologies Used

- **Angular 20.1.4** - Core framework
- **Angular Material** - UI component library
- **TypeScript** - Primary development language
- **SCSS** - Styling and theming
- **RxJS** - Reactive programming for data handling
- **Angular CLI** - Development tooling
- **Karma & Jasmine** - Testing framework

## How to Run the Project

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd order-tracking-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   ng serve
   ```

4. **Open your browser:**
   Navigate to `http://localhost:4200/` to view the application.

### Build for Production

```bash
ng build --prod
```

The build artifacts will be stored in the `dist/` directory.

### Running Tests

```bash
# Unit tests
ng test

# End-to-end tests
ng e2e
```

## Folder Structure

```
src/
├── app/
│   ├── order-tracking/          # Main order tracking component
│   │   ├── order-tracking.ts     # Component logic
│   │   ├── order-tracking.html   # Component template
│   │   ├── order-tracking.scss   # Component styles
│   │   ├── order-tracking.service.ts  # Service for API calls
│   │   └── order-tracking.spec.ts     # Unit tests
│   ├── app.config.ts            # App configuration
│   ├── app.routes.ts            # Routing configuration
│   └── app.ts                   # Root app component
├── styles.scss                  # Global styles
└── index.html                   # Main HTML file
```

## Notes for Integration into an Existing App

### 1. Import the Component

```typescript
import { OrderTrackingComponent } from './order-tracking/order-tracking';

@Component({
  imports: [OrderTrackingComponent],
  // ... other component config
})
export class YourExistingComponent { }
```

### 2. Use in Template

```html
<app-order-tracking [orderId]="orderNumber"></app-order-tracking>
```

### 3. Required Dependencies

Ensure your existing project includes:
- Angular Material
- Angular CDK
- Required peer dependencies

### 4. Styling Integration

The component uses Angular Material theming. Ensure your app has a Material theme configured.

## API Integration Instructions

### Mock Service (Current Implementation)

The project currently uses a mock service that simulates API responses. To integrate with a real API:

### 1. Update the Service

```typescript
// In order-tracking.service.ts
getOrderStatus(orderId: string): Observable<OrderStatus> {
  // Replace mock data with actual HTTP calls
  return this.http.get<OrderStatus>(`/api/orders/${orderId}/status`);
}
```

### 2. Expected API Response Format

```typescript
interface OrderStatus {
  orderId: string;
  currentStep: number; // 1-4 (Order Created, Confirmed, Ready to Ship, Delivered)
  steps: OrderStep[];
  estimatedDelivery?: Date;
  trackingNumber?: string;
}

interface OrderStep {
  stepNumber: number;
  stepName: string;
  completed: boolean;
  completedDate?: Date;
  description?: string;
}
```

### 3. API Endpoints

Your backend should provide:
- `GET /api/orders/{orderId}/status` - Get current order status
- `GET /api/orders/{orderId}/tracking` - Get detailed tracking information

## Future Enhancements / TODO

- [ ] **Real-time Updates** - WebSocket integration for live status updates
- [ ] **Detailed Tracking** - Add delivery tracking with map integration
- [ ] **Notifications** - Email/SMS notifications for status changes
- [ ] **Multiple Orders** - Support for tracking multiple orders simultaneously
- [ ] **Internationalization** - Multi-language support
- [ ] **Dark Theme** - Dark mode support
- [ ] **Accessibility** - Enhanced WCAG compliance
- [ ] **Mobile App** - PWA capabilities for mobile experience
- [ ] **Analytics** - Tracking analytics and user behavior insights
- [ ] **Custom Theming** - More customization options for branding

## Additional Resources

- [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli)
- [Angular Material Documentation](https://material.angular.io/)
- [Angular Official Documentation](https://angular.dev/)
