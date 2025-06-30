
// import { AdminLayout } from "@/components/admin/AdminLayout";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { Badge } from "@/components/ui/badge";
// import { Eye, Search, Filter, MoreHorizontal, Loader2, Edit } from "lucide-react";
// import { Input } from "@/components/ui/input";
// import { useEffect, useState } from "react";
// import {
//     Dialog,
//     DialogContent,
//     DialogDescription,
//     DialogHeader,
//     DialogTitle,
// } from "@/components/ui/dialog";
// import { Label } from "@/components/ui/label";
// import axios from "axios";
// interface AggregatedClaimDetails {
//     claimId: number;
//     claimType: string; // Corresponds to plan_name from InsurancePlan
//     policyNumber: number; // Corresponds to policy_id from Policy
//     customerName: string; // Corresponds to first_name + last_name from PersonalDetails
//     dateOfClaim: string; // YYYY-MM-DD
//     status: string; // Corresponds to claim_status from Claim
//     claimAmount: number; // Corresponds to sum_insured from Claim
//     dateOfIncident: string;
//     description: string;
//     location: string;
//     timeOfIncident: string;
//     coverage: string;
//     sumInsured: number;
//     premium: number;
// }

// // Define the shape of the data needed by this frontend component
// // Note: This matches the structure of your mock data, but only fields available
// // from AggregatedClaimDetails will be truly dynamic. Others will be N/A.
// interface AdminClaimItem {
//     id: string;
//     claimType: string;
//     policyNumber: string;
//     customerName: string;
//     dateOfClaim: string;
//     status: string;
//     claimAmount: string; // Formatted as string
//     overview: {
//         claimId: string;
//         policyNumber: string;
//         claimType: string;
//         dateOfIncident: string; // Not directly from aggregated DTO - will be N/A
//         dateOfClaim: string;
//         status: string;
//         claimAmount: string;
//     };
//     incidentDetails: {
//         description: string;
//         location: string;
//         timeOfIncident: string;
//         weatherConditions: string;
//         policeReportNumber: string;
//     };
//     policyDetails: {
//         policyNumber: string;
//         policyType: string;
//         coverage: string;
//         sumInsured: string;
//         premium: string;
//     };
//     documents: { name: string; status: string; date: string; }[];
//     financialSettlement: {
//         approvedAmount: string;
//         deductible: string;
//         payableAmount: string;
//         paymentStatus: string;
//         paymentDate: string;
//     };
// }


// export default function AdminClaims() {
//     const [claims, setClaims] = useState<AdminClaimItem[]>([]);
//     const [searchTerm, setSearchTerm] = useState("");
//     const [viewingClaim, setViewingClaim] = useState<AdminClaimItem | null>(null);
//     const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);

//     // Function to map backend DTO to frontend AdminClaimItem structure
//     const mapToAdminClaimItem = (aggregatedClaim: AggregatedClaimDetails): AdminClaimItem => {
//         const formattedClaimAmount = aggregatedClaim.claimAmount ? `₹${aggregatedClaim.claimAmount.toFixed(2)}` : '₹0.00';
//         const policySumInsured = aggregatedClaim.sumInsured || 50000; // Use policy's sumInsured from backend
//         const policyPremium = aggregatedClaim.premium || 0;
//         let approvedAmountNum = aggregatedClaim.claimAmount * 0.70;
//         let deductibleNum = aggregatedClaim.claimAmount * 0.10;
//         let payableAmountNum = approvedAmountNum - deductibleNum;
//         payableAmountNum = Math.min(payableAmountNum, policySumInsured);
//         const formattedApprovedAmount = `₹${approvedAmountNum.toFixed(2)}`;
//         const formattedDeductible = `₹${deductibleNum.toFixed(2)}`;
//         const formattedPayableAmount = `₹${payableAmountNum.toFixed(2)}`;
//         const formattedPolicySumInsured = `₹${policySumInsured.toFixed(2)}`;
//         const formattedPolicyPremium = `₹${policyPremium.toFixed(2)}`;
//         return {
//             id: String(aggregatedClaim.claimId),
//             claimType: aggregatedClaim.claimType || 'N/A',
//             policyNumber: String(aggregatedClaim.policyNumber || 'N/A'),
//             customerName: aggregatedClaim.customerName || 'N/A',
//             dateOfClaim: aggregatedClaim.dateOfClaim || 'N/A',
//             status: aggregatedClaim.status || 'N/A',
//             claimAmount: formattedClaimAmount,
//             overview: {
//                 claimId: String(aggregatedClaim.claimId),
//                 policyNumber: String(aggregatedClaim.policyNumber || 'N/A'),
//                 claimType: aggregatedClaim.claimType || 'N/A',
//                 dateOfIncident: String(aggregatedClaim.dateOfIncident), // Not from current DTO
//                 dateOfClaim: aggregatedClaim.dateOfClaim || 'N/A',
//                 status: aggregatedClaim.status || 'N/A',
//                 claimAmount: formattedClaimAmount
//             },
//             // Placeholder/default data for sections not available in AggregatedClaimDetailsDTO
//             incidentDetails: {
//                 description: String(aggregatedClaim.description),
//                 location: String(aggregatedClaim.location),
//                 timeOfIncident: String(aggregatedClaim.timeOfIncident),
//                 weatherConditions: 'Clear',
//                 policeReportNumber: 'N/A (Backend needs to provide this)'
//             },
//             policyDetails: {
//                 policyNumber: String(aggregatedClaim.policyNumber || 'N/A'),
//                 policyType: String(aggregatedClaim.claimType),
//                 coverage: 'N/A (Backend needs to provide this)',
//                 sumInsured: '100000',
//                 premium: formattedPolicyPremium
//             },
//             documents: [], // Empty, as documents are not in AggregatedClaimDetailsDTO
//             financialSettlement: {
//                 approvedAmount: formattedApprovedAmount,
//                 deductible: formattedDeductible,
//                 payableAmount: formattedPayableAmount,
//                 paymentStatus: 'PENDING',
//                 paymentDate: 'N/A'
//             }
//         };
//     };

