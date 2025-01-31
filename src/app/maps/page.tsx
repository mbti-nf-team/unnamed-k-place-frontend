import { Metadata } from 'next';
import { cookies } from 'next/headers';

import MapContainer from '@/components/map/MapContainer';
import MapLayout from '@/components/map/MapLayout';
import { getUser } from '@/lib/apis/auth';
import CookieNames from '@/lib/constants/cookies';

import { metadata as defaultMetadata } from '../page';

type Props = {
  searchParams: Promise<{ [key: string]: string | undefined; }>;
};

export const metadata: Metadata = {
  ...defaultMetadata,
  openGraph: {
    ...defaultMetadata.openGraph,
    url: `${process.env.NEXT_PUBLIC_ORIGIN}/maps`,
  },
};

async function Page({ searchParams }: Props) {
  const cookiesStore = await cookies();
  const resolvedParams = await searchParams;
  const accessToken = cookiesStore.get(CookieNames.ACCESS_TOKEN);

  const user = await getUser({ accessToken: accessToken?.value });

  return (
    <MapLayout>
      <MapContainer
        user={user}
        defaultCountryCode={resolvedParams?.country}
        defaultLocation={{
          lat: resolvedParams?.lat,
          lng: resolvedParams?.lng,
        }}
      />
    </MapLayout>
  );
}

export default Page;
