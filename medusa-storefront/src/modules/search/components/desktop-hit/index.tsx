import { useQuery } from "@lib/context/query-context"
import Hit, { HitProps } from "@modules/search/components/hit"
import { useRouter } from "next/navigation"

const DesktopHit = ({ hit }: HitProps) => {
  const { push } = useRouter()
  const { setValue } = useQuery()

  const go = () => {
    push(`/products/${hit.handle}`)
    setValue("")
  }

  return (
    <button className="w-full text-left group/hit" onClick={go}>
      <Hit hit={hit} />
    </button>
  )
}

export default DesktopHit
