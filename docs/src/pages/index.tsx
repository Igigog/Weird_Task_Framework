import React from 'react';
import { Redirect } from '@docusaurus/router';
import useBaseUrl from '@docusaurus/useBaseUrl';

export default function Home() {
  // Replace '/docs/intro' with the URL path to your main/first doc page
  return <Redirect to={useBaseUrl("/getting-started/intro")} />;
}
