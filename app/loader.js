"use client"

/**
 * @param {Object} options
 * @param {string} options.src
 * @param {number} options.width
 */
export default function cloudinaryLoader({ src: publicId, width }) {
  return `https://res.cloudinary.com/tifan/$w_${width}/t_blog/${publicId}`
}
