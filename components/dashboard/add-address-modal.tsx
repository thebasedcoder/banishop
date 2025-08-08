"use client";

import { useEffect } from 'react';
import { useFormState, useFormStatus } from "react-dom";
import { addAddress, ActionState } from "@/lib/actions/address/address"; // Import the server action
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// Define the props the modal will accept
interface AddAddressModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const initialState: ActionState = { status: "error", message: "" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" form="add-address-form" className="bg-[#E11D48] hover:bg-[#E11D48]/90" disabled={pending}>
      {pending ? "Saving..." : "Save Address"}
    </Button>
  );
}

export function AddAddressModal({ isOpen, onClose }: AddAddressModalProps) {
  const [state, formAction] = useFormState(addAddress, initialState);

  // Close the modal on successful submission
  useEffect(() => {
    if (state.status === 'success') {
      onClose();
    }
  }, [state, onClose]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Address</DialogTitle>
          <DialogDescription>
            Enter the details for your new shipping address here.
          </DialogDescription>
        </DialogHeader>
        <form action={formAction} id="add-address-form" className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" placeholder="e.g., Home, Work" />
            {state.errors?.name && <p className="text-sm text-red-500">{state.errors.name[0]}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="street">Street</Label>
            <Input id="street" name="street" placeholder="Musterstraße 123" />
            {state.errors?.street && <p className="text-sm text-red-500">{state.errors.street[0]}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input id="city" name="city" placeholder="Berlin" />
            {state.errors?.city && <p className="text-sm text-red-500">{state.errors.city[0]}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="zip">ZIP Code</Label>
            <Input id="zip" name="zip" placeholder="10115" />
            {state.errors?.zip && <p className="text-sm text-red-500">{state.errors.zip[0]}</p>}
          </div>
          {state.errors?._form && <p className="text-sm text-red-500">{state.errors._form[0]}</p>}
        </form>
        <DialogFooter>
          <SubmitButton />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}