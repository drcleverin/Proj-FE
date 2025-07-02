import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Plus, Eye, Search, Filter, MoreHorizontal } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Define a TypeScript interface for the PolicyDTO received from the backend.
interface PolicyDTO {
  policyId: number;
  policyEndDate: string;
  policyStartDate: string;
  policyStatus: string;
  premiumAmount: number;
  planId: number;
  userId: number;
  vehicleId: number | null;
}

// Define a TypeScript interface for the PlanDTO if you need to fetch plan details
interface PlanDTO {
  planId: number;
  planName: string;
  // Add other plan properties as needed
}

export default function AdminPolicies() {
  const [policies, setPolicies] = useState<PolicyDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editingPolicy, setEditingPolicy] = useState<PolicyDTO | null>(null);
  const [viewingPolicy, setViewingPolicy] = useState<PolicyDTO | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newPolicy, setNewPolicy] = useState<Omit<PolicyDTO, 'policyId'>>({
    policyEndDate: "",
    policyStartDate: "",
    policyStatus: "ACTIVE", // Default status
    premiumAmount: 0,
    planId: 0, // Placeholder, will need to fetch available plans
    userId: 0, // Placeholder, will need to fetch available users
    vehicleId: null,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [plans, setPlans] = useState<PlanDTO[]>([]); // State for available plans

  const API_BASE_POLICIES_URL = "http://localhost:8093/api/policies";
  const API_GET_PLANS_URL = "http://localhost:8093/api/plans"; // Assuming an endpoint to get all plans
  const API_GET_POLICY_BY_ID_URL = "http://localhost:8093/admin/policy"; // Assuming an endpoint to get policy by ID for detailed view

  useEffect(() => {
    fetchPolicies();
    fetchPlans();
  }, []);

  const fetchPolicies = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get<PolicyDTO[]>(API_BASE_POLICIES_URL);
      setPolicies(response.data);
    } catch (err) {
      console.error("Error fetching policies:", err);
      setError("Failed to load policies. Please check your network connection and ensure the backend service is running.");
    } finally {
      setLoading(false);
    }
  };

  const fetchPlans = async () => {
    try {
      const response = await axios.get<PlanDTO[]>(API_GET_PLANS_URL);
      setPlans(response.data);
    } catch (error) {
      console.error("Error fetching plans:", error);
    }
  };

  const handleEdit = (policy: PolicyDTO) => {
    setEditingPolicy({ ...policy });
    setIsEditDialogOpen(true);
  };

  const handleView = async (policy: PolicyDTO) => {
    try {
      // If there's a specific endpoint for a detailed policy view, use it
      // Otherwise, we already have the policy data
      setViewingPolicy(policy);
      setIsViewDialogOpen(true);
    } catch (error) {
      console.error(`Error fetching details for policy ${policy.policyId}:`, error);
      setError("Failed to load policy details.");
    }
  };

  const handleDelete = async (policyId: number) => {
    try {
      await axios.delete(`${API_BASE_POLICIES_URL}/${policyId}`);
      fetchPolicies(); // Refresh the policy list after deletion
    } catch (error) {
      console.error("Error deleting policy:", error);
      setError("Failed to delete policy. Please try again.");
    }
  };

  const handleSave = async () => {
    if (editingPolicy) {
      try {
        await axios.put(`${API_BASE_POLICIES_URL}/${editingPolicy.policyId}`, editingPolicy);
        fetchPolicies();
        setIsEditDialogOpen(false);
        setEditingPolicy(null);
      } catch (error) {
        console.error("Error saving policy:", error);
        setError("Failed to save policy changes. Please try again.");
      }
    }
  };

  const handleAddPolicy = async () => {
    try {
      await axios.post(API_BASE_POLICIES_URL, newPolicy);
      fetchPolicies();
      setIsAddDialogOpen(false);
      setNewPolicy({
        policyEndDate: "",
        policyStartDate: "",
        policyStatus: "ACTIVE",
        premiumAmount: 0,
        planId: 0,
        userId: 0,
        vehicleId: null,
      });
    } catch (error) {
      console.error("Error adding policy:", error);
      setError("Failed to add new policy. Please try again.");
    }
  };

  const filteredPolicies = policies.filter(policy =>
    policy.policyId.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
    policy.policyStatus.toLowerCase().includes(searchTerm.toLowerCase()) ||
    policy.planId.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
    policy.userId.toString().toLowerCase().includes(searchTerm.toLowerCase())
  );

  const exportToCSV = () => {
    const headers = ['Policy ID', 'Start Date', 'End Date', 'Status', 'Premium Amount', 'Plan ID', 'User ID', 'Vehicle ID'];
    const csvContent = [
      headers.join(','),
      ...filteredPolicies.map(policy => [
        policy.policyId,
        policy.policyStartDate,
        policy.policyEndDate,
        policy.policyStatus,
        policy.premiumAmount,
        policy.planId,
        policy.userId,
        policy.vehicleId || 'N/A'
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
            <p className="text-muted-foreground">Manage all insurance policies in the system</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => setIsAddDialogOpen(true)} className="bg-orange-400 hover:bg-orange-500">
              <Plus className="mr-2 h-4 w-4" />
              Add New Policy
            </Button>
            <Button onClick={exportToCSV} variant="outline" className="bg-orange-100 border-orange-300">
              Export as CSV
            </Button>
            {/* <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button> */}
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error:</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        )}

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Policy List</CardTitle>
                <CardDescription>A list of all registered insurance policies</CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search policies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 w-64"
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">Loading policies...</div>
            ) : filteredPolicies.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">No policies found matching your criteria.</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>POLICY ID</TableHead>
                    <TableHead>START DATE</TableHead>
                    <TableHead>END DATE</TableHead>
                    <TableHead>STATUS</TableHead>
                    <TableHead>PREMIUM</TableHead>
                    <TableHead>PLAN ID</TableHead>
                    <TableHead>USER ID</TableHead>
                    <TableHead>VEHICLE ID</TableHead>
                    <TableHead>ACTIONS</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPolicies.map((policy) => (
                    <TableRow key={policy.policyId}>
                      <TableCell className="font-medium">{policy.policyId}</TableCell>
                      <TableCell>{policy.policyStartDate}</TableCell>
                      <TableCell>{policy.policyEndDate}</TableCell>
                      <TableCell>
                        <Badge
                          variant={policy.policyStatus === "ACTIVE" ? "default" : "secondary"}
                          className={policy.policyStatus === "ACTIVE" ? "bg-green-100 text-green-800" : ""}
                        >
                          {policy.policyStatus}
                        </Badge>
                      </TableCell>
                      <TableCell>₹{policy.premiumAmount?.toFixed(2) || '0.00'}</TableCell>
                      <TableCell>{policy.planId}</TableCell>
                      <TableCell>{policy.userId}</TableCell>
                      <TableCell>{policy.vehicleId || 'N/A'}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleView(policy)}
                            className="text-orange-600 hover:text-orange-700"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(policy)}
                            className="text-orange-600 hover:text-orange-700"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
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
                                  and remove its associated data.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDelete(policy.policyId)}>
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
            )}
          </CardContent>
        </Card>

        {/* Add Policy Dialog (No changes needed here) */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Policy</DialogTitle>
              <DialogDescription>
                Add a new insurance policy to the system.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="new-policy-start-date" className="text-right">Start Date</Label>
                <Input
                  id="new-policy-start-date"
                  type="date"
                  value={newPolicy.policyStartDate}
                  onChange={(e) => setNewPolicy({ ...newPolicy, policyStartDate: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="new-policy-end-date" className="text-right">End Date</Label>
                <Input
                  id="new-policy-end-date"
                  type="date"
                  value={newPolicy.policyEndDate}
                  onChange={(e) => setNewPolicy({ ...newPolicy, policyEndDate: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="new-policy-status" className="text-right">Status</Label>
                <Select
                  value={newPolicy.policyStatus}
                  onValueChange={(value) => setNewPolicy({ ...newPolicy, policyStatus: value })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ACTIVE">ACTIVE</SelectItem>
                    <SelectItem value="EXPIRED">EXPIRED</SelectItem>
                    <SelectItem value="CANCELLED">CANCELLED</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="new-premium-amount" className="text-right">Premium Amount</Label>
                <Input
                  id="new-premium-amount"
                  type="number"
                  value={newPolicy.premiumAmount}
                  onChange={(e) => setNewPolicy({ ...newPolicy, premiumAmount: parseFloat(e.target.value) || 0 })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="new-plan-id" className="text-right">Plan</Label>
                <Select
                  value={newPolicy.planId.toString()}
                  onValueChange={(value) => setNewPolicy({ ...newPolicy, planId: parseInt(value) })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select Plan" />
                  </SelectTrigger>
                  <SelectContent>
                    {plans.map(plan => (
                      <SelectItem key={plan.planId} value={plan.planId.toString()}>
                        {plan.planName} (ID: {plan.planId})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="new-user-id" className="text-right">User ID</Label>
                <Input
                  id="new-user-id"
                  type="number"
                  value={newPolicy.userId}
                  onChange={(e) => setNewPolicy({ ...newPolicy, userId: parseInt(e.target.value) || 0 })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="new-vehicle-id" className="text-right">Vehicle ID</Label>
                <Input
                  id="new-vehicle-id"
                  type="number"
                  value={newPolicy.vehicleId || ''}
                  onChange={(e) => setNewPolicy({ ...newPolicy, vehicleId: e.target.value ? parseInt(e.target.value) : null })}
                  className="col-span-3"
                  placeholder="Optional"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddPolicy} className="bg-orange-400 hover:bg-orange-500">
                Add Policy
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Policy Dialog - MODIFIED */}
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
                  <Label htmlFor="policy-start-date" className="text-right">Start Date</Label>
                  <Input
                    id="policy-start-date"
                    type="date"
                    value={editingPolicy.policyStartDate}
                    onChange={(e) => setEditingPolicy({ ...editingPolicy, policyStartDate: e.target.value })}
                    className="col-span-3"
                    disabled={true} // Disabled
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="policy-end-date" className="text-right">End Date</Label>
                  <Input
                    id="policy-end-date"
                    type="date"
                    value={editingPolicy.policyEndDate}
                    onChange={(e) => setEditingPolicy({ ...editingPolicy, policyEndDate: e.target.value })}
                    className="col-span-3"
                    disabled={true} // Disabled
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="policy-status" className="text-right">Status</Label>
                  <Select
                    value={editingPolicy.policyStatus}
                    onValueChange={(value) => setEditingPolicy({ ...editingPolicy, policyStatus: value })}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ACTIVE">ACTIVE</SelectItem>
                      <SelectItem value="EXPIRED">EXPIRED</SelectItem>
                      <SelectItem value="CANCELLED">CANCELLED</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="premium-amount" className="text-right">Premium Amount</Label>
                  <Input
                    id="premium-amount"
                    type="number"
                    value={editingPolicy.premiumAmount}
                    onChange={(e) => setEditingPolicy({ ...editingPolicy, premiumAmount: parseFloat(e.target.value) || 0 })}
                    className="col-span-3"
                    disabled={editingPolicy.policyStatus !== "ACTIVE"} // Disabled if not ACTIVE
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="plan-id" className="text-right">Plan</Label>
                  <Select
                    value={editingPolicy.planId.toString()}
                    onValueChange={(value) => setEditingPolicy({ ...editingPolicy, planId: parseInt(value) })}
                    disabled={true} // Keep disabled
                  >
                    <SelectTrigger className="col-span-3">
                      {/* Explicitly display the plan name here */}
                      <SelectValue>
                        {plans.find(p => p.planId === editingPolicy.planId)?.planName || `Plan ID: ${editingPolicy.planId}`}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {plans.map(plan => (
                        <SelectItem key={plan.planId} value={plan.planId.toString()}>
                          {plan.planName} (ID: {plan.planId})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="user-id" className="text-right">User ID</Label>
                  <Input
                    id="user-id"
                    type="number"
                    value={editingPolicy.userId}
                    onChange={(e) => setEditingPolicy({ ...editingPolicy, userId: parseInt(e.target.value) || 0 })}
                    className="col-span-3"
                    disabled={true} // Disabled
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="vehicle-id" className="text-right">Vehicle ID</Label>
                  <Input
                    id="vehicle-id"
                    type="number"
                    value={editingPolicy.vehicleId || ''}
                    onChange={(e) => setEditingPolicy({ ...editingPolicy, vehicleId: e.target.value ? parseInt(e.target.value) : null })}
                    className="col-span-3"
                    placeholder="Optional"
                    disabled={true} // Disabled
                  />
                </div>
              </div>
            )}
            <DialogFooter>
              <Button onClick={handleSave}>Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* View Policy Details Dialog */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Policy Details</DialogTitle>
              <DialogDescription>
                Complete information about the selected policy.
              </DialogDescription>
            </DialogHeader>
            {viewingPolicy && (
              <div className="space-y-6">
                <div className="border rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-4 border-b pb-2">Policy Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Policy ID</Label>
                      <p className="text-sm text-gray-600">{viewingPolicy.policyId}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Start Date</Label>
                      <p className="text-sm text-gray-600">{viewingPolicy.policyStartDate}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">End Date</Label>
                      <p className="text-sm text-gray-600">{viewingPolicy.policyEndDate}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Status</Label>
                      <Badge
                        variant={viewingPolicy.policyStatus === "ACTIVE" ? "default" : "secondary"}
                        className={viewingPolicy.policyStatus === "ACTIVE" ? "bg-green-100 text-green-800" : ""}
                      >
                        {viewingPolicy.policyStatus}
                      </Badge>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Premium Amount</Label>
                      <p className="text-sm text-gray-600">₹{viewingPolicy.premiumAmount?.toFixed(2) || '0.00'}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Plan ID</Label>
                      <p className="text-sm text-gray-600">{viewingPolicy.planId}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">User ID</Label>
                      <p className="text-sm text-gray-600">{viewingPolicy.userId}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Vehicle ID</Label>
                      <p className="text-sm text-gray-600">{viewingPolicy.vehicleId || 'N/A'}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}