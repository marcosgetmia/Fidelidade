import ExecutivoView  from '@/views/ExecutivoView'
import ReceitaView    from '@/views/ReceitaView'
import B2BView        from '@/views/B2BView'
import ClientesView   from '@/views/ClientesView'
import ClubeView      from '@/views/ClubeView'
import AICView        from '@/views/AICView'
import EarnBurnView   from '@/views/EarnBurnView'
import ResgatesView   from '@/views/ResgatesView'
import GovernancaView from '@/views/GovernancaView'

const VIEWS: Record<string, React.FC> = {
  executivo:  ExecutivoView,
  receita:    ReceitaView,
  b2b:        B2BView,
  clientes:   ClientesView,
  clube:      ClubeView,
  aic:        AICView,
  'earn-burn':EarnBurnView,
  resgates:   ResgatesView,
  governanca: GovernancaView,
}

export default function DomainPage({ params }: { params: { domain: string } }) {
  const View = VIEWS[params.domain] ?? ExecutivoView
  return <View />
}

export function generateStaticParams() {
  return Object.keys(VIEWS).map(domain => ({ domain }))
}
