import { useMemo } from 'react';

import { PlaceResult } from 'lib/types/google.maps';

import { checkNumberValue, generateArrayOfNumber } from 'utils';

import EmptyStarIcon from 'lib/assets/icons/empty-star.svg';
import FillStarSvg from 'lib/assets/icons/fill-star.svg';
import HalfStarIcon from 'lib/assets/icons/half-star.svg';

import styles from './index.module.scss';

type Props = {
  place: PlaceResult;
};

const MAX_RATING = 5;

function PlaceBottomSheetItem({ place }: Props) {
  const { place_id, name, user_ratings_total } = place;
  const rating = checkNumberValue(place.rating);
  const fillStarCount = Math.floor(checkNumberValue(rating));

  const extraStar = useMemo(() => {
    const onlyDecimal = Number((checkNumberValue(rating) % 1).toFixed(1));

    if (onlyDecimal < 0.3) {
      return (
        <EmptyStarIcon />
      );
    }

    if (onlyDecimal >= 0.3 && onlyDecimal < 0.8) {
      return (
        <HalfStarIcon />
      );
    }

    return <FillStarSvg />;
  }, [rating]);

  return (
    <li key={place_id} className={styles.placeItem}>
      <div className={styles.placeName}>{name}</div>
      <div className={styles.placeRatingWrapper}>
        <div className={styles.placeRating}>{rating}</div>
        <div>
          {generateArrayOfNumber(fillStarCount).map((key) => (
            <FillStarSvg key={key} />
          ))}
          {fillStarCount < 5 && extraStar}
          {generateArrayOfNumber(MAX_RATING - (fillStarCount + 1)).map((key) => (
            <EmptyStarIcon key={key} />
          ))}
        </div>
        <div className={styles.placeUserRatingsTotal}>{`(${user_ratings_total})`}</div>
      </div>
      <div className={styles.naverSearchTotal}>네이버 검색결과 500개</div>
    </li>
  );
}

export default PlaceBottomSheetItem;
