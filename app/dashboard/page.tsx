// "use client"
// import { useState } from 'react'
// import {
//   User, Home, Package, Settings, Shield, Edit, Trash2, Plus, LogOut,
//   ChevronRight, MoreVertical, CreditCard, Repeat, XCircle, FileClock
// } from 'lucide-react'
// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { Label } from '@/components/ui/label'
// import { Separator } from '@/components/ui/separator'
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
// import { Switch } from '@/components/ui/switch'
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import Header from '@/components/Header' // Assuming you have these
// import Footer from '@/components/Footer'   // Assuming you have these

// // Mock Data for demonstration
// const user = {
//   name: 'Reza',
//   email: 'reza.persian.goods@email.com',
//   phone: '+49 123 4567890',
//   avatar: 'https://github.com/shadcn.png',
// }

// const addresses = [
//   { id: 1, name: 'Home', street: 'Musterstraße 123', city: 'Berlin', zip: '10115', isDefault: true },
//   { id: 2, name: 'Work', street: 'Büroallee 45', city: 'München', zip: '80331', isDefault: false },
// ]

// const orders = {
//   inProgress: [
//     { id: 'ORD-2025-001', date: '2025-08-05', total: 75.50, status: 'Processing', items: 3 },
//   ],
//   pending: [
//     { id: 'ORD-2025-002', date: '2025-08-04', total: 42.10, items: 2 },
//   ],
//   finished: [
//     { id: 'ORD-2025-003', date: '2025-07-28', total: 112.80, items: 5 },
//     { id: 'ORD-2025-004', date: '2025-07-15', total: 54.00, items: 4 },
//   ]
// }

// // Main Dashboard Component
// export default function DashboardPage() {
//   const [activeTab, setActiveTab] = useState('profile')

//   const renderContent = () => {
//     switch (activeTab) {
//       case 'profile': return <ProfileContent />
//       case 'addresses': return <AddressesContent />
//       case 'orders': return <OrdersContent />
//       case 'settings': return <SettingsContent />
//       case 'security': return <SecurityContent />
//       default: return <ProfileContent />
//     }
//   }

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-50">
//       <Header />
//       <div className="container flex-1 my-8 md:my-12">
//         <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
//           <aside className="md:col-span-3 lg:col-span-2">
//             <nav className="flex flex-col space-y-2">
//               <DashboardNavLink id="profile" icon={<User />} label="Profile" activeTab={activeTab} setActiveTab={setActiveTab} />
//               <DashboardNavLink id="addresses" icon={<Home />} label="Addresses" activeTab={activeTab} setActiveTab={setActiveTab} />
//               <DashboardNavLink id="orders" icon={<Package />} label="Orders" activeTab={activeTab} setActiveTab={setActiveTab} />
//               <DashboardNavLink id="settings" icon={<Settings />} label="Settings" activeTab={activeTab} setActiveTab={setActiveTab} />
//               <DashboardNavLink id="security" icon={<Shield />} label="Privacy & Security" activeTab={activeTab} setActiveTab={setActiveTab} />
//               <Separator className="my-4" />
//               <DashboardNavLink id="logout" icon={<LogOut />} label="Logout" activeTab={activeTab} setActiveTab={() => alert("Logged out!")} isDanger />
//             </nav>
//           </aside>
//           <main className="md:col-span-9 lg:col-span-10">
//             {renderContent()}
//           </main>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   )
// }

// // --- Sub-components for Dashboard ---
// interface DashboardNavLinkProps {
//   id: string;
//   icon: React.ReactNode;
//   label: string;
//   activeTab: string;
//   setActiveTab: React.Dispatch<React.SetStateAction<string>>;
//   isDanger?: boolean;
// }
// const DashboardNavLink = ({ id, icon, label, activeTab, setActiveTab, isDanger = false }: DashboardNavLinkProps) => (
//   <Button
//     variant="ghost"
//     onClick={() => setActiveTab(id)}
//     className={`w-full justify-start text-md px-4 py-6 ${activeTab === id ? 'bg-[#E11D48]/10 text-[#E11D48]' : 'text-gray-700'} ${isDanger && 'text-red-600 hover:bg-red-50 hover:text-red-700'}`}
//   >
//     {icon && <div className="mr-3">{icon}</div>}
//     {label}
//   </Button>
// )

