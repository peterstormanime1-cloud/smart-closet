# StyleSync - Vercel Deployment Guide

This guide will help you deploy your StyleSync application to Vercel.

## Prerequisites

- A [Vercel account](https://vercel.com/signup) (free tier works fine)
- Your project pushed to a Git repository (GitHub, GitLab, or Bitbucket)
- A Google Gemini API key

## Deployment Steps

### 1. Push Your Code to Git

If you haven't already, push your project to a Git repository:

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin YOUR_REPOSITORY_URL
git push -u origin main
```

### 2. Import Project to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New Project"**
3. Select **"Import Git Repository"**
4. Choose your repository from the list
5. Click **"Import"**

### 3. Configure Environment Variables

Before deploying, you need to add your environment variables:

1. In the project configuration screen, scroll to **"Environment Variables"**
2. Add the following variable:
   - **Name**: `GEMINI_API_KEY`
   - **Value**: Your Google Gemini API key
   - **Environment**: Select all (Production, Preview, Development)
3. Click **"Add"**

> **Important**: Your `.env.local` file is gitignored and won't be deployed. All secrets must be added as environment variables in Vercel.

### 4. Deploy

1. Review your project settings:
   - **Framework Preset**: Next.js (should be auto-detected)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)
   - **Install Command**: `npm install` (default)
2. Click **"Deploy"**

Vercel will now build and deploy your application. This usually takes 1-3 minutes.

### 5. Access Your Deployed App

Once deployment is complete:
- Click on the deployment URL (e.g., `your-project.vercel.app`)
- Your StyleSync app should now be live!

## Post-Deployment

### Custom Domain (Optional)

To add a custom domain:
1. Go to your project's **Settings** → **Domains**
2. Add your domain name
3. Follow the DNS configuration instructions

### Environment Variables Management

To update environment variables after deployment:
1. Go to **Settings** → **Environment Variables**
2. Edit or add new variables
3. Redeploy to apply changes (automatic for new commits)

### Monitoring

Vercel provides:
- **Analytics**: Visit the Analytics tab to see traffic and performance metrics
- **Logs**: Check the Deployments tab for build and runtime logs
- **Error Tracking**: Any errors will appear in the Functions logs

## Troubleshooting

### Build Fails

If your build fails:
1. Check the build logs in Vercel dashboard
2. Ensure all dependencies are in `package.json`
3. Verify environment variables are set correctly

### API Routes Not Working

- Ensure your API routes are in `src/app/api/` directory
- Check that environment variables are properly set
- Review function logs for errors

### Images Not Loading

If external images aren't loading:
- Verify the domains are listed in `next.config.mjs` under `images.remotePatterns`
- Current allowed domains: pollinations.ai, image.pollinations.ai, source.unsplash.com, images.unsplash.com

## Automatic Deployments

Every time you push to your main branch, Vercel will automatically:
1. Build your application
2. Run any tests
3. Deploy to production (if successful)

Pull requests will create preview deployments automatically.

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
- [Environment Variables in Vercel](https://vercel.com/docs/environment-variables)
