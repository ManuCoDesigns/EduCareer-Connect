-- Donations -----------------------------------------------------------
CREATE TABLE public.donations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  donor_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  amount INTEGER NOT NULL,
  purpose TEXT NOT NULL,
  mpesa_code TEXT NOT NULL,
  anonymous BOOLEAN NOT NULL DEFAULT false,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT INSERT ON public.donations TO anon;
GRANT INSERT ON public.donations TO authenticated;
GRANT ALL ON public.donations TO service_role;

ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a donation"
  ON public.donations
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    length(donor_name) BETWEEN 2 AND 120
    AND length(phone) BETWEEN 9 AND 15
    AND amount BETWEEN 50 AND 1000000
    AND length(purpose) BETWEEN 2 AND 150
    AND length(mpesa_code) BETWEEN 8 AND 20
    AND status = 'pending'
  );

-- Admin access ----------------------------------------------------------
-- Create the admin login in Authentication > Users, then add that user's id
-- to this table (see the comment at the bottom of this file).
CREATE TABLE public.admin_users (
  user_id UUID NOT NULL PRIMARY KEY REFERENCES auth.users (id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
GRANT SELECT ON public.admin_users TO authenticated;
GRANT ALL ON public.admin_users TO service_role;

CREATE POLICY "Admins can see their own admin row"
  ON public.admin_users
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (SELECT 1 FROM public.admin_users WHERE user_id = auth.uid());
$$;

REVOKE ALL ON FUNCTION public.is_admin() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;

-- Admins can read and update (never delete) every submission table.
DO $$
DECLARE t TEXT;
BEGIN
  FOREACH t IN ARRAY ARRAY[
    'contact_messages', 'membership_payments', 'session_bookings',
    'newsletter_subscribers', 'donations'
  ] LOOP
    EXECUTE format('GRANT SELECT, UPDATE ON public.%I TO authenticated', t);
    EXECUTE format(
      'CREATE POLICY "Admins can read %1$s" ON public.%1$I FOR SELECT TO authenticated USING (public.is_admin())', t);
    EXECUTE format(
      'CREATE POLICY "Admins can update %1$s" ON public.%1$I FOR UPDATE TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin())', t);
  END LOOP;
END $$;

-- After creating your admin user in Authentication > Users, run:
--   INSERT INTO public.admin_users (user_id)
--   SELECT id FROM auth.users WHERE email = 'YOUR-ADMIN-EMAIL';
