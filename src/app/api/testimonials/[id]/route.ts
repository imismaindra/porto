import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { getAuthUser } from '@/lib/auth';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const user = await getAuthUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
        const { id } = await params;
        const { name, role, comment, image } = await request.json();
        await pool.query(
            'UPDATE testimonials SET name = ?, role = ?, comment = ?, image = ? WHERE id = ?',
            [name, role, comment, image, id]
        );
        return NextResponse.json({ message: 'Testimonial updated successfully' });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const user = await getAuthUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
        const { id } = await params;
        await pool.query('DELETE FROM testimonials WHERE id = ?', [id]);
        return NextResponse.json({ message: 'Testimonial deleted successfully' });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
