import repeat from '@lib/util/repeat';
import SkeletonProductPreview from '@modules/skeletons/components/skeleton-product-preview';

const SkeletonProductGrid = () => {
  return (
    <ul className="grid flex-1 grid-cols-2 gap-x-6 gap-y-8 small:grid-cols-3 medium:grid-cols-4">
      {repeat(8).map((index) => (
        <li key={index}>
          <SkeletonProductPreview />
        </li>
      ))}
    </ul>
  );
};

export default SkeletonProductGrid;
