import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { getAuthUser } from '@/lib/auth';

export async function GET() {
    try {
        const [rows]: any = await pool.query('SELECT * FROM hero LIMIT 1');
        return NextResponse.json(rows[0] || {});
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    const user = await getAuthUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
        const body = await request.json();
        const { name, role, description, greeting, resume_link, profile_image } = body;
        
        // Check if hero exists
        const [existing]: any = await pool.query('SELECT id FROM hero LIMIT 1');
        
        if (existing.length > 0) {
            await pool.query(
                `UPDATE hero SET name = ?, role = ?, description = ?, greeting = ?, resume_link = ?, profile_image = ? WHERE id = ?`,
                [name, role, description, greeting, resume_link, profile_image, existing[0].id]
            );
        } else {
            await pool.query(
                `INSERT INTO hero (name, role, description, greeting, resume_link, profile_image) VALUES (?, ?, ?, ?, ?, ?)`,
                [name, role, description, greeting, resume_link, profile_image]
            );
        }
        
        return NextResponse.json({ message: 'Hero content updated successfully' });
    } catch (error) {
        console.error('Database Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
