import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { getAuthUser } from '@/lib/auth';

export async function GET() {
    try {
        const [rows] = await pool.query('SELECT * FROM testimonials ORDER BY created_at DESC');
        return NextResponse.json(rows);
    } catch (error) {
        console.error('API Error (Testimonials):', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    const user = await getAuthUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
        const { name, role, comment, image } = await request.json();
        const [result]: any = await pool.query(
            'INSERT INTO testimonials (name, role, comment, image) VALUES (?, ?, ?, ?)',
            [name, role, comment, image]
        );
        return NextResponse.json({ message: 'Testimonial created successfully', id: result.insertId });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
