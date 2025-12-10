---
description: Deploy to Vercel
---

# Deploy to Vercel Workflow

This workflow guides you through deploying your Next.js admin panel to Vercel.

## Prerequisites

1. Create a Vercel account at https://vercel.com if you don't have one
2. Install Vercel CLI globally (optional but recommended)

## Deployment Steps

### Option 1: Deploy via Vercel Dashboard (Recommended for first deployment)

1. **Push your code to GitHub**

   - Make sure all your changes are committed
   - Push to your GitHub repository

   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push origin main
   ```

2. **Import project to Vercel**

   - Go to https://vercel.com/new
   - Click "Import Git Repository"
   - Select your `admin-panel` repository
   - Vercel will automatically detect Next.js and configure settings

3. **Configure build settings (if needed)**

   - Framework Preset: Next.js (auto-detected)
   - Build Command: `next build` (default)
   - Output Directory: `.next` (default)
   - Install Command: `npm install` (default)

4. **Add Environment Variables (if any)**

   - If you have any `.env` files, add them in the Environment Variables section
   - Example: API keys, database URLs, etc.

5. **Deploy**
   - Click "Deploy"
   - Wait for the build to complete
   - Your site will be live at `https://your-project-name.vercel.app`

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**

   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   // turbo

   ```bash
   vercel login
   ```

3. **Deploy to preview**
   // turbo

   ```bash
   vercel
   ```

   - Follow the prompts to set up your project
   - This creates a preview deployment

4. **Deploy to production**
   // turbo
   ```bash
   vercel --prod
   ```

## Post-Deployment

1. **Custom Domain (Optional)**

   - Go to your project settings on Vercel
   - Navigate to "Domains"
   - Add your custom domain

2. **Set up automatic deployments**
   - By default, Vercel auto-deploys on every push to main branch
   - Preview deployments are created for pull requests

## Troubleshooting

- **Build fails**: Check the build logs in Vercel dashboard
- **Environment variables**: Make sure all required env vars are set in Vercel
- **API routes not working**: Ensure your API routes follow Next.js conventions

## Important Notes

- Vercel automatically handles SSL certificates
- CDN and edge network are included by default
- Serverless functions are created for API routes
- Build logs are available in the Vercel dashboard
