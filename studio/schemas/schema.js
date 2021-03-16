// First, we must import the schema creator
import createSchema from "part:@sanity/base/schema-creator"

// Then import schema types from any plugins that might expose them
import schemaTypes from "all:part:@sanity/base/schema-type"

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: "default",
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    {
      type: "document",
      name: "blogPost",
      fields: [
        { type: "string", name: "Title" },
        { type: "text", name: "Body" },
        {
          name: "content",
          title: "Content",
          type: "array",
          of: [
            {
              type: "block",
            },
            {
              type: "image",
              fields: [
                {
                  type: "text",
                  name: "alt",
                  title: "Alternative text",
                  description: `Some of your visitors cannot see images, 
                    be they blind, color-blind, low-sighted; 
                    alternative text is of great help for those 
                    people that can rely on it to have a good idea of 
                    what\'s on your page.`,
                  options: {
                    isHighlighted: true,
                  },
                },
              ],
            },
          ],
        },
        { type: "image", name: "image" },
      ],
    },
  ]),
})
