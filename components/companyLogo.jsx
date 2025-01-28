import { logoFetcher } from '@/lib/util';
import avancy from '@/images/avancy-gray.svg';
import useSWR from 'swr';
import { Logo } from './logo';
import { useState } from 'react';

export function CompanyLogo({ className = '', ...rest }) {
  const { data: logo, error } = useSWR('/api/logo', logoFetcher);
  const [logoUrl, setLogoUrl] = useState(true);
  return logoUrl ? (
    <img
      src={logo}
      onError={(e) => {
        setLogoUrl(false);
      }}
      className={'w-auto h-10 ' + className}
      {...rest}
    />
  ) : (
    <Logo className={'w-auto h-10'} />
  );
}
