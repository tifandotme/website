import { defineDocumentType, makeSource } from "contentlayer/source-files";

/** @type {import("contentlayer/source-files").ComputedFields} */
const computedFields = {
  url: {
    description: "URL path of the post (e.g. /blog/my-post)",
    type: "string",
    resolve: (doc) => {
      const segments = doc._raw.flattenedPath.split("/");

      // remove in-between segments (e.g. 2023)
      segments.splice(1, segments.length - 2);

      const final = "/" + segments.join("/");

      return final
        .replace(/\s+/g, "-")
        .replace(/--+/g, "-")
        .replace(/[^\w/-]+/g, "")
        .toLowerCase();
    },
  },
  slug: {
    description: "Slug of the post (e.g. my-post)",
    type: "string",
    resolve: (doc) => {
      const segments = doc._raw.flattenedPath.split("/");

      const final = segments[segments.length - 1];

      return final
        .replace(/\s+/g, "-")
        .replace(/--+/g, "-")
        .replace(/[^\w/-]+/g, "")
        .toLowerCase();
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

// TODO add rehype plugins
export default makeSource({
  contentDirPath: "content",
  documentTypes: [Post],
});
