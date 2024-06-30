import template from "./testpage.marko";
export default async (app) => {
  app.get("/testpage", (request, reply) => {
    reply.marko(template, {});
  });
};
