import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { FileText, Download, Filter, Calendar, TrendingUp, TrendingDown } from "lucide-react";
import { API_ENDPOINTS } from "../../config/api";

interface Report {
  timestamp: string;
  score: number;
  category: string;
  breakdown: any;
}

interface ReportsPageProps {
  userId: string;
}

export function ReportsPage({ userId }: ReportsPageProps) {
  const [reports, setReports] = useState<Report[]>([]);
  const [filteredReports, setFilteredReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"date" | "score">("date");

  useEffect(() => {
    fetchReports();
  }, [userId]);

  useEffect(() => {
    applyFilters();
  }, [reports, filterCategory, sortBy]);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_ENDPOINTS.history(userId));

      if (response.ok) {
        const data = await response.json();
        // Map backend response to frontend format
        const mappedReports = (data.history || []).map((item: any) => ({
          timestamp: item.created_at || item.timestamp,
          score: item.productivity_score || item.score,
          category: item.category_rule_based || item.category,
          breakdown: item.breakdown || {
            productive: item.task_hours || 0,
            idle: item.idle_hours || 0,
            social: item.social_media_usage || 0,
            breaks: item.break_frequency || 0,
          },
        }));
        setReports(mappedReports);
      }
    } catch (error) {
      console.error("Error fetching reports:", error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...reports];

    // Apply category filter
    if (filterCategory !== "all") {
      filtered = filtered.filter((r) => r.category === filterCategory);
    }

    // Apply sorting
    if (sortBy === "date") {
      filtered.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    } else {
      filtered.sort((a, b) => b.score - a.score);
    }

    setFilteredReports(filtered);
  };

  const exportAllReports = () => {
    if (filteredReports.length === 0) return;

    const csvContent = [
      ["Date", "Time", "Score", "Category", "Productive Hours", "Idle Hours", "Social Media Hours", "Break Hours"],
      ...filteredReports.map((r) => [
        new Date(r.timestamp).toLocaleDateString(),
        new Date(r.timestamp).toLocaleTimeString(),
        r.score.toFixed(2),
        r.category,
        r.breakdown?.productive || 0,
        r.breakdown?.idle || 0,
        r.breakdown?.social || 0,
        r.breakdown?.breaks || 0,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `productivity-reports-${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const calculateStats = () => {
    if (filteredReports.length === 0) return { avg: 0, highest: 0, lowest: 0, trend: 0 };

    const scores = filteredReports.map((r) => r.score);
    const avg = scores.reduce((sum, s) => sum + s, 0) / scores.length;
    const highest = Math.max(...scores);
    const lowest = Math.min(...scores);

    // Calculate trend (comparing first half vs second half)
    const midPoint = Math.floor(filteredReports.length / 2);
    const firstHalf = filteredReports.slice(0, midPoint);
    const secondHalf = filteredReports.slice(midPoint);

    const firstAvg = firstHalf.reduce((sum, r) => sum + r.score, 0) / (firstHalf.length || 1);
    const secondAvg = secondHalf.reduce((sum, r) => sum + r.score, 0) / (secondHalf.length || 1);
    const trend = secondAvg - firstAvg;

    return { avg, highest, lowest, trend };
  };

  const stats = calculateStats();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading reports...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="backdrop-blur-lg bg-white/70 border border-white/50 rounded-2xl shadow-xl p-6"
      >
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl mb-1">Reports</h1>
            <p className="text-gray-600 text-sm">View and export your productivity reports</p>
          </div>
          <button
            onClick={exportAllReports}
            disabled={filteredReports.length === 0}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl transition-all duration-300 shadow-md disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            <span>Export All</span>
          </button>
        </div>
      </motion.div>

      {/* Statistics Cards */}
      {filteredReports.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="backdrop-blur-lg bg-gradient-to-br from-blue-50 to-blue-100 border border-white/50 rounded-xl shadow-lg p-4"
          >
            <div className="text-sm text-gray-600 mb-1">Average Score</div>
            <div className="text-2xl">{stats.avg.toFixed(1)}</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="backdrop-blur-lg bg-gradient-to-br from-green-50 to-green-100 border border-white/50 rounded-xl shadow-lg p-4"
          >
            <div className="text-sm text-gray-600 mb-1">Highest Score</div>
            <div className="text-2xl">{stats.highest.toFixed(1)}</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="backdrop-blur-lg bg-gradient-to-br from-red-50 to-red-100 border border-white/50 rounded-xl shadow-lg p-4"
          >
            <div className="text-sm text-gray-600 mb-1">Lowest Score</div>
            <div className="text-2xl">{stats.lowest.toFixed(1)}</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="backdrop-blur-lg bg-gradient-to-br from-purple-50 to-purple-100 border border-white/50 rounded-xl shadow-lg p-4"
          >
            <div className="text-sm text-gray-600 mb-1 flex items-center gap-1">
              Trend
              {stats.trend > 0 ? (
                <TrendingUp className="w-4 h-4 text-green-600" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-600" />
              )}
            </div>
            <div className={`text-2xl ${stats.trend > 0 ? "text-green-600" : "text-red-600"}`}>
              {stats.trend > 0 ? "+" : ""}
              {stats.trend.toFixed(1)}
            </div>
          </motion.div>
        </div>
      )}

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="backdrop-blur-lg bg-white/70 border border-white/50 rounded-2xl shadow-xl p-6"
      >
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-600" />
            <span className="text-sm font-semibold">Filters:</span>
          </div>

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 bg-white/80 border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:outline-none transition-all"
          >
            <option value="all">All Categories</option>
            <option value="Highly Productive">Highly Productive</option>
            <option value="Moderately Productive">Moderately Productive</option>
            <option value="Fake Productivity">Fake Productivity</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "date" | "score")}
            className="px-4 py-2 bg-white/80 border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:outline-none transition-all"
          >
            <option value="date">Sort by Date</option>
            <option value="score">Sort by Score</option>
          </select>

          <div className="ml-auto text-sm text-gray-600">
            Showing {filteredReports.length} of {reports.length} reports
          </div>
        </div>
      </motion.div>

      {/* Reports Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="backdrop-blur-lg bg-white/70 border border-white/50 rounded-2xl shadow-xl p-6"
      >
        <h3 className="text-xl mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5 text-purple-600" />
          All Reports
        </h3>

        {filteredReports.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No reports found</p>
            <p className="text-sm mt-2">Analyze some data to generate reports</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="px-4 py-3 text-left font-semibold">Date & Time</th>
                  <th className="px-4 py-3 text-center font-semibold">Score</th>
                  <th className="px-4 py-3 text-center font-semibold">Category</th>
                  <th className="px-4 py-3 text-center font-semibold">Productive</th>
                  <th className="px-4 py-3 text-center font-semibold">Idle</th>
                  <th className="px-4 py-3 text-center font-semibold">Social</th>
                </tr>
              </thead>
              <tbody>
                {filteredReports.map((report, idx) => (
                  <motion.tr
                    key={report.timestamp}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.02 }}
                    className="border-b border-gray-100 hover:bg-white/50"
                  >
                    <td className="px-4 py-3">
                      {new Date(report.timestamp).toLocaleString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="px-4 py-3 text-center font-semibold">
                      {Math.round(report.score)}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span
                        className={`px-3 py-1 rounded-lg text-xs ${
                          report.category === "Highly Productive"
                            ? "bg-green-100 text-green-700"
                            : report.category === "Moderately Productive"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {report.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">{report.breakdown?.productive || 0}h</td>
                    <td className="px-4 py-3 text-center">{report.breakdown?.idle || 0}h</td>
                    <td className="px-4 py-3 text-center">{report.breakdown?.social || 0}h</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </div>
  );
}
