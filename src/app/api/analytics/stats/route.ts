import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET(req: NextRequest) {
    try {
        // Total visits (page views)
        const [totalViewsRows] = await db.execute('SELECT COUNT(*) as total FROM visitor_logs');
        const totalViews = (totalViewsRows as any)[0]?.total || 0;

        // Unique visitors (by session_id)
        const [uniqueVisitorsRows] = await db.execute('SELECT COUNT(DISTINCT session_id) as total FROM visitor_logs');
        const uniqueVisitors = (uniqueVisitorsRows as any)[0]?.total || 0;

        // Visitors today
        const [todayRows] = await db.execute('SELECT COUNT(*) as total FROM visitor_logs WHERE DATE(visited_at) = CURDATE()');
        const todayViews = (todayRows as any)[0]?.total || 0;

        // Unique visitors today
        const [todayUniqueRows] = await db.execute('SELECT COUNT(DISTINCT session_id) as total FROM visitor_logs WHERE DATE(visited_at) = CURDATE()');
        const todayUnique = (todayUniqueRows as any)[0]?.total || 0;

        // Recent 5 visitors
        const [recentRows] = await db.execute(`
            SELECT page_path, visited_at, ip_address 
            FROM visitor_logs 
            ORDER BY visited_at DESC 
            LIMIT 5
        `);

        return NextResponse.json({
            totalViews,
            uniqueVisitors,
            todayViews,
            todayUnique,
            recentVisitors: recentRows
        });
    } catch (error) {
        console.error('Error fetching analytics stats:', error);
        return NextResponse.json({ success: false, error: 'Failed to fetch stats' }, { status: 500 });
    }
}
