# 🚀 Deployment Instructions

I've prepared your project for deployment! 

## 1. Push to GitHub

Since I don't have access to your GitHub credentials, run these commands in your terminal to push the code:

```bash
# 1. Create a new repository on GitHub (https://github.com/new)
# Name it 'azure-iq' or similar.
# Do NOT initialize with README, .gitignore, or License.

# 2. Link your local repository to GitHub
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# 3. Rename branch to main
git branch -M main

# 4. Push your code
git push -u origin main
```

## 2. Deploy to Netlify

1.  Log in to [Netlify](https://app.netlify.com/).
2.  Click **"Add new site"** > **"Import from an existing project"**.
3.  Select **GitHub**.
4.  Choose your `azure-iq` repository.
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
