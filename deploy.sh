#!/bin/bash
set -e

echo "🚀 Starting CharityLoop Deployment to https://charityloop.dezly.vip..."

# Create data directories if not exist
mkdir -p data uploads

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "📦 Docker not found. Installing Docker & Docker Compose..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
    rm get-docker.sh
fi

# Build and start container
echo "🔨 Building and launching CharityLoop container..."
docker compose down || true
docker compose up -d --build

echo "✅ CharityLoop Container is running on port 3000!"

# Check if Nginx is installed
if command -v nginx &> /dev/null; then
    echo "🌐 Configuring Nginx reverse proxy..."
    sudo cp nginx.conf /etc/nginx/sites-available/charityloop
    sudo ln -sf /etc/nginx/sites-available/charityloop /etc/nginx/sites-enabled/
    sudo nginx -t && sudo systemctl reload nginx
    echo "🔒 To setup free SSL certificate (HTTPS), run:"
    echo "   sudo certbot --nginx -d charityloop.dezly.vip"
fi

echo "🎉 Deployment complete! Visit: https://charityloop.dezly.vip"
