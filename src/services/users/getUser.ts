import { ApiContext, User } from 'types';
import { fetcher } from 'utils';

const getUser = async (
  context: ApiContext,
  { id }: { id: number },
): Promise<User> => {
  return await fetcher(
    `${context.apiRootUrl.replace(/\/$/g, '')}/users/${id}`,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
  );
};

export default getUser;
