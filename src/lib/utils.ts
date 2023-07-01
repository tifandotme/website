import { clsx, type ClassValue } from "clsx";
import { allPosts, type Post } from "contentlayer/generated";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function getPost(slug: string): Post | undefined {
  return allPosts.find((post) => post.slug === slug);
}
