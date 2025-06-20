
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Search, Filter, MoreHorizontal, RotateCcw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock policy data
const mockPolicies = [
  {
    id: "USR001",
    policyType: "Health",
    name: "Anil Kumar",
    sumInsured: "₹10L",
    premium: "₹18,500",
    status: "Active",
    policyNumber: "P123456789",
    startDate: "2024-01-15",
    endDate: "2025-01-15"
  },
  {
    id: "USR002",
    policyType: "Health",
    name: "Jane Smith",
    sumInsured: "₹15L",
    premium: "₹22,000",
    status: "Expired",
    policyNumber: "P123456790",
    startDate: "2023-06-15",
    endDate: "2024-06-15"
  },
  {
    id: "USR003",
    policyType: "Motor",
    name: "Bob Johnson",
    sumInsured: "₹8L",
    premium: "₹12,500",
    status: "Active",
    policyNumber: "P123456791",
    startDate: "2024-03-01",
    endDate: "2025-03-01"
  },
  {
    id: "USR004",
    policyType: "Product",
    name: "Sarah Wilson",
    sumInsured: "₹5L",
    premium: "₹8,500",
    status: "Active",
    policyNumber: "P123456792",
    startDate: "2024-02-10",
    endDate: "2025-02-10"
  },
  {
    id: "USR005",
    policyType: "Health",
    name: "Mike Davis",
    sumInsured: "₹20L",
    premium: "₹28,000",
    status: "Active",
    policyNumber: "P123456793",
    startDate: "2024-04-01",
    endDate: "2025-04-01"
  },
  {
    id: "USR006",
    policyType: "Motor",
    name: "Emily Brown",
    sumInsured: "₹12L",
    premium: "₹15,500",
    status: "Active",
    policyNumber: "P123456794",
    startDate: "2024-01-20",
    endDate: "2025-01-20"
  },
  {
    id: "USR007",
    policyType: "Product",
    name: "David Miller",
    sumInsured: "₹7L",
    premium: "₹9,800",
    status: "Active",
    policyNumber: "P123456795",
    startDate: "2024-05-15",
    endDate: "2025-05-15"
  },
  {
    id: "USR008",
    policyType: "Motor",
    name: "Lisa Garcia",
    sumInsured: "₹10L",
    premium: "₹13,200",
    status: "Active",
    policyNumber: "P123456796",
    startDate: "2024-03-10",
    endDate: "2025-03-10"
  }
];

export default function AdminPolicies() {
  const [policies, setPolicies] = useState(mockPolicies);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingPolicy, setEditingPolicy] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const filteredPolicies = policies.filter(policy =>
    policy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    policy.policyType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    policy.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    policy.policyNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (policy) => {
    setEditingPolicy(policy);
    setIsEditDialogOpen(true);
  };

  const handleSave = () => {
    if (editingPolicy) {
      setPolicies(policies.map(policy => 
        policy.id === editingPolicy.id ? editingPolicy : policy
      ));
    }
    setIsEditDialogOpen(false);
    setEditingPolicy(null);
  };

  const handleDelete = (policyId) => {
    setPolicies(policies.filter(policy => policy.id !== policyId));
  };

  const exportToCSV = () => {
    const headers = ['Policy ID', 'Policy Type', 'Name', 'Sum Insured', 'Premium', 'Status', 'Policy Number', 'Start Date', 'End Date'];
    const csvContent = [
      headers.join(','),
      ...filteredPolicies.map(policy => [
        policy.id,
        policy.policyType,
        policy.name,
        policy.sumInsured,
        policy.premium,
        policy.status,
        policy.policyNumber,
        policy.startDate,
        policy.endDate
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'policies.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <AdminLayout>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Policy Management</h1>
          </div>
          <div className="flex gap-2">
            <Button onClick={exportToCSV} className="bg-orange-400 hover:bg-orange-500">
              Export as CSV
            </Button>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Policy Management</CardTitle>
              </div>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 w-64"
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>POLICY ID</TableHead>
                  <TableHead>POLICY TYPE</TableHead>
                  <TableHead>NAME</TableHead>
                  <TableHead>SUM INSURED</TableHead>
                  <TableHead>PREMIUM</TableHead>
                  <TableHead>STATUS</TableHead>
                  <TableHead>ACTIONS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPolicies.map((policy, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{policy.id}</TableCell>
                    <TableCell>{policy.policyType}</TableCell>
                    <TableCell>{policy.name}</TableCell>
                    <TableCell>{policy.sumInsured}</TableCell>
                    <TableCell>{policy.premium}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={policy.status === "Active" ? "default" : "destructive"}
                        className={policy.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                      >
                        {policy.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(policy)}
                          className="text-orange-600 hover:text-orange-700"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        {/* <Button
                          variant="ghost"
                          size="sm"
                          className="text-orange-600 hover:text-orange-700"
                        >
                          <RotateCcw className="h-4 w-4" />
                        </Button> */}
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the policy
                                and remove the data from our servers.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(policy.id)}>
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Edit Policy Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Policy</DialogTitle>
              <DialogDescription>
                Make changes to policy details here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            {editingPolicy && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">Name</Label>
                  <Input
                    id="name"
                    value={editingPolicy.name}
                    onChange={(e) => setEditingPolicy({...editingPolicy, name: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="policyType" className="text-right">Policy Type</Label>
                  <Select
                    value={editingPolicy.policyType}
                    onValueChange={(value) => setEditingPolicy({...editingPolicy, policyType: value})}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Health">Health</SelectItem>
                      <SelectItem value="Motor">Motor</SelectItem>
                      <SelectItem value="Product">Product</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="sumInsured" className="text-right">Sum Insured</Label>
                  <Input
                    id="sumInsured"
                    value={editingPolicy.sumInsured}
                    onChange={(e) => setEditingPolicy({...editingPolicy, sumInsured: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="premium" className="text-right">Premium</Label>
                  <Input
                    id="premium"
                    value={editingPolicy.premium}
                    onChange={(e) => setEditingPolicy({...editingPolicy, premium: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="status" className="text-right">Status</Label>
                  <Select
                    value={editingPolicy.status}
                    onValueChange={(value) => setEditingPolicy({...editingPolicy, status: value})}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Expired">Expired</SelectItem>
                      <SelectItem value="Cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button onClick={handleSave}>Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
