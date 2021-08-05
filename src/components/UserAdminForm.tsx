import { useMutation, useQuery } from '@apollo/client';
import { Role, Status, User } from '@prisma/client';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import makeSimpleNotification, {
  SimpleNotificationState,
} from 'src/components/SimpleNotification';
import UserAvatar from 'src/components/UserAvatar';
import { updateUserMutation } from 'src/graphql/mutation/user';
import { getUserForAdminQuery } from 'src/graphql/query/user';

import type { GetUserForAdmin } from 'src/genTypes/apollo/GetUserForAdmin';
import type { UpdateUser } from 'src/genTypes/apollo/UpdateUser';
import type { UpdateUserInput } from 'src/genTypes/apollo/globalTypes';

export type UserAdminFormProps = Pick<User, 'id'>;

const UserAdminForm: React.FC<UserAdminFormProps> = ({ id }) => {
  const { data, loading: queryLoading } = useQuery<GetUserForAdmin>(
    getUserForAdminQuery,
    { variables: { id } }
  );
  const [updateUserSettings, { loading: mutationLoading }] =
    useMutation<UpdateUser>(updateUserMutation);
  const {
    formState: { errors: formErrors, isDirty },
    handleSubmit,
    register,
    reset,
  } = useForm();
  const onSubmit: SubmitHandler<UpdateUserInput> = async (formFields) => {
    try {
      const result = await updateUserSettings({
        variables: {
          fields: formFields,
          id,
        },
      });
      makeSimpleNotification(
        'User changes saved.',
        SimpleNotificationState.SUCCESS
      );
      reset({
        bio: result.data?.updateUser?.bio,
        image: result.data?.updateUser?.image,
        name: result.data?.updateUser?.name,
        role: result.data?.updateUser?.role,
        status: result.data?.updateUser?.status,
      });
    } catch (e) {
      makeSimpleNotification(
        'Unable to save user.',
        SimpleNotificationState.ERROR
      );
    }
  };

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
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                htmlFor="name"
              >
                Name
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2 relative">
                <input
                  aria-describedby="name-error"
                  aria-invalid={formErrors.name ? 'true' : 'false'}
                  autoComplete="name"
                  className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                  defaultValue={data?.user?.name ?? ''}
                  id="name"
                  type="text"
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
                className="block text-sm font-medium text-gray-700"
                htmlFor="image"
              >
                Avatar
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <div className="flex items-center">
                  <input
                    autoComplete="image"
                    className="max-w-lg block w-full mr-6 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    defaultValue={data?.user?.image ?? ''}
                    id="image"
                    type="text"
                    {...register('image', { maxLength: 500 })}
                  />
                  {data?.user && <UserAvatar image={data.user.image} />}
                </div>
              </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                htmlFor="bio"
              >
                About
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <textarea
                  className="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
                  defaultValue={data?.user?.bio ?? ''}
                  id="bio"
                  rows={3}
                  {...register('bio', { maxLength: 500 })}
                />
              </div>
            </div>
            <div className="pt-6 sm:pt-5">
              <div aria-labelledby="user-role" role="group">
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
                              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                              defaultChecked={role === data?.user?.role}
                              id={role}
                              type="radio"
                              value={role}
                              {...register('role', { required: true })}
                            />
                            <label
                              className="ml-3 block text-sm font-medium text-gray-700 capitalize"
                              htmlFor={role}
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
              <div aria-labelledby="user-status" role="group">
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
                              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                              defaultChecked={status === data?.user?.status}
                              id={status}
                              type="radio"
                              value={status}
                              {...register('status', { required: true })}
                            />
                            <label
                              className="ml-3 block text-sm font-medium text-gray-700 capitalize"
                              htmlFor={status}
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
            className="disabled:opacity-50 disabled:cursor-text bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={queryLoading || mutationLoading || !isDirty}
            onClick={() => reset()}
            type="button"
          >
            Cancel
          </button>
          <button
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-text"
            disabled={queryLoading || mutationLoading || !isDirty}
            type="submit"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default UserAdminForm;
