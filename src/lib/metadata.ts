import { Metadata } from 'next';

const siteConfig = {
    name: 'Bondan Banuaji',
    title: 'Bondan Banuaji - Creative Technologist & Full Stack Developer',
    description: 'Portfolio of Bondan Banuaji (Boba), an Informatics Engineering student specializing in modern web development, 3D experiences, and creative technology. Building immersive digital experiences with React, Next.js, Three.js, and GSAP.',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://boba.dev',
    ogImage: '/boba-light-logo.png',
    keywords: [
        'Bondan Banuaji',
        'Boba',
        'Full Stack Developer',
        'Creative Technologist',
        'Web Developer',
        'React Developer',
        'Next.js Developer',
        'Three.js',
        'GSAP Animation',
        '3D Web Developer',
        'Frontend Developer',
        'Portfolio',
        'Karawang',
        'Indonesia',
        'Informatics Engineering',
        'Web Design',
        'UI/UX',
        'TypeScript',
        'JavaScript',
    ],
    author: 'Bondan Banuaji',
    creator: 'Bondan Banuaji',
    publisher: 'Bondan Banuaji',
};

export function generateMetadata({
    title,
    description,
    image,
    url,
    noIndex = false,
}: {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    noIndex?: boolean;
}): Metadata {
    const pageTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.title;
    const pageDescription = description || siteConfig.description;
    const pageImage = image || siteConfig.ogImage;
    const pageUrl = url ? `${siteConfig.url}${url}` : siteConfig.url;

    return {
        title: pageTitle,
        description: pageDescription,
        keywords: siteConfig.keywords,
        authors: [{ name: siteConfig.author }],
        creator: siteConfig.creator,
        publisher: siteConfig.publisher,
        metadataBase: new URL(siteConfig.url),
        alternates: {
            canonical: pageUrl,
        },
        openGraph: {
            type: 'website',
            locale: 'en_US',
            url: pageUrl,
            title: pageTitle,
            description: pageDescription,
            siteName: siteConfig.name,
            images: [
                {
                    url: pageImage,
                    width: 1200,
                    height: 630,
                    alt: pageTitle,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: pageTitle,
            description: pageDescription,
            images: [pageImage],
            creator: '@bondanbanuaji',
        },
        robots: {
            index: !noIndex,
            follow: !noIndex,
            googleBot: {
                index: !noIndex,
                follow: !noIndex,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
        verification: {
            google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
        },
    };
}

export function generateStructuredData({
    type = 'Person',
    name = siteConfig.name,
    url = siteConfig.url,
    image = siteConfig.ogImage,
    description = siteConfig.description,
}: {
    type?: 'Person' | 'WebSite' | 'WebPage';
    name?: string;
    url?: string;
    image?: string;
    description?: string;
} = {}) {
    if (type === 'Person') {
        return {
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: siteConfig.name,
            url: siteConfig.url,
            image: `${siteConfig.url}${image}`,
            jobTitle: 'Creative Technologist & Full Stack Developer',
            description,
            sameAs: [
                'https://github.com/bondanbanuaji',
                'https://linkedin.com/in/bondanbanuaji',
            ],
            knowsAbout: [
                'Web Development',
                'Full Stack Development',
                'React',
                'Next.js',
                'TypeScript',
                'Three.js',
                'GSAP',
                '3D Web Experiences',
            ],
        };
    }

    if (type === 'WebSite') {
        return {
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name,
            url,
            description,
            author: {
                '@type': 'Person',
                name: siteConfig.name,
            },
        };
    }

    return {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name,
        url,
        description,
    };
}

export default siteConfig;
