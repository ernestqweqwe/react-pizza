import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = () => (
  <ContentLoader 
  className="pizza-block"
    speed={2}
    width={280}
    height={466}
    viewBox="0 0 280 466"
    backgroundColor="#bab0b0"
    foregroundColor="#dcd0d0"
  >
    <circle cx="113" cy="113" r="113" /> 
    <rect x="1" y="256" rx="0" ry="0" width="250" height="30" /> 
    <rect x="1" y="310" rx="0" ry="0" width="250" height="73" /> 
    <rect x="-24" y="418" rx="0" ry="0" width="105" height="37" /> 
    <rect x="105" y="417" rx="0" ry="0" width="146" height="37" />
  </ContentLoader>
)

export default Skeleton

