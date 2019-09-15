<h1 align="center">
  <a href="https://github.com/buzz/newsdash"><img src="src/static/logo-newsdash.svg" alt="newsdash" /></a>
</h1>

<h4 align="center">A news dashboard inspired by iGoogle and Netvibes</h4>

<p align="center">
  <a href="https://github.com/buzz/newsdash/releases/latest/download/newsdash-dist.zip"><img src="https://img.shields.io/github/package-json/v/buzz/newsdash?color=%23999"></a> <a href="https://github.com/buzz/newsdash/issues"><img src="https://img.shields.io/github/issues/buzz/newsdash"></a> <a href="#computer-installation"><img src="https://img.shields.io/badge/self-hosted-blue"></a> <a href="https://github.com/buzz/newsdash/issues"><img src="https://img.shields.io/badge/contributions-welcome-brightgreen"></a> <a href="https://www.gnu.org/licenses/agpl-3.0.en.html"><img src="https://img.shields.io/github/license/buzz/newsdash"></a>
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

In lack of a decent, modern and simple web-based feed reader I created this
web application mainly for personal use.

## :computer: Installation

Currently newsdash is a
[bunch of static files](https://github.com/buzz/newsdash/releases/latest/download/newsdash-dist.zip)
without a server backend. This means you can just upload it to your web server
and are ready to go.

All settings and feeds are stored in your browser. You can transfer them to
another computer by using the import/export feature.

## :hammer_and_wrench: Development

Make sure you have recent versions of [Node.js](https://nodejs.org/) and
[Yarn](https://yarnpkg.com/) installed.

Check out the project and start a development server.

```sh
$ git clone https://github.com/buzz/newsdash.git
$ cd newsdash
$ yarn install
$ yarn dev
```

## :love_letter: Credits

Kudos to [Netvibes](https://www.netvibes.com/) and defunct iGoogle. That's
where this project drew its inspiration.

The following packages are used:

- [Babel](https://babeljs.io/)
- [Font Awesome](https://fontawesome.com/)
- [Node.js](https://nodejs.org/)
- [React-Grid-Layout](https://github.com/STRML/react-grid-layout)
- [React](https://reactjs.org/)
- [Redux](https://redux.js.org/)
- [rss-parser](https://github.com/rbren/rss-parser)
- [Sass](https://sass-lang.com/)
- [webpack](https://webpack.js.org/)
- and many more…

## License

[GNU Affero General Public License v3.0](https://www.gnu.org/licenses/agpl-3.0.en.html)
