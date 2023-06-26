import { defineDocumentType, makeSource } from "contentlayer/source-files";

/** @type {import("contentlayer/source-files").ComputedFields} */
const computedFields = {
  url: {
    description: "URL of the post (e.g. blog/my-post)",
    type: "string",
    resolve: (doc) => {
      const segments = doc._raw.flattenedPath.split("/");

      // remove in-between segments (e.g. 2023)
      segments.splice(1, segments.length - 2);

      return segments.join("/").replace(/\s+/g, "-").toLowerCase();
    },
  },
  slug: {
    description: "Slug of the post (e.g. my-post)",
    type: "string",
    resolve: (doc) => {
      const segments = doc._raw.flattenedPath.split("/");

      return segments[segments.length - 1].replace(/\s+/g, "-").toLowerCase();
    },
  },
};

const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `blog/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      description: "Title of the post",
      required: true,
    },
    description: {
      type: "string",
      description: "Description of the post (Max ? characters)",
    },
    date: {
      type: "date",
      description: "Date of publication",
      required: true,
    },
    // TODO: Implement Draft Mode: https://nextjs.org/docs/app/building-your-application/configuring/draft-mode
    draft: {
      type: "boolean",
    },
  },
  computedFields,
}));

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Post],
});
