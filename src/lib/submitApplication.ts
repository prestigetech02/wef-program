export type ApplicationInsert = {
  first_name: string;
  last_name: string;
  phone_number: string;
  address: string;
  local_government: string;
  age_range: string;
  business_type: string;
  what_you_sell: string;
  years_in_business: string;
  monthly_revenue: string;
  has_existing_business: boolean;
  challenges: string;
  programme_benefit: string;
  funding_needs: string;
  equipment_needs: string;
};

const SHEETS_ENDPOINT = import.meta.env.VITE_SHEETS_ENDPOINT as string | undefined;

/**
 * Submits an application to a Google Sheet via a Google Apps Script Web App.
 *
 * The endpoint is a deployed Apps Script Web App URL set in VITE_SHEETS_ENDPOINT.
 * We send JSON with a text/plain content type so the browser treats it as a
 * "simple" request and skips the CORS preflight that Apps Script can't answer.
 */
export async function submitApplication(form: ApplicationInsert): Promise<void> {
  if (!SHEETS_ENDPOINT) {
    throw new Error('Missing VITE_SHEETS_ENDPOINT. Add it to your .env file.');
  }

  const payload = {
    ...form,
    submitted_at: new Date().toISOString(),
  };

  const res = await fetch(SHEETS_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(payload),
    redirect: 'follow',
  });

  if (!res.ok) {
    throw new Error(`Submission failed with status ${res.status}`);
  }

  const data = await res.json().catch(() => null);
  if (data && data.result === 'error') {
    throw new Error(data.message || 'Submission failed.');
  }
}
