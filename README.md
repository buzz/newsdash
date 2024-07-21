<h1 align="center">
  <a href="https://github.com/buzz/newsdash"><img src="packages/client/src/assets/logo.svg" alt="newsdash" /></a>
</h1>

<h4 align="center">A news dashboard inspired by iGoogle and Netvibes</h4>

<p align="center">
  <a href="https://github.com/buzz/newsdash/releases/latest"><img src="https://img.shields.io/github/package-json/v/buzz/newsdash?color=%23999"></a> <a href="https://github.com/buzz/newsdash/issues"><img src="https://img.shields.io/github/issues/buzz/newsdash"></a> <a href="#computer-installation"><img src="https://img.shields.io/badge/self-hosted-blue"></a> <a href="https://github.com/buzz/newsdash/issues"><img src="https://img.shields.io/badge/contributions-welcome-brightgreen"></a> <a href="https://www.gnu.org/licenses/agpl-3.0.en.html"><img src="https://img.shields.io/github/license/buzz/newsdash"></a>
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-installation">Installation</a> •
  <a href="#%EF%B8%8F-development">Development</a> •
  <a href="#license">License</a>
</p>

<p align="center">
  <img alt="Screenshot" src="https://github.com/user-attachments/assets/f9b80f44-a0b2-4087-884d-028e3828ec40" />
</p>

## ⭐ Features

- Customizable dock-based dashboard
- Support for Atom and RSS feeds
- Four feed layouts: condensed, list, detailed, tiles
- Tabbed multi-feeds
- Import/Export settings and feeds
- Filter feed items

## 💻 Installation

This is a self-hosted solution with a provided Docker image for easy installation.

### Requirements

- Reverse proxy (nginx recommended)
- Redis

### Docker

To start quickly, run the Docker image, which starts the API server. The static web app is available
under the volume `/client`. For production, you need to serve the static files using [a
webserver](#nginx).

```bash
$ docker run \
    -e REDIS_URL=redis://redis:6380 \
    -p 127.0.0.1:3000:3000 \
    -v ./path/to/client:/client \
    newsdash/newsdash
```

#### Redis

To persist settings and feeds, provide a Redis instance. You can start a [Redis](http://redis.io)
container and link it to newsdash. [Docker Compose](https://docs.docker.com/compose/) is ideal for
small setups. Use the `REDIS_URL` environment variable to customize the connection URL.

#### nginx

For production deployment, use a reverse proxy like [nginx](https://nginx.org/) for:

- Static file serving
- Image caching
- Basic authentication
- Gzip compression
- TLS termination

```nginx
# Sample nginx configuration as starting point

http {
  # ...

  # Cache for newsdash images (highly recommended)
  proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=newsdash_cache:10m max_size=1g inactive=30d use_temp_path=off;

  server {
    listen 443 ssl;
    http2 on;
    server_name newsdash.example.com;
    # point this to the container volume `/client`
    root /path/to/volume/client;

    ssl on;
    ssl_certificate ...;
    ssl_certificate_key ...;

    auth_basic "Restricted";
    auth_basic_user_file htpasswd_file;

    autoindex off;

    gzip on;
    gzip_min_length 500;
    gzip_proxied any;
    gzip_types text/css text/javascript application/json;

    # Cache dynamic images
    location ~ ^/api/feed/(image|logo) {
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header Host $host;
      proxy_pass http://newsdash:3000; # point to newsdash API server
      proxy_http_version 1.1;
      proxy_cache newsdash_cache;
      proxy_cache_key "$scheme$request_method$host$request_uri";
      proxy_cache_valid 200 302 15d;
      proxy_cache_valid 404 1d;
      proxy_cache_use_stale error timeout updating http_500 http_502 http_503 http_504;
      add_header X-Cache-Status $upstream_cache_status;
    }

    # Serve API endpoints
    location ~ ^/api {
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header Host $host;
      proxy_pass http://newsdash:3000; # point to newsdash API server
      proxy_http_version 1.1;
    }

    # Serve static files
    location / {
      try_files $uri $uri/index.html =404;
    }
  }
}
```

## 🛠️ Development

Ensure you have recent versions of [Node.js](https://nodejs.org/) and [pnpm](https://pnpm.io/)
installed.

Clone the project and start a development server.

```bash
$ git clone https://github.com/buzz/newsdash.git
$ cd newsdash
$ pnpm install
$ pnpm dev
```

## License

[GNU Affero General Public License v3.0](https://www.gnu.org/licenses/agpl-3.0.en.html)
