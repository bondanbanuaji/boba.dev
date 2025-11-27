import { Metadata } from 'next';

const siteConfig = {
    name: 'Bondan Banuaji',
    title: 'Portfolio | Bondan Banuaji',
    description: 'PORTFOLIO | FULL-STACK WEB DEVELOPER',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://boba.dev',
    ogImage: '/boba-light-logo.png',
    keywords: [
        // Primary Keywords - Name Variations
        'Bondan Banuaji',
        'bondan banuaji',
        'Boba',
        'boba',
        'Banu',
        'banu',
        'Bondan',
        'bondan',
        
        // Portfolio Keywords
        'portfolio bondan',
        'portfolio banu',
        'boba portfolio',
        'portfolio bondan banuaji',
        'bondan banuaji portfolio',
        'boba.dev',
        'boba dev',
        
        // Professional Titles
        'Full Stack Developer',
        'Frontend Developer',
        'Creative Technologist',
        'Web Developer',
        'Software Engineer',
        'Software Developer',
        'React Developer',
        'Next.js Developer',
        'JavaScript Developer',
        'TypeScript Developer',
        
        // Technologies
        'React',
        'Next.js',
        'TypeScript',
        'JavaScript',
        'Three.js',
        'GSAP Animation',
        '3D Web Developer',
        '3D Web Animation',
        'WebGL',
        'Tailwind CSS',
        'Node.js',
        'Full Stack',
        
        // Services
        'Web Development',
        'Website Developer',
        'Web Design',
        'UI/UX Developer',
        'Interactive Websites',
        '3D Web Experiences',
        'Creative Web Development',
        'Modern Web Development',
        'Responsive Web Design',
        
        // Location Based
        'Karawang',
        'Indonesia',
        'Web Developer Karawang',
        'Developer Indonesia',
        'Indonesian Developer',
        'Karawang Developer',
        'Developer Karawang Indonesia',
        
        // Education & Expertise
        'Informatics Engineering',
        'Computer Science',
        'Tech Portfolio',
        'Developer Portfolio',
        'Engineering Portfolio',
        
        // Long-tail Keywords
        'hire web developer indonesia',
        'freelance developer indonesia',
        'bondan banuaji developer',
        'boba web developer',
        'professional web developer portfolio',
        'creative developer portfolio',
        'modern portfolio website',
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
            other: {
                'msvalidate.01': [process.env.NEXT_PUBLIC_BING_VERIFICATION || ''],
            },
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
    type?: 'Person' | 'WebSite' | 'WebPage' | 'Organization' | 'BreadcrumbList';
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
            alternateName: ['Boba', 'Banu', 'Bondan', 'bondan banuaji', 'boba dev'],
            url: siteConfig.url,
            image: `${siteConfig.url}${image}`,
            jobTitle: 'Full Stack Developer & Creative Technologist',
            description,
            workLocation: {
                '@type': 'Place',
                name: 'Karawang, Indonesia',
                address: {
                    '@type': 'PostalAddress',
                    addressLocality: 'Karawang',
                    addressRegion: 'Jawa Barat',
                    addressCountry: 'ID'
                }
            },
            sameAs: [
                'https://github.com/bondanbanuaji',
                'https://linkedin.com/in/bondanbanuaji',
                'https://www.instagram.com/bondanbanuaji',
                'https://twitter.com/bondanbanuaji'
            ],
            knowsAbout: [
                'Web Development',
                'Full Stack Development',
                'Frontend Development',
                'Backend Development',
                'React',
                'Next.js',
                'TypeScript',
                'JavaScript',
                'Three.js',
                'GSAP',
                'WebGL',
                '3D Web Experiences',
                'Interactive Design',
                'UI/UX Development',
                'Creative Technology',
                'Node.js',
                'Web Animation'
            ],
            knowsLanguage: [
                {
                    '@type': 'Language',
                    name: 'Indonesian',
                    alternateName: 'id'
                },
                {
                    '@type': 'Language',
                    name: 'English',
                    alternateName: 'en'
                }
            ],
            alumniOf: {
                '@type': 'EducationalOrganization',
                name: 'Informatics Engineering'
            }
        };
    }

    if (type === 'WebSite') {
        return {
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'Bondan Banuaji Portfolio',
            alternateName: ['Boba.dev', 'Boba Portfolio', 'Portfolio Bondan', 'Portfolio Banu'],
            url,
            description,
            inLanguage: ['en', 'id'],
            author: {
                '@type': 'Person',
                name: siteConfig.name,
            },
            potentialAction: {
                '@type': 'SearchAction',
                target: {
                    '@type': 'EntryPoint',
                    urlTemplate: `${url}/search?q={search_term_string}`
                },
                'query-input': 'required name=search_term_string'
            }
        };
    }

    if (type === 'Organization') {
        return {
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Bondan Banuaji - Creative Technology',
            alternateName: 'Boba.dev',
            url: siteConfig.url,
            logo: `${siteConfig.url}${image}`,
            description,
            founder: {
                '@type': 'Person',
                name: siteConfig.name
            },
            address: {
                '@type': 'PostalAddress',
                addressLocality: 'Karawang',
                addressRegion: 'Jawa Barat',
                addressCountry: 'ID'
            },
            sameAs: [
                'https://github.com/bondanbanuaji',
                'https://linkedin.com/in/bondanbanuaji'
            ]
        };
    }

    if (type === 'BreadcrumbList') {
        return {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
                {
                    '@type': 'ListItem',
                    position: 1,
                    name: 'Home',
                    item: siteConfig.url
                },
                {
                    '@type': 'ListItem',
                    position: 2,
                    name,
                    item: url
                }
            ]
        };
    }

    return {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name,
        url,
        description,
        inLanguage: 'en',
        isPartOf: {
            '@type': 'WebSite',
            name: 'Bondan Banuaji Portfolio',
            url: siteConfig.url
        }
    };
}

export default siteConfig;
