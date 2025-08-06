"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function SecurityForms() {
  // In a real application, you would use a form library like react-hook-form
  // and state management for loading/error states.

  return (
    <div className="space-y-8">
      {/* Change Password Card */}
      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>
            For your security, we recommend choosing a strong password that you don't use elsewhere.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-password">Current Password</Label>
            <Input id="current-password" type="password" placeholder="Enter your current password" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input id="new-password" type="password" placeholder="Enter a new password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input id="confirm-password" type="password" placeholder="Confirm the new password" />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="ml-auto bg-[#E11D48] hover:bg-[#E11D48]/90">
            Update Password
          </Button>
        </CardFooter>
      </Card>

      {/* Danger Zone Card */}
      <Card className="border-red-500/50">
        <CardHeader>
          <CardTitle className="text-red-600">Danger Zone</CardTitle>
          <CardDescription>
            These actions are permanent and cannot be undone. Please proceed with caution.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between rounded-lg border border-red-500/50 bg-red-50 p-4">
            <div>
              <p className="font-semibold text-gray-900">Delete Your Account</p>
              <p className="text-sm text-gray-600">
                All your data, including orders and addresses, will be permanently removed.
              </p>
            </div>
            {/* This would typically open a confirmation modal */}
            <Button variant="destructive" className="mt-4 md:mt-0">
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}