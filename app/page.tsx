import { Metadata } from 'next'
import Dashboard from '@/components/Dashboard'
import { metadata as dashboardMetadata } from './metadata'

export const metadata: Metadata = dashboardMetadata

export default function Page() {
  return <Dashboard />
}