//     useEffect(() => {
//         const fetchClaims = async () => {
//             try {
//                 setLoading(true);
//                 setError(null);
//                 const response = await axios.get<AggregatedClaimDetails[]>('http://localhost:8093/api/insurance/claims/aggregated');
//                 // Map the fetched data to the AdminClaimItem structure
//                 const mappedClaims = response.data.map(mapToAdminClaimItem);
//                 setClaims(mappedClaims);
//             } catch (err) {
//                 if (axios.isAxiosError(err)) {
//                     if (err.response) {
//                         setError(`Failed to fetch claims: ${err.response.status} - ${err.response.statusText || 'Server Error'}. Please ensure your Spring Boot backend is running at http://localhost:8093.`);
//                         console.error('Backend error response:', err.response.data);
//                     } else if (err.request) {
//                         setError('Network error: No response from backend. Please ensure your Spring Boot backend is running at http://localhost:8093.');
//                         console.error('Network request error:', err.request);
//                     } else {
//                         setError('Error setting up request: ' + err.message);
//                         console.error('Request setup error:', err.message);
//                     }
//                 } else {
//                     setError('An unexpected error occurred while fetching claims.');
//                     console.error('Unexpected error:', err);
//                 }
//                 setClaims([]); // Clear claims on error
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchClaims();
//     }, []); // Empty dependency array means this runs once on mount

//     const filteredClaims = claims.filter(claim =>
//         claim.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         claim.claimType.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         claim.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         claim.policyNumber.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     const handleView = (claim: AdminClaimItem) => {
//         setViewingClaim(claim);
//         setIsViewDialogOpen(true);
//     };

    
//   const handleEdit = (policy) => {
//     setEditingPolicy(policy);
//     setIsEditDialogOpen(true);
//   };

//     const exportToCSV = () => {
//         const headers = ['Claim ID', 'Claim Type', 'Policy Number', 'Customer Name', 'Date of Claim', 'Status', 'Claim Amount'];
//         const csvContent = [
//             headers.join(','),
//             ...filteredClaims.map(claim => [
//                 claim.id,
//                 claim.claimType,
//                 claim.policyNumber,
//                 claim.customerName,
//                 claim.dateOfClaim,
//                 claim.status,
//                 claim.claimAmount
//             ].join(','))
//         ].join('\n');

//         const blob = new Blob([csvContent], { type: 'text/csv' });
//         const url = window.URL.createObjectURL(blob);
//         const a = document.createElement('a');
//         a.href = url;
//         a.download = 'claims.csv';
//         a.click();
//         window.URL.revokeObjectURL(url);
//     };

//     return (
//         <AdminLayout>
//             <div className="space-y-4">
//                 <div className="flex justify-between items-center">
//                     <div>
//                         <h1 className="text-3xl font-bold tracking-tight">Claim Management</h1>
//                         <p className="text-muted-foreground">Manage all insurance claims</p>
//                     </div>
//                     <div className="flex gap-2">
//                         <Button onClick={exportToCSV} className="bg-orange-400 hover:bg-orange-500">
//                             Export as CSV
//                         </Button>
//                         <Button variant="outline" size="icon">
//                             <Filter className="h-4 w-4" />
//                         </Button>
//                         <Button variant="outline" size="icon">
//                             <MoreHorizontal className="h-4 w-4" />
//                         </Button>
//                     </div>
//                 </div>

