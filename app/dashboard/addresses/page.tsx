import { AddressesList } from "@/components/dashboard/addresses-list";

// Mock Data
const addresses = [
  { id: 1, name: 'Home', street: 'Musterstraße 123', city: 'Berlin', zip: '10115', isDefault: true },
  { id: 2, name: 'Work', street: 'Büroallee 45', city: 'München', zip: '80331', isDefault: false },
];

export default function DashboardAddressesPage() {
  return <AddressesList initialAddresses={addresses} />;
}