import React, { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LogOut, Users, FileText, Activity } from "lucide-react";

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check auth status
  const { data: authData, isLoading: authLoading } = useQuery({
    queryKey: ["/api/auth/check"],
    onError: () => {
      setIsLoggedIn(false);
      setLocation("/admin/login");
    },
    onSuccess: () => {
      setIsLoggedIn(true);
    },
  });

  // Fetch freelancer applications
  const { data: freelancerApplications, isLoading: freelancersLoading } = useQuery({
    queryKey: ["/api/freelancer-applications"],
    enabled: isLoggedIn,
  });

  // Fetch project requests
  const { data: projectRequests, isLoading: projectsLoading } = useQuery({
    queryKey: ["/api/project-requests"],
    enabled: isLoggedIn,
  });

  const handleLogout = async () => {
    try {
      await apiRequest("POST", "/api/auth/logout", {});
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      });
      setLocation("/admin/login");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to log out. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin mx-auto mb-4"></div>
          <p className="text-white/70">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return null; // Redirect handled by the query's onError
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-screen">
        {/* Sidebar */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-64 bg-muted border-r border-white/5 p-4 hidden md:block"
        >
          <div className="mb-8 pt-4">
            <div className="text-xl font-bold">
              <span className="gradient-text">Quantum</span>
              <span className="text-white">Edge</span>
            </div>
            <p className="text-white/50 text-sm mt-1">Admin Dashboard</p>
          </div>

          <nav className="space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start text-white/70 hover:text-white hover:bg-white/5"
            >
              <FileText className="mr-2 h-5 w-5" />
              Project Requests
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-white/70 hover:text-white hover:bg-white/5"
            >
              <Users className="mr-2 h-5 w-5" />
              Freelancers
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-white/70 hover:text-white hover:bg-white/5"
            >
              <Activity className="mr-2 h-5 w-5" />
              Analytics
            </Button>
          </nav>

          <div className="absolute bottom-8 w-52">
            <Button
              variant="ghost"
              className="w-full justify-start text-white/70 hover:text-white hover:bg-white/5"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-5 w-5" />
              Log Out
            </Button>
          </div>
        </motion.div>

        {/* Main content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex-1 overflow-auto"
        >
          <header className="bg-muted border-b border-white/5 p-4 flex justify-between items-center sticky top-0 z-10">
            <h1 className="text-xl font-bold">Dashboard</h1>
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-sm font-bold text-background">A</span>
              </div>
              <span className="text-sm text-white/70 hidden md:inline">
                Admin
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </header>

          <main className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="glassmorphism border border-white/10">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-white/70">
                    Total Projects
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {projectsLoading ? (
                      <div className="h-8 w-20 bg-white/10 animate-pulse rounded"></div>
                    ) : (
                      projectRequests?.length || 0
                    )}
                  </div>
                  <p className="text-xs text-white/50 mt-1">
                    +12% from last month
                  </p>
                </CardContent>
              </Card>
              <Card className="glassmorphism border border-white/10">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-white/70">
                    Freelancer Applications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {freelancersLoading ? (
                      <div className="h-8 w-20 bg-white/10 animate-pulse rounded"></div>
                    ) : (
                      freelancerApplications?.length || 0
                    )}
                  </div>
                  <p className="text-xs text-white/50 mt-1">
                    +5% from last month
                  </p>
                </CardContent>
              </Card>
              <Card className="glassmorphism border border-white/10">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-white/70">
                    Conversion Rate
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">64%</div>
                  <p className="text-xs text-white/50 mt-1">
                    +8% from last month
                  </p>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="projects" className="w-full">
              <TabsList className="glassmorphism border border-white/10 mb-6">
                <TabsTrigger value="projects">Project Requests</TabsTrigger>
                <TabsTrigger value="freelancers">
                  Freelancer Applications
                </TabsTrigger>
              </TabsList>

              <TabsContent value="projects" className="mt-0">
                <Card className="glassmorphism border border-white/10">
                  <CardHeader>
                    <CardTitle>Recent Project Requests</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {projectsLoading ? (
                      <div className="space-y-4">
                        {[...Array(3)].map((_, i) => (
                          <div
                            key={i}
                            className="h-12 bg-white/5 animate-pulse rounded"
                          ></div>
                        ))}
                      </div>
                    ) : projectRequests && projectRequests.length > 0 ? (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Project Name</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Budget</TableHead>
                            <TableHead>Client</TableHead>
                            <TableHead>Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {projectRequests.map((project: any, index: number) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium">
                                {project.projectName}
                              </TableCell>
                              <TableCell>
                                {project.projectType === "web-app"
                                  ? "Web Application"
                                  : project.projectType === "mobile-app"
                                  ? "Mobile App"
                                  : project.projectType === "e-commerce"
                                  ? "E-commerce"
                                  : project.projectType}
                              </TableCell>
                              <TableCell>
                                {project.budget === "small"
                                  ? "$1K-$5K"
                                  : project.budget === "medium"
                                  ? "$5K-$15K"
                                  : project.budget === "large"
                                  ? "$15K-$50K"
                                  : "$50K+"}
                              </TableCell>
                              <TableCell>{project.clientName}</TableCell>
                              <TableCell>
                                <span className="px-2 py-1 rounded-full text-xs bg-primary/20 text-primary">
                                  New
                                </span>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    ) : (
                      <div className="text-center py-6 text-white/50">
                        No project requests yet
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="freelancers" className="mt-0">
                <Card className="glassmorphism border border-white/10">
                  <CardHeader>
                    <CardTitle>Recent Freelancer Applications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {freelancersLoading ? (
                      <div className="space-y-4">
                        {[...Array(3)].map((_, i) => (
                          <div
                            key={i}
                            className="h-12 bg-white/5 animate-pulse rounded"
                          ></div>
                        ))}
                      </div>
                    ) : freelancerApplications &&
                      freelancerApplications.length > 0 ? (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Specialty</TableHead>
                            <TableHead>Experience</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {freelancerApplications.map(
                            (freelancer: any, index: number) => (
                              <TableRow key={index}>
                                <TableCell className="font-medium">
                                  {freelancer.name}
                                </TableCell>
                                <TableCell>
                                  {freelancer.specialty === "web-dev"
                                    ? "Web Development"
                                    : freelancer.specialty === "mobile-dev"
                                    ? "Mobile Development"
                                    : freelancer.specialty === "ui-ux"
                                    ? "UI/UX Design"
                                    : freelancer.specialty}
                                </TableCell>
                                <TableCell>
                                  {freelancer.experience} years
                                </TableCell>
                                <TableCell>{freelancer.email}</TableCell>
                                <TableCell>
                                  <span className="px-2 py-1 rounded-full text-xs bg-secondary/20 text-secondary">
                                    Pending
                                  </span>
                                </TableCell>
                              </TableRow>
                            )
                          )}
                        </TableBody>
                      </Table>
                    ) : (
                      <div className="text-center py-6 text-white/50">
                        No freelancer applications yet
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </main>
        </motion.div>
      </div>
    </div>
  );
}
