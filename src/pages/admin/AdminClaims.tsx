
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Eye, Search, Filter, MoreHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

// Mock claims data
const mockClaims = [
  {
    id: "CLM-2025-06-001",
    claimType: "Vehicle Damage",
    policyNumber: "P123456789",
    customerName: "Anil Kumar",
    dateOfClaim: "2024-06-01",
    status: "Under Review",
    claimAmount: "₹45,000",
    overview: {
      claimId: "CLM-2025-06-001",
      policyNumber: "P123456789",
      claimType: "Vehicle Damage",
      dateOfIncident: "2024-05-28",
      dateOfClaim: "2024-06-01",
      status: "Under Review",
      claimAmount: "₹45,000"
    },
    incidentDetails: {
      description: "Vehicle collision at traffic intersection",
      location: "MG Road, Bangalore",
      timeOfIncident: "10:30 AM",
      weatherConditions: "Clear",
      policeReportNumber: "FIR-2024-001234"
    },
    policyDetails: {
      policyNumber: "P123456789",
      policyType: "Motor Insurance",
      coverage: "Comprehensive",
      sumInsured: "₹8,00,000",
      premium: "₹12,500"
    },
    documents: [
      { name: "Police Report", status: "Submitted", date: "2024-06-01" },
      { name: "Vehicle Photos", status: "Submitted", date: "2024-06-01" },
      { name: "Repair Estimate", status: "Pending", date: "-" }
    ],
    financialSettlement: {
      approvedAmount: "₹42,000",
      deductible: "₹3,000",
      payableAmount: "₹39,000",
      paymentStatus: "Pending",
      paymentDate: "-"
    }
  },
  {
    id: "CLM-2025-06-002",
    claimType: "Medical Treatment",
    policyNumber: "P123456790",
    customerName: "Jane Smith",
    dateOfClaim: "2024-06-05",
    status: "Approved",
    claimAmount: "₹25,000",
    overview: {
      claimId: "CLM-2025-06-002",
      policyNumber: "P123456790",
      claimType: "Medical Treatment",
      dateOfIncident: "2024-06-03",
      dateOfClaim: "2024-06-05",
      status: "Approved",
      claimAmount: "₹25,000"
    },
    incidentDetails: {
      description: "Emergency surgery for appendicitis",
      location: "Apollo Hospital, Chennai",
      timeOfIncident: "02:15 PM",
      weatherConditions: "N/A",
      policeReportNumber: "N/A"
    },
    policyDetails: {
      policyNumber: "P123456790",
      policyType: "Health Insurance",
      coverage: "Individual",
      sumInsured: "₹15,00,000",
      premium: "₹22,000"
    },
    documents: [
      { name: "Medical Reports", status: "Submitted", date: "2024-06-05" },
      { name: "Hospital Bills", status: "Submitted", date: "2024-06-05" },
      { name: "Discharge Summary", status: "Submitted", date: "2024-06-06" }
    ],
    financialSettlement: {
      approvedAmount: "₹25,000",
      deductible: "₹2,000",
      payableAmount: "₹23,000",
      paymentStatus: "Completed",
      paymentDate: "2024-06-10"
    }
  },
  {
    id: "CLM-2025-06-003",
    claimType: "Product Damage",
    policyNumber: "P123456792",
    customerName: "Sarah Wilson",
    dateOfClaim: "2024-06-08",
    status: "Rejected",
    claimAmount: "₹8,000",
    overview: {
      claimId: "CLM-2025-06-003",
      policyNumber: "P123456792",
      claimType: "Product Damage",
      dateOfIncident: "2024-06-06",
      dateOfClaim: "2024-06-08",
      status: "Rejected",
      claimAmount: "₹8,000"
    },
    incidentDetails: {
      description: "Water damage to electronic device",
      location: "Home, Mumbai",
      timeOfIncident: "08:00 PM",
      weatherConditions: "Heavy Rain",
      policeReportNumber: "N/A"
    },
    policyDetails: {
      policyNumber: "P123456792",
      policyType: "Product Insurance",
      coverage: "Electronics",
      sumInsured: "₹5,00,000",
      premium: "₹8,500"
    },
    documents: [
      { name: "Product Photos", status: "Submitted", date: "2024-06-08" },
      { name: "Purchase Receipt", status: "Submitted", date: "2024-06-08" },
      { name: "Repair Estimate", status: "Submitted", date: "2024-06-09" }
    ],
    financialSettlement: {
      approvedAmount: "₹0",
      deductible: "₹0",
      payableAmount: "₹0",
      paymentStatus: "Rejected",
      paymentDate: "-"
    }
  }
];

