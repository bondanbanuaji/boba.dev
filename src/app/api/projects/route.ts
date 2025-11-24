import { NextResponse } from 'next/server';
import { getPinnedRepos } from '@/lib/github';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const repos = await getPinnedRepos();
        return NextResponse.json(repos);
    } catch (error) {
        console.error('API Route Error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch projects' },
            { status: 500 }
        );
    }
}
