import { NextRequest, NextResponse } from 'next/server';

interface VisitorData {
  name: string;
  ip: string;
  latitude: number | null;
  longitude: number | null;
  accuracy: number | null;
  mapsLink: string;
  address: string;
  village: string;
  district: string;
  city: string;
  province: string;
  country: string;
  postalCode: string;
  fullAddress: string;
  browser: string;
  os: string;
  deviceType: string;
  screenResolution: string;
  language: string;
  timezone: string;
  timestamp: string;
}

async function sendTelegram(message: string) {
  const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    return { success: false, error: 'Telegram not configured' };
  }

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: 'Markdown',
        }),
      }
    );

    const result = await response.json();
    return { success: response.ok, data: result };
  } catch (error) {
    return { success: false, error };
  }
}

async function sendDiscord(message: string) {
  const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

  if (!DISCORD_WEBHOOK_URL) {
    return { success: false, error: 'Discord not configured' };
  }

  try {
    const response = await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: message,
        username: 'Boba.dev Visitor Alert',
        avatar_url: 'https://boba.dev/favicon.ico',
      }),
    });

    return { success: response.ok };
  } catch (error) {
    return { success: false, error };
  }
}

async function sendWhatsAppDirect(data: VisitorData) {
  const WHATSAPP_NUMBER = process.env.WHATSAPP_NUMBER || '6289786015389';
  
  const locationDetails = data.latitude 
    ? `📍 *Lokasi GPS:*
• Koordinat: ${data.latitude.toFixed(6)}, ${data.longitude?.toFixed(6)}
• Akurasi: ${data.accuracy ? `${data.accuracy.toFixed(0)}m` : 'Unknown'}
• Maps: ${data.mapsLink}

🏠 *Alamat Lengkap:*
• Alamat: ${data.address}
• Desa: ${data.village}
• Kecamatan: ${data.district}
• Kabupaten: ${data.city}
• Provinsi: ${data.province}
• Negara: ${data.country}
• Kode Pos: ${data.postalCode}
• Full: ${data.fullAddress}`
    : `📍 *Lokasi (IP-Based):*
• Kota: ${data.city}
• Provinsi: ${data.province}
• Negara: ${data.country}`;

  const message = `🚀 *New Visitor Alert!*

👤 *Nama:* ${data.name}
🌐 *IP Address:* ${data.ip}

${locationDetails}

📱 *Device Info:*
• Type: ${data.deviceType}
• OS: ${data.os}
• Browser: ${data.browser}
• Screen: ${data.screenResolution}
• Language: ${data.language}
• Timezone: ${data.timezone}

🕐 *Waktu:* ${data.timestamp}`;

  const encodedMessage = encodeURIComponent(message);
  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
  
  return { success: true, waLink };
}

export async function POST(req: NextRequest) {
  try {
    const data: VisitorData = await req.json();

    const locationDetails = data.latitude 
      ? `📍 **Lokasi GPS:**
• Koordinat: ${data.latitude.toFixed(6)}, ${data.longitude?.toFixed(6)}
• Akurasi: ${data.accuracy ? `${data.accuracy.toFixed(0)}m` : 'Unknown'}
• Maps: ${data.mapsLink}

🏠 **Alamat Lengkap:**
• Alamat: ${data.address}
• Desa/Kelurahan: ${data.village}
• Kecamatan: ${data.district}
• Kabupaten/Kota: ${data.city}
• Provinsi: ${data.province}
• Negara: ${data.country}
• Kode Pos: ${data.postalCode}
• Full Address: ${data.fullAddress}`
      : `📍 **Lokasi (IP-Based):**
• Kota: ${data.city}
• Provinsi: ${data.province}
• Negara: ${data.country}`;

    const message = `🚀 **New Visitor Alert!**

👤 **Nama:** ${data.name}
🌐 **IP Address:** ${data.ip}

${locationDetails}

📱 **Device Info:**
• Device Type: ${data.deviceType}
• Operating System: ${data.os}
• Browser: ${data.browser}
• Screen Resolution: ${data.screenResolution}
• Language: ${data.language}
• Timezone: ${data.timezone}

🕐 **Waktu:** ${data.timestamp}`;

    const results = await Promise.allSettled([
      sendTelegram(message),
      sendDiscord(message),
    ]);

    const telegramResult = results[0].status === 'fulfilled' ? results[0].value : { success: false };
    const discordResult = results[1].status === 'fulfilled' ? results[1].value : { success: false };

    const anySuccess = telegramResult.success || discordResult.success;

    if (!anySuccess) {
      console.warn('All notification methods failed - notifications not configured');
    }

    return NextResponse.json({ 
      success: true,
      message: 'Visitor data received',
      notifications: {
        telegram: telegramResult.success,
        discord: discordResult.success,
      }
    });

  } catch (error) {
    console.error('Error processing visitor data:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
