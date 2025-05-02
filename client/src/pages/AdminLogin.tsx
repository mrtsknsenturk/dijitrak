import React, { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { apiRequest } from "@/lib/queryClient";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await apiRequest("POST", "/api/auth/login", { username, password });
      toast({
        title: "Login Successful",
        description: "Welcome to the admin dashboard.",
      });
      setLocation("/admin/dashboard");
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Invalid username or password. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-full h-full">
          <motion.div
            className="absolute w-64 h-64 rounded-full bg-secondary/10 blur-3xl"
            style={{ top: '25%', left: '25%' }}
            animate={{ 
              opacity: [0.5, 0.8, 0.5],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 5, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute w-96 h-96 rounded-full bg-primary/10 blur-3xl"
            style={{ bottom: '25%', right: '25%' }}
            animate={{ 
              opacity: [0.5, 0.8, 0.5],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 7, 
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <Card className="glassmorphism border border-white/10">
          <CardHeader className="space-y-1">
            <div className="text-center mb-4">
              <div className="text-2xl font-bold">
                <span className="gradient-text">Quantum</span>
                <span className="text-white">Edge</span>
              </div>
            </div>
            <CardTitle className="text-2xl text-center font-bold">Admin Login</CardTitle>
            <CardDescription className="text-center text-white/70">
              Enter your credentials to access the dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleLogin}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-white/70">Username</Label>
                  <Input
                    id="username"
                    placeholder="Username"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="bg-muted border border-white/10 text-white focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white/70">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-muted border border-white/10 text-white focus:border-primary"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full btn-primary bg-gradient-to-r from-primary to-secondary"
                  disabled={isLoading}
                >
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <p className="text-center text-white/50 text-sm w-full">
              Restricted area. Unauthorized access prohibited.
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