//                 <Card>
//                     <CardHeader>
//                         <div className="flex justify-between items-center">
//                             <div>
//                                 <CardTitle>Claim Management</CardTitle>
//                                 <CardDescription>A list of all insurance claims in the system</CardDescription>
//                             </div>
//                             <div className="flex items-center space-x-2">
//                                 <div className="relative">
//                                     <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
//                                     <Input
//                                         placeholder="Search claims..."
//                                         value={searchTerm}
//                                         onChange={(e) => setSearchTerm(e.target.value)}
//                                         className="pl-8 w-64"
//                                     />
//                                 </div>
//                             </div>
//                         </div>
//                     </CardHeader>
//                     <CardContent>
//                         {loading ? (
//                             <div className="flex items-center justify-center py-8 text-blue-600">
//                                 <Loader2 className="mr-2 h-6 w-6 animate-spin" />
//                                 Loading claims data...
//                             </div>
//                         ) : error ? (
//                             <div className="text-center text-red-600 py-8">
//                                 <p>{error}</p>
//                             </div>
//                         ) : filteredClaims.length === 0 ? (
//                             <div className="text-center text-gray-600 py-8">
//                                 <p>No claims found matching your criteria.</p>
//                             </div>
//                         ) : (
//                             <Table>
//                                 <TableHeader>
//                                     <TableRow>
//                                         <TableHead>CLAIM ID</TableHead>
//                                         <TableHead>CLAIM TYPE</TableHead>
//                                         <TableHead>POLICY NUMBER</TableHead>
//                                         <TableHead>CUSTOMER NAME</TableHead>
//                                         <TableHead>DATE OF CLAIM</TableHead>
//                                         <TableHead>STATUS</TableHead>
//                                         <TableHead>CLAIM AMOUNT</TableHead>
//                                         <TableHead>ACTIONS</TableHead>
//                                     </TableRow>
//                                 </TableHeader>
//                                 <TableBody>
//                                     {filteredClaims.map((claim) => (
//                                         <TableRow key={claim.id}>
//                                             <TableCell className="font-medium">{claim.id}</TableCell>
//                                             <TableCell>{claim.claimType}</TableCell>
//                                             <TableCell>{claim.policyNumber}</TableCell>
//                                             <TableCell>{claim.customerName}</TableCell>
//                                             <TableCell>{claim.dateOfClaim}</TableCell>
//                                             <TableCell>
//                                                 <Badge
//                                                     variant={
//                                                         claim.status.toLowerCase() === "approved" ? "default" :
//                                                             claim.status.toLowerCase() === "rejected" ? "destructive" : "secondary"
//                                                     }
//                                                     className={
//                                                         claim.status.toLowerCase() === "approved" ? "bg-green-100 text-green-800" :
//                                                             claim.status.toLowerCase() === "rejected" ? "bg-red-100 text-red-800" :
//                                                                 "bg-yellow-100 text-yellow-800"
//                                                     }
//                                                 >
//                                                     {claim.status}
//                                                 </Badge>
//                                             </TableCell>
//                                             <TableCell>{claim.claimAmount}</TableCell>
//                                             <TableCell>
//                                                 <Button
//                                                     variant="ghost"
//                                                     size="sm"
//                                                     onClick={() => handleView(claim)}
//                                                     className="text-orange-600 hover:text-orange-700"
//                                                 >
//                                                     <Eye className="h-4 w-4" />
//                                                 </Button>
//                                             </TableCell>
//                                         </TableRow>
//                                     ))}
//                                 </TableBody>
//                             </Table>
//                         )}
//                     </CardContent>
//                 </Card>

//                 {/* View Claim Details Dialog */}
//                 <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
//                     <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
//                         <DialogHeader>
//                             <DialogTitle>Claim Details</DialogTitle>
//                             <DialogDescription>
//                                 Complete information about the selected claim (Note: Some details might be 'N/A' if not available from the backend API).
//                             </DialogDescription>
//                         </DialogHeader>
//                         {viewingClaim && (
//                             <div className="space-y-6">
//                                 {/* Overview Section */}
//                                 <div className="border rounded-lg p-4">
//                                     <h3 className="text-lg font-semibold mb-4 border-b pb-2">Overview</h3>
//                                     <div className="grid grid-cols-3 gap-4">
//                                         <div>
//                                             <Label className="text-sm font-medium">Claim ID</Label>
//                                             <p className="text-sm text-gray-600">{viewingClaim.overview.claimId}</p>
//                                         </div>
//                                         <div>
//                                             <Label className="text-sm font-medium">Policy Number</Label>
//                                             <p className="text-sm text-gray-600">{viewingClaim.overview.policyNumber}</p>
//                                         </div>
//                                         <div>
//                                             <Label className="text-sm font-medium">Claim Type</Label>
//                                             <p className="text-sm text-gray-600">{viewingClaim.overview.claimType}</p>
//                                         </div>
//                                         <div>
//                                             <Label className="text-sm font-medium">Date of Incident</Label>
//                                             <p className="text-sm text-gray-600">{viewingClaim.overview.dateOfIncident}</p> {/* Will be N/A */}
//                                         </div>
//                                         <div>
//                                             <Label className="text-sm font-medium">Date of Claim</Label>
//                                             <p className="text-sm text-gray-600">{viewingClaim.overview.dateOfClaim}</p>
//                                         </div>
//                                         <div>
//                                             <Label className="text-sm font-medium">Status</Label>
//                                             <Badge variant={
//                                                 viewingClaim.overview.status.toLowerCase() === "approved" ? "default" :
//                                                     viewingClaim.overview.status.toLowerCase() === "rejected" ? "destructive" : "secondary"
//                                             }>
//                                                 {viewingClaim.overview.status}
//                                             </Badge>
//                                         </div>
//                                     </div>
//                                 </div>