// const ProfileContent = () => (
//   <Card>
//     <CardHeader>
//       <CardTitle>Profile Information</CardTitle>
//       <CardDescription>Update your personal details and profile picture.</CardDescription>
//     </CardHeader>
//     <CardContent className="space-y-6">
//       <div className="flex items-center space-x-6">
//         <Avatar className="h-20 w-20">
//           <AvatarImage src={user.avatar} alt={user.name} />
//           <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
//         </Avatar>
//         <div className="flex items-center space-x-2">
//           <Button variant="outline">Change Picture</Button>
//           <Button variant="ghost" className="text-red-600 hover:text-red-700">Remove</Button>
//         </div>
//       </div>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div className="space-y-2">
//           <Label htmlFor="name">Full Name</Label>
//           <Input id="name" defaultValue={user.name} />
//         </div>
//         <div className="space-y-2">
//           <Label htmlFor="phone">Phone Number</Label>
//           <Input id="phone" defaultValue={user.phone} />
//         </div>
//         <div className="space-y-2 md:col-span-2">
//           <Label htmlFor="email">Email Address</Label>
//           <Input id="email" type="email" defaultValue={user.email} disabled />
//         </div>
//       </div>
//     </CardContent>
//     <CardFooter>
//       <Button className="ml-auto bg-[#E11D48] hover:bg-[#E11D48]/90">Save Changes</Button>
//     </CardFooter>
//   </Card>
// )

// const AddressesContent = () => (
//   <Card>
//     <CardHeader className="flex flex-row items-center justify-between">
//       <div>
//         <CardTitle>Manage Addresses</CardTitle>
//         <CardDescription>Add, edit, or remove your shipping addresses.</CardDescription>
//       </div>
//       <Button><Plus className="mr-2 h-4 w-4" /> Add New Address</Button>
//     </CardHeader>
//     <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//       {addresses.map(address => (
//         <div key={address.id} className={`p-4 rounded-lg border ${address.isDefault ? 'border-[#E11D48] bg-[#E11D48]/5' : 'border-gray-200'}`}>
//           <div className="flex items-start justify-between">
//             <div>
//               <h3 className="font-semibold">{address.name}</h3>
//               <p className="text-gray-600">{address.street}</p>
//               <p className="text-gray-600">{address.city}, {address.zip}</p>
//             </div>
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button variant="ghost" size="icon"><MoreVertical className="h-4 w-4" /></Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent>
//                 <DropdownMenuItem><Edit className="mr-2 h-4 w-4" /> Edit</DropdownMenuItem>
//                 {!address.isDefault && <DropdownMenuItem>Set as Default</DropdownMenuItem>}
//                 <DropdownMenuItem className="text-red-600"><Trash2 className="mr-2 h-4 w-4" /> Delete</DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           </div>
//           {address.isDefault && <div className="mt-3 text-xs font-semibold text-[#E11D48]">DEFAULT ADDRESS</div>}
//         </div>
//       ))}
//     </CardContent>
//   </Card>
// )

// const OrdersContent = () => (
//   <Tabs defaultValue="in-progress">
//     <TabsList className="grid w-full grid-cols-3">
//       <TabsTrigger value="in-progress">In Progress</TabsTrigger>
//       <TabsTrigger value="pending">Pending Payment</TabsTrigger>
//       <TabsTrigger value="finished">Finished</TabsTrigger>
//     </TabsList>
//     <TabsContent value="in-progress" className="mt-6">
//       {orders.inProgress.map(order => (
//         <Card key={order.id} className="mb-4">
//           <CardHeader>
//             <div className="flex justify-between items-center">
//               <div>
//                 <CardTitle>{order.id}</CardTitle>
//                 <CardDescription>Date: {order.date} • {order.items} items</CardDescription>
//               </div>
//               <div className="font-bold text-lg">${order.total.toFixed(2)}</div>
//             </div>
//           </CardHeader>
//           <CardFooter className="flex justify-between items-center">
//             <span className="text-sm font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-md">{order.status}</span>
//             <div className="space-x-2">
//               <Button variant="outline"><XCircle className="mr-2 h-4 w-4" /> Cancel</Button>
//               <Button variant="outline">Edit Order</Button>
//             </div>
//           </CardFooter>
//         </Card>
//       ))}
//     </TabsContent>
//     <TabsContent value="pending" className="mt-6">
//       {orders.pending.map(order => (
//         <Card key={order.id} className="mb-4">
//           <CardHeader>
//             <div className="flex justify-between items-center">
//               <div>
//                 <CardTitle>{order.id}</CardTitle>
//                 <CardDescription>Date: {order.date} • {order.items} items</CardDescription>
//               </div>
//               <div className="font-bold text-lg">${order.total.toFixed(2)}</div>
//             </div>
//           </CardHeader>
//           <CardFooter className="flex justify-between items-center">
//             <span className="text-sm font-medium text-orange-600 bg-orange-100 px-2 py-1 rounded-md">Awaiting Payment</span>
//             <div className="space-x-2">
//               <Button variant="outline" className="text-red-600 border-red-300 hover:bg-red-50 hover:text-red-700"><Trash2 className="mr-2 h-4 w-4" /> Delete</Button>
//               <Button className="bg-[#E11D48] hover:bg-[#E11D48]/90"><CreditCard className="mr-2 h-4 w-4" /> Checkout</Button>
//             </div>
//           </CardFooter>
//         </Card>
//       ))}
//     </TabsContent>
//     <TabsContent value="finished" className="mt-6">
//       {orders.finished.map(order => (
//         <Card key={order.id} className="mb-4">
//           <CardHeader>
//             <div className="flex justify-between items-center">
//               <div>
//                 <CardTitle>{order.id}</CardTitle>
//                 <CardDescription>Date: {order.date} • {order.items} items</CardDescription>
//               </div>
//               <div className="font-bold text-lg">${order.total.toFixed(2)}</div>
//             </div>
//           </CardHeader>
//           <CardFooter className="flex justify-between items-center">
//             <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded-md">Completed</span>
//             <Button variant="outline"><Repeat className="mr-2 h-4 w-4" /> Re-order</Button>
//           </CardFooter>
//         </Card>
//       ))}
//     </TabsContent>
//   </Tabs>
// )

