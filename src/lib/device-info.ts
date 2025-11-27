export interface DeviceInfo {
  browser: string;
  os: string;
  deviceType: 'mobile' | 'tablet' | 'desktop';
  screenResolution: string;
  language: string;
  timezone: string;
}

export interface DetailedLocationInfo {
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
}

export function getDeviceInfo(): DeviceInfo {
  const ua = navigator.userAgent;
  
  const getBrowser = (): string => {
    if (ua.includes('Firefox/')) return 'Firefox';
    if (ua.includes('Chrome/') && !ua.includes('Edg')) return 'Chrome';
    if (ua.includes('Safari/') && !ua.includes('Chrome')) return 'Safari';
    if (ua.includes('Edg/')) return 'Edge';
    if (ua.includes('Opera') || ua.includes('OPR/')) return 'Opera';
    return 'Unknown Browser';
  };

  const getOS = (): string => {
    if (ua.includes('Windows NT 10.0')) return 'Windows 10/11';
    if (ua.includes('Windows NT 6.3')) return 'Windows 8.1';
    if (ua.includes('Windows NT 6.2')) return 'Windows 8';
    if (ua.includes('Windows NT 6.1')) return 'Windows 7';
    if (ua.includes('Mac OS X')) {
      const match = ua.match(/Mac OS X (\d+[._]\d+)/);
      return match ? `macOS ${match[1].replace('_', '.')}` : 'macOS';
    }
    if (ua.includes('Android')) {
      const match = ua.match(/Android (\d+(\.\d+)?)/);
      return match ? `Android ${match[1]}` : 'Android';
    }
    if (ua.includes('iPhone') || ua.includes('iPad')) {
      const match = ua.match(/OS (\d+_\d+)/);
      return match ? `iOS ${match[1].replace('_', '.')}` : 'iOS';
    }
    if (ua.includes('Linux')) return 'Linux';
    return 'Unknown OS';
  };

  const getDeviceType = (): 'mobile' | 'tablet' | 'desktop' => {
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
      return 'tablet';
    }
    if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
      return 'mobile';
    }
    return 'desktop';
  };

  return {
    browser: getBrowser(),
    os: getOS(),
    deviceType: getDeviceType(),
    screenResolution: `${window.screen.width}x${window.screen.height}`,
    language: navigator.language,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  };
}

async function getIPBasedLocation(): Promise<Partial<DetailedLocationInfo>> {
  try {
    const res = await fetch('https://ipapi.co/json/');
    const data = await res.json();
    
    const latitude = data.latitude || null;
    const longitude = data.longitude || null;
    
    return {
      ip: data.ip || 'Unknown',
      latitude,
      longitude,
      accuracy: data.accuracy || null,
      mapsLink: latitude && longitude ? `https://www.google.com/maps?q=${latitude},${longitude}` : '-',
      address: data.city || '-',
      village: '-',
      district: data.region || '-',
      city: data.city || 'Unknown',
      province: data.region || 'Unknown',
      country: data.country_name || 'Unknown',
      postalCode: data.postal || '-',
      fullAddress: `${data.city || ''}, ${data.region || ''}, ${data.country_name || ''}`.replace(/^,\s*|,\s*$/g, ''),
    };
  } catch (error) {
    return { 
      ip: 'Unknown', 
      latitude: null,
      longitude: null,
      accuracy: null,
      mapsLink: '-',
      address: '-',
      village: '-',
      district: '-',
      city: 'Unknown', 
      province: 'Unknown', 
      country: 'Unknown',
      postalCode: '-',
      fullAddress: 'Unknown',
    };
  }
}

async function reverseGeocode(lat: number, lon: number): Promise<Partial<DetailedLocationInfo>> {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&addressdetails=1&accept-language=id`,
      {
        headers: {
          'User-Agent': 'Boba.dev Website',
        },
      }
    );
    
    const data = await response.json();
    const addr = data.address || {};
    
    return {
      address: addr.road || addr.street || addr.suburb || '-',
      village: addr.village || addr.hamlet || addr.neighbourhood || '-',
      district: addr.suburb || addr.district || addr.quarter || '-',
      city: addr.city || addr.town || addr.municipality || addr.county || '-',
      province: addr.state || addr.province || '-',
      country: addr.country || '-',
      postalCode: addr.postcode || '-',
      fullAddress: data.display_name || '-',
    };
  } catch (error) {
    console.error('Reverse geocoding failed:', error);
    return {
      address: '-',
      village: '-',
      district: '-',
      city: '-',
      province: '-',
      country: '-',
      postalCode: '-',
      fullAddress: '-',
    };
  }
}

export async function getDetailedLocationInfo(): Promise<DetailedLocationInfo> {
  const ipData = await getIPBasedLocation();
  
  if (ipData.latitude && ipData.longitude) {
    const geocodeData = await reverseGeocode(ipData.latitude, ipData.longitude);
    
    return {
      ip: ipData.ip || 'Unknown',
      latitude: ipData.latitude ?? null,
      longitude: ipData.longitude ?? null,
      accuracy: ipData.accuracy ?? null,
      mapsLink: ipData.mapsLink || '-',
      address: geocodeData.address || ipData.address || '-',
      village: geocodeData.village || ipData.village || '-',
      district: geocodeData.district || ipData.district || '-',
      city: geocodeData.city || ipData.city || 'Unknown',
      province: geocodeData.province || ipData.province || 'Unknown',
      country: geocodeData.country || ipData.country || 'Unknown',
      postalCode: geocodeData.postalCode || ipData.postalCode || '-',
      fullAddress: geocodeData.fullAddress || ipData.fullAddress || 'Unknown',
    };
  }
  
  return {
    ip: ipData.ip || 'Unknown',
    latitude: ipData.latitude ?? null,
    longitude: ipData.longitude ?? null,
    accuracy: ipData.accuracy ?? null,
    mapsLink: ipData.mapsLink || '-',
    address: ipData.address || '-',
    village: ipData.village || '-',
    district: ipData.district || '-',
    city: ipData.city || 'Unknown',
    province: ipData.province || 'Unknown',
    country: ipData.country || 'Unknown',
    postalCode: ipData.postalCode || '-',
    fullAddress: ipData.fullAddress || 'Unknown',
  };
}
