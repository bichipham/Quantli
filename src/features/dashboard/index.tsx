import ComparisionTable from './components/ComparisionTable'
import PerformanceChart from './components/PerformanceChart'

export default function DashboardPage() {
	return (
		<section>
			<ComparisionTable />
            <PerformanceChart />
		</section>
	)
}
