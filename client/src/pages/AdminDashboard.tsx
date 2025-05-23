import React, { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useLanguage } from "@/lib/LanguageContext";
import { BarChart as ReBarChart, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Bar, PieChart as RPieChart, Pie, Cell } from "recharts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  LogOut, 
  Users, 
  FileText, 
  Activity, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Info, 
  MoreHorizontal,
  Eye,
  Mail,
  MessageSquare,
  Calculator,
  DollarSign,
  Plus,
  BarChart4,
  PieChart,
  TrendingUp,
  ArrowUpRight,
  ChevronUp
} from "lucide-react";
import AdminPriceCalculator from "@/components/AdminPriceCalculator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { t } = useLanguage();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [selectedFreelancer, setSelectedFreelancer] = useState<any>(null);
  const [selectedMessage, setSelectedMessage] = useState<any>(null);
  const [selectedPriceRequest, setSelectedPriceRequest] = useState<any>(null);

  // Check auth status
  const { data: authData, isLoading: authLoading, error: authError } = useQuery({
    queryKey: ["/api/auth/check"],
  });
  
  // Handle auth response
  useEffect(() => {
    if (authError) {
      setIsLoggedIn(false);
      setLocation("/admin/login");
    } else if (authData) {
      setIsLoggedIn(true);
    }
  }, [authData, authError, setLocation]);

  // Fetch freelancer applications
  const { data: freelancerApplications = [], isLoading: freelancersLoading } = useQuery<any[]>({
    queryKey: ["/api/freelancer-applications"],
    enabled: isLoggedIn,
  });

  // Fetch project requests
  const { data: projectRequests = [], isLoading: projectsLoading } = useQuery<any[]>({
    queryKey: ["/api/project-requests"],
    enabled: isLoggedIn,
  });
  
  // Fetch contact messages
  const { data: contactMessages = [], isLoading: messagesLoading } = useQuery<any[]>({
    queryKey: ["/api/contact-messages"],
    enabled: isLoggedIn,
  });
  
  // Fetch price calculator requests
  const { data: priceCalculatorRequests = [], isLoading: priceRequestsLoading } = useQuery<any[]>({
    queryKey: ["/api/price-calculator-requests"],
    enabled: isLoggedIn,
  });

  // Update project status mutation
  const updateProjectStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      const res = await apiRequest(
        "PATCH", 
        `/api/project-requests/${id}/status`, 
        { status }
      );
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/project-requests"] });
      toast({
        title: t("admin.projects.status.update.success"),
        description: t("admin.projects.status.update.description"),
      });
    },
    onError: () => {
      toast({
        title: t("admin.dashboard.logout.failed"),
        description: t("admin.projects.status.update.description"),
        variant: "destructive",
      });
    },
  });

  // Update freelancer application status mutation
  const updateFreelancerStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      const res = await apiRequest(
        "PATCH", 
        `/api/freelancer-applications/${id}/status`, 
        { status }
      );
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/freelancer-applications"] });
      toast({
        title: t("admin.freelancers.status.update.success"),
        description: t("admin.freelancers.status.update.description"),
      });
    },
    onError: () => {
      toast({
        title: t("admin.dashboard.logout.failed"),
        description: t("admin.freelancers.status.update.description"),
        variant: "destructive",
      });
    },
  });
  
  // Update contact message status mutation
  const updateMessageStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      const res = await apiRequest(
        "PATCH", 
        `/api/contact-messages/${id}/status`, 
        { status }
      );
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/contact-messages"] });
      toast({
        title: t("admin.messages.status.update.success"),
        description: t("admin.messages.status.update.description"),
      });
    },
    onError: () => {
      toast({
        title: t("admin.dashboard.logout.failed"),
        description: t("admin.messages.status.update.failed"),
        variant: "destructive",
      });
    },
  });
  
  // Update price calculator request status mutation
  const updatePriceRequestStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      const res = await apiRequest(
        "PATCH", 
        `/api/price-calculator-requests/${id}/status`, 
        { status }
      );
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/price-calculator-requests"] });
      toast({
        title: t("admin.price_requests.status.update.success"),
        description: t("admin.price_requests.status.update.description"),
      });
    },
    onError: () => {
      toast({
        title: t("admin.dashboard.logout.failed"),
        description: t("admin.price_requests.status.update.failed"),
        variant: "destructive",
      });
    },
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="bg-yellow-500/20 text-yellow-500 border-yellow-500/20">{t("admin.status.pending")}</Badge>;
      case "approved":
        return <Badge variant="outline" className="bg-green-500/20 text-green-500 border-green-500/20">{t("admin.status.approved")}</Badge>;
      case "rejected":
        return <Badge variant="outline" className="bg-red-500/20 text-red-500 border-red-500/20">{t("admin.status.rejected")}</Badge>;
      case "in-progress":
        return <Badge variant="outline" className="bg-blue-500/20 text-blue-500 border-blue-500/20">{t("admin.status.in-progress")}</Badge>;
      case "completed":
        return <Badge variant="outline" className="bg-purple-500/20 text-purple-500 border-purple-500/20">{t("admin.status.completed")}</Badge>;
      default:
        return <Badge variant="outline" className="bg-primary/20 text-primary border-primary/20">{t("admin.status.new")}</Badge>;
    }
  };

  const handleLogout = async () => {
    try {
      await apiRequest("POST", "/api/auth/logout", {});
      toast({
        title: t("admin.dashboard.logout.success"),
        description: t("admin.dashboard.logout.description"),
      });
      setLocation("/admin/login");
    } catch (error) {
      toast({
        title: t("admin.dashboard.logout.failed"),
        description: t("admin.dashboard.logout.failed_description"),
        variant: "destructive",
      });
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin mx-auto mb-4"></div>
          <p className="text-white/70">{t("admin.dashboard.loading")}</p>
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
            <p className="text-white/50 text-sm mt-1">{t("admin.dashboard.title")}</p>
          </div>

          <nav className="space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start text-white/70 hover:text-white hover:bg-white/5"
            >
              <FileText className="mr-2 h-5 w-5" />
              {t("admin.nav.projects")}
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-white/70 hover:text-white hover:bg-white/5"
            >
              <Users className="mr-2 h-5 w-5" />
              {t("admin.nav.freelancers")}
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-white/70 hover:text-white hover:bg-white/5"
            >
              <Activity className="mr-2 h-5 w-5" />
              {t("admin.nav.analytics")}
            </Button>
          </nav>

          <div className="absolute bottom-8 w-52">
            <Button
              variant="ghost"
              className="w-full justify-start text-white/70 hover:text-white hover:bg-white/5"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-5 w-5" />
              {t("admin.nav.logout")}
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
            <h1 className="text-xl font-bold">{t("admin.dashboard.header")}</h1>
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-sm font-bold text-background">A</span>
              </div>
              <span className="text-sm text-white/70 hidden md:inline">
                {t("admin.user.admin")}
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
                    {t("admin.dashboard.cards.total_projects")}
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
                    {t("admin.dashboard.cards.project_growth")}
                  </p>
                </CardContent>
              </Card>
              <Card className="glassmorphism border border-white/10">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-white/70">
                    {t("admin.dashboard.cards.freelancer_applications")}
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
                    {t("admin.dashboard.cards.freelancer_growth")}
                  </p>
                </CardContent>
              </Card>
              <Card className="glassmorphism border border-white/10">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-white/70">
                    {t("admin.dashboard.cards.conversion_rate")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">64%</div>
                  <p className="text-xs text-white/50 mt-1">
                    {t("admin.dashboard.cards.conversion_growth")}
                  </p>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="analytics" className="w-full">
              <TabsList className="glassmorphism border border-white/10 mb-6">
                <TabsTrigger value="analytics">
                  <Activity className="mr-1 h-4 w-4 inline" />
                  {t("admin.tabs.analytics")}
                </TabsTrigger>
                <TabsTrigger value="projects">{t("admin.tabs.project_requests")}</TabsTrigger>
                <TabsTrigger value="freelancers">
                  {t("admin.tabs.freelancer_applications")}
                </TabsTrigger>
                <TabsTrigger value="messages">
                  <MessageSquare className="mr-1 h-4 w-4 inline" />
                  {t("admin.tabs.contact_messages")}
                </TabsTrigger>
                <TabsTrigger value="price-requests">
                  <Calculator className="mr-1 h-4 w-4 inline" />
                  {t("admin.tabs.price_requests")}
                </TabsTrigger>
                <TabsTrigger value="calculator">
                  <Plus className="mr-1 h-4 w-4 inline" />
                  {t("admin.tabs.new_calculation")}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="analytics" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="glassmorphism border border-white/10">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center">
                        <BarChart4 className="mr-2 h-5 w-5 text-primary" />
                        {t("admin.analytics.monthly.requests")}
                      </CardTitle>
                      <CardDescription>
                        {t("admin.analytics.last_6_months")}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pl-2">
                      <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <ReBarChart
                            data={[
                              { name: 'Oca', value: 12 },
                              { name: 'Şub', value: 19 },
                              { name: 'Mar', value: 15 },
                              { name: 'Nis', value: 25 },
                              { name: 'May', value: 32 },
                              { name: 'Haz', value: 27 },
                            ]}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                            <XAxis dataKey="name" stroke="#888" />
                            <YAxis stroke="#888" />
                            <Tooltip 
                              contentStyle={{ 
                                backgroundColor: 'rgba(15, 15, 15, 0.9)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                borderRadius: '8px'
                              }}
                            />
                            <Bar dataKey="value" fill="#8884d8" radius={[4, 4, 0, 0]}>
                              {[
                                { name: 'Oca', value: 12 },
                                { name: 'Şub', value: 19 },
                                { name: 'Mar', value: 15 },
                                { name: 'Nis', value: 25 },
                                { name: 'May', value: 32 },
                                { name: 'Haz', value: 27 },
                              ].map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={`rgba(136, 132, 216, ${0.5 + index * 0.1})`} />
                              ))}
                            </Bar>
                          </ReBarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="glassmorphism border border-white/10">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center">
                        <PieChart className="mr-2 h-5 w-5 text-primary" />
                        {t("admin.analytics.requests.by.type")}
                      </CardTitle>
                      <CardDescription>
                        {t("admin.analytics.service_distribution")}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <RPieChart>
                            <Pie
                              data={[
                                { name: 'Web Geliştirme', value: 45 },
                                { name: 'Mobil Uygulama', value: 30 },
                                { name: 'UI/UX Tasarım', value: 15 },
                                { name: 'E-ticaret', value: 10 },
                              ]}
                              cx="50%"
                              cy="50%"
                              innerRadius={70}
                              outerRadius={100}
                              paddingAngle={5}
                              dataKey="value"
                            >
                              <Cell fill="#8884d8" />
                              <Cell fill="#82ca9d" />
                              <Cell fill="#ffc658" />
                              <Cell fill="#ff8042" />
                            </Pie>
                            <Tooltip 
                              contentStyle={{ 
                                backgroundColor: 'rgba(15, 15, 15, 0.9)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                borderRadius: '8px'
                              }}
                            />
                          </RPieChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="glassmorphism border border-white/10 md:col-span-2">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center">
                        <TrendingUp className="mr-2 h-5 w-5 text-primary" />
                        {t("admin.analytics.conversion_rates")}
                      </CardTitle>
                      <CardDescription>
                        {t("admin.analytics.conversion_description")}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pl-2">
                      <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart
                            data={[
                              { name: 'Oca', leads: 40, conversions: 24 },
                              { name: 'Şub', leads: 45, conversions: 28 },
                              { name: 'Mar', leads: 35, conversions: 25 },
                              { name: 'Nis', leads: 50, conversions: 35 },
                              { name: 'May', leads: 60, conversions: 40 },
                              { name: 'Haz', leads: 75, conversions: 53 },
                            ]}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                            <XAxis dataKey="name" stroke="#888" />
                            <YAxis stroke="#888" />
                            <Tooltip 
                              contentStyle={{ 
                                backgroundColor: 'rgba(15, 15, 15, 0.9)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                borderRadius: '8px'
                              }}
                            />
                            <Legend />
                            <Area 
                              type="monotone" 
                              dataKey="leads" 
                              stroke="#8884d8" 
                              fill="rgba(136, 132, 216, 0.2)"
                              name={t("admin.analytics.type.projects")}
                            />
                            <Area 
                              type="monotone" 
                              dataKey="conversions" 
                              stroke="#82ca9d" 
                              fill="rgba(130, 202, 157, 0.2)"
                              name={t("admin.analytics.conversion_rates")}
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="projects" className="mt-0">
                <Card className="glassmorphism border border-white/10">
                  <CardHeader>
                    <CardTitle>{t("admin.projects.title")}</CardTitle>
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
                    ) : projectRequests && Array.isArray(projectRequests) && projectRequests.length > 0 ? (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Project Name</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Budget</TableHead>
                            <TableHead>Client</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
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
                                {getStatusBadge(project.status)}
                              </TableCell>
                              <TableCell>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => setSelectedProject(project)}>
                                      <Eye className="h-4 w-4 mr-2" />
                                      View Details
                                    </DropdownMenuItem>
                                    <DropdownMenuItem 
                                      onClick={() => updateProjectStatusMutation.mutate({ 
                                        id: project.id, 
                                        status: "approved" 
                                      })}
                                    >
                                      <CheckCircle className="h-4 w-4 mr-2" />
                                      Approve
                                    </DropdownMenuItem>
                                    <DropdownMenuItem 
                                      onClick={() => updateProjectStatusMutation.mutate({ 
                                        id: project.id, 
                                        status: "rejected" 
                                      })}
                                    >
                                      <XCircle className="h-4 w-4 mr-2" />
                                      Reject
                                    </DropdownMenuItem>
                                    <DropdownMenuItem 
                                      onClick={() => updateProjectStatusMutation.mutate({ 
                                        id: project.id, 
                                        status: "in-progress" 
                                      })}
                                    >
                                      <Clock className="h-4 w-4 mr-2" />
                                      Mark In Progress
                                    </DropdownMenuItem>
                                    <DropdownMenuItem 
                                      onClick={() => updateProjectStatusMutation.mutate({ 
                                        id: project.id, 
                                        status: "completed" 
                                      })}
                                    >
                                      <CheckCircle className="h-4 w-4 mr-2" />
                                      Mark Completed
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
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
                    <CardTitle>{t("admin.freelancers.title")}</CardTitle>
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
                            <TableHead>Actions</TableHead>
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
                                  {getStatusBadge(freelancer.status)}
                                </TableCell>
                                <TableCell>
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="icon">
                                        <MoreHorizontal className="h-4 w-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuItem onClick={() => setSelectedFreelancer(freelancer)}>
                                        <Eye className="h-4 w-4 mr-2" />
                                        View Details
                                      </DropdownMenuItem>
                                      <DropdownMenuItem 
                                        onClick={() => updateFreelancerStatusMutation.mutate({ 
                                          id: freelancer.id, 
                                          status: "approved" 
                                        })}
                                      >
                                        <CheckCircle className="h-4 w-4 mr-2" />
                                        Approve
                                      </DropdownMenuItem>
                                      <DropdownMenuItem 
                                        onClick={() => updateFreelancerStatusMutation.mutate({ 
                                          id: freelancer.id, 
                                          status: "rejected" 
                                        })}
                                      >
                                        <XCircle className="h-4 w-4 mr-2" />
                                        Reject
                                      </DropdownMenuItem>
                                      <DropdownMenuItem 
                                        onClick={() => updateFreelancerStatusMutation.mutate({ 
                                          id: freelancer.id, 
                                          status: "in-progress" 
                                        })}
                                      >
                                        <Clock className="h-4 w-4 mr-2" />
                                        Mark In Progress
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
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
              
              <TabsContent value="messages" className="mt-0">
                <Card className="glassmorphism border border-white/10">
                  <CardHeader>
                    <CardTitle>{t("admin.messages.title")}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {messagesLoading ? (
                      <div className="space-y-4">
                        {[...Array(3)].map((_, i) => (
                          <div
                            key={i}
                            className="h-12 bg-white/5 animate-pulse rounded"
                          ></div>
                        ))}
                      </div>
                    ) : contactMessages &&
                      Array.isArray(contactMessages) &&
                      contactMessages.length > 0 ? (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Subject</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {contactMessages.map(
                            (message: any, index: number) => (
                              <TableRow key={index}>
                                <TableCell className="font-medium">
                                  {message.name}
                                </TableCell>
                                <TableCell>
                                  {message.subject}
                                </TableCell>
                                <TableCell>{message.email}</TableCell>
                                <TableCell>
                                  {new Date(message.createdAt).toLocaleDateString()}
                                </TableCell>
                                <TableCell>
                                  {getStatusBadge(message.status)}
                                </TableCell>
                                <TableCell>
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="icon">
                                        <MoreHorizontal className="h-4 w-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuItem onClick={() => setSelectedMessage(message)}>
                                        <Eye className="h-4 w-4 mr-2" />
                                        View Details
                                      </DropdownMenuItem>
                                      <DropdownMenuItem 
                                        onClick={() => updateMessageStatusMutation.mutate({ 
                                          id: message.id, 
                                          status: "pending" 
                                        })}
                                      >
                                        <Clock className="h-4 w-4 mr-2" />
                                        Mark as Pending
                                      </DropdownMenuItem>
                                      <DropdownMenuItem 
                                        onClick={() => updateMessageStatusMutation.mutate({ 
                                          id: message.id, 
                                          status: "in-progress" 
                                        })}
                                      >
                                        <Activity className="h-4 w-4 mr-2" />
                                        Mark In Progress
                                      </DropdownMenuItem>
                                      <DropdownMenuItem 
                                        onClick={() => updateMessageStatusMutation.mutate({ 
                                          id: message.id, 
                                          status: "completed" 
                                        })}
                                      >
                                        <CheckCircle className="h-4 w-4 mr-2" />
                                        Mark as Completed
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </TableCell>
                              </TableRow>
                            )
                          )}
                        </TableBody>
                      </Table>
                    ) : (
                      <div className="text-center py-6 text-white/50">
                        No contact messages yet
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="price-requests" className="mt-0">
                <Card className="glassmorphism border border-white/10">
                  <CardHeader>
                    <CardTitle>
                      <div className="flex items-center">
                        <Calculator className="h-5 w-5 mr-2" />
                        <span>{t("admin.price_requests.title")}</span>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {priceRequestsLoading ? (
                      <div className="space-y-4">
                        {[...Array(3)].map((_, i) => (
                          <div
                            key={i}
                            className="h-12 bg-white/5 animate-pulse rounded"
                          ></div>
                        ))}
                      </div>
                    ) : priceCalculatorRequests &&
                      Array.isArray(priceCalculatorRequests) && 
                      priceCalculatorRequests.length > 0 ? (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Service Type</TableHead>
                            <TableHead>Timeline</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {priceCalculatorRequests.map(
                            (request: any, index: number) => (
                              <TableRow key={index}>
                                <TableCell className="font-medium">
                                  {request.name}
                                </TableCell>
                                <TableCell>
                                  {request.serviceType === "web-app"
                                    ? "Web Application"
                                    : request.serviceType === "mobile-app"
                                    ? "Mobile App"
                                    : request.serviceType === "e-commerce"
                                    ? "E-commerce"
                                    : request.serviceType === "branding"
                                    ? "Branding"
                                    : request.serviceType === "seo"
                                    ? "SEO Optimization"
                                    : request.serviceType === "marketing"
                                    ? "Digital Marketing"
                                    : request.serviceType === "content"
                                    ? "Content Creation"
                                    : request.serviceType === "ui-ux"
                                    ? "UI/UX Design"
                                    : request.serviceType}
                                </TableCell>
                                <TableCell>
                                  {request.timeline === "standard"
                                    ? "Standard (2-3 months)"
                                    : request.timeline === "accelerated"
                                    ? "Accelerated (1-2 months)"
                                    : request.timeline === "rush"
                                    ? "Rush (2-4 weeks)"
                                    : request.timeline}
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center">
                                    <DollarSign className="h-4 w-4 mr-1 text-green-400" />
                                    {request.estimatedPrice.toLocaleString()}
                                  </div>
                                </TableCell>
                                <TableCell>
                                  {getStatusBadge(request.status)}
                                </TableCell>
                                <TableCell>
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="icon">
                                        <MoreHorizontal className="h-4 w-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuItem onClick={() => setSelectedPriceRequest(request)}>
                                        <Eye className="h-4 w-4 mr-2" />
                                        View Details
                                      </DropdownMenuItem>
                                      <DropdownMenuItem 
                                        onClick={() => updatePriceRequestStatusMutation.mutate({ 
                                          id: request.id, 
                                          status: "contacted" 
                                        })}
                                      >
                                        <Mail className="h-4 w-4 mr-2" />
                                        Mark as Contacted
                                      </DropdownMenuItem>
                                      <DropdownMenuItem 
                                        onClick={() => updatePriceRequestStatusMutation.mutate({ 
                                          id: request.id, 
                                          status: "converted" 
                                        })}
                                      >
                                        <CheckCircle className="h-4 w-4 mr-2" />
                                        Mark as Converted
                                      </DropdownMenuItem>
                                      <DropdownMenuItem 
                                        onClick={() => updatePriceRequestStatusMutation.mutate({ 
                                          id: request.id, 
                                          status: "rejected" 
                                        })}
                                      >
                                        <XCircle className="h-4 w-4 mr-2" />
                                        Mark as Rejected
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </TableCell>
                              </TableRow>
                            )
                          )}
                        </TableBody>
                      </Table>
                    ) : (
                      <div className="text-center py-6 text-white/50">
                        No price calculator requests yet
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="calculator" className="mt-0">
                <Card className="glassmorphism border border-white/10">
                  <CardHeader>
                    <CardTitle>{t("admin.calculator.title")}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-black/30 p-6 rounded-lg">
                      <AdminPriceCalculator 
                        standalone={false}
                        onSubmit={(calculatedData) => {
                          // Handle the calculation data - create a new request
                          const createRequest = async (data: any) => {
                            try {
                              const res = await apiRequest("POST", "/api/price-calculator-requests", data);
                              if (res.ok) {
                                queryClient.invalidateQueries({ queryKey: ["/api/price-calculator-requests"] });
                                toast({
                                  title: "Request Created",
                                  description: "Price calculator request has been created successfully.",
                                });
                              } else {
                                toast({
                                  title: "Error",
                                  description: "Failed to create price calculator request.",
                                  variant: "destructive",
                                });
                              }
                            } catch (error) {
                              toast({
                                title: "Error",
                                description: "Failed to create price calculator request.",
                                variant: "destructive",
                              });
                              console.error("Error creating price calculator request:", error);
                            }
                          };
                          
                          createRequest(calculatedData);
                        }}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </main>

          {/* Contact Message Detail Modal */}
          {selectedMessage && (
            <Dialog open={selectedMessage !== null} onOpenChange={() => setSelectedMessage(null)}>
              <DialogContent className="sm:max-w-2xl bg-background border border-white/10 text-white">
                <DialogHeader>
                  <DialogTitle className="text-xl font-semibold">
                    Contact Message Details
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-6 mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm text-white/60 mb-1">Name</h3>
                      <p className="font-medium">{selectedMessage.name}</p>
                    </div>
                    <div>
                      <h3 className="text-sm text-white/60 mb-1">Email</h3>
                      <p className="font-medium">{selectedMessage.email}</p>
                    </div>
                    <div>
                      <h3 className="text-sm text-white/60 mb-1">Subject</h3>
                      <p className="font-medium">{selectedMessage.subject}</p>
                    </div>
                    <div>
                      <h3 className="text-sm text-white/60 mb-1">Status</h3>
                      <p className="font-medium">{getStatusBadge(selectedMessage.status)}</p>
                    </div>
                    <div className="md:col-span-2">
                      <h3 className="text-sm text-white/60 mb-1">Date</h3>
                      <p className="font-medium">
                        {new Date(selectedMessage.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm text-white/60 mb-2">Message</h3>
                    <div className="bg-muted/30 p-4 rounded">
                      <p className="whitespace-pre-wrap">{selectedMessage.message}</p>
                    </div>
                  </div>
                  <div className="flex justify-end gap-3">
                    <Button 
                      variant="outline"
                      onClick={() => updateMessageStatusMutation.mutate({ 
                        id: selectedMessage.id, 
                        status: "completed" 
                      })}
                    >
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Mark as Completed
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setSelectedMessage(null)}
                    >
                      Close
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}
          
          {/* Project Detail Modal */}
          {selectedProject && (
            <Dialog open={selectedProject !== null} onOpenChange={() => setSelectedProject(null)}>
              <DialogContent className="sm:max-w-2xl bg-background border border-white/10 text-white">
                <DialogHeader>
                  <DialogTitle className="text-xl font-semibold">
                    Project Request Details
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-6 mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm text-white/60 mb-1">Project Name</h3>
                      <p className="font-medium">{selectedProject.projectName}</p>
                    </div>
                    <div>
                      <h3 className="text-sm text-white/60 mb-1">Project Type</h3>
                      <p className="font-medium">
                        {selectedProject.projectType === "web-app"
                          ? "Web Application"
                          : selectedProject.projectType === "mobile-app"
                          ? "Mobile App"
                          : selectedProject.projectType === "e-commerce"
                          ? "E-commerce"
                          : selectedProject.projectType}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm text-white/60 mb-1">Budget</h3>
                      <p className="font-medium">
                        {selectedProject.budget === "small"
                          ? "$1K-$5K"
                          : selectedProject.budget === "medium"
                          ? "$5K-$15K"
                          : selectedProject.budget === "large"
                          ? "$15K-$50K"
                          : "$50K+"}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm text-white/60 mb-1">Timeline</h3>
                      <p className="font-medium">
                        {selectedProject.timeline === "less-than-1-month"
                          ? "Less than 1 month"
                          : selectedProject.timeline === "1-3-months"
                          ? "1-3 months"
                          : selectedProject.timeline === "3-6-months"
                          ? "3-6 months"
                          : "6+ months"}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm text-white/60 mb-1">Client Name</h3>
                      <p className="font-medium">{selectedProject.clientName}</p>
                    </div>
                    <div>
                      <h3 className="text-sm text-white/60 mb-1">Client Email</h3>
                      <p className="font-medium">{selectedProject.clientEmail}</p>
                    </div>
                    <div>
                      <h3 className="text-sm text-white/60 mb-1">Status</h3>
                      <p className="font-medium">{getStatusBadge(selectedProject.status)}</p>
                    </div>
                    <div>
                      <h3 className="text-sm text-white/60 mb-1">Submitted On</h3>
                      <p className="font-medium">
                        {new Date(selectedProject.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm text-white/60 mb-1">Project Description</h3>
                    <p className="text-sm leading-relaxed">{selectedProject.projectDescription}</p>
                  </div>

                  <div className="flex justify-between pt-4 border-t border-white/10">
                    <div className="space-x-2">
                      <Button 
                        variant="outline" 
                        onClick={() => updateProjectStatusMutation.mutate({
                          id: selectedProject.id,
                          status: "approved"
                        })}
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Approve
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => updateProjectStatusMutation.mutate({
                          id: selectedProject.id,
                          status: "rejected"
                        })}
                      >
                        <XCircle className="h-4 w-4 mr-2" />
                        Reject
                      </Button>
                    </div>
                    <Button variant="destructive" onClick={() => setSelectedProject(null)}>
                      Close
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}

          {/* Freelancer Detail Modal */}
          {selectedFreelancer && (
            <Dialog open={selectedFreelancer !== null} onOpenChange={() => setSelectedFreelancer(null)}>
              <DialogContent className="sm:max-w-2xl bg-background border border-white/10 text-white">
                <DialogHeader>
                  <DialogTitle className="text-xl font-semibold">
                    Freelancer Application Details
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-6 mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm text-white/60 mb-1">Name</h3>
                      <p className="font-medium">{selectedFreelancer.name}</p>
                    </div>
                    <div>
                      <h3 className="text-sm text-white/60 mb-1">Specialty</h3>
                      <p className="font-medium">
                        {selectedFreelancer.specialty === "web-dev"
                          ? "Web Development"
                          : selectedFreelancer.specialty === "mobile-dev"
                          ? "Mobile Development"
                          : selectedFreelancer.specialty === "ui-ux"
                          ? "UI/UX Design"
                          : selectedFreelancer.specialty}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm text-white/60 mb-1">Experience</h3>
                      <p className="font-medium">{selectedFreelancer.experience} years</p>
                    </div>
                    <div>
                      <h3 className="text-sm text-white/60 mb-1">Email</h3>
                      <p className="font-medium">{selectedFreelancer.email}</p>
                    </div>
                    <div>
                      <h3 className="text-sm text-white/60 mb-1">Status</h3>
                      <p className="font-medium">{getStatusBadge(selectedFreelancer.status)}</p>
                    </div>
                    <div>
                      <h3 className="text-sm text-white/60 mb-1">Submitted On</h3>
                      <p className="font-medium">
                        {new Date(selectedFreelancer.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm text-white/60 mb-1">Portfolio URL</h3>
                    <p className="text-sm leading-relaxed break-all">
                      <a href={selectedFreelancer.portfolioUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                        {selectedFreelancer.portfolioUrl}
                      </a>
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm text-white/60 mb-1">Cover Letter</h3>
                    <p className="text-sm leading-relaxed">{selectedFreelancer.coverLetter}</p>
                  </div>

                  <div className="flex justify-between pt-4 border-t border-white/10">
                    <div className="space-x-2">
                      <Button 
                        variant="outline" 
                        onClick={() => updateFreelancerStatusMutation.mutate({
                          id: selectedFreelancer.id,
                          status: "approved"
                        })}
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Approve
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => updateFreelancerStatusMutation.mutate({
                          id: selectedFreelancer.id,
                          status: "rejected"
                        })}
                      >
                        <XCircle className="h-4 w-4 mr-2" />
                        Reject
                      </Button>
                    </div>
                    <Button variant="destructive" onClick={() => setSelectedFreelancer(null)}>
                      Close
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}
          
          {/* Price Calculator Request Detail Modal */}
          {selectedPriceRequest && (
            <Dialog open={selectedPriceRequest !== null} onOpenChange={() => setSelectedPriceRequest(null)}>
              <DialogContent className="sm:max-w-2xl bg-background border border-white/10 text-white">
                <DialogHeader>
                  <DialogTitle className="text-xl font-semibold">
                    <div className="flex items-center">
                      <Calculator className="h-5 w-5 mr-2" />
                      <span>Price Calculator Request Details</span>
                    </div>
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-6 mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm text-white/60 mb-1">Client Name</h3>
                      <p className="font-medium">{selectedPriceRequest.name}</p>
                    </div>
                    <div>
                      <h3 className="text-sm text-white/60 mb-1">Email</h3>
                      <p className="font-medium">{selectedPriceRequest.email}</p>
                    </div>
                    {selectedPriceRequest.phone && (
                      <div>
                        <h3 className="text-sm text-white/60 mb-1">Phone</h3>
                        <p className="font-medium">{selectedPriceRequest.phone}</p>
                      </div>
                    )}
                    {selectedPriceRequest.company && (
                      <div>
                        <h3 className="text-sm text-white/60 mb-1">Company</h3>
                        <p className="font-medium">{selectedPriceRequest.company}</p>
                      </div>
                    )}
                    <div>
                      <h3 className="text-sm text-white/60 mb-1">Service Type</h3>
                      <p className="font-medium">
                        {selectedPriceRequest.serviceType === "web-app"
                          ? "Web Application"
                          : selectedPriceRequest.serviceType === "mobile-app"
                          ? "Mobile App"
                          : selectedPriceRequest.serviceType === "e-commerce"
                          ? "E-commerce"
                          : selectedPriceRequest.serviceType === "branding"
                          ? "Branding"
                          : selectedPriceRequest.serviceType === "seo"
                          ? "SEO Optimization"
                          : selectedPriceRequest.serviceType === "marketing"
                          ? "Digital Marketing"
                          : selectedPriceRequest.serviceType === "content"
                          ? "Content Creation"
                          : selectedPriceRequest.serviceType === "ui-ux"
                          ? "UI/UX Design"
                          : selectedPriceRequest.serviceType}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm text-white/60 mb-1">Complexity</h3>
                      <p className="font-medium">
                        {selectedPriceRequest.complexity === "basic"
                          ? "Basic"
                          : selectedPriceRequest.complexity === "standard"
                          ? "Standard"
                          : selectedPriceRequest.complexity === "advanced"
                          ? "Advanced"
                          : selectedPriceRequest.complexity === "complex"
                          ? "Complex"
                          : selectedPriceRequest.complexity}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm text-white/60 mb-1">Timeline</h3>
                      <p className="font-medium">
                        {selectedPriceRequest.timeline === "standard"
                          ? "Standard (2-3 months)"
                          : selectedPriceRequest.timeline === "accelerated"
                          ? "Accelerated (1-2 months)"
                          : selectedPriceRequest.timeline === "rush"
                          ? "Rush (2-4 weeks)"
                          : selectedPriceRequest.timeline}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm text-white/60 mb-1">Status</h3>
                      <p className="font-medium">{getStatusBadge(selectedPriceRequest.status)}</p>
                    </div>
                    <div>
                      <h3 className="text-sm text-white/60 mb-1">Estimated Price</h3>
                      <p className="font-medium text-green-400">
                        ${selectedPriceRequest.estimatedPrice.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm text-white/60 mb-1">Date</h3>
                      <p className="font-medium">
                        {new Date(selectedPriceRequest.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  
                  {(() => {
                    // Type-safe wrapper for features rendering
                    if (selectedPriceRequest.features && 
                        typeof selectedPriceRequest.features === 'object' && 
                        Object.keys(selectedPriceRequest.features).length > 0) {
                      
                      const featuresList = Object.entries(selectedPriceRequest.features)
                        .filter(([_, isSelected]) => isSelected === true)
                        .map(([feature, _]) => (
                          <li key={feature} className="flex items-center">
                            <CheckCircle className="h-4 w-4 mr-2 text-green-400" />
                            <span>
                              {String(feature).split('_').map(word => 
                                word.charAt(0).toUpperCase() + word.slice(1)
                              ).join(' ')}
                            </span>
                          </li>
                        ));
                      
                      if (featuresList.length > 0) {
                        return (
                          <div>
                            <h3 className="text-sm text-white/60 mb-2">Selected Features</h3>
                            <div className="bg-muted/30 p-4 rounded">
                              <ul className="space-y-2">
                                {featuresList}
                              </ul>
                            </div>
                          </div>
                        );
                      }
                    }
                    return null;
                  })()}
                  
                  {selectedPriceRequest.notes && selectedPriceRequest.notes.trim() !== '' && (
                    <div>
                      <h3 className="text-sm text-white/60 mb-2">Additional Notes</h3>
                      <div className="bg-muted/30 p-4 rounded">
                        <p className="whitespace-pre-wrap">{selectedPriceRequest.notes}</p>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex justify-end gap-3">
                    <Button 
                      variant="outline"
                      onClick={() => updatePriceRequestStatusMutation.mutate({ 
                        id: selectedPriceRequest.id, 
                        status: "contacted" 
                      })}
                    >
                      <Mail className="mr-2 h-4 w-4" />
                      Mark as Contacted
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => updatePriceRequestStatusMutation.mutate({ 
                        id: selectedPriceRequest.id, 
                        status: "converted" 
                      })}
                    >
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Mark as Converted
                    </Button>
                    <Button variant="destructive" onClick={() => setSelectedPriceRequest(null)}>
                      Close
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </motion.div>
      </div>
    </div>
  );
}
