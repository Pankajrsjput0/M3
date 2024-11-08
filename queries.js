import { HttpError } from 'wasp/server'

export const getNovels = async (args, context) => {
  // Ensure the user is authenticated.
  if (!context.user) { throw new HttpError(401) }

  // Retrieve all novels, including cover page link if available.
  return context.entities.Novel.findMany({
    select: {
      id: true,
      title: true,
      author: true,
      genre: true,
      story: true,
      coverPage: true
    }
  });
}

export const getNovelDetails = async ({ id }, context) => {
  if (!context.user) { throw new HttpError(401) };

  const novel = await context.entities.Novel.findUnique({
    where: { id },
    include: {
      chapters: true
    }
  });

  if (!novel) throw new HttpError(404, 'No novel found with id ' + id);

  return novel;
}
