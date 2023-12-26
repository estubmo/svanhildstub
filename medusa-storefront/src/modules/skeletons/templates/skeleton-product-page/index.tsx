import repeat from '@lib/util/repeat';
import Divider from '@modules/common/components/divider';
import SkeletonButton from '@modules/skeletons/components/skeleton-button';

const SkeletonProductPage = () => {
  return (
    <div>
      <div className="content-container relative flex animate-pulse flex-col py-6 small:flex-row small:items-start">
        <div className="flex w-full flex-col gap-y-6 py-8 small:sticky small:top-48 small:max-w-[300px] small:py-0">
          <div id="product-info">
            <div className="mx-auto flex flex-col gap-y-4 lg:max-w-[500px]">
              <div className="relative h-6 w-1/3 bg-gray-200"></div>
              <div className="relative h-12 w-4/5 bg-gray-200"></div>
              <div className="flex flex-col gap-y-2">
                {repeat(4).map((index) => (
                  <div key={index} className="w-62 h-4 bg-gray-200"></div>
                ))}
              </div>
              <div className="flex flex-col gap-y-2">
                {repeat(2).map((index) => (
                  <div key={index} className="w-62 h-10 bg-gray-200"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="relative block w-full">
          <div className="flex flex-1 flex-col gap-y-4 small:mx-16">
            {repeat(2).map((index) => {
              return (
                <div
                  key={index}
                  className="relative aspect-[29/34] w-full rounded-rounded bg-gray-200"
                ></div>
              );
            })}
          </div>
        </div>
        <div className="flex w-full flex-col gap-y-12 py-8 small:sticky small:top-48 small:max-w-[300px] small:py-0">
          <div>
            <div className="mx-auto flex flex-col lg:max-w-[500px]">
              <div>
                <div className="flex flex-col gap-y-2">
                  <div className="flex flex-col gap-y-4">
                    <div className="h-6 w-16 bg-gray-200"></div>
                    <div className="grid grid-cols-3 gap-2 lg:grid-cols-4">
                      {repeat(4).map((v) => {
                        return (
                          <div
                            key={v}
                            className="w-15 h-10 rounded-rounded bg-gray-200"
                          ></div>
                        );
                      })}
                    </div>
                    <Divider />
                    <div className="h-9 w-20 bg-gray-200"></div>
                    <SkeletonButton />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonProductPage;
