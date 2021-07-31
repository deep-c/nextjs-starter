import { useMutation, useQuery } from '@apollo/client';
import { Role, Status, User } from '@prisma/client';
import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import UserAvatar from 'src/components/UserAvatar';
import type { GetUserForAdmin } from 'src/genTypes/apollo/GetUserForAdmin';
import type { UpdateUserInput } from 'src/genTypes/apollo/globalTypes';
import { updateUser } from 'src/graphql/mutation/user';
import { getUserForAdmin } from 'src/graphql/query/user';

export interface UserAdminFormProps extends Pick<User, 'id'> {}

const UserAdminForm: React.FC<UserAdminFormProps> = ({ id }) => {
  const { loading: queryLoading, data } = useQuery<GetUserForAdmin>(
    getUserForAdmin,
    { variables: { id } }
  );
  const [updateUserSettings, { loading: mutationLoading }] =
    useMutation(updateUser);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors: formErrors, isDirty, isSubmitSuccessful },
  } = useForm();
  const onSubmit: SubmitHandler<UpdateUserInput> = async (formFields) => {
    const result = await updateUserSettings({
      variables: {
        id,
        fields: formFields,
      },
    });
    return result;
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  if (queryLoading) return null;

  return (
    <form
      className="space-y-8 divide-y divide-gray-200 mt-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
        <div>
          <div>
            <h2 className="text-lg leading-6 font-medium text-gray-900">
              User Administration
            </h2>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Be careful what you change as this can have severe security
              implications.
            </p>
          </div>
          <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Name
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2 relative">
                <input
                  type="text"
                  id="name"
                  autoComplete="name"
                  className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                  defaultValue={data?.user?.name ?? ''}
                  aria-invalid={formErrors.name ? 'true' : 'false'}
                  aria-describedby="name-error"
                  {...register('name', {
                    maxLength: 50,
                    minLength: 5,
                    required: true,
                  })}
                />
                {formErrors.name && (
                  <p className="mt-2 text-sm text-red-600" id="name-error">
                    Your name must be between 5 and 50 characters.
                  </p>
                )}
              </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700"
              >
                Avatar
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <div className="flex items-center">
                  <input
                    type="text"
                    id="image"
                    autoComplete="image"
                    className="max-w-lg block w-full mr-6 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    defaultValue={data?.user?.image ?? ''}
                    {...register('image', { maxLength: 500 })}
                  />
                  {data?.user && <UserAvatar image={data.user.image} />}
                </div>
              </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="bio"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                About
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <textarea
                  id="bio"
                  rows={3}
                  className="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
                  defaultValue={data?.user?.bio ?? ''}
                  {...register('bio', { maxLength: 500 })}
                />
              </div>
            </div>
            <div className="pt-6 sm:pt-5">
              <div role="group" aria-labelledby="user-role">
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5 sm:items-baseline">
                  <div>
                    <div
                      className="text-base font-medium text-gray-900 sm:text-sm sm:text-gray-700"
                      id="user-role"
                    >
                      Role
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <div className="max-w-lg">
                      <p className="text-sm text-gray-500">
                        This has vast security implications, please be mindful.
                      </p>
                      <div className="mt-4 space-y-4">
                        {Object.keys(Role).map((role) => (
                          <div key={role} className="flex items-center">
                            <input
                              id={role}
                              type="radio"
                              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                              defaultChecked={role === data?.user?.role}
                              value={role}
                              {...register('role', { required: true })}
                            />
                            <label
                              htmlFor={role}
                              className="ml-3 block text-sm font-medium text-gray-700 capitalize"
                            >
                              {role.toLowerCase()}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-6 sm:pt-5">
              <div role="group" aria-labelledby="user-status">
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5 sm:items-baseline">
                  <div>
                    <div
                      className="text-base font-medium text-gray-900 sm:text-sm sm:text-gray-700"
                      id="user-status"
                    >
                      Status
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <div className="max-w-lg">
                      <div className="mt-4 space-y-4">
                        {Object.keys(Status).map((status) => (
                          <div key={status} className="flex items-center">
                            <input
                              id={status}
                              type="radio"
                              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                              defaultChecked={status === data?.user?.status}
                              value={status}
                              {...register('status', { required: true })}
                            />
                            <label
                              htmlFor={status}
                              className="ml-3 block text-sm font-medium text-gray-700 capitalize"
                            >
                              {status.toLowerCase()}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-5">
        <div className="flex justify-end">
          <button
            onClick={() => reset()}
            disabled={queryLoading || mutationLoading || !isDirty}
            type="button"
            className="disabled:opacity-50 disabled:cursor-text bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={queryLoading || mutationLoading || !isDirty}
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-text"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default UserAdminForm;
