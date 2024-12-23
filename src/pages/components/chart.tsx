
"use client"

import { useState } from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

  import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
  } from "@/components/ui/chart"

  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"


  
      interface chartData { 
      admins: number;
      members: number;
      users: number;
      date: string;
  }
  
  // const chartData = [
  //   { date: "2024-04-01", desktop: 222, mobile: 150, laptop: 100 },
  //   { date: "2024-04-02", desktop: 97, mobile: 180, laptop: 120 },
  //   { date: "2024-04-03", desktop: 167, mobile: 120, laptop: 140 },
  //   { date: "2024-04-04", desktop: 242, mobile: 260, laptop: 200 },
  //   { date: "2024-04-05", desktop: 373, mobile: 290, laptop: 230 },
  //   { date: "2024-04-06", desktop: 301, mobile: 340, laptop: 250 },
  //   { date: "2024-04-07", desktop: 245, mobile: 180, laptop: 190 },
  //   { date: "2024-04-08", desktop: 409, mobile: 320, laptop: 310 },
  //   { date: "2024-04-09", desktop: 59, mobile: 110, laptop: 90 },
  //   { date: "2024-04-10", desktop: 261, mobile: 190, laptop: 170 },
  //   { date: "2024-04-11", desktop: 327, mobile: 350, laptop: 300 },
  //   { date: "2024-04-12", desktop: 292, mobile: 210, laptop: 200 },
  //   { date: "2024-04-13", desktop: 342, mobile: 380, laptop: 330 },
  //   { date: "2024-04-14", desktop: 137, mobile: 220, laptop: 180 },
  //   { date: "2024-04-15", desktop: 120, mobile: 170, laptop: 150 },
  //   { date: "2024-04-16", desktop: 138, mobile: 190, laptop: 160 },
  //   { date: "2024-04-17", desktop: 446, mobile: 360, laptop: 340 },
  //   { date: "2024-04-18", desktop: 364, mobile: 410, laptop: 370 },
  //   { date: "2024-04-19", desktop: 243, mobile: 180, laptop: 160 },
  //   { date: "2024-04-20", desktop: 89, mobile: 150, laptop: 130 },
  //   { date: "2024-04-21", desktop: 137, mobile: 200, laptop: 170 },
  //   { date: "2024-04-22", desktop: 224, mobile: 170, laptop: 190 },
  //   { date: "2024-04-23", desktop: 138, mobile: 230, laptop: 200 },
  //   { date: "2024-04-24", desktop: 387, mobile: 290, laptop: 280 },
  //   { date: "2024-04-25", desktop: 215, mobile: 250, laptop: 220 },
  //   { date: "2024-04-26", desktop: 75, mobile: 130, laptop: 100 },
  //   { date: "2024-04-27", desktop: 383, mobile: 420, laptop: 350 },
  //   { date: "2024-04-28", desktop: 122, mobile: 180, laptop: 150 },
  //   { date: "2024-04-29", desktop: 315, mobile: 240, laptop: 230 },
  //   { date: "2024-04-30", desktop: 454, mobile: 380, laptop: 400 },
  //   { date: "2024-05-01", desktop: 165, mobile: 220, laptop: 190 },
  //   { date: "2024-05-02", desktop: 293, mobile: 310, laptop: 290 },
  //   { date: "2024-05-03", desktop: 247, mobile: 190, laptop: 180 },
  //   { date: "2024-05-04", desktop: 385, mobile: 420, laptop: 390 },
  //   { date: "2024-05-05", desktop: 481, mobile: 390, laptop: 410 },
  //   { date: "2024-05-06", desktop: 498, mobile: 520, laptop: 450 },
  //   { date: "2024-05-07", desktop: 388, mobile: 300, laptop: 340 },
  //   { date: "2024-05-08", desktop: 149, mobile: 210, laptop: 180 },
  //   { date: "2024-05-09", desktop: 227, mobile: 180, laptop: 170 },
  //   { date: "2024-05-10", desktop: 293, mobile: 330, laptop: 320 },
  //   { date: "2024-05-11", desktop: 335, mobile: 270, laptop: 260 },
  //   { date: "2024-05-12", desktop: 197, mobile: 240, laptop: 200 },
  //   { date: "2024-05-13", desktop: 197, mobile: 160, laptop: 150 },
  //   { date: "2024-05-14", desktop: 448, mobile: 490, laptop: 420 },
  //   { date: "2024-05-15", desktop: 473, mobile: 380, laptop: 350 },
  //   { date: "2024-05-16", desktop: 338, mobile: 400, laptop: 370 },
  //   { date: "2024-05-17", desktop: 499, mobile: 420, laptop: 400 },
  //   { date: "2024-05-18", desktop: 315, mobile: 350, laptop: 320 },
  //   { date: "2024-05-19", desktop: 235, mobile: 180, laptop: 170 },
  //   { date: "2024-05-20", desktop: 177, mobile: 230, laptop: 190 },
  // ];

  const chartConfig = {
    visitors: {
      label: "Visitors",
    },
    admins: {
      label: "Admins",
      color: "hsl(var(--chart-1))",
    },
    members: {
      label: "Members",
      color: "hsl(var(--chart-2))",
    },
    users: {
      label: " Total Users",
      color: "hsl(var(--chart-3))",
    },
  } satisfies ChartConfig

  const  MembershipChart = ({chartData}: { chartData: chartData[] })  =>{
    const [timeRange, setTimeRange] = useState("90d")
    const filteredData = chartData.filter((item) => {
        const date = new Date(item.date)
        const referenceDate = new Date("2024-12-16")
        let daysToSubtract = 90
        if (timeRange === "30d") {
          daysToSubtract = 30
        } else if (timeRange === "7d") {
          daysToSubtract = 7
        }
        const startDate = new Date(referenceDate)
        startDate.setDate(startDate.getDate() - daysToSubtract)
        return date >= startDate
      })

      return (
        <Card>
          <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
            <div className="grid flex-1 gap-1 text-center sm:text-left">
              <CardTitle>Area Chart</CardTitle>
              <CardDescription>
                Showing member count, activity logs and role distribution for the last 3 months
              </CardDescription>
            </div>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger
                className="w-[160px] rounded-lg sm:ml-auto"
                aria-label="Select a value"
              >
                <SelectValue placeholder="Last 3 months" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="90d" className="rounded-lg">
                  Last 3 months
                </SelectItem>
                <SelectItem value="30d" className="rounded-lg">
                  Last 30 days
                </SelectItem>
                <SelectItem value="7d" className="rounded-lg">
                  Last 7 days
                </SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
            <ChartContainer
              config={chartConfig}
              className="aspect-auto h-[250px] w-full"
            >
              <AreaChart data={filteredData}>
                <defs>
                  <linearGradient id="fillAdmins" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="var(--color-admins)"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--color-admins)"
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                  <linearGradient id="fillMembers" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="var(--color-members)"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--color-members)"
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                  <linearGradient id="fillUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="var(--color-users)"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--color-users)"
                      stopOpacity={0.1}
                    />
                    </linearGradient>
                </defs>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  minTickGap={32}
                  tickFormatter={(value) => {
                    const date = new Date(value)
                    return date.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                />
                <ChartTooltip
                  cursor={false}
                  content={
                    <ChartTooltipContent
                      labelFormatter={(value) => {
                        return new Date(value).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })
                      }}
                      indicator="dot"
                    />
                  }
                />
                <Area
                  dataKey="members"
                  type="natural"
                  fill="url(#fillMembers)"
                  stroke="var(--color-members)"
                  stackId="a"
                />
                <Area
                  dataKey="admins"
                  type="natural"
                  fill="var(--color-admins)"
                  stroke="var(--color-admins)"
                  stackId="a"
                />
                <Area
                  dataKey="users"
                  type="natural"
                  fill="var(--color-users)"
                  stroke="var(--color-users)"
                  stackId="a"
                  />
                <ChartLegend content={<ChartLegendContent />} />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
      )
  }

  export default MembershipChart
  