//                                 {/* Incident Details Section */}
//                                 <div className="border rounded-lg p-4">
//                                     <h3 className="text-lg font-semibold mb-4 border-b pb-2">Incident Details</h3>
//                                     <div className="grid grid-cols-2 gap-4">
//                                         <div>
//                                             <Label className="text-sm font-medium">Description</Label>
//                                             <p className="text-sm text-gray-600">{viewingClaim.incidentDetails.description}</p>
//                                         </div>
//                                         <div>
//                                             <Label className="text-sm font-medium">Location</Label>
//                                             <p className="text-sm text-gray-600">{viewingClaim.incidentDetails.location}</p>
//                                         </div>
//                                         <div>
//                                             <Label className="text-sm font-medium">Time of Incident</Label>
//                                             <p className="text-sm text-gray-600">{viewingClaim.incidentDetails.timeOfIncident}</p>
//                                         </div>
//                                         <div>
//                                             <Label className="text-sm font-medium">Weather Conditions</Label>
//                                             <p className="text-sm text-gray-600">{viewingClaim.incidentDetails.weatherConditions}</p>
//                                         </div>
//                                         <div>
//                                             <Label className="text-sm font-medium">Police Report Number</Label>
//                                             <p className="text-sm text-gray-600">{viewingClaim.incidentDetails.policeReportNumber}</p>
//                                         </div>
//                                     </div>
//                                 </div>

//                                 {/* Policy Details Section */}
//                                 <div className="border rounded-lg p-4">
//                                     <h3 className="text-lg font-semibold mb-4 border-b pb-2">Policy Details</h3>
//                                     <div className="grid grid-cols-3 gap-4">
//                                         <div>
//                                             <Label className="text-sm font-medium">Policy Number</Label>
//                                             <p className="text-sm text-gray-600">{viewingClaim.policyDetails.policyNumber}</p>
//                                         </div>
//                                         <div>
//                                             <Label className="text-sm font-medium">Policy Type</Label>
//                                             <p className="text-sm text-gray-600">{viewingClaim.policyDetails.policyType}</p>
//                                         </div>
//                                         {/* <div>
//                                             <Label className="text-sm font-medium">Coverage</Label>
//                                             <p className="text-sm text-gray-600">{viewingClaim.policyDetails.coverage}</p>
//                                         </div> */}
//                                         <div>
//                                             <Label className="text-sm font-medium">Sum Insured</Label>
//                                             <p className="text-sm text-gray-600">{viewingClaim.policyDetails.sumInsured}</p>
//                                         </div>
//                                         <div>
//                                             <Label className="text-sm font-medium">Premium</Label>
//                                             <p className="text-sm text-gray-600">{viewingClaim.policyDetails.premium}</p>
//                                         </div>
//                                     </div>
//                                 </div>

//                                 {/* Documents Section */}
//                                 <div className="border rounded-lg p-4">
//                                     <h3 className="text-lg font-semibold mb-4 border-b pb-2">Documents</h3>
//                                     {viewingClaim.documents.length > 0 ? (
//                                         <Table>
//                                             <TableHeader>
//                                                 <TableRow>
//                                                     <TableHead>Document Name</TableHead>
//                                                     <TableHead>Status</TableHead>
//                                                     <TableHead>Submission Date</TableHead>
//                                                 </TableRow>
//                                             </TableHeader>
//                                             <TableBody>
//                                                 {viewingClaim.documents.map((doc, index) => (
//                                                     <TableRow key={index}>
//                                                         <TableCell>{doc.name}</TableCell>
//                                                         <TableCell>
//                                                             <Badge variant={doc.status === "Submitted" ? "default" : "secondary"}>
//                                                                 {doc.status}
//                                                             </Badge>
//                                                         </TableCell>
//                                                         <TableCell>{doc.date}</TableCell>
//                                                         <TableCell>
//                                                             <Button
//                                                                 variant="ghost"
//                                                                 size="sm"
//                                                                 onClick={() => handleEdit(policy)}
//                                                                 className="text-orange-600 hover:text-orange-700"
//                                                             >
//                                                                 <Edit className="h-4 w-4" />
//                                                             </Button>
//                                                         </TableCell>
//                                                     </TableRow>

