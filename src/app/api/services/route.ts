import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { getAuthUser } from '@/lib/auth';

export async function GET() {
    try {
        const [rows] = await pool.query('SELECT * FROM services ORDER BY created_at DESC');
        return NextResponse.json(rows);
    } catch (error) {
        console.error('API Error (Services):', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    const user = await getAuthUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
        const { title, icon, description } = await request.json();
        const [result]: any = await pool.query(
            'INSERT INTO services (title, icon, description) VALUES (?, ?, ?)',
            [title, icon, description]
        );
        return NextResponse.json({ message: 'Service created successfully', id: result.insertId });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
