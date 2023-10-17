import { PlaceDetailsResponseData, TextSearchResponseData } from '@googlemaps/google-maps-services-js';

import { NaverSearchBlog } from '@/lib/types/search';

export type NaverSearchBlogResponse<T> = NaverSearchBlog<T>;

export type TextSearchPlaceResponse = TextSearchResponseData;

export type PlaceDetailResponse = PlaceDetailsResponseData;
