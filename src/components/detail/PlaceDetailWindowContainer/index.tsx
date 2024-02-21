import { useRouter, useSearchParams } from 'next/navigation';

import { useIsomorphicLayoutEffect, useUnmount } from '@nf-team/react';

import useGetSearchPlace from '@/hooks/apis/queries/useGetSearchPlace';
import useActivityLog from '@/hooks/useActivityLog';
import { paramsSerializer } from '@/lib/apis';
import usePlaceDetailWindowStore from '@/stores/placeDetailWindow';

import PlaceDetailWindow from '../PlaceDetailWindow';

function PlaceDetailWindowContainer() {
  const { sendEvent } = useActivityLog();
  const params = useSearchParams();
  const router = useRouter();
  const {
    isOpenPlaceDetailWindow, onClosePlaceDetailWindow, placeId,
  } = usePlaceDetailWindowStore(['isOpenPlaceDetailWindow', 'onClosePlaceDetailWindow', 'placeId']);
  const { data: placesWithSearchResult, isFetching } = useGetSearchPlace({ placeId });

  const onCloseDetailWindow = () => {
    sendEvent({
      name: 'close_place_detail_window',
      action: 'click',
    });

    onClosePlaceDetailWindow();

    if (params.has('id')) {
      router.push(`/maps?${paramsSerializer({
        country: params.get('country'),
      })}`);
    }
  };

  useIsomorphicLayoutEffect(() => {
    if (isOpenPlaceDetailWindow) {
      document.body.style.overflow = '';
      return;
    }

    document.body.style.overflow = 'hidden';
  }, [isOpenPlaceDetailWindow]);

  useUnmount(() => {
    document.body.style.overflow = '';
  });

  return (
    <PlaceDetailWindow
      isLoading={isFetching}
      isVisible={isOpenPlaceDetailWindow}
      placeDetail={placesWithSearchResult?.result}
      onClose={onCloseDetailWindow}
    />
  );
}

export default PlaceDetailWindowContainer;
