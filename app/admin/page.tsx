"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { 
  BarChart3, 
  Users, 
  Settings, 
  MapPin, 
  Loader2, 
  Package,
  RefreshCw,
  AlertCircle,
  TrendingUp,
  CheckCircle,
  Clock,
  Star,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  Activity,
  Car,
  Image
} from "lucide-react"

interface DashboardMetrics {
  totalLeads: number;
  thisMonthLeads: number;
  thisWeekLeads: number;
  leadsGrowth: number;
  completedLeads: number;
  pendingLeads: number;
  completionRate: number;
  totalTestimonials: number;
  publishedTestimonials: number;
  totalPackages: number;
  activePackages: number;
  totalTariffs: number;
  activeTariffs: number;
  totalLocations: number;
  popularRoutes: number;
}

interface RecentLead {
  _id: string;
  fullName: string;
  email: string;
  service: string;
  status: string;
  priority: string;
  submittedAt: string;
}

interface DashboardData {
  metrics: DashboardMetrics;
  recentLeads: RecentLead[];
  analytics: {
    leadsByStatus: { status: string; count: number }[];
    leadsByService: { service: string; count: number }[];
  };
}

export default function AdminDashboard() {
  const { toast } = useToast();
  const [loadingAction, setLoadingAction] = useState<string | null>(null);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Fetch dashboard data
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async (showRefreshToast = false) => {
    try {
      if (showRefreshToast) setRefreshing(true);
      else setLoading(true);
      
      const response = await fetch('/api/admin/dashboard');
      const result = await response.json();
      
      if (result.success) {
        setDashboardData(result.data);
        if (showRefreshToast) {
          toast({
            title: "Dashboard Updated",
            description: "Latest data has been loaded successfully.",
          });
        }
      } else {
        throw new Error(result.message || 'Failed to fetch dashboard data');
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast({
        title: "Error",
        description: "Failed to load dashboard data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    fetchDashboardData(true);
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-gray-400" />
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <AlertCircle className="h-8 w-8 mx-auto mb-4 text-red-400" />
          <p className="text-gray-600 mb-4">Failed to load dashboard data</p>
          <Button onClick={() => fetchDashboardData()} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  const { metrics, recentLeads } = dashboardData;

  const stats = [
    {
      title: "Total Leads",
      value: metrics.totalLeads.toString(),
      change: `${metrics.leadsGrowth >= 0 ? '+' : ''}${metrics.leadsGrowth}%`,
      trend: metrics.leadsGrowth >= 0 ? "up" : "down",
      icon: <Users className="h-5 w-5" />,
      color: "text-admin-primary",
      bgColor: "bg-blue-50"
    },
    {
      title: "This Month",
      value: metrics.thisMonthLeads.toString(),
      change: "vs last month",
      trend: "up",
      icon: <TrendingUp className="h-5 w-5" />,
      color: "text-admin-primary",
      bgColor: "bg-blue-50"
    },
    {
      title: "Completed",
      value: metrics.completedLeads.toString(),
      change: `${metrics.completionRate}% rate`,
      trend: "up",
      icon: <CheckCircle className="h-5 w-5" />,
      color: "text-admin-primary",
      bgColor: "bg-blue-50"
    },
    {
      title: "Pending",
      value: metrics.pendingLeads.toString(),
      change: "awaiting action",
      trend: "neutral",
      icon: <Clock className="h-5 w-5" />,
      color: "text-admin-primary",
      bgColor: "bg-blue-50"
    },
    {
      title: "Testimonials",
      value: metrics.totalTestimonials.toString(),
      change: `${metrics.publishedTestimonials} published`,
      trend: "up",
      icon: <Star className="h-5 w-5" />,
      color: "text-admin-primary",
      bgColor: "bg-blue-50"
    },
    {
      title: "Active Packages",
      value: metrics.activePackages.toString(),
      change: `of ${metrics.totalPackages} total`,
      trend: "up",
      icon: <Package className="h-5 w-5" />,
      color: "text-admin-primary",
      bgColor: "bg-blue-50"
    },
    {
      title: "Active Tariffs",
      value: metrics.activeTariffs.toString(),
      change: `of ${metrics.totalTariffs} total`,
      trend: "up",
      icon: <Car className="h-5 w-5" />,
      color: "text-admin-primary",
      bgColor: "bg-blue-50"
    },
    {
      title: "Locations",
      value: metrics.totalLocations.toString(),
      change: `${metrics.popularRoutes} popular`,
      trend: "up",
      icon: <MapPin className="h-5 w-5" />,
      color: "text-admin-primary",
      bgColor: "bg-blue-50"
    },
  ];

  // Format date helper function
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Helper function to calculate time ago
  const getTimeAgo = (date: string): string => {
    const now = new Date();
    const past = new Date(date);
    const diffInMs = now.getTime() - past.getTime();
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return formatDate(date);
  };
    

  const quickActions = [
    {
      title: "Packages",
      href: "/admin/packages",
      icon: <Package className="h-5 w-5" />,
      color: "text-admin-primary",
      bgColor: "bg-blue-50"
    },
    {
      title: "Tariffs",
      href: "/admin/tariff",
      icon: <DollarSign className="h-5 w-5" />,
      color: "text-admin-primary",
      bgColor: "bg-blue-50"
    },
    {
      title: "Leads",
      href: "/admin/leads",
      icon: <Users className="h-5 w-5" />,
      color: "text-admin-primary",
      bgColor: "bg-blue-50"
    },
    {
      title: "Banners",
      href: "/admin/banners",
      icon: <Image className="h-5 w-5" />,
      color: "text-admin-primary",
      bgColor: "bg-blue-50"
    },
    {
      title: "Locations",
      href: "/admin/locations",
      icon: <MapPin className="h-5 w-5" />,
      color: "text-admin-primary",
      bgColor: "bg-blue-50"
    },
    {
      title: "Settings",
      href: "/admin/profile",
      icon: <Settings className="h-5 w-5" />,
      color: "text-admin-primary",
      bgColor: "bg-blue-50"
    },
  ]

  const handleActionClick = (title: string) => {
    setLoadingAction(title)
    // Simulate loading time
    setTimeout(() => {
      setLoadingAction(null)
    }, 800)
  }

  return (
    <div className="-m-6 min-h-[calc(100vh-4rem)] bg-gray-50/50">
      <div className="max-w-7xl mx-auto p-8 space-y-8">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-admin-gradient bg-clip-text text-transparent">Dashboard</h1>
            <p className="text-gray-600 mt-2">Welcome back! Here's what's happening today.</p>
          </div>
          <Button 
            onClick={handleRefresh}
            disabled={refreshing}
            className="bg-admin-gradient text-white border-0"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="border border-gray-100 shadow-sm hover:shadow-md transition-all bg-white group">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-3 flex-1">
                    <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                    <p className="text-3xl font-semibold text-gray-900">{stat.value}</p>
                    <div className="flex items-center gap-1 text-sm">
                      {stat.trend === "up" ? (
                        <ArrowUpRight className="h-4 w-4 text-green-600" />
                      ) : stat.trend === "down" ? (
                        <ArrowDownRight className="h-4 w-4 text-red-600" />
                      ) : null}
                      <span className={`${
                        stat.trend === "up" ? "text-green-600" : 
                        stat.trend === "down" ? "text-red-600" : 
                        "text-green-600"
                      }`}>
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  <div className={`${stat.bgColor} ${stat.color} p-3 rounded-lg group-hover:scale-110 transition-transform`}>
                    {stat.icon}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Leads - Table Style */}
        <Card className="border border-gray-100 shadow-sm bg-white overflow-hidden">
          <CardHeader className="bg-admin-gradient pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-white">Recent Leads</CardTitle>
              <Link href="/admin/leads">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20 border-white/30"
                  onClick={() => handleActionClick("View All Leads")}
                  disabled={loadingAction === "View All Leads"}
                >
                  {loadingAction === "View All Leads" ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                  View All
                  <ArrowUpRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {recentLeads.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-y border-gray-100">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {recentLeads.slice(0, 5).map((lead) => (
                      <tr key={lead._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-admin-gradient rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-white font-medium text-xs">
                                {lead.fullName
                                  .split(" ")
                                  .slice(0, 2)
                                  .map((n: string) => n[0])
                                  .join("")
                                  .toUpperCase()}
                              </span>
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">{lead.fullName}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <p className="text-sm text-gray-600 truncate max-w-[200px]">{lead.service}</p>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge
                            variant="secondary"
                            className={
                              lead.status === "new" 
                                ? "bg-blue-50 text-admin-primary border-0" 
                                : lead.status === "completed"
                                ? "bg-green-50 text-green-700 border-0"
                                : "bg-gray-50 text-gray-700 border-0"
                            }
                          >
                            {lead.status}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {getTimeAgo(lead.submittedAt)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-400">
                <Users className="h-10 w-10 mx-auto mb-3 opacity-30" />
                <p className="text-sm">No recent leads found</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="border border-gray-100 shadow-sm bg-white overflow-hidden">
          <CardHeader className="bg-admin-gradient pb-4">
            <CardTitle className="text-lg font-semibold text-white">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {quickActions.map((action, index) => (
                <Link key={index} href={action.href}>
                  <button
                    className="w-full p-4 flex flex-col items-center gap-3 rounded-lg border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all text-center group"
                    onClick={() => handleActionClick(action.title)}
                  >
                    <div className={`${action.bgColor} ${action.color} p-3 rounded-lg group-hover:scale-110 transition-transform`}>
                      {action.icon}
                    </div>
                    <span className="text-xs font-medium text-gray-700 group-hover:text-gray-900">
                      {action.title}
                    </span>
                  </button>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
