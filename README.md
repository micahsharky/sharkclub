# Shark Club

A GitHub Pages-ready static site with an editor-friendly Decap CMS at `/admin/`. The public site has no build step and no server-side runtime.

## Preview locally

```bash
npm install
npm run dev
```

Open `http://localhost:8080/` for the site and `http://localhost:8080/admin/` for the local CMS. The local CMS writes changes directly to `content/site.json` and places uploads in `assets/uploads/`.

## Publish on GitHub Pages

1. Create or use the `micahsharky/sharkclub` GitHub repository and push this project to its `main` branch.
2. In the repository, open **Settings → Pages** and choose **GitHub Actions** as the source.
3. The included Pages workflow publishes the site at `https://micahsharky.github.io/sharkclub/`.

If the repository owner, repository name, branch, or domain changes, update `admin/config.yml`.

## Enable the live CMS login

The admin UI is already configured at `https://micahsharky.github.io/sharkclub/admin/`. GitHub requires an OAuth server for browser-based CMS authentication; GitHub Pages does not provide one.

Use Decap's supported GitHub authentication setup:

1. Create a small Netlify site linked to this repository. It is used for authentication only; GitHub Pages remains the public host.
2. In that Netlify site's access/authentication settings, add GitHub as an OAuth provider and connect it to the repository.
3. Confirm that the site's domain is allowed for authentication. If Netlify gives the auth site a separate domain, add its hostname as `site_domain` under `backend` in `admin/config.yml`.
4. Editors sign in from `/admin/` with a GitHub account that has push access to this repository. They edit content and upload images from the CMS; publishing commits those changes and triggers the Pages deployment automatically.

For editors who should not need GitHub accounts or repository access, switch the CMS backend to `git-gateway` and enable an identity provider connected to the repository.

Official references: [Decap GitHub backend](https://decapcms.org/docs/github-backend/) and [backend authentication overview](https://decapcms.org/docs/backends-overview/).

## Editable content

The CMS controls club name and tagline, hero image, announcement, homepage sections, benefits, join call-to-action, meeting information, and social links. All content lives in `content/site.json`.
