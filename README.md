<h1 align="center">
  <a href="https://github.com/buzz/newsdash"><img src="packages/client/src/static/logo-newsdash.svg" alt="newsdash" /></a>
</h1>

<h4 align="center">A news dashboard inspired by iGoogle and Netvibes</h4>

<p align="center">
  <a href="https://github.com/buzz/newsdash/releases/latest"><img src="https://img.shields.io/github/package-json/v/buzz/newsdash?color=%23999"></a> <a href="https://github.com/buzz/newsdash/issues"><img src="https://img.shields.io/github/issues/buzz/newsdash"></a> <a href="#computer-installation"><img src="https://img.shields.io/badge/self-hosted-blue"></a> <a href="https://github.com/buzz/newsdash/issues"><img src="https://img.shields.io/badge/contributions-welcome-brightgreen"></a> <a href="https://www.gnu.org/licenses/agpl-3.0.en.html"><img src="https://img.shields.io/github/license/buzz/newsdash"></a>
</p>

<p align="center">
  <a href="#star-features">Features</a> •
  <a href="#thinking-motivation">Motivation</a> •
  <a href="#computer-installation">Installation</a> •
  <a href="#hammer_and_wrench-development">Development</a> •
  <a href="#love_letter-credits">Credits</a> •
  <a href="#license">License</a>
</p>

![Screenshot](https://i.imgur.com/NGpqacs.gif)

## :star: Features

- Customizable grid-based dashboard
- Support for Atom and RSS feeds
- 4 different feed layouts: condensed, list, detailed, tiles
- Tabbed multi-feeds
- Import/Export of settings and feeds
- Clean and simple design
- Carefully handcrafted

## :thinking: Motivation

I couldn't find a modern and simple web-based feed reader that met my
requirements. So I wrote my own.

## :computer: Installation

### Docker

To get you up and running start the Docker image. You can then access the web
app at http://localhost:3001/.

```bash
$ docker run \
    -e REDIS_URL=redis://redis:6380 \
    -p 127.0.0.1:3001:3001 \
    newsdash/newsdash
```

#### Redis

To persist your settings and feeds you need to provide a
[Redis](http://redis.io) instance. You can start a Redis container and link it
to newsdash. [Docker Compose](https://docs.docker.com/compose/) works great for
small setups. Use the environment variable `REDIS_URL` to customize the
connection URL. It's possible to run without Redis in
[API-less mode](#api-less).

#### nginx

For a production deployment you should use some sort of reverse proxy like
[nginx](https://nginx.org/). This way you can add things like basic
authentication, gzip compression and TLS termination. nginx is also much better
at serving the static files. The container exports the minified production
build in the volume `/newsdash/client`.

A sample nginx configuration snippet you can start from.

```nginx
server {
  listen 443 ssl http2;
  server_name newsdash.example.com;
  root /path/to/newsdash-client;

  ssl on;
  ssl_certificate [...];

  auth_basic "Restricted";
  auth_basic_user_file htpasswd_file;

  gzip on;
  gzip_min_length 500;
  gzip_proxied any;
  gzip_types
    text/css
    text/xml
    application/atom+xml
    application/javascript
    application/manifest+json
    application/rdf+xml
    application/rss+xml
    application/xml;

  location /api/ {
    proxy_set_header X-Forwarded-For $remote_addr;
    proxy_set_header Host $http_host;
    proxy_pass http://localhost:3001;
  }

  location / {
    try_files $uri $uri/index.html =404;
  }
}

```

#### API-less

It's possible to run newsdash without the API part.

The upside is, it's easy to deploy. You just have to upload a bunch of static
files. Grab the
[dist package](https://github.com/buzz/newsdash/releases/latest/download/newsdash-dist.zip)
and unzip it to a folder on your webserver.

The web app will detect that it doesn't have access to the API and runs in
fallback mode. It will be fully functional although some limitations apply.

* Feeds are fetched using a public CORS proxy.
* Images are only present if the feed has image URLs included. Usually they
  come in low resolution.
* All settings and feeds are stored locally in your browser. You need to
  transfer them manually to another computer using the import/export function.

## :hammer_and_wrench: Development

Make sure you have recent versions of [Node.js](https://nodejs.org/) and
[Yarn](https://yarnpkg.com/) installed.

Check out the project and start a development server.

```bash
$ git clone https://github.com/buzz/newsdash.git
$ cd newsdash
$ yarn install
$ yarn client:dev
$ yarn server:dev
```

## :love_letter: Credits

Kudos to [Netvibes](https://www.netvibes.com/) and defunct iGoogle. That's
where this project drew its inspiration.

The following packages are used:

- [Babel](https://babeljs.io/)
- [Font Awesome](https://fontawesome.com/)
- [Node.js](https://nodejs.org/)
- [PostCSS](https://postcss.org/)
- [React-Grid-Layout](https://github.com/STRML/react-grid-layout)
- [React](https://reactjs.org/)
- [Redux](https://redux.js.org/)
- [rss-parser](https://github.com/rbren/rss-parser)
- [webpack](https://webpack.js.org/)
- and many more…

## License

[GNU Affero General Public License v3.0](https://www.gnu.org/licenses/agpl-3.0.en.html)
