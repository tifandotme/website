import { defineDocumentType, makeSource } from "contentlayer/source-files";

/** @type {import('contentlayer/source-files').ComputedFields} */
const computedFields = {
  url: {
    description: "URL of the post (e.g. /blog/my-post)",
    type: "string",
    resolve: (doc) => `/blog/${doc._raw.flattenedPath}`,
  },
  slug: {
    description: "Slug of the post (e.g. my-post)",
    type: "string",
    resolve: (doc) => doc._raw.flattenedPath,
  },
};

const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      description: "Title of the post",
      required: true,
    },
    description: {
      type: "string",
      description: "Description of the post (Max ... characters)",
    },
    date: {
      type: "date",
      description: "Date of publication",
      required: true,
    },
  },
  computedFields,
}));

export default makeSource({
  contentDirPath: "posts",
  documentTypes: [Post],
});
