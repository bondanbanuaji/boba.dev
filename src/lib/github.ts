// GitHub GraphQL API untuk mengambil pinned repositories
const GITHUB_GRAPHQL_API = 'https://api.github.com/graphql';

export interface GitHubRepo {
    name: string;
    description: string;
    url: string;
    stargazerCount: number;
    forkCount: number;
    primaryLanguage: {
        name: string;
        color: string;
    } | null;
    languages: {
        nodes: Array<{
            name: string;
        }>;
    };
    homepageUrl: string | null;
    isPrivate: boolean;
}

export interface PinnedRepo {
    id: string;
    title: string;
    description: string;
    tech: string[];
    stars: number;
    forks: number;
    language: string;
    languageColor: string;
    url: string;
    homepageUrl: string | null;
    image: string; // Custom local image path
}

const GRAPHQL_QUERY = `
  query GetPinnedRepos($username: String!) {
    user(login: $username) {
      pinnedItems(first: 6, types: REPOSITORY) {
        nodes {
          ... on Repository {
            name
            description
            url
            stargazerCount
            forkCount
            primaryLanguage {
              name
              color
            }
            languages(first: 10) {
              nodes {
                name
              }
            }
            homepageUrl
            isPrivate
          }
        }
      }
    }
  }
`;

// Mapping untuk custom images (simpan di public/img/projects/)
const PROJECT_IMAGES: Record<string, string> = {
    'yuibot-v1': '/img/projects/yuibot.jpg',
    'bobanimelist': '/img/projects/bobanimelist.jpg',
    'taimuchatto': '/img/projects/taimuchatto.jpg',
    'Heart-Disease-Risk-Prediction': '/img/projects/heart-disease.jpg',
};

// Mapping untuk custom tech stack setiap project
const PROJECT_TECH_STACK: Record<string, string[]> = {
    'yuibot-v1': ['Python', 'Telegram Bot API', 'Gemini AI'],
    'bobanimelist': ['TypeScript', 'React', 'Redux Toolkit', 'TailwindCSS'],
    'taimuchatto': ['JavaScript', 'React', 'Node.js', 'Socket.io'],
    'Heart-Disease-Risk-Prediction': ['Python', 'Streamlit', 'Machine Learning', 'Scikit-learn'],
};

export async function getPinnedRepos(username: string = 'bondanbanuaji'): Promise<PinnedRepo[]> {
    try {
        console.log('🔍 Fetching pinned repos from GitHub API...');
        
        // Prepare headers with optional authentication
        const headers: HeadersInit = {
            'Content-Type': 'application/json',
        };

        // Add GitHub token if available (increases rate limit from 60/hour to 5000/hour)
        const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN || process.env.GITHUB_TOKEN;
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
            console.log('✅ GitHub token found and added to request');
        } else {
            console.warn('⚠️ No GitHub token found - API will be rate limited');
        }

        const response = await fetch(GITHUB_GRAPHQL_API, {
            method: 'POST',
            headers,
            body: JSON.stringify({
                query: GRAPHQL_QUERY,
                variables: { username },
            }),
            next: {
                revalidate: 60, // Cache selama 1 menit (untuk testing, nanti bisa dinaikkan lagi)
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`GitHub API error ${response.status}:`, errorText);

            if (response.status === 403) {
                console.warn('⚠️ GitHub API rate limit reached. Using fallback data.');
                console.warn('💡 Tip: Add GITHUB_TOKEN to .env.local to increase rate limit.');
            }

            throw new Error(`GitHub API error: ${response.status}`);
        }

        const data = await response.json();

        if (data.errors) {
            console.error('❌ GraphQL errors:', data.errors);
            throw new Error('Failed to fetch pinned repositories');
        }

        const repos: GitHubRepo[] = data.data?.user?.pinnedItems?.nodes || [];
        console.log(`✅ Successfully fetched ${repos.length} pinned repositories from GitHub`);

        // Transform data GitHub ke format yang diinginkan
        return repos
            .filter((repo) => !repo.isPrivate) // Filter hanya public repos
            .map((repo) => {
                // Gunakan custom tech stack jika tersedia, fallback ke GitHub languages
                const techStack = PROJECT_TECH_STACK[repo.name] || 
                    repo.languages.nodes.slice(0, 4).map((lang) => lang.name);

                return {
                    id: repo.name,
                    title: formatRepoName(repo.name),
                    description: repo.description || 'No description provided',
                    tech: techStack,
                    stars: repo.stargazerCount,
                    forks: repo.forkCount,
                    language: repo.primaryLanguage?.name || 'Unknown',
                    languageColor: repo.primaryLanguage?.color || '#808080',
                    url: repo.url,
                    homepageUrl: repo.homepageUrl,
                    image: PROJECT_IMAGES[repo.name] || '/img/projects/default.jpg',
                };
            });
    } catch (error) {
        console.error('❌ Error fetching pinned repos:', error);
        console.warn('⚠️ Using fallback data instead of live GitHub data');
        // Return fallback data jika API gagal
        return getFallbackProjects();
    }
}

