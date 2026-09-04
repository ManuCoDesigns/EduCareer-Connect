CREATE TABLE public.membership_payments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  amount INTEGER NOT NULL DEFAULT 2000,
  mpesa_code TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT INSERT ON public.membership_payments TO anon;
GRANT INSERT ON public.membership_payments TO authenticated;
GRANT ALL ON public.membership_payments TO service_role;

ALTER TABLE public.membership_payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a membership payment"
  ON public.membership_payments
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    amount = 2000
    AND length(full_name) BETWEEN 2 AND 120
    AND length(phone) BETWEEN 9 AND 15
    AND length(mpesa_code) BETWEEN 8 AND 20
    AND status = 'pending'
  );