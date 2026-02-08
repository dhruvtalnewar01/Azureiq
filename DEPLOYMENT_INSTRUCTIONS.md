# 🚀 Deployment Instructions

I've prepared your project for deployment! 

## 1. Push to GitHub

Since I don't have access to your GitHub credentials, run these commands in your terminal to push the code:

```bash
# 1. The remote is already configured to: https://github.com/dhruvtalnewar01/Azureiq.git
# You can verify this by running:
git remote -v

# 2. Rename branch to main (if not already done)
git branch -M main

# 3. Push your code
git push -u origin main
```

## 2. Deploy to Netlify

1.  Log in to [Netlify](https://app.netlify.com/).
2.  Click **"Add new site"** > **"Import from an existing project"**.
3.  Select **GitHub**.
4.  Choose your `Azureiq` repository.
5.  **Build Settings:**
    *   **Base directory:** (leave empty)
    *   **Build command:** `npm run build`
    *   **Publish directory:** `out`
6.  **Environment Variables:**
    *   Click **"Add environment variables"**.
    *   Key: `NEXT_PUBLIC_VAPI_PUBLIC_KEY`
    *   Value: `1fd2ad76-3d06-4032-8d59-aba957b6fd73`
    *   Key: `NEXT_PUBLIC_VAPI_ASSISTANT_ID`
    *   Value: `077243aa-77e8-40bc-ac95-3d241f589c55`
7.  Click **"Deploy"**.

Your site will be live on a Netlify URL shortly!
