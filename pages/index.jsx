import React from "react"
import Img from "next/image"
import { useNextSanityImage } from "next-sanity-image"
import BlockContent from "@sanity/block-content-to-react"

import sanity from "../lib/sanity"

const query = `*[_type == "blogPost"]{
  _id,
  Title,
  image,
  content
}[0...50]
`
const ImageComponent = ({ post }) => {
  const imageProps = useNextSanityImage(sanity, post.image)

  console.log(post.content)

  return (
    <div>
      <h1>{post.Title}</h1>
      <Img {...imageProps} sizes="(max-width: 800px) 100vw, 800px" />
      <BlockContent blocks={post.content} />
    </div>
  )
}

function HomePage({ posts }) {
  return (
    <div style={{ maxWidth: 800, margin: "auto", padding: 10 }}>
      <h1>Con's Half Thoughts</h1>
      <hr />
      {posts.map((post) => (
        <div>
          <h2>{post.Title}</h2>
          <BlockContent blocks={post.content} />
        </div>
      ))}
    </div>
  )
}

export const getStaticProps = async () => {
  const posts = await sanity.fetch(query)
  return {
    props: { posts }, // will be passed to the page component as props
  }
}

export default HomePage