//                                                 ))}
//                                             </TableBody>
//                                         </Table>
//                                     ) : (
//                                         <p className="text-sm text-gray-600">No documents available (Backend needs to provide this).</p>
//                                     )}
//                                 </div>

//                                 {/* Financial & Settlements Section */}
//                                 <div className="border rounded-lg p-4">
//                                     <h3 className="text-lg font-semibold mb-4 border-b pb-2">Financial & Settlements</h3>
//                                     <div className="grid grid-cols-3 gap-4">
//                                         <div>
//                                             <Label className="text-sm font-medium">Approved Amount</Label>
//                                             <p className="text-sm text-gray-600">{viewingClaim.financialSettlement.approvedAmount}</p>
//                                         </div>
//                                         <div>
//                                             <Label className="text-sm font-medium">Deductible</Label>
//                                             <p className="text-sm text-gray-600">{viewingClaim.financialSettlement.deductible}</p>
//                                         </div>
//                                         <div>
//                                             <Label className="text-sm font-medium">Payable Amount</Label>
//                                             <p className="text-sm text-gray-600">{viewingClaim.financialSettlement.payableAmount}</p>
//                                         </div>
//                                         <div>
//                                             <Label className="text-sm font-medium">Payment Status</Label>
//                                             <Badge variant={
//                                                 viewingClaim.financialSettlement.paymentStatus === "Completed" ? "default" :
//                                                     viewingClaim.financialSettlement.paymentStatus === "Rejected" ? "destructive" : "secondary"
//                                             }>
//                                                 {viewingClaim.financialSettlement.paymentStatus}
//                                             </Badge>
//                                         </div>
//                                         <div>
//                                             <Label className="text-sm font-medium">Payment Date</Label>
//                                             <p className="text-sm text-gray-600">{viewingClaim.financialSettlement.paymentDate}</p>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         )}
//                     </DialogContent>
//                 </Dialog>
//             </div>
//         </AdminLayout>
//     );
// }


import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Eye, Search, Filter, MoreHorizontal, Loader2, Edit } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter, // Added DialogFooter for save button
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"; // Added Select components
import axios from "axios";

interface AggregatedClaimDetails {
    claimId: number;
    claimType: string; // Corresponds to plan_name from InsurancePlan
    policyNumber: number; // Corresponds to policy_id from Policy
    customerName: string; // Corresponds to first_name + last_name from PersonalDetails
    dateOfClaim: string; //YYYY-MM-DD
    status: string; // Corresponds to claim_status from Claim
    claimAmount: number; // Corresponds to sum_insured from Claim
    dateOfIncident: string;
    description: string;
    location: string;
    timeOfIncident: string;
    coverage: string;
    sumInsured: number;
    premium: number;
}

// Define the shape of the data needed by this frontend component
interface AdminClaimItem {
    id: string;
    claimType: string;
    policyNumber: string;
    customerName: string;
    dateOfClaim: string;
    status: string;
    claimAmount: string; // Formatted as string
    overview: {
        claimId: string;
        policyNumber: string;
        claimType: string;
        dateOfIncident: string;
        dateOfClaim: string;
        status: string;
        claimAmount: string;
    };
    incidentDetails: {
        description: string;
        location: string;
        timeOfIncident: string;
        weatherConditions: string;
        policeReportNumber: string;
    };
    policyDetails: {
        policyNumber: string;
        policyType: string;
        coverage: string;
        sumInsured: string;
        premium: string;
    };
    documents: { name: string; status: string; date: string; }[];
    financialSettlement: {
        approvedAmount: string;
        deductible: string;
        payableAmount: string;
        paymentStatus: string;
        paymentDate: string;
    };
}

