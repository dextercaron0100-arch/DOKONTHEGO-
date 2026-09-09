# Doktor On The Go

Local-first healthcare booking website using Vinext, Supabase, Xendit, and Vercel.

## Run locally

```bash
npm install
npm run dev
```

For phone testing on the same Wi-Fi:

```bash
npm run dev -- --hostname 0.0.0.0
```

Then open the network URL shown in the terminal.

## Supabase setup

1. Create a Supabase project.
2. Open **SQL Editor** and run [`supabase/schema.sql`](./supabase/schema.sql).
3. Copy `.env.example` to `.env.local`.
4. Add the Supabase project URL, anon key, and service role key.

The service role key is server-only. Never expose it in client-side code or commit it to GitHub.

## Xendit setup

Add the Xendit secret key and webhook token to `.env.local`. Set `NEXT_PUBLIC_APP_URL` to your Vercel HTTPS URL in production. Configure this webhook in Xendit:

```text
https://your-vercel-domain.vercel.app/api/payments/webhook
```

The appointment flow creates a Supabase appointment, redirects the patient to Xendit hosted checkout, and confirms the appointment after a verified webhook.

## Deploy to Vercel

Import the GitHub repository into Vercel, add the variables from `.env.example`, and deploy. Run the Supabase SQL migration before testing appointment booking.
