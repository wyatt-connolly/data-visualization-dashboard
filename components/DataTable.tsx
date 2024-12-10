'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
  }[];
}

interface DataTableProps {
  data: ChartData;
}

export function DataTable({ data }: DataTableProps) {
  return (
    <div className="overflow-x-auto">
      <Table className="border-collapse w-full">
        <TableHeader>
          <TableRow className="bg-gray-700">
            <TableHead className="w-[100px] text-left p-2 border border-gray-600 text-gray-100 font-bold">Year/Region</TableHead>
            {data.datasets.map((dataset, index) => (
              <TableHead key={index} className="text-left p-2 border border-gray-600 text-gray-100 font-bold">{dataset.label}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.labels.map((label, rowIndex) => (
            <TableRow key={rowIndex} className="even:bg-gray-800 odd:bg-gray-700">
              <TableCell className="p-2 border border-gray-600 text-gray-100 font-medium">{label}</TableCell>
              {data.datasets.map((dataset, colIndex) => (
                <TableCell key={colIndex} className="p-2 border border-gray-600 text-gray-100">{dataset.data[rowIndex]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

