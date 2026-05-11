import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { getAuthUser } from '@/lib/auth';

export async function GET() {
    try {
        const [rows] = await pool.query('SELECT * FROM tech_stack ORDER BY name ASC');
        return NextResponse.json(rows);
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    const user = await getAuthUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
        const body = await request.json();
        const { name, icon, color, active } = body;
        const [result] = await pool.query(
            'INSERT INTO tech_stack (name, icon, color, active) VALUES (?, ?, ?, ?)',
            [name, icon, color, active !== undefined ? active : true]
        );
        return NextResponse.json({ id: (result as any).insertId, ...body });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
