"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { LineChart } from "../components/LineChart";
import { BarChart } from "../components/BarChart";
import { PieChart } from "../components/PieChart";
import { DataTable } from "../components/DataTable";
import { co2Data, populationData, energyData } from "../data/mockData";
import {
  ArrowUpDown,
  BarChartIcon,
  PieChartIcon,
  LineChartIcon,
} from "lucide-react";

type ChartData = {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
  }[];
};

type ChartType = "line" | "bar" | "pie";
type TabType = "co2" | "population" | "energy";
type TimeRange = "all" | "30" | "20" | "10";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<TabType>("co2");
  const [timeRange, setTimeRange] = useState<TimeRange>("all");
  const [chartType, setChartType] = useState<ChartType>("line");
  const [isAscending, setIsAscending] = useState(true);

  const filterData = (data: ChartData, range: TimeRange): ChartData => {
    if (range === "all") return data;
    const currentYear = new Date().getFullYear();
    const startYear = currentYear - parseInt(range);
    return {
      ...data,
      labels: data.labels.filter((year) => parseInt(year) >= startYear),
      datasets: data.datasets.map((dataset) => ({
        ...dataset,
        data: dataset.data.slice(-parseInt(range)),
      })),
    };
  };

  const sortData = (data: ChartData): ChartData => {
    const sortedData = { ...data };
    sortedData.labels = [...data.labels].sort((a, b) =>
      isAscending ? a.localeCompare(b) : b.localeCompare(a)
    );
    sortedData.datasets = data.datasets.map((dataset) => ({
      ...dataset,
      data: [...dataset.data].sort((a, b) => (isAscending ? a - b : b - a)),
    }));
    return sortedData;
  };

  const [currentData, setCurrentData] = useState<ChartData>(
    filterData(co2Data, timeRange)
  );

  useEffect(() => {
    let data: ChartData;
    switch (activeTab) {
      case "co2":
        data = filterData(co2Data, timeRange);
        break;
      case "population":
        data = populationData;
        break;
      case "energy":
        data = energyData;
        break;
    }
    setCurrentData(sortData(data));
  }, [activeTab, timeRange, isAscending]);

  const renderChart = () => {
    switch (chartType) {
      case "line":
        return <LineChart data={currentData} />;
      case "bar":
        return <BarChart data={currentData} />;
      case "pie":
        return <PieChart data={currentData} />;
      default:
        return <LineChart data={currentData} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl sm:text-5xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-400">
          Global Data Visualization Dashboard
        </h1>

        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as TabType)}
          className="space-y-8"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <TabsList className="bg-gray-700 mb-4 sm:mb-0">
              <TabsTrigger
                value="co2"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                CO2 Emissions
              </TabsTrigger>
              <TabsTrigger
                value="population"
                className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
              >
                Population Growth
              </TabsTrigger>
              <TabsTrigger
                value="energy"
                className="data-[state=active]:bg-yellow-600 data-[state=active]:text-white"
              >
                Energy Consumption
              </TabsTrigger>
            </TabsList>

            <div className="flex flex-wrap gap-2">
              <Select
                value={timeRange}
                onValueChange={(value: TimeRange) => setTimeRange(value)}
              >
                <SelectTrigger className="w-[180px] bg-gray-700 text-gray-100 border-gray-600">
                  <SelectValue placeholder="Select time range" />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 text-gray-100 border-gray-600">
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="30">Last 30 Years</SelectItem>
                  <SelectItem value="20">Last 20 Years</SelectItem>
                  <SelectItem value="10">Last 10 Years</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                onClick={() => setIsAscending(!isAscending)}
                className="bg-gray-700 text-gray-100 border-gray-600 hover:bg-gray-600 hover:text-white"
              >
                Sort {isAscending ? "Desc" : "Asc"}
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="bg-gray-800 border-gray-700 shadow-xl">
                <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <CardTitle className="text-xl sm:text-2xl text-gray-100">
                    {activeTab === "co2" && "Global CO2 Emissions Over Time"}
                    {activeTab === "population" &&
                      "Population Growth by Region"}
                    {activeTab === "energy" &&
                      "Global Energy Consumption by Source"}
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setChartType("line")}
                      className="text-gray-100 hover:text-white"
                    >
                      <LineChartIcon />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setChartType("bar")}
                      className="text-gray-100 hover:text-white"
                    >
                      <BarChartIcon />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setChartType("pie")}
                      className="text-gray-100 hover:text-white"
                    >
                      <PieChartIcon />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>{renderChart()}</CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>

          <Card className="bg-gray-800 border-gray-700 shadow-xl mt-8">
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl text-gray-100">
                Data Table
              </CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable data={currentData} />
            </CardContent>
          </Card>
        </Tabs>
      </div>
    </div>
  );
}
