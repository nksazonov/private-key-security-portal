import { redirect } from 'next/navigation';

// This page is only used to redirect to the default locale
export default function RootPage() {
  // We do a client-side redirect here, not a middleware one
  redirect('/en');
}