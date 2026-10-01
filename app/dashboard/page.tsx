import { InvoiceTable } from '@/components/InvoiceTable';
import { ProjectCard } from '@/components/ProjectCard';
import { TeamList } from '@/components/TeamList';
import { UsageChart } from '@/components/UsageChart';

export default function Dashboard() {
  return (
    <main>
      <UsageChart title="Usage" />
      <ProjectCard title="Projects" />
      <TeamList title="Teams" />
      <InvoiceTable title="Invoices" />
    </main>
  );
}
