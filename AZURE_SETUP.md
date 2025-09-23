# Azure Static Web App Creation Guide

## Option 1: Create via Azure Portal

1. Go to Azure Portal: https://portal.azure.com
2. Click "Create a resource"
3. Search for "Static Web App"
4. Click "Create"
5. Fill in:
   - Subscription: Your subscription
   - Resource Group: Create new or use existing
   - Name: `reactjs-frontend-swa` (or your preferred name)
   - Plan type: Free
   - Region: Choose closest to you
   - Source: GitHub
   - GitHub account: Connect your account
   - Organization: seshangamage
   - Repository: ReactJs-Frontend
   - Branch: main
   - Build presets: React
   - App location: /
   - Output location: build

6. Click "Review + create"
7. Click "Create"
8. After creation, get the deployment token from Overview page

## Option 2: Create via GitHub (Automatic)

The workflow will automatically create a Static Web App if you provide a valid Azure subscription and set up the proper authentication.

## Next Steps

After creating the Static Web App:
1. Copy the deployment token
2. Add it to GitHub secrets as AZURE_STATIC_WEB_APPS_API_TOKEN
3. Re-run the workflow