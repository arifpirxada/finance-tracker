"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import type { Transaction } from "@/types"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    type ChartConfig,
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
import { useQuery } from "@tanstack/react-query"
import { getTransactions } from "@/features/transactions/transactionApi"

// const chartData = [
//     { date: "2024-04-01", income: 222, expense: 150, transfer: 384 },
//     { date: "2024-04-02", income: 97, expense: 180, transfer: 384 },
//     { date: "2024-04-03", income: 167, expense: 120, transfer: 384 },
//     { date: "2024-04-04", income: 242, expense: 260, transfer: 384 },
//     { date: "2024-04-05", income: 373, expense: 290, transfer: 384 },
//     { date: "2024-04-06", income: 301, expense: 340, transfer: 384 },
//     { date: "2024-04-07", income: 245, expense: 180, transfer: 384 },
//     { date: "2024-04-08", income: 409, expense: 320, transfer: 384 },
//     { date: "2024-04-09", income: 59, expense: 110, transfer: 384 },
//     { date: "2024-04-10", income: 261, expense: 190, transfer: 384 },
//     { date: "2024-04-11", income: 327, expense: 350, transfer: 384 },
//     { date: "2024-04-12", income: 292, expense: 210, transfer: 384 },
//     { date: "2024-04-13", income: 342, expense: 380, transfer: 384 },
//     { date: "2024-04-14", income: 137, expense: 220, transfer: 384 },
//     { date: "2024-04-15", income: 120, expense: 170, transfer: 384 },
//     { date: "2024-04-16", income: 138, expense: 190, transfer: 384 },
//     { date: "2024-04-17", income: 446, expense: 360, transfer: 384 },
//     { date: "2024-04-18", income: 364, expense: 410, transfer: 384 },
//     { date: "2024-04-19", income: 243, expense: 180, transfer: 384 },
//     { date: "2024-04-20", income: 89, expense: 150, transfer: 384 },
//     { date: "2024-04-21", income: 137, expense: 200, transfer: 384 },
//     { date: "2024-04-22", income: 224, expense: 170, transfer: 384 },
//     { date: "2024-04-23", income: 138, expense: 230, transfer: 384 },
//     { date: "2024-04-24", income: 387, expense: 290, transfer: 384 },
//     { date: "2024-04-25", income: 215, expense: 250, transfer: 384 },
//     { date: "2024-04-26", income: 75, expense: 130, transfer: 384 },
//     { date: "2024-04-27", income: 383, expense: 420, transfer: 384 },
//     { date: "2024-04-28", income: 122, expense: 180, transfer: 384 },
//     { date: "2024-04-29", income: 315, expense: 240, transfer: 384 },
//     { date: "2024-04-30", income: 454, expense: 380, transfer: 384 },
//     { date: "2024-05-01", income: 165, expense: 220, transfer: 384 },
//     { date: "2024-05-02", income: 293, expense: 310, transfer: 384 },
//     { date: "2024-05-03", income: 247, expense: 190, transfer: 384 },
//     { date: "2024-05-04", income: 385, expense: 420, transfer: 384 },
//     { date: "2024-05-05", income: 481, expense: 390, transfer: 384 },
//     { date: "2024-05-06", income: 498, expense: 520, transfer: 384 },
//     { date: "2024-05-07", income: 388, expense: 300, transfer: 384 },
//     { date: "2024-05-08", income: 149, expense: 210, transfer: 384 },
//     { date: "2024-05-09", income: 227, expense: 180, transfer: 384 },
//     { date: "2024-05-10", income: 293, expense: 330, transfer: 384 },
//     { date: "2024-05-11", income: 335, expense: 270, transfer: 384 },
//     { date: "2024-05-12", income: 197, expense: 240, transfer: 384 },
//     { date: "2024-05-13", income: 197, expense: 160, transfer: 384 },
//     { date: "2024-05-14", income: 448, expense: 490, transfer: 384 },
//     { date: "2024-05-15", income: 473, expense: 380, transfer: 384 },
//     { date: "2024-05-16", income: 338, expense: 400, transfer: 384 },
//     { date: "2024-05-17", income: 499, expense: 420, transfer: 384 },
//     { date: "2024-05-18", income: 315, expense: 350, transfer: 384 },
//     { date: "2024-05-19", income: 235, expense: 180, transfer: 384 },
//     { date: "2024-05-20", income: 177, expense: 230, transfer: 384 },
//     { date: "2024-05-21", income: 82, expense: 140, transfer: 384 },
//     { date: "2024-05-22", income: 81, expense: 120, transfer: 384 },
//     { date: "2024-05-23", income: 252, expense: 290, transfer: 384 },
//     { date: "2024-05-24", income: 294, expense: 220, transfer: 384 },
//     { date: "2024-05-25", income: 201, expense: 250, transfer: 384 },
//     { date: "2024-05-26", income: 213, expense: 170, transfer: 384 },
//     { date: "2024-05-27", income: 420, expense: 460, transfer: 384 },
//     { date: "2024-05-28", income: 233, expense: 190, transfer: 384 },
//     { date: "2024-05-29", income: 78, expense: 130, transfer: 384 },
//     { date: "2024-05-30", income: 340, expense: 280, transfer: 384 },
//     { date: "2024-05-31", income: 178, expense: 230, transfer: 384 },
//     { date: "2024-06-01", income: 178, expense: 200, transfer: 384 },
//     { date: "2024-06-02", income: 470, expense: 410, transfer: 384 },
//     { date: "2024-06-03", income: 103, expense: 160, transfer: 384 },
//     { date: "2024-06-04", income: 439, expense: 380, transfer: 384 },
//     { date: "2024-06-05", income: 88, expense: 140, transfer: 384 },
//     { date: "2024-06-06", income: 294, expense: 250, transfer: 384 },
//     { date: "2024-06-07", income: 323, expense: 370, transfer: 384 },
//     { date: "2024-06-08", income: 385, expense: 320, transfer: 384 },
//     { date: "2024-06-09", income: 438, expense: 480, transfer: 384 },
//     { date: "2024-06-10", income: 155, expense: 200, transfer: 384 },
//     { date: "2024-06-11", income: 92, expense: 150, transfer: 384 },
//     { date: "2024-06-12", income: 492, expense: 420, transfer: 384 },
//     { date: "2024-06-13", income: 81, expense: 130, transfer: 384 },
//     { date: "2024-06-14", income: 426, expense: 380, transfer: 384 },
//     { date: "2024-06-15", income: 307, expense: 350, transfer: 384 },
//     { date: "2024-06-16", income: 371, expense: 310, transfer: 384 },
//     { date: "2024-06-17", income: 475, expense: 520, transfer: 384 },
//     { date: "2024-06-18", income: 107, expense: 170, transfer: 384 },
//     { date: "2024-06-19", income: 341, expense: 290, transfer: 384 },
//     { date: "2024-06-20", income: 408, expense: 450, transfer: 384 },
//     { date: "2024-06-21", income: 169, expense: 210, transfer: 384 },
//     { date: "2024-06-22", income: 317, expense: 270, transfer: 384 },
//     { date: "2024-06-23", income: 480, expense: 530, transfer: 384 },
//     { date: "2024-06-24", income: 132, expense: 180, transfer: 384 },
//     { date: "2024-06-25", income: 141, expense: 190, transfer: 384 },
//     { date: "2024-06-26", income: 434, expense: 380, transfer: 384 },
//     { date: "2024-06-27", income: 448, expense: 490, transfer: 384 },
//     { date: "2024-06-28", income: 149, expense: 200, transfer: 384 },
// ]