export default function AdminClaims() {
  const [claims, setClaims] = useState(mockClaims);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewingClaim, setViewingClaim] = useState(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  const filteredClaims = claims.filter(claim =>
    claim.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    claim.claimType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    claim.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    claim.policyNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleView = (claim) => {
    setViewingClaim(claim);
    setIsViewDialogOpen(true);
  };

  const exportToCSV = () => {
    const headers = ['Claim ID', 'Claim Type', 'Policy Number', 'Customer Name', 'Date of Claim', 'Status', 'Claim Amount'];
    const csvContent = [
      headers.join(','),
      ...filteredClaims.map(claim => [
        claim.id,
        claim.claimType,
        claim.policyNumber,
        claim.customerName,
        claim.dateOfClaim,
        claim.status,
        claim.claimAmount
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'claims.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <AdminLayout>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Claim Management</h1>
            <p className="text-muted-foreground">Manage all insurance claims</p>
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
                <CardTitle>Claim Management</CardTitle>
                <CardDescription>A list of all insurance claims in the system</CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search claims..."
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
                  <TableHead>CLAIM ID</TableHead>
                  <TableHead>CLAIM TYPE</TableHead>
                  <TableHead>POLICY NUMBER</TableHead>
                  <TableHead>CUSTOMER NAME</TableHead>
                  <TableHead>DATE OF CLAIM</TableHead>
                  <TableHead>STATUS</TableHead>
                  <TableHead>CLAIM AMOUNT</TableHead>
                  <TableHead>ACTIONS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClaims.map((claim) => (
                  <TableRow key={claim.id}>
                    <TableCell className="font-medium">{claim.id}</TableCell>
                    <TableCell>{claim.claimType}</TableCell>
                    <TableCell>{claim.policyNumber}</TableCell>
                    <TableCell>{claim.customerName}</TableCell>
                    <TableCell>{claim.dateOfClaim}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          claim.status === "Approved" ? "default" : 
                          claim.status === "Rejected" ? "destructive" : "secondary"
                        }
                        className={
                          claim.status === "Approved" ? "bg-green-100 text-green-800" :
                          claim.status === "Rejected" ? "bg-red-100 text-red-800" :
                          "bg-yellow-100 text-yellow-800"
                        }
                      >
                        {claim.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{claim.claimAmount}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleView(claim)}
                        className="text-orange-600 hover:text-orange-700"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* View Claim Details Dialog */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Claim Details</DialogTitle>
              <DialogDescription>
                Complete information about the selected claim
              </DialogDescription>
            </DialogHeader>
            {viewingClaim && (
              <div className="space-y-6">
                {/* Overview Section */}
                <div className="border rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-4 border-b pb-2">Overview</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Claim ID</Label>
                      <p className="text-sm text-gray-600">{viewingClaim.overview.claimId}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Policy Number</Label>
                      <p className="text-sm text-gray-600">{viewingClaim.overview.policyNumber}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Claim Type</Label>
                      <p className="text-sm text-gray-600">{viewingClaim.overview.claimType}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Date of Incident</Label>
                      <p className="text-sm text-gray-600">{viewingClaim.overview.dateOfIncident}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Date of Claim</Label>
                      <p className="text-sm text-gray-600">{viewingClaim.overview.dateOfClaim}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Status</Label>
                      <Badge variant={
                        viewingClaim.overview.status === "Approved" ? "default" : 
                        viewingClaim.overview.status === "Rejected" ? "destructive" : "secondary"
                      }>
                        {viewingClaim.overview.status}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Incident Details Section */}
                <div className="border rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-4 border-b pb-2">Incident Details</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Description</Label>
                      <p className="text-sm text-gray-600">{viewingClaim.incidentDetails.description}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Location</Label>
                      <p className="text-sm text-gray-600">{viewingClaim.incidentDetails.location}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Time of Incident</Label>
                      <p className="text-sm text-gray-600">{viewingClaim.incidentDetails.timeOfIncident}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Weather Conditions</Label>
                      <p className="text-sm text-gray-600">{viewingClaim.incidentDetails.weatherConditions}</p>
                    </div>
                  </div>
                </div>

                {/* Policy Details Section */}
                <div className="border rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-4 border-b pb-2">Policy Details</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Policy Number</Label>
                      <p className="text-sm text-gray-600">{viewingClaim.policyDetails.policyNumber}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Policy Type</Label>
                      <p className="text-sm text-gray-600">{viewingClaim.policyDetails.policyType}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Coverage</Label>
                      <p className="text-sm text-gray-600">{viewingClaim.policyDetails.coverage}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Sum Insured</Label>
                      <p className="text-sm text-gray-600">{viewingClaim.policyDetails.sumInsured}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Premium</Label>
                      <p className="text-sm text-gray-600">{viewingClaim.policyDetails.premium}</p>
                    </div>
                  </div>
                </div>

                {/* Documents Section */}
                <div className="border rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-4 border-b pb-2">Documents</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Document Name</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Submission Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {viewingClaim.documents.map((doc, index) => (
                        <TableRow key={index}>
                          <TableCell>{doc.name}</TableCell>
                          <TableCell>
                            <Badge variant={doc.status === "Submitted" ? "default" : "secondary"}>
                              {doc.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{doc.date}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Financial & Settlements Section */}
                <div className="border rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-4 border-b pb-2">Financial & Settlements</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Approved Amount</Label>
                      <p className="text-sm text-gray-600">{viewingClaim.financialSettlement.approvedAmount}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Deductible</Label>
                      <p className="text-sm text-gray-600">{viewingClaim.financialSettlement.deductible}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Payable Amount</Label>
                      <p className="text-sm text-gray-600">{viewingClaim.financialSettlement.payableAmount}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Payment Status</Label>
                      <Badge variant={
                        viewingClaim.financialSettlement.paymentStatus === "Completed" ? "default" :
                        viewingClaim.financialSettlement.paymentStatus === "Rejected" ? "destructive" : "secondary"
                      }>
                        {viewingClaim.financialSettlement.paymentStatus}
                      </Badge>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Payment Date</Label>
                      <p className="text-sm text-gray-600">{viewingClaim.financialSettlement.paymentDate}</p>
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
