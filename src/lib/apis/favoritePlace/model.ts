import { Pagination } from '@/lib/types';
import { FavoritePlace } from '@/lib/types/favoritePlace';

export type FavoritePlacesRequest = Partial<{
  next_cursor: string;
  limit: number;
  country_code: string;
  latitude: number;
  longitude: number;
}>;

export type FavoritePlaceRequest = {
  google_place_id: string;
  country_code: string;
  latitude: number;
  longitude: number;
};

export type FavoritePlaceResponse = FavoritePlace;

export type FavoritePlacesResponse = Pagination<FavoritePlace>;
