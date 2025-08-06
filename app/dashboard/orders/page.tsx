import { OrdersTabs } from "@/components/dashboard/orders-tab";

// Mock Data
const orders = {
  inProgress: [{ id: 'ORD-2025-001', date: '2025-08-05', total: 75.50, status: 'Processing', items: 3 },],
  pending: [{ id: 'ORD-2025-002', date: '2025-08-04', total: 42.10, items: 2 },],
  finished: [{ id: 'ORD-2025-003', date: '2025-07-28', total: 112.80, items: 5 },],
};

export default function DashboardOrdersPage() {
  return <OrdersTabs orders={orders} />;
}