import { handleUpload } from '@vercel/blob';

export default async function handler(req, res) {
  try {
    const jsonResponse = await handleUpload({
      body: req.body,
      request: req,
      onBeforeGenerateToken: async (pathname) => {
        return {
          allowedContentTypes: ['image/jpeg', 'image/png', 'image/webp', 'audio/mpeg', 'audio/wav'],
          maximumSizeInBytes: 50 * 1024 * 1024, // ۵۰ مگابایت
        };
      },
      onUploadCompleted: async ({ blob }) => {
        console.log('فایل آپلود شد:', blob.url);
        // اینجا می‌توانید لینک را در دیتابیس خود ذخیره کنید
      },
    });

    return res.status(200).json(jsonResponse);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}