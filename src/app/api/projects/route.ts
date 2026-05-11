import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { getAuthUser } from '@/lib/auth';

export async function GET() {
    try {
        const [rows] = await pool.query('SELECT * FROM projects ORDER BY created_at DESC');
        return NextResponse.json(rows);
    } catch (error) {
        console.error('Database Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    const user = await getAuthUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
        const body = await request.json();
        console.log('API POST Body:', body);
        const { title, category, badge, sub_title, description, tags, impact_value_1, impact_label_1, impact_value_2, impact_label_2, thumb_icon, thumb_color, image, detail_link } = body;
        
        const [result] = await pool.query(
            `INSERT INTO projects (title, category, badge, sub_title, description, tags, impact_value_1, impact_label_1, impact_value_2, impact_label_2, thumb_icon, thumb_color, image, detail_link) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [title, category, badge, sub_title, description, JSON.stringify(tags), impact_value_1, impact_label_1, impact_value_2, impact_label_2, thumb_icon, thumb_color, image, detail_link]
        );
        
        return NextResponse.json({ message: 'Project created successfully', id: (result as any).insertId });
    } catch (error: any) {
        console.error('Database POST Error:', error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
