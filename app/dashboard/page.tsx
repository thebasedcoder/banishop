import { redirect } from 'next/navigation';

export default function DashboardPage() {
  // This redirect runs on the server and sends the user
  // directly to the orders page.
  redirect('/dashboard/orders');

  // This component will never render, so you don't need to return any JSX.
}