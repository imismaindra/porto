import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { getAuthUser } from '@/lib/auth';

export async function GET() {
    const user = await getAuthUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
        const [rows] = await pool.query('SELECT * FROM messages ORDER BY created_at DESC');
        return NextResponse.json(rows);
    } catch (error) {
        console.error('Database Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { sender_name, sender_email, message } = body;

        if (!sender_name || !sender_email || !message) {
            return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
        }
        
        const [result] = await pool.query(
            `INSERT INTO messages (sender_name, sender_email, message, status) 
             VALUES (?, ?, ?, 'new')`,
            [sender_name, sender_email, message]
        );
        
        return NextResponse.json({ 
            message: 'Message sent successfully', 
            id: (result as any).insertId 
        });
    } catch (error: any) {
        console.error('Database POST Error:', error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
