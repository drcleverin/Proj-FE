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

export default function AdminUsers() {
  const [users, setUsers] = useState([]); // Initialize with empty array, will fetch from API
  const [editingUser, setEditingUser] = useState(null);
  const [viewingUser, setViewingUser] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "", // Add password field for new user creation
    role: {
      roleId: 1, // Default to CUSTOMER roleId
      roleType: "CUSTOMER" // Default to CUSTOMER roleType
    }
  });
  const [searchTerm, setSearchTerm] = useState("");

  const API_BASE_USERS_URL = "http://localhost:8093/admin/users";
  const API_POLICIES_BY_USER_URL = "http://localhost:8093/api/policies/byUser";
  // New API endpoint for claims by policy
  const API_CLAIMS_BY_POLICY_URL = "http://localhost:8093/api/claims/policy";

  // Helper function to map planId to planName
  const getPlanName = (planId) => {
    switch (planId) {
      case 1:
        return "Individual Health Plan";
      case 2:
        return "Family Floater Plan";
      case 3:
        return "Senior Citizen Plan";
      case 4:
        return "Third Party Liability";
      case 5:
        return "Comprehensive Motor Plan";
      case 6:
        return "Zero Depreciation Add-on";
      default:
        return `Unknown Plan (ID: ${planId})`;
    }
  };

  // Fetch users from the backend on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(API_BASE_USERS_URL);
      // Map backend user data to match frontend structure for display
      const transformedUsers = response.data.map(user => ({
        id: user.userId,
        name: user.username,
        email: user.email,
        phone: "N/A", // Backend doesn't have phone, so set a default
        role: user.role.roleType,
        status: "Active", // Assuming all fetched users are active, adjust if backend has status
        joinDate: "N/A", // Backend doesn't have joinDate, so set a default
        policies: [], // Policies will be fetched separately when viewing a user
        claims: [] // Claims will be fetched separately for each policy when viewing a user
      }));
      setUsers(transformedUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
      // Optionally show an error message to the user
    }
  };

  const fetchClaimsForPolicy = async (policyId) => {
    try {
      const response = await axios.get(`${API_CLAIMS_BY_POLICY_URL}/${policyId}`);
      // Map backend claim data to frontend structure
      const transformedClaims = response.data.map(claim => ({
        id: claim.claimId,
        policy: claim.policyId, // Link to policy ID
        type: claim.claimReason,
        status: claim.claimStatus,
        dateOfIncident: claim.dateOfIncident,
        location: claim.location
      }));
      return transformedClaims;
    } catch (error) {
      console.error(`Error fetching claims for policy ${policyId}:`, error);
      return []; // Return empty array on error
    }
  };

  const fetchPoliciesForUser = async (userId) => {
    try {
      const response = await axios.get(`${API_POLICIES_BY_USER_URL}/${userId}`);
      // Map backend policy data to frontend structure
      const transformedPolicies = await Promise.all(response.data.map(async (policy) => {
        const claims = await fetchClaimsForPolicy(policy.policyId); // Fetch claims for each policy
        return {
          number: policy.policyId, // Using policyId as policy number
          // Use the getPlanName helper function to display the plan name
          type: getPlanName(policy.planId),
          status: policy.policyStatus,
          expiry: policy.policyEndDate,
          claims: claims // Attach claims to the policy
        };
      }));
      return transformedPolicies;
    } catch (error) {
      console.error(`Error fetching policies for user ${userId}:`, error);
      return []; // Return empty array on error
    }
  };

  const handleEdit = (user) => {
    // When editing, map the frontend structure back to the backend structure
    setEditingUser({
      userId: user.id,
      username: user.name,
      email: user.email,
      // Password is not fetched for security, so it won't be in editingUser initially
      role: {
        roleId: user.role === "CUSTOMER" ? 1 : (user.role === "ADMIN" ? 2 : 1), // Map roleType to roleId
        roleType: user.role
      }
    });
    setIsEditDialogOpen(true);
  };

  const handleView = async (user) => {
    // Fetch policies for the selected user, which now also fetches claims
    const policies = await fetchPoliciesForUser(user.id);

    // Aggregate all claims from all policies for this user
    const allClaims = policies.flatMap(policy => policy.claims);

    setViewingUser({ ...user, policies, claims: allClaims }); // Add policies and all aggregated claims to the viewingUser object
    setIsViewDialogOpen(true);
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`${API_BASE_USERS_URL}/delete/${userId}`);
      fetchUsers(); // Refresh the user list after deletion
    } catch (error) {
      console.error("Error deleting user:", error);
      // Optionally show an error message to the user
    }
  };

  const handleSave = async () => {
    if (editingUser) {
      try {
        // Send the updated user data to the backend
        await axios.put(`${API_BASE_USERS_URL}/${editingUser.userId}`, editingUser);
        fetchUsers(); // Refresh the user list after saving
        setIsEditDialogOpen(false);
        setEditingUser(null);
      } catch (error) {
        console.error("Error saving user:", error);
        // Optionally show an error message to the user
      }
    }
  };

  const handleAddUser = async () => {
    try {
      await axios.post(API_BASE_USERS_URL, newUser);
      fetchUsers(); // Refresh the user list after adding
      setIsAddDialogOpen(false);
      setNewUser({
        username: "",
        email: "",
        password: "",
        role: {
          roleId: 1,
          roleType: "CUSTOMER"
        }
      });
    } catch (error) {
      console.error("Error adding user:", error);
      // Optionally show an error message to the user
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.id.toString().toLowerCase().includes(searchTerm.toLowerCase())
  );

  const exportToCSV = () => {
    const headers = ['User ID', 'Name', 'Email', 'Phone', 'Role', 'Status', 'Join Date'];
    const csvContent = [
      headers.join(','),
      ...filteredUsers.map(user => [
        user.id,
        user.name,
        user.email,
        user.phone,
        user.role,
        user.status,
        user.joinDate
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'users.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <AdminLayout>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
            <p className="text-muted-foreground">Manage all registered users</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => setIsAddDialogOpen(true)} className="bg-orange-400 hover:bg-orange-500">
              <Plus className="mr-2 h-4 w-4" />
              Add New User
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

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>User Management</CardTitle>
                <CardDescription>A list of all registered users in the system</CardDescription>
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
                  <TableHead>USER ID</TableHead>
                  <TableHead>NAME</TableHead>
                  <TableHead>EMAIL</TableHead>
                  <TableHead>ROLE</TableHead>
                  <TableHead>STATUS</TableHead>
                  <TableHead>ACTIONS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.id}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge variant={user.role === "Premium" ? "default" : "secondary"}>
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={user.status === "Active" ? "default" : "destructive"}
                        className={user.status === "Active" ? "bg-green-100 text-green-800" : ""}
                      >
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleView(user)}
                          className="text-orange-600 hover:text-orange-700"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(user)}
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
                                This action cannot be undone. This will permanently delete the user
                                and remove their data from our servers.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(user.id)}>
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

        {/* Add User Dialog */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
              <DialogDescription>
                Add a new user to the system. Fill in all required details.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="new-username" className="text-right">Username</Label>
                <Input
                  id="new-username"
                  value={newUser.username}
                  onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="new-email" className="text-right">Email</Label>
                <Input
                  id="new-email"
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="new-password" className="text-right">Password</Label>
                <Input
                  id="new-password"
                  type="password"
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="new-role" className="text-right">Role</Label>
                <Select
                  value={newUser.role.roleType}
                  onValueChange={(value) => setNewUser({ ...newUser, role: { roleId: value === "CUSTOMER" ? 2 : 1, roleType: value } })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CUSTOMER">Customer</SelectItem>
                    <SelectItem value="ADMIN">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddUser} className="bg-orange-400 hover:bg-orange-500">
                Add User
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit User Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit User</DialogTitle>
              <DialogDescription>
                Make changes to user details here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            {editingUser && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">Username</Label>
                  <Input
                    id="username"
                    value={editingUser.username}
                    onChange={(e) => setEditingUser({ ...editingUser, username: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">Email</Label>
                  <Input
                    id="email"
                    value={editingUser.email}
                    onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="role" className="text-right">Role</Label>
                  <Select
                    value={editingUser.role.roleType}
                    onValueChange={(value) => setEditingUser({ ...editingUser, role: { roleId: value === "CUSTOMER" ? 1 : (value === "ADMIN" ? 2 : 1), roleType: value } })}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CUSTOMER" disabled>Customer</SelectItem>
                      <SelectItem value="ADMIN" disabled>Admin</SelectItem>
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

        {/* View User Details Dialog */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>User Details</DialogTitle>
              <DialogDescription>
                Complete information about the selected user
              </DialogDescription>
            </DialogHeader>
            {viewingUser && (
              <div className="space-y-6">
                {/* User Profile Tab */}
                <div className="border rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-4 border-b pb-2">User Profile</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium">User ID</Label>
                      <p className="text-sm text-gray-600">{viewingUser.id}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Name</Label>
                      <p className="text-sm text-gray-600">{viewingUser.name}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Email</Label>
                      <p className="text-sm text-gray-600">{viewingUser.email}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Role</Label>
                      <Badge variant="secondary">{viewingUser.role}</Badge>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Status</Label>
                      <Badge variant={viewingUser.status === "Active" ? "default" : "destructive"}>
                        {viewingUser.status}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Associated Policies Section */}
                <div className="border rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-4 border-b pb-2">Associated Policies</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Policy Number</TableHead>
                        <TableHead>Policy Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Expiry Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {viewingUser.policies?.length > 0 ? (
                        viewingUser.policies.map((policy, index) => (
                          <TableRow key={index}>
                            <TableCell>{policy.number}</TableCell>
                            <TableCell>{policy.type}</TableCell> {/* This will now show the mapped name */}
                            <TableCell>
                              <Badge variant={policy.status === "ACTIVE" ? "default" : "secondary"}>
                                {policy.status}
                              </Badge>
                            </TableCell>
                            <TableCell>{policy.expiry}</TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center text-muted-foreground">No policies found for this user.</TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>

                {/* Claims History Section */}
                <div className="border rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-4 border-b pb-2">Claims History</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Claim ID</TableHead>
                        <TableHead>Policy ID</TableHead>
                        <TableHead>Claim Reason</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Incident Date</TableHead>
                        <TableHead>Location</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {viewingUser.claims?.length > 0 ? (
                        viewingUser.claims.map((claim, index) => (
                          <TableRow key={index}>
                            <TableCell>{claim.id}</TableCell>
                            <TableCell>{claim.policy}</TableCell>
                            <TableCell>{claim.type}</TableCell>
                            <TableCell>
                              <Badge variant="secondary">{claim.status}</Badge>
                            </TableCell>
                            <TableCell>{claim.dateOfIncident}</TableCell>
                            <TableCell>{claim.location}</TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center text-muted-foreground">No claims found for this user.</TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}