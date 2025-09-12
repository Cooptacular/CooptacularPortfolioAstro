export interface SiteConfig {
  title: string;
  description: string;
  author: {
    name: string;
    bio: string;
    avatar?: string;
  };
  social: {
    github?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    email?: string;
  };
  siteUrl: string;
}

export const config: SiteConfig = {
  title: "Bryan Cooper",
  description: "Bryan Cooper's personal portfolio site.",
  author: {
    name: "Bryan Cooper",
    bio: "Designer, Writer, Photographer.",
    // avatar: "/images/avatar.jpg" // Uncomment and add your avatar image to public/images/
  },
  social: {
    github: "https://github.com/Cooptacular",
    twitter: "https://twitter.com/Cooptacular",
    linkedin: "https://linkedin.com/in/bryanrcooper",
    email: "bryanrcooper7@gmail.com"
  },
  siteUrl: "https://volks-typo.example.com"
};

// Export constants for SEO component
export const SITE_TITLE = config.title;
export const SITE_DESCRIPTION = config.description;