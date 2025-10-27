"use client"

import { useSEOMeta } from "@/hooks/use-seo-meta"

export function AboutPageSeo() {
  // Use SEO data for about page
  useSEOMeta({
    pageId: 'about',
    fallback: {
      title: 'About Sri Jaidev Tours & Travels - Your Trusted Travel Partner',
      description: 'Learn about Sri Jaidev Tours & Travels, your trusted travel partner in Tamil Nadu. We provide reliable taxi services, tour packages, and travel solutions since 2020.',
      keywords: 'about Sri Jaidev tours, travel company tamil nadu, trusted taxi service, travel partner, company history, reliable transport'
    }
  })

  // This component doesn't render anything visible, it just handles SEO
  return null
}