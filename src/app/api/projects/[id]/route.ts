import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { getAuthUser } from '@/lib/auth';

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const user = await getAuthUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
        const { id } = await params;
        await pool.query('DELETE FROM projects WHERE id = ?', [id]);
        return NextResponse.json({ message: 'Project deleted successfully' });
    } catch (error) {
        console.error('Database Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const user = await getAuthUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
        const { id } = await params;
        const body = await request.json();
        const { title, category, badge, sub_title, description, tags, impact_value_1, impact_label_1, impact_value_2, impact_label_2, thumb_icon, thumb_color, image, detail_link } = body;
        
        await pool.query(
            `UPDATE projects SET 
                title = ?, category = ?, badge = ?, sub_title = ?, description = ?, 
                tags = ?, impact_value_1 = ?, impact_label_1 = ?, impact_value_2 = ?, 
                impact_label_2 = ?, thumb_icon = ?, thumb_color = ?, image = ?, detail_link = ? 
             WHERE id = ?`,
            [title, category, badge, sub_title, description, JSON.stringify(tags), impact_value_1, impact_label_1, impact_value_2, impact_label_2, thumb_icon, thumb_color, image, detail_link, id]
        );
        
        return NextResponse.json({ message: 'Project updated successfully' });
    } catch (error) {
        console.error('Database Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
