import { useQuery } from '@lib/context/query-context';
import Hit, { HitProps } from '@modules/search/components/hit';
import { useRouter } from 'next/navigation';

const DesktopHit = ({ hit }: HitProps) => {
  const { push } = useRouter();
  const { setValue } = useQuery();

  const go = () => {
    push(`/store/products/${hit.handle}`);
    setValue('');
  };

  return (
    <button className="group/hit w-full text-left" onClick={go}>
      <Hit hit={hit} />
    </button>
  );
};

export default DesktopHit;
