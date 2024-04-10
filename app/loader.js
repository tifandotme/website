"use client"

/**
 * @param {Object} options
 * @param {string} options.src
 * @param {number} options.width
 */
export default function cloudinaryLoader({ src: publicId, width }) {
  return `https://res.cloudinary.com/tifan/c_limit,w_${width},q_auto,f_webp/${publicId}`
}
