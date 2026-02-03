# Google Sites Embedding Guide

This guide explains how to embed the Arkansas Driver's Exam Review App into a Google Sites page.

## Prerequisites

- A Google Sites website
- The app files hosted online (GitHub Pages, Netlify, or similar)
- Edit access to your Google Site

## Method 1: Using GitHub Pages (Recommended)

### Step 1: Create a GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in (or create a free account)
2. Click the "+" icon in the top-right and select "New repository"
3. Name your repository (e.g., `ar-driver-exam`)
4. Set it to **Public**
5. Click "Create repository"

### Step 2: Upload Your Files

1. Click "uploading an existing file"
2. Drag and drop all app files:
   - `index.html`
   - `styles.css`
   - `app.js`
   - `questions.json`
3. Scroll down and click "Commit changes"

### Step 3: Enable GitHub Pages

1. Go to your repository Settings
2. Scroll down to "Pages" in the left sidebar
3. Under "Source", select "main" branch
4. Click "Save"
5. Wait a few minutes for deployment
6. Your site will be available at: `https://[your-username].github.io/[repository-name]/`

### Step 4: Embed in Google Sites

1. Open your Google Sites page in edit mode
2. Click "Insert" → "Embed"
3. Select "Embed from the web"
4. Choose "By URL" tab
5. Paste your GitHub Pages URL (e.g., `https://yourusername.github.io/ar-driver-exam/`)
6. Click "Insert"
7. Resize the embed frame:
   - Width: Full width or custom
   - Height: At least 800px (recommended: 900-1000px)
8. Click "Publish" to save your changes

## Method 2: Using Netlify (Alternative)

### Step 1: Prepare Your Files

1. Create a folder with all your app files
2. Create a ZIP file of the folder

### Step 2: Deploy to Netlify

1. Go to [Netlify.com](https://www.netlify.com/) and sign up (free)
2. Click "Add new site" → "Deploy manually"
3. Drag and drop your folder (or ZIP file)
4. Wait for deployment to complete
5. Netlify will provide you a URL (e.g., `https://random-name.netlify.app`)
6. Optionally: Change the site name in Site settings

### Step 3: Embed in Google Sites

Follow the same steps as Method 1, Step 4 above, using your Netlify URL.

## Method 3: Single HTML File (Simplest)

If you want the simplest option, you can combine everything into one HTML file.

### Step 1: Create Single File

1. Create a new file called `ar-driver-exam-standalone.html`
2. Copy the contents of `index.html`
3. Replace `<link rel="stylesheet" href="styles.css">` with:
   ```html
   <style>
   /* Paste entire contents of styles.css here */
   </style>
   ```
4. Replace `<script src="app.js"></script>` with:
   ```html
   <script>
   // Paste entire contents of app.js here

   // Then replace the loadQuestions function with:
   async function loadQuestions() {
       // Paste the questions.json data directly here
       questions = {
           "questions": [ /* paste all questions here */ ]
       }.questions;
   }
   </script>
   ```

### Step 2: Upload to Google Drive

1. Upload the standalone HTML file to Google Drive
2. Right-click the file and select "Get link"
3. Change permission to "Anyone with the link"
4. Copy the link

### Step 3: Embed in Google Sites

**Note:** Google Sites may restrict embedding Drive files directly. You'll need to use a hosting service.

## Recommended Embed Settings

For optimal display in Google Sites:

- **Width:** 100% (full width)
- **Height:** 900-1000px minimum
- **Border:** None
- **Scrolling:** Auto (if supported)

## Troubleshooting

### "This content can't be embedded"

**Solution:** Make sure:
- The hosting service allows iframe embedding
- The site is served over HTTPS
- No X-Frame-Options headers are blocking embedding

### App not loading in iframe

**Solution:**
1. Check that all files are uploaded
2. Verify the URL works in a new browser tab
3. Check browser console for errors (F12)
4. Try a different hosting service

### LocalStorage not working

**Solution:**
- LocalStorage works in iframes on most browsers
- If issues persist, some browsers block third-party storage
- Users may need to allow third-party cookies

### Display is too small/large

**Solution:**
- Adjust the iframe height in Google Sites
- Recommended minimum: 800px
- For best experience: 1000px
- The app is responsive and will adjust to width automatically

## Testing Your Embed

Before publishing:

1. ✅ Test in preview mode
2. ✅ Check on mobile devices
3. ✅ Try answering a few questions
4. ✅ Verify localStorage saves progress
5. ✅ Check all navigation buttons work

## Alternative: Link Instead of Embed

If embedding causes issues, you can simply add a link:

1. Add a button or text link in Google Sites
2. Link to your hosted app URL
3. Set to open in new tab (recommended)

**Example:**
> "Click here to access the Arkansas Driver's Exam Review App"

## Advanced: Custom Domain

If you want a custom domain:

### For GitHub Pages:
1. Purchase a domain
2. Add custom domain in repository settings
3. Update DNS records with your domain registrar
4. Use custom domain in Google Sites embed

### For Netlify:
1. Purchase a domain
2. Go to Site settings → Domain management
3. Add custom domain
4. Update DNS records
5. Use custom domain in Google Sites embed

## Maintenance

### Updating Questions

To update the questions after embedding:

1. Edit `questions.json` in your repository/hosting
2. Commit/upload changes
3. The embed will automatically use the new version
4. Users may need to refresh the page

### Updating Code

Same process - just update the relevant files and commit/upload.

## Privacy Considerations

- All student data is stored locally in their browser
- No data is collected or transmitted to servers
- Each student's progress is private to their device
- Inform students that clearing browser data will reset progress

## Accessibility

The app is designed with accessibility in mind:
- High contrast colors
- Large, readable fonts
- Keyboard navigation support
- Screen reader compatible

## Support for Students

Provide these instructions to students:

1. **Saving Progress:** Data is saved automatically - just use the same browser and device
2. **Clearing Progress:** Use the "Reset All Progress" button
3. **Best Practice:** Don't use private/incognito mode (progress won't save)
4. **Browser Recommendation:** Chrome or Firefox for best experience

## Example Embedding Code (if manually editing HTML)

If you're manually adding to a website:

```html
<iframe
    src="https://your-username.github.io/ar-driver-exam/"
    width="100%"
    height="1000px"
    frameborder="0"
    allow="localStorage"
    title="Arkansas Driver Exam Review">
</iframe>
```

## Resources

- **GitHub Pages:** https://pages.github.com/
- **Netlify:** https://www.netlify.com/
- **Google Sites Help:** https://support.google.com/sites/

---

**Questions or issues?** Check that your hosting service allows iframe embedding and that all files are uploaded correctly.
