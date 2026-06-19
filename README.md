# wef-program

Women Empowerment Fund (WEF) landing page + application form. Built with React, TypeScript, Vite and Tailwind. Applications are submitted to a Google Sheet.

## Local development

```bash
npm install
npm run dev
```

## Connect the application form to Google Sheets

The form posts to a Google Apps Script Web App, which appends each submission as a row in a Google Sheet.

1. Create a new **Google Sheet** to hold the applications.
2. In the sheet, open **Extensions → Apps Script**.
3. Delete the default code and paste in the contents of [`google-apps-script/Code.gs`](./google-apps-script/Code.gs).
4. Run the `setup` function once (select it in the toolbar and press **Run**), and approve the permissions prompt. This creates the header row.
5. Click **Deploy → New deployment**, choose type **Web app**:
   - **Execute as:** Me
   - **Who has access:** Anyone
6. Copy the **Web app URL** it gives you.
7. Create a `.env` file in the project root (copy from `.env.example`) and set:

   ```
   VITE_SHEETS_ENDPOINT=https://script.google.com/macros/s/XXXXXXXX/exec
   ```

8. Restart `npm run dev`. Submitted applications will now appear as rows in your sheet.

> When you edit `Code.gs`, deploy a **new version** for the change to take effect.

## Link previews & SEO (WhatsApp, Facebook, X)

Before deploying, set your live site URL in `.env`:

```
VITE_SITE_URL=https://your-actual-domain.com
```

This injects absolute URLs into Open Graph, Twitter Card, and canonical meta tags so shared links show a title, description, and preview image.

Included out of the box:

- Open Graph tags (WhatsApp, Facebook, LinkedIn)
- Twitter/X large-image card
- JSON-LD structured data
- `robots.txt` and `sitemap.xml`
- Share preview image at `public/images/og-preview.jpg` (1200×630)

After deploying, test your link at [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) or paste the URL in WhatsApp to confirm the preview.
