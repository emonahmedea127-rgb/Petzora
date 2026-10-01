import { supabase } from './supabase';

export interface NewsletterSignupResult {
  ok: boolean;
  alreadySubscribed?: boolean;
  error?: string;
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

  const { error } = await supabase.from('newsletter_subscribers').insert({
    email: normalizedEmail,
    source: normalizedSource,
    status: 'subscribed',
  });

  if (!error) {
    return { ok: true };
  }

  // PostgreSQL unique violation: treat an existing subscriber as a successful signup.
  if (error.code === '23505') {
    return { ok: true, alreadySubscribed: true };
  }

  console.error('Newsletter signup failed:', error);
  return {
    ok: false,
    error: 'Subscription failed. Please try again in a moment.',
  };
}
