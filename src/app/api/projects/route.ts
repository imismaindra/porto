import { NextResponse } from 'next/server';
import pool from '@/lib/db';

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
    try {
        const body = await request.json();
        const { title, category, badge, sub_title, description, tags, impact_value_1, impact_label_1, impact_value_2, impact_label_2, thumb_icon, thumb_color, detail_link } = body;
        
        const [result] = await pool.query(
            `INSERT INTO projects (title, category, badge, sub_title, description, tags, impact_value_1, impact_label_1, impact_value_2, impact_label_2, thumb_icon, thumb_color, detail_link) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [title, category, badge, sub_title, description, JSON.stringify(tags), impact_value_1, impact_label_1, impact_value_2, impact_label_2, thumb_icon, thumb_color, detail_link]
        );
        
        return NextResponse.json({ message: 'Project created successfully', id: (result as any).insertId });
    } catch (error) {
        console.error('Database Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
