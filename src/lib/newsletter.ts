export interface NewsletterSignupResult {
  ok: boolean;
  alreadySubscribed?: boolean;
  error?: string;
}

const DEFAULT_SUPABASE_URL = 'https://wrsiehvxrryqsihqirgm.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY = 'sb_publishable_koPbRs1lun2YdNT5ei-OZg_3viY5Mkn';

function getConfig() {
  const url = ((typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_URL) || DEFAULT_SUPABASE_URL).trim().replace(/\/$/, '');
  const anonKey = ((typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_ANON_KEY) || DEFAULT_SUPABASE_ANON_KEY).trim();
  return { url, anonKey };
}

export async function subscribeToNewsletter(
  email: string,
  source = 'website'
): Promise<NewsletterSignupResult> {
  const normalizedEmail = email.trim().toLowerCase();
  const normalizedSource = source
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 50) || 'website';

  if (!normalizedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
    return { ok: false, error: 'Please enter a valid email address.' };
  }

  const { url, anonKey } = getConfig();

  try {
    const response = await fetch(`${url}/rest/v1/newsletter_subscribers`, {
      method: 'POST',
      headers: {
        apikey: anonKey,
        Authorization: `Bearer ${anonKey}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({
        email: normalizedEmail,
        source: normalizedSource,
        status: 'subscribed',
      }),
    });

    if (response.ok) {
      return { ok: true };
    }

    let errorCode = '';
    try {
      const payload = await response.json();
      errorCode = payload?.code || '';
    } catch {
      // Keep the public error generic if the backend response is not JSON.
    }

    if (response.status === 409 || errorCode === '23505') {
      return { ok: true, alreadySubscribed: true };
    }

    console.error('Newsletter signup failed with status:', response.status);
    return { ok: false, error: 'Subscription failed. Please try again in a moment.' };
  } catch (error) {
    console.error('Newsletter signup failed:', error);
    return { ok: false, error: 'Subscription failed. Please try again in a moment.' };
  }
}
