"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Plus, MoreVertical, Edit, Trash2 } from 'lucide-react';
import { AddAddressModal } from '@/components/dashboard/add-address-modal'; // Import the new modal component

// Define the type for a single address
interface Address {
  id: number;
  name: string;
  street: string;
  city: string;
  zip: string;
  isDefault: boolean;
}

// Define the props for the component, including the initial addresses
interface AddressesListProps {
  initialAddresses: Address[];
}

export function AddressesList({ initialAddresses }: AddressesListProps) {
  const [addresses, setAddresses] = useState<Address[]>(initialAddresses);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSaveAddress = (newAddressData: Omit<Address, 'id' | 'isDefault'>) => {
    const newAddress: Address = {
      id: Math.max(...addresses.map(a => a.id), 0) + 1, // Simple ID generation
      ...newAddressData,
      isDefault: addresses.length === 0, // Make first address the default
    };
    setAddresses([...addresses, newAddress]);
    setIsModalOpen(false); // Close the modal after saving
  };

  const handleSetDefault = (addressId: number) => {
    setAddresses(
      addresses.map(address => ({
        ...address,
        isDefault: address.id === addressId,
      }))
    );
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Manage Addresses</CardTitle>
            <CardDescription>Add, edit, or remove your shipping addresses.</CardDescription>
          </div>
          <Button onClick={() => setIsModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add New Address
          </Button>
        </CardHeader>
        <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {addresses.map(address => (
            <div
              key={address.id}
              className={`p-4 rounded-lg border ${address.isDefault ? 'border-[#E11D48] bg-[#E11D48]/5' : 'border-gray-200'}`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold">{address.name}</h3>
                  <p className="text-gray-600">{address.street}</p>
                  <p className="text-gray-600">{address.city}, {address.zip}</p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon"><MoreVertical className="h-4 w-4" /></Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" /> Edit
                    </DropdownMenuItem>
                    {!address.isDefault && (
                      <DropdownMenuItem onClick={() => handleSetDefault(address.id)}>
                        Set as Default
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem className="text-red-600 focus:text-red-600 focus:bg-red-50">
                      <Trash2 className="mr-2 h-4 w-4" /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              {address.isDefault && <div className="mt-3 text-xs font-semibold text-[#E11D48]">DEFAULT ADDRESS</div>}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Render the modal, controlled by state */}
      <AddAddressModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveAddress}
      />
    </>
  );
}