// const SettingsContent = () => (
//   <Card>
//     <CardHeader>
//       <CardTitle>General Settings</CardTitle>
//       <CardDescription>Manage your application and notification preferences.</CardDescription>
//     </CardHeader>
//     <CardContent className="space-y-8">
//       <div className="flex items-center justify-between p-4 rounded-lg border">
//         <div>
//           <Label className="font-semibold">Theme</Label>
//           <p className="text-sm text-gray-500">Select your preferred application theme.</p>
//         </div>
//         {/* In a real app, this would use Context to change the theme */}
//         <div className="flex space-x-2">
//           <Button variant="outline" className="is-active">Light</Button>
//           <Button variant="ghost">Dark</Button>
//         </div>
//       </div>
//       <div className="flex items-center justify-between p-4 rounded-lg border">
//         <div>
//           <Label className="font-semibold">Email Notifications</Label>
//           <p className="text-sm text-gray-500">Receive updates about orders and promotions.</p>
//         </div>
//         <Switch defaultChecked />
//       </div>
//       <div className="flex items-center justify-between p-4 rounded-lg border">
//         <div>
//           <Label className="font-semibold">In-App Notifications</Label>
//           <p className="text-sm text-gray-500">Get notified directly within the dashboard.</p>
//         </div>
//         <Switch />
//       </div>
//     </CardContent>
//   </Card>
// )

// const SecurityContent = () => (
//   <div className="space-y-8">
//     <Card>
//       <CardHeader>
//         <CardTitle>Change Password</CardTitle>
//         <CardDescription>For your security, we recommend using a strong password.</CardDescription>
//       </CardHeader>
//       <CardContent className="space-y-4">
//         <div className="space-y-2">
//           <Label htmlFor="current-password">Current Password</Label>
//           <Input id="current-password" type="password" />
//         </div>
//         <div className="space-y-2">
//           <Label htmlFor="new-password">New Password</Label>
//           <Input id="new-password" type="password" />
//         </div>
//         <div className="space-y-2">
//           <Label htmlFor="confirm-password">Confirm New Password</Label>
//           <Input id="confirm-password" type="password" />
//         </div>
//       </CardContent>
//       <CardFooter>
//         <Button className="ml-auto bg-[#E11D48] hover:bg-[#E11D48]/90">Update Password</Button>
//       </CardFooter>
//     </Card>

//     <Card className="border-red-500">
//       <CardHeader>
//         <CardTitle className="text-red-600">Danger Zone</CardTitle>
//         <CardDescription>These actions are irreversible. Please proceed with caution.</CardDescription>
//       </CardHeader>
//       <CardContent className="flex items-center justify-between">
//         <div>
//           <p className="font-semibold">Delete Your Account</p>
//           <p className="text-sm text-gray-500">All your data, including orders and addresses, will be permanently removed.</p>
//         </div>
//         <Button variant="destructive">Delete Account</Button>
//       </CardContent>
//     </Card>
//   </div>
// )

import { ProfileForm } from "@/components/dashboard/profile-form";

// Mock Data - In a real app, this would be a server-side fetch
const user = {
  name: 'Reza',
  email: 'reza.persian.goods@email.com',
  phone: '+49 123 4567890',
  avatar: 'https://github.com/shadcn.png',
};

export default function DashboardProfilePage() {
  // You can fetch server data here
  return <ProfileForm user={user} />;
}