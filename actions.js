import { HttpError } from 'wasp/server'

export const createNovel = async ({ title, author, genre, story, coverPage }, context) => {
  if (!context.user) { throw new HttpError(401); }

  const newNovel = await context.entities.Novel.create({
    data: {
      title,
      author,
      genre,
      story,
      coverPage,
      userId: context.user.id
    }
  });

  return newNovel;
}

export const createChapter = async ({ title, uploadDate, chapterNumber, content, novelId }, context) => {
  if (!context.user) { throw new HttpError(401); };

  const novel = await context.entities.Novel.findUnique({
    where: { id: novelId }
  });
  if (!novel || novel.userId !== context.user.id) { throw new HttpError(403); };

  const newChapter = await context.entities.Chapter.create({
    data: {
      title,
      uploadDate,
      chapterNumber,
      content,
      novelId
    }
  });

  return newChapter;
}
