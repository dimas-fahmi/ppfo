import { Metadata } from "next";

export function generateMetadata(revision?: Metadata): Metadata {
  const app_url = process.env.APP_URL || "https://ppfo.dimasfahmi.pro";
  const og_image =
    process.env.OG_IMAGE || "https://ppfo.dimasfahmi.pro/og-image.png";
  const twitter_image =
    process.env.TWITTER_IMAGE ||
    "https://ppfo.dimasfahmi.pro/twitter-image.png";
  const twitter_handler = process.env.TWITTER_HANDLER || "@ppfo_org";

  const metadata: Metadata = {
    title:
      revision?.title || "Press & Public Freedom Organization Official Website",
    description:
      revision?.description ||
      "Press & Public Freedom Organization (PPFO) is an independent organization that focuses on press freedom and public freedom issues.",
    keywords: revision?.keywords || [
      "Press Freedom",
      "Public Freedom",
      "Human Rights",
      "Journalism",
      "Advocacy",
      "Freedom of Expression",
    ],
    authors: revision?.authors || [
      {
        name: "Press & Public Freedom Organization",
        url: app_url,
      },
    ],
    openGraph: {
      title:
        revision?.openGraph?.title ||
        "Press & Public Freedom Organization Official Website",
      description:
        revision?.openGraph?.description ||
        "Press & Public Freedom Organization (PPFO) is an independent organization that focuses on press freedom and public freedom issues.",
      url: revision?.openGraph?.url || app_url,
      siteName:
        revision?.openGraph?.siteName || "Press & Public Freedom Organization",
      images: revision?.openGraph?.images || [
        {
          url: og_image,
          width: 1200,
          height: 630,
          alt: "Press & Public Freedom Organization",
        },
      ],
      locale: revision?.openGraph?.locale || "en_US",
    },
    twitter: {
      title:
        revision?.twitter?.title ||
        "Press & Public Freedom Organization Official Website",
      description:
        revision?.twitter?.description ||
        "Press & Public Freedom Organization (PPFO) is an independent organization that focuses on press freedom and public freedom issues.",
      images: revision?.twitter?.images || [twitter_image],
      site: revision?.twitter?.site || twitter_handler,
      creator: revision?.twitter?.creator || twitter_handler,
    },
  };
  return metadata;
}
