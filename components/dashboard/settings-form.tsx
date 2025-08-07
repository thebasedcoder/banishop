"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { ThemeToggle } from '@/components/theme-toggle'; // Make sure to import the ThemeToggle component

export function SettingsForm() {
  // States to manage notification settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [inAppNotifications, setInAppNotifications] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle>General Settings</CardTitle>
        <CardDescription>
          Manage your application theme and notification preferences.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Theme Setting */}
        {/* <div className="flex flex-col md:flex-row items-start md:items-center justify-between rounded-lg border p-4">
          <div>
            <Label className="font-semibold text-base">Theme</Label>
            <p className="text-sm text-gray-500 mt-1">
              Select your preferred application theme.
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <ThemeToggle />
          </div>
        </div> */}

        {/* Email Notifications Setting */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between rounded-lg border p-4">
          <div>
            <Label htmlFor="email-notifications" className="font-semibold text-base">Email Notifications</Label>
            <p className="text-sm text-gray-500 mt-1">
              Receive updates about your orders and special promotions via email.
            </p>
          </div>
          <Switch
            id="email-notifications"
            checked={emailNotifications}
            onCheckedChange={setEmailNotifications}
            className="mt-4 md:mt-0"
          />
        </div>

        {/* In-App Notifications Setting */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between rounded-lg border p-4">
          <div>
            <Label htmlFor="in-app-notifications" className="font-semibold text-base">In-App Notifications</Label>
            <p className="text-sm text-gray-500 mt-1">
              Get notified directly within the dashboard for important updates.
            </p>
          </div>
          <Switch
            id="in-app-notifications"
            checked={inAppNotifications}
            onCheckedChange={setInAppNotifications}
            className="mt-4 md:mt-0"
          />
        </div>
      </CardContent>
    </Card>
  );
}
