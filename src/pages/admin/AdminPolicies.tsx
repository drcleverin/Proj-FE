
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Search, Filter, MoreHorizontal, RotateCcw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

// Mock policy data
const mockPolicies = [
  {
    id: "USR001",
    policyType: "Health",
    name: "Anil Kumar",
    sumInsured: "₹10L",
    premium: "₹18,500",
    status: "Active"
  },
  {
    id: "USR001",
    policyType: "Health",
    name: "Anil Kumar",
    sumInsured: "₹10L",
    premium: "₹18,500",
    status: "Expired"
  },
  {
    id: "USR001",
    policyType: "Motor",
    name: "Anil Kumar",
    sumInsured: "₹10L",
    premium: "₹18,500",
    status: "Active"
  },
  {
    id: "USR001",
    policyType: "Product",
    name: "Anil Kumar",
    sumInsured: "₹10L",
    premium: "₹18,500",
    status: "Active"
  },
  {
    id: "USR001",
    policyType: "Health",
    name: "Anil Kumar",
    sumInsured: "₹10L",
    premium: "₹18,500",
    status: "Active"
  },
  {
    id: "USR001",
    policyType: "Motor",
    name: "Anil Kumar",
    sumInsured: "₹10L",
    premium: "₹18,500",
    status: "Active"
  },
  {
    id: "USR001",
    policyType: "Product",
    name: "Anil Kumar",
    sumInsured: "₹10L",
    premium: "₹18,500",
    status: "Active"
  },
  {
    id: "USR001",
    policyType: "Motor",
    name: "Anil Kumar",
    sumInsured: "₹10L",
    premium: "₹18,500",
    status: "Active"
  }
];

export default function AdminPolicies() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPolicies = mockPolicies.filter(policy =>
    policy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    policy.policyType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    policy.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Policy Management</h1>
          </div>
          <div className="flex gap-2">
            <Button className="bg-orange-400 hover:bg-orange-500">
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
                          className="text-orange-600 hover:text-orange-700"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-orange-600 hover:text-orange-700"
                        >
                          <RotateCcw className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
