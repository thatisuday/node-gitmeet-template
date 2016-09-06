# GitMeet-template [![Build Status](https://img.shields.io/travis/thatisuday/gitmeet-template.svg?style=flat-square)](https://travis-ci.org/thatisuday/gitmeet-template) [![npm downloads](https://img.shields.io/npm/dt/gitmeet-template.svg?style=flat-square)](https://www.npmjs.com/package/gitmeet-template) [![npm version](https://img.shields.io/npm/v/gitmeet-template.svg?style=flat-square)](https://www.npmjs.com/package/gitmeet-template) [![npm dependencies](https://img.shields.io/david/thatisuday/gitmeet-template.svg?style=flat-square)](https://www.npmjs.com/package/gitmeet-template)


Simple plug-n-play markdown blog website for node.js

> This template was created for my personal blog at [gitmeet.com](http://gitmeet.com). But due to it's portability and markdown writing format, I guess this help you set up your personal blog within 5 mins.

--

# System requirement
- node.js
- mongodb

--

# Install and configure
- copy latest release of this repo (download and extract .zip file) | `git clone https://github.com/thatisuday/gitmeet-template.git` | `npm install gitmeet-template`
- open cmd/terminal and run `npm install`
- open cmd/terminal and run `bower install` (install bower `npm install -g bower`) 
- edit `createAdmin.js` file from `/api/__once`. Set appropriate credentials. Run this file with node (`node createAdmins.js`). This will create admin document in mongodb to create and manage your posts.
- run `web-server.js` file from parent directory with node. This will start http server at port 8881.
- **sign in** from `/admin/signin`
- **add** post from `/admin/add-post`
- **edit** post from `/admin/edit-post/post-id`. Post id is string followed by `/post/` in url of your post.
- **delete** post by clicking delete button on **edit** page.

> You should run `web-server.js` using `forever` as you want to run this website forever.
> - `npm install -g forever`
> - `forever start web-server.js`

--

# Customize / Build
-  edit constants in `api/constants`
-  edit `index.html`
-  edit files in `templates/__unmin`
-  open cmd/terminal 
-  install gulp globally `npm install -g gulp`
-  build using `gulp build` command.
-  push on your production

--

# disqus comments
- go to [disqus.com](disqus.com) and create a admin account. Get your **shortname**.
- if you are building the repo with gulp, replace `gitmeet` with your *shortname* in `assets/js/src/app/app.js`
- else replace `gitmeet` with your shortname in `.setShortname("gitmeet")` inside `assets/js/dist/app.min.js`.

-- 

# Sitemap
Sitemap for the website will be automatically generated using `sitemap` module for node.js and will be available in `xml` format at `hostname/sitemap.xml`.

> Please edit `hostname` in **web-server.js** to customize your sitemap urls.

-- 

# Bug reports and contributions
- If you face any problems, create a github issue or email me on `uhiwarale@gmail.com`
- If you make any improvements or optimization, please share with us all by giving a PR.
- If you want to use it for commercial purpose, please take permission first.

