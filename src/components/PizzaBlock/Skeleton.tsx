import React from "react";
import ContentLoader from "react-content-loader";

const MyLoader: React.FC = (props) => (
  <ContentLoader
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="113" cy="111" r="111" />
    <rect x="4" y="238" rx="4" ry="4" width="221" height="32" />
    <rect x="6" y="276" rx="12" ry="12" width="220" height="50" />
    <rect x="8" y="335" rx="10" ry="10" width="85" height="36" />
    <rect x="104" y="336" rx="20" ry="20" width="119" height="36" />
  </ContentLoader>
);

export default MyLoader;