// Format nama repository menjadi lebih readable
function formatRepoName(name: string): string {
    return name
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

// Fallback data jika GitHub API tidak tersedia
function getFallbackProjects(): PinnedRepo[] {
    return [
        {
            id: 'yuibot-v1',
            title: 'Yuibot V1',
            description: '🤖 Yui-Bot: A tsundere-inspired Telegram chatbot (K-ON! Yui Hirasawa) with memory, vent mode, fun commands & Gemini API.',
            tech: ['Python', 'Telegram Bot API', 'Gemini AI'],
            stars: 4,
            forks: 0,
            language: 'Python',
            languageColor: '#3572A5',
            url: 'https://github.com/bondanbanuaji/yuibot-v1',
            homepageUrl: null,
            image: '/img/projects/yuibot.jpg',
        },
        {
            id: 'bobanimelist',
            title: 'Bobanimelist',
            description: 'bobanimelist — an anime and manga discovery platform built with React, TypeScript, and Redux Toolkit 🎬. Explore anime, manga, manhwa, and manhua with smooth animations, elegant dark/light themes 🌗',
            tech: ['TypeScript', 'Jikan API', 'React', 'Redux Toolkit', 'TailwindCSS',],
            stars: 2,
            forks: 1,
            language: 'TypeScript',
            languageColor: '#3178c6',
            url: 'https://github.com/bondanbanuaji/bobanimelist',
            homepageUrl: null,
            image: '/img/projects/bobanimelist.jpg',
        },
        {
            id: 'taimuchatto',
            title: 'Taimuchatto',
            description: '🧋 TaimuChatto is a real-time, full-stack chat application utilizing the MERN Stack (MongoDB, Express, React, Node.js) and Socket.io. It features secure JWT authentication and instant messaging.',
            tech: ['JavaScript', 'React', 'Node.js', 'Socket.io', 'Mongo DB', 'Express.js'],
            stars: 2,
            forks: 0,
            language: 'JavaScript',
            languageColor: '#f1e05a',
            url: 'https://github.com/bondanbanuaji/taimuchatto',
            homepageUrl: null,
            image: '/img/projects/taimuchatto.jpg',
        },
        {
            id: 'Heart-Disease-Risk-Prediction',
            title: 'Heart Disease Risk Prediction',
            description: 'A web application built with Streamlit for predicting heart disease risk based on demographic and lifestyle factors using a trained C4.5 Decision Tree model.',
            tech: ['Python', 'Streamlit', 'Machine Learning', 'Scikit-learn'],
            stars: 0,
            forks: 0,
            language: 'Jupyter Notebook',
            languageColor: '#DA5B0B',
            url: 'https://github.com/bondanbanuaji/Heart-Disease-Risk-Prediction',
            homepageUrl: null,
            image: '/img/projects/heart-disease.jpg',
        },
    ];
}
