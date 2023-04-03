import React from 'react';
import ContentLoader from 'react-content-loader';

const PizzaSkeleton = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={480}
    viewBox="0 0 280 480"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="138" cy="124" r="125" />
    <rect x="0" y="275" rx="10" ry="10" width="280" height="20" />
    <rect x="0" y="323" rx="10" ry="10" width="280" height="88" />
    <rect x="2" y="433" rx="10" ry="10" width="280" height="45" />
  </ContentLoader>
);

export default PizzaSkeleton;
