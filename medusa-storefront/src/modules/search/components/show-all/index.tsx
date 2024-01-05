import { Container, Text } from '@medusajs/ui';
import InteractiveLink from '@modules/common/components/interactive-link';
import { useHits, useSearchBox } from 'react-instantsearch';

const ShowAll = ({ close }: { close?: () => void }) => {
  const { hits } = useHits();
  const { query } = useSearchBox();

  if (query === '') return null;
  if (hits.length > 0 && hits.length <= 6) return null;

  if (hits.length === 0) {
    return (
      <Container className="flex h-fit justify-center gap-2 py-2">
        <Text>No results found.</Text>
      </Container>
    );
  }

  return (
    <Container className="flex h-fit flex-col items-center justify-center gap-2 py-4 small:flex-row small:py-2">
      <Text>Showing the first 6 results.</Text>
      <InteractiveLink href={`/store/search/${query}`} onClick={close}>
        View all
      </InteractiveLink>
    </Container>
  );
};

export default ShowAll;
