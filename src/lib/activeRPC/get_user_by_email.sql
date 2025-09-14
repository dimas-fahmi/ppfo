CREATE OR REPLACE FUNCTION public.get_user_by_email(p_email TEXT)
RETURNS TABLE (
  email text,
  email_confirmed_at timestamptz,
  confirmation_sent_at timestamptz,
  raw_user_metadata jsonb,
  recovery_sent_at timestamptz
)
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT 
    au.email,
    au.email_confirmed_at,
    au.confirmation_sent_at,
    au.raw_user_meta_data,
    au.recovery_sent_at
  FROM auth.users au
  WHERE au.email = p_email
  LIMIT 1;
$$;