const chartConfig = {
    // visitors: {
    //     label: "Budget",
    // },
    income: {
        label: "Income",
        color: "var(--chart-2)",
    },
    expense: {
        label: "Expense",
        color: "#b91c1c",
    },
    transfer: {
        label: "Transfer",
        color: "var(--chart-1)",
    },
} satisfies ChartConfig

interface Obj {
    date: string,
    income: number,
    expense: number,
    transfer: number
}

export function IncomeExpenseChart() {
    const [chartData, setChartData] = React.useState<Obj[]>([])
    const [timeRange, setTimeRange] = React.useState("90d")

    const { data, isError } = useQuery({ queryKey: ['transactions'], queryFn: getTransactions });

    React.useEffect(() => {
        if (!data) return;

        const dataMap = new Map<string, Obj>();

        data.forEach((transaction: Transaction) => {
            const date = transaction.date; 
            if (!dataMap.has(date)) {
                dataMap.set(date, { date, income: 0, expense: 0, transfer: 0 });
            }
            const obj = dataMap.get(date)!;
            obj[transaction.type] += transaction.amount;
        });

        let aggregatedData = Array.from(dataMap.values());

        const referenceDate = new Date(); 
        let daysToSubtract = 90;
        if (timeRange === "30d") daysToSubtract = 30;
        if (timeRange === "7d") daysToSubtract = 7;
        const startDate = new Date(referenceDate);
        startDate.setDate(startDate.getDate() - daysToSubtract);

        const filteredData = aggregatedData.filter(item => {
            const itemDate = new Date(item.date);
            return itemDate >= startDate && itemDate <= referenceDate;
        });

        filteredData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

        setChartData(filteredData);

    }, [data, timeRange]);

    if (isError) {
        return (
            <p className="p-4">Could not load data please try again later</p>
        )
    }

    return (
        <Card className="pt-0">
            <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
                <div className="grid flex-1 gap-1">
                    <CardTitle>Income Expense - Chart</CardTitle>
                    <CardDescription>
                        Showing total income and expense
                    </CardDescription>
                </div>
                <Select value={ timeRange } onValueChange={ setTimeRange }>
                    <SelectTrigger
                        className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
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
                    config={ chartConfig }
                    className="aspect-auto h-[250px] w-full"
                >
                    <AreaChart data={ chartData }>
                        <defs>
                            <linearGradient id="fillIncome" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--chart-2)" stopOpacity={ 0.8 } />
                                <stop offset="95%" stopColor="var(--chart-2)" stopOpacity={ 0.1 } />
                            </linearGradient>
                            <linearGradient id="fillExpense" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#b91c1c" stopOpacity={ 0.8 } />
                                <stop offset="95%" stopColor="#b91c1c" stopOpacity={ 0.1 } />
                            </linearGradient>
                            <linearGradient id="fillTransfer" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={ 0.8 } />
                                <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={ 0.1 } />
                            </linearGradient>
                        </defs>

                        <CartesianGrid vertical={ false } />
                        <XAxis
                            dataKey="date"
                            tickLine={ false }
                            axisLine={ false }
                            tickMargin={ 8 }
                            minTickGap={ 32 }
                            tickFormatter={ (value) => {
                                const date = new Date(value)
                                return date.toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                })
                            } }
                        />
                        <ChartTooltip
                            cursor={ false }
                            content={
                                <ChartTooltipContent
                                    labelFormatter={ (value) => {
                                        return new Date(value).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                        })
                                    } }
                                    indicator="dot"
                                />
                            }
                        />
                        <Area
                            dataKey="income"
                            type="natural"
                            fill="url(#fillIncome)"
                            stroke="var(--chart-2)"
                            stackId="a"
                        />
                        <Area
                            dataKey="expense"
                            type="natural"
                            fill="url(#fillExpense)"
                            stroke="#b91c1c"
                            stackId="a"
                        />
                        <Area
                            dataKey="transfer"
                            type="natural"
                            fill="url(#fillTransfer)"
                            stroke="var(--chart-1)"
                            stackId="a"
                        />

                        <ChartLegend content={ <ChartLegendContent /> } />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}