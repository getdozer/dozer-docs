import { Redirect } from '@docusaurus/router';
import React from 'react';

export default function IndexPage() {
  // return (<div>Docs Home</div>)
  return <Redirect to={'/docs/dozer'} />
}