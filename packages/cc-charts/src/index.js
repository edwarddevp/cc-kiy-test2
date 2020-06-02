import dynamic from 'next/dynamic'

export const Chart = dynamic(
  () => import('./components/Chart').then((mod) => mod.Chart),
  { ssr: false }
)