export default function AdminClaims() {
    const [claims, setClaims] = useState<AdminClaimItem[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [viewingClaim, setViewingClaim] = useState<AdminClaimItem | null>(null);
    const [editingClaim, setEditingClaim] = useState<AdminClaimItem | null>(null); // New state for editing
    const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false); // New state for edit dialog
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const API_CLAIMS_AGGREGATED_URL = 'http://localhost:8093/api/insurance/claims/aggregated';
    const API_CLAIMS_BASE_URL = 'http://localhost:8093/api/insurance/claims'; // Assuming this is the base for PUT/DELETE

    // Function to map backend DTO to frontend AdminClaimItem structure
    const mapToAdminClaimItem = (aggregatedClaim: AggregatedClaimDetails): AdminClaimItem => {
        const formattedClaimAmount = aggregatedClaim.claimAmount ? `₹${aggregatedClaim.claimAmount.toFixed(2)}` : '₹0.00';
        const policySumInsured = aggregatedClaim.sumInsured || 50000;
        const policyPremium = aggregatedClaim.premium || 0;
        let approvedAmountNum = aggregatedClaim.claimAmount * 0.70;
        let deductibleNum = aggregatedClaim.claimAmount * 0.10;
        let payableAmountNum = approvedAmountNum - deductibleNum;
        payableAmountNum = Math.min(payableAmountNum, policySumInsured);
        const formattedApprovedAmount = `₹${approvedAmountNum.toFixed(2)}`;
        const formattedDeductible = `₹${deductibleNum.toFixed(2)}`;
        const formattedPayableAmount = `₹${payableAmountNum.toFixed(2)}`;
        const formattedPolicySumInsured = `₹${policySumInsured.toFixed(2)}`;
        const formattedPolicyPremium = `₹${policyPremium.toFixed(2)}`;

        return {
            id: String(aggregatedClaim.claimId),
            claimType: aggregatedClaim.claimType || 'N/A',
            policyNumber: String(aggregatedClaim.policyNumber || 'N/A'),
            customerName: aggregatedClaim.customerName || 'N/A',
            dateOfClaim: aggregatedClaim.dateOfClaim || 'N/A',
            status: aggregatedClaim.status || 'N/A',
            claimAmount: formattedClaimAmount,
            overview: {
                claimId: String(aggregatedClaim.claimId),
                policyNumber: String(aggregatedClaim.policyNumber || 'N/A'),
                claimType: aggregatedClaim.claimType || 'N/A',
                dateOfIncident: String(aggregatedClaim.dateOfIncident),
                dateOfClaim: aggregatedClaim.dateOfClaim || 'N/A',
                status: aggregatedClaim.status || 'N/A',
                claimAmount: formattedClaimAmount
            },
            incidentDetails: {
                description: String(aggregatedClaim.description),
                location: String(aggregatedClaim.location),
                timeOfIncident: String(aggregatedClaim.timeOfIncident),
                weatherConditions: 'Clear',
                policeReportNumber: 'N/A (Backend needs to provide this)'
            },
            policyDetails: {
                policyNumber: String(aggregatedClaim.policyNumber || 'N/A'),
                policyType: String(aggregatedClaim.claimType),
                coverage: 'N/A (Backend needs to provide this)',
                sumInsured: formattedPolicySumInsured,
                premium: formattedPolicyPremium
            },
            documents: [],
            financialSettlement: {
                approvedAmount: formattedApprovedAmount,
                deductible: formattedDeductible,
                payableAmount: formattedPayableAmount,
                paymentStatus: 'PENDING',
                paymentDate: 'N/A'
            }
        };
    };

    const fetchClaims = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get<AggregatedClaimDetails[]>(API_CLAIMS_AGGREGATED_URL);
            const mappedClaims = response.data.map(mapToAdminClaimItem);
            setClaims(mappedClaims);
        } catch (err) {
            if (axios.isAxiosError(err)) {
                if (err.response) {
                    setError(`Failed to fetch claims: ${err.response.status} - ${err.response.statusText || 'Server Error'}. Please ensure your Spring Boot backend is running at http://localhost:8093.`);
                    console.error('Backend error response:', err.response.data);
                } else if (err.request) {
                    setError('Network error: No response from backend. Please ensure your Spring Boot backend is running at http://localhost:8093.');
                    console.error('Network request error:', err.request);
                } else {
                    setError('Error setting up request to fetch claims.');
                    console.error('Request setup error:', err.message);
                }
            } else {
                setError('An unexpected error occurred while fetching claims.');
                console.error('Unexpected error:', err);
            }
            setClaims([]); // Ensure claims array is empty on error
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchClaims();
    }, []);

    const handleView = (claim: AdminClaimItem) => {
        setViewingClaim(claim);
        setIsViewDialogOpen(true);
    };

    const handleEdit = (claim: AdminClaimItem) => {
        setEditingClaim(claim);
        setIsEditDialogOpen(true);
    };

    const handleSave = async () => {
        if (editingClaim) {
            try {
                // Assuming the backend expects a Claim object for update, and we only want to update status
                // We need to map back to a DTO that the backend expects for updating.
                // For simplicity, let's assume the backend has an endpoint to update claim status
                // or can handle a partial update of the claim object.
                // A common DTO for updating a claim might look like:
                // { claimId: number, claimStatus: string, ...other_editable_fields }
                const updatePayload = {
                    claimId: parseInt(editingClaim.id),
                    claimStatus: editingClaim.status,
                    // Include other fields if your backend PUT endpoint requires the full object
                    // For now, let's assume it only needs claimId and claimStatus for a status update.
                    // If the backend expects the full AggregatedClaimDetails, you'd need to reconstruct it.
                    // For a simple status update, a dedicated endpoint or a PATCH might be better.
                    // For this example, we'll send the relevant fields from editingClaim.
                    // You might need to adjust this payload based on your actual backend API.
                    claimAmount: parseFloat(editingClaim.claimAmount.replace('₹', '')),
                    claimReason: editingClaim.claimType,
                    dateOfIncident: editingClaim.overview.dateOfIncident,
                    description: editingClaim.incidentDetails.description,
                    location: editingClaim.incidentDetails.location,
                    timeOfIncident: editingClaim.incidentDetails.timeOfIncident,
                    policyId: parseInt(editingClaim.policyNumber),
                    dateOfClaim: editingClaim.dateOfClaim,
                    // If you have other fields in your backend Claim entity that are required for a PUT,
                    // you'll need to fetch the full claim details first or ensure they are in editingClaim.
                };

                await axios.put(`${API_CLAIMS_BASE_URL}/${editingClaim.id}`, updatePayload);
                fetchClaims(); // Refresh the claims list after saving
                setIsEditDialogOpen(false);
                setEditingClaim(null);
            } catch (error) {
                console.error("Error saving claim:", error);
                // Optionally show an error message to the user
                setError("Failed to save claim changes. Please try again.");
            }
        }
    };

    const filteredClaims = claims.filter(claim =>
        claim.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        claim.claimType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        claim.policyNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        claim.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
        claim.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                        <Button onClick={exportToCSV} variant="outline" className="bg-orange-100 border-orange-300">
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
                        {loading ? (
                            <div className="flex justify-center items-center h-40">
                                <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
                                <span className="ml-2 text-muted-foreground">Loading claims...</span>
                            </div>
                        ) : error ? (
                            <div className="text-center text-red-500 p-4 border border-red-300 rounded-md">
                                <p>{error}</p>
                                <p className="text-sm mt-2">Please ensure your backend server is running and accessible.</p>
                            </div>
                        ) : (
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
                                    {filteredClaims.length > 0 ? (
                                        filteredClaims.map((claim) => (
                                            <TableRow key={claim.id}>
                                                <TableCell className="font-medium">{claim.id}</TableCell>
                                                <TableCell>{claim.claimType}</TableCell>
                                                <TableCell>{claim.policyNumber}</TableCell>
                                                <TableCell>{claim.customerName}</TableCell>
                                                <TableCell>{claim.dateOfClaim}</TableCell>
                                                <TableCell>
                                                    <Badge
                                                        variant={
                                                            claim.status === "APPROVED" ? "default" :
                                                                claim.status === "PENDING" ? "secondary" :
                                                                    "destructive"
                                                        }
                                                        className={
                                                            claim.status === "APPROVED" ? "bg-green-100 text-green-800" :
                                                                claim.status === "PENDING" ? "bg-yellow-100 text-yellow-800" :
                                                                    "bg-red-100 text-red-800"
                                                        }
                                                    >
                                                        {claim.status}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>{claim.claimAmount}</TableCell>
                                                <TableCell>
                                                    <div className="flex space-x-2">
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => handleView(claim)}
                                                            className="text-orange-600 hover:text-orange-700"
                                                        >
                                                            <Eye className="h-4 w-4" />
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => handleEdit(claim)}
                                                            className="text-orange-600 hover:text-orange-700"
                                                        >
                                                            <Edit className="h-4 w-4" />
                                                        </Button>
                                                        {/* Add Delete functionality here if needed, similar to AdminUsers */}
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={8} className="text-center text-muted-foreground">No claims found.</TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        )}
                    </CardContent>
                </Card>

                {/* View Claim Details Dialog */}
                <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
                    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>Claim Details</DialogTitle>
                            <DialogDescription>
                                Complete information about the selected claim
                            </DialogDescription>
                        </DialogHeader>
                        {viewingClaim && (
                            <div className="space-y-6">
                                {/* Claim Overview */}
                                <div className="border rounded-lg p-4">
                                    <h3 className="text-lg font-semibold mb-4 border-b pb-2">Claim Overview</h3>
                                    <div className="grid grid-cols-2 gap-4">
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
                                            <Badge
                                                variant={
                                                    viewingClaim.overview.status === "APPROVED" ? "default" :
                                                        viewingClaim.overview.status === "PENDING" ? "secondary" :
                                                            "destructive"
                                                }
                                                className={
                                                    viewingClaim.overview.status === "APPROVED" ? "bg-green-100 text-green-800" :
                                                        viewingClaim.overview.status === "PENDING" ? "bg-yellow-100 text-yellow-800" :
                                                            "bg-red-100 text-red-800"
                                                }
                                            >
                                                {viewingClaim.overview.status}
                                            </Badge>
                                        </div>
                                        <div>
                                            <Label className="text-sm font-medium">Claim Amount</Label>
                                            <p className="text-sm text-gray-600">{viewingClaim.overview.claimAmount}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Incident Details */}
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
                                        <div>
                                            <Label className="text-sm font-medium">Police Report Number</Label>
                                            <p className="text-sm text-gray-600">{viewingClaim.incidentDetails.policeReportNumber}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Policy Details */}
                                <div className="border rounded-lg p-4">
                                    <h3 className="text-lg font-semibold mb-4 border-b pb-2">Policy Details</h3>
                                    <div className="grid grid-cols-2 gap-4">
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

                                {/* Documents */}
                                <div className="border rounded-lg p-4">
                                    <h3 className="text-lg font-semibold mb-4 border-b pb-2">Documents</h3>
                                    {viewingClaim.documents.length > 0 ? (
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Document Name</TableHead>
                                                    <TableHead>Status</TableHead>
                                                    <TableHead>Date Uploaded</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {viewingClaim.documents.map((doc, idx) => (
                                                    <TableRow key={idx}>
                                                        <TableCell>{doc.name}</TableCell>
                                                        <TableCell>{doc.status}</TableCell>
                                                        <TableCell>{doc.date}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    ) : (
                                        <p className="text-sm text-muted-foreground">No documents uploaded for this claim.</p>
                                    )}
                                </div>

                                {/* Financial Settlement */}
                                <div className="border rounded-lg p-4">
                                    <h3 className="text-lg font-semibold mb-4 border-b pb-2">Financial Settlement</h3>
                                    <div className="grid grid-cols-2 gap-4">
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
                                            <Badge variant="secondary">{viewingClaim.financialSettlement.paymentStatus}</Badge>
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

                {/* Edit Claim Dialog */}
                <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Edit Claim</DialogTitle>
                            <DialogDescription>
                                Make changes to claim details here. Click save when you're done.
                            </DialogDescription>
                        </DialogHeader>
                        {editingClaim && (
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="claim-id" className="text-right">Claim ID</Label>
                                    <Input
                                        id="claim-id"
                                        value={editingClaim.id}
                                        className="col-span-3"
                                        readOnly // Claim ID should not be editable
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="claim-type" className="text-right">Claim Type</Label>
                                    <Input
                                        id="claim-type"
                                        value={editingClaim.claimType}
                                        onChange={(e) => setEditingClaim({ ...editingClaim, claimType: e.target.value })}
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="claim-amount" className="text-right">Claim Amount</Label>
                                    <Input
                                        id="claim-amount"
                                        value={editingClaim.claimAmount}
                                        onChange={(e) => setEditingClaim({ ...editingClaim, claimAmount: e.target.value })}
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="status" className="text-right">Status</Label>
                                    <Select
                                        value={editingClaim.status}
                                        onValueChange={(value) => setEditingClaim({ ...editingClaim, status: value })}
                                    >
                                        <SelectTrigger className="col-span-3">
                                            <SelectValue placeholder="Select a status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="PENDING">PENDING</SelectItem>
                                            <SelectItem value="APPROVED">APPROVED</SelectItem>
                                            <SelectItem value="REJECTED">REJECTED</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                {/* You can add more editable fields here as needed, e.g., description, location */}
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="description" className="text-right">Description</Label>
                                    <Input
                                        id="description"
                                        value={editingClaim.incidentDetails.description}
                                        onChange={(e) => setEditingClaim({ ...editingClaim, incidentDetails: { ...editingClaim.incidentDetails, description: e.target.value } })}
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="location" className="text-right">Location</Label>
                                    <Input
                                        id="location"
                                        value={editingClaim.incidentDetails.location}
                                        onChange={(e) => setEditingClaim({ ...editingClaim, incidentDetails: { ...editingClaim.incidentDetails, location: e.target.value } })}
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="dateOfIncident" className="text-right">Date of Incident</Label>
                                    <Input
                                        id="dateOfIncident"
                                        type="date"
                                        value={editingClaim.overview.dateOfIncident}
                                        onChange={(e) => setEditingClaim({ ...editingClaim, overview: { ...editingClaim.overview, dateOfIncident: e.target.value } })}
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="timeOfIncident" className="text-right">Time of Incident</Label>
                                    <Input
                                        id="timeOfIncident"
                                        type="time"
                                        value={editingClaim.incidentDetails.timeOfIncident}
                                        onChange={(e) => setEditingClaim({ ...editingClaim, incidentDetails: { ...editingClaim.incidentDetails, timeOfIncident: e.target.value } })}
                                        className="col-span-3"
                                    />
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