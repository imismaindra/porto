import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { getAuthUser } from '@/lib/auth';

export async function POST(request: Request) {
    const user = await getAuthUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Define upload directory
        const uploadDir = join(process.cwd(), 'public', 'uploads');
        
        // Ensure directory exists
        try {
            await mkdir(uploadDir, { recursive: true });
        } catch (err) {
            // Directory might already exist
        }

        // Generate unique filename
        const filename = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
        const path = join(uploadDir, filename);

        await writeFile(path, buffer);
        console.log(`File uploaded to ${path}`);

        return NextResponse.json({ 
            message: 'File uploaded successfully', 
            url: `/uploads/${filename}` 
        });
    } catch (error: any) {
        console.error('Upload Error:', error);
        return NextResponse.json({ error: error.message || 'Upload failed' }, { status: 500 });
    }
}
