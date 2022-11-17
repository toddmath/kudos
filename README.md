# Kudos

Technologies used:

- [Remix](https://remix.run/docs)
- [Prisma](https://www.prisma.io/docs)

## Prisma Tutorials

This App is built following the awesome [Build A Fullstack App with Remix, Prisma & MongoDB](https://www.prisma.io/blog/series/fullstack-remix-prisma-mongodb-MaTVLuwpaICD). Follow along and further your web skills!!

The tutorial is split into 5 sections:

1. [Project Setup](https://www.prisma.io/blog/fullstack-remix-prisma-mongodb-1-7D0BfTXBmB6r)
2. [Authentication](https://www.prisma.io/blog/fullstack-remix-prisma-mongodb-2-ZTmOy58p4re8)
3. [CRUD, Filtering & Sorting](https://www.prisma.io/blog/fullstack-remix-prisma-mongodb-3-By5pmN5Nzo1v)
4. [Referential Integrity & Image Uploads](https://www.prisma.io/blog/fullstack-remix-prisma-mongodb-4-l3MwEp4ZLIm2)
5. [Deployment](https://www.prisma.io/blog/fullstack-remix-prisma-mongodb-5-gOhQsnfUPXSx)

## Deployment

After having run the `create-remix` command and selected "Vercel" as a deployment target, you only need to [import your Git repository](https://vercel.com/new) into Vercel, and it will be deployed.

If you'd like to avoid using a Git repository, you can also deploy the directory by running [Vercel CLI](https://vercel.com/cli):

```sh
npm i -g vercel
vercel
```

It is generally recommended to use a Git repository, because future commits will then automatically be deployed by Vercel, through its [Git Integration](https://vercel.com/docs/concepts/git).

## Development

To run your Remix app locally, make sure your project's local dependencies are installed:

```sh
npm install
```

Afterwards, start the Remix development server like so:

```sh
npm run dev
```

Open up [http://localhost:3000](http://localhost:3000) and you should be ready to go!

If you're used to using the `vercel dev` command provided by [Vercel CLI](https://vercel.com/cli) instead, you can also use that, but it's not needed.
