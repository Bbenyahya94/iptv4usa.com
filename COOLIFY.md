# Coolify deployment

1. Create a new **Docker Compose** resource in Coolify and connect the repository containing this project.
2. Set the compose file to `docker-compose.yml` and deploy.
3. Attach the domain `iptv4usa.com` (and optionally `www.iptv4usa.com`) in Coolify's domain settings. Enable HTTPS there.

The container serves the static `dist/` directory through Nginx on port 80. No environment variables, database, build command, or persistent storage are required.

## Alternative Dockerfile deployment

Choose Coolify's **Dockerfile** build pack with `Dockerfile` at the repository root and expose port `80`.
