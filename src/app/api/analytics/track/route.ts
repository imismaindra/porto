import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { page_path, session_id, referer } = body;
        
        // Get IP and User Agent from headers
        const forwarded = req.headers.get('x-forwarded-for');
        const ip_address = forwarded ? forwarded.split(',')[0] : 'unknown';
        const user_agent = req.headers.get('user-agent') || 'unknown';

        const query = `
            INSERT INTO visitor_logs (ip_address, user_agent, page_path, session_id, referer)
            VALUES (?, ?, ?, ?, ?)
        `;

        await db.execute(query, [
            ip_address,
            user_agent,
            page_path || '/',
            session_id || null,
            referer || null
        ]);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error tracking visitor:', error);
        return NextResponse.json({ success: false, error: 'Failed to track' }, { status: 500 });
    }
}
