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

## Live CMS login

The admin UI is available at `https://micahsharky.github.io/sharkclub/admin/`. GitHub Pages hosts the public site and Netlify Identity plus Git Gateway provide secure CMS authentication and repository writes.

The dedicated Netlify auth project is `sharkclub-cms-auth`. It is connected to this GitHub repository, uses invite-only Netlify Identity, and has Git Gateway enabled. Invite editors in **Netlify → sharkclub-cms-auth → Identity**; invited users can edit and upload from `/admin/` without GitHub access. Every publish is committed to GitHub and automatically redeployed by GitHub Pages.

Official references: [Decap Git Gateway](https://decapcms.org/docs/git-gateway-backend/) and [Netlify Identity setup](https://decapcms.org/docs/choosing-a-backend/).

## Editable content

The CMS controls club name and tagline, hero image, announcement, homepage sections, benefits, join call-to-action, meeting information, and social links. All content lives in `content/site.json`.
