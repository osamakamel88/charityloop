#!/bin/bash
set -e

echo "🚀 Deploying CharityLoop with PM2 & Node.js..."

# Install dependencies
npm ci

# Generate Prisma Client & Database sync
npx prisma db push
npx tsx prisma/seed.ts || true

# Build Next.js Production App
npm run build

# Start or reload PM2 process
if command -v pm2 &> /dev/null; then
    pm2 start npm --name "charityloop" -- start || pm2 reload "charityloop"
    pm2 save
else
    echo "⚠️ PM2 not found. Installing PM2 globally..."
    npm install -g pm2
    pm2 start npm --name "charityloop" -- start
    pm2 save
fi

echo "✅ App is running with PM2 on port 3000!"
