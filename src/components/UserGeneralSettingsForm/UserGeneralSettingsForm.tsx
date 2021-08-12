import { useMutation, useQuery } from '@apollo/client';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import makeSimpleNotification, {
  SimpleNotificationState,
} from 'src/components/Notifications';
import UserAvatar from 'src/components/UserAvatar';
import { updateMeMutation } from 'src/graphql/mutation/user';
import { meQuery } from 'src/graphql/query/user';

import type { GetMe } from 'src/genTypes/apollo/GetMe';
import type { UpdateUser } from 'src/genTypes/apollo/UpdateUser';
import type { UpdateMeInput } from 'src/genTypes/apollo/globalTypes';

const UserSettingsForm: React.FC = () => {
  const { data, loading: queryLoading } = useQuery<GetMe>(meQuery);
  const [updateUserSettings, { loading: mutationLoading }] =
    useMutation<UpdateUser>(updateMeMutation);
  const {
    formState: { errors: formErrors, isDirty },
    handleSubmit,
    register,
    reset,
  } = useForm();
  const onSubmit: SubmitHandler<UpdateMeInput> = async (formFields) => {
    try {
      const result = await updateUserSettings({
        variables: {
          fields: formFields,
          id: data?.me?.id,
        },
      });
      makeSimpleNotification(
        'Settings saved.',
        SimpleNotificationState.SUCCESS
      );
      reset({
        bio: result.data?.updateUser?.bio,
        image: result.data?.updateUser?.image,
        name: result.data?.updateUser?.name,
      });
    } catch (e) {
      makeSimpleNotification(
        'Unable to save settings.',
        SimpleNotificationState.ERROR
      );
    }
  };

  if (queryLoading) return null;

  return (
    <form
      className="mt-4 space-y-8 divide-y divide-gray-200"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
        <div>
          <div>
            <h2 className="text-lg font-medium text-gray-900 leading-6">
              Profile
            </h2>
            <p className="max-w-2xl mt-1 text-sm text-gray-500">
              This information will be displayed publicly so be careful what
              you share.
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
              <div className="relative mt-1 sm:mt-0 sm:col-span-2">
                <input
                  aria-describedby="name-error"
                  aria-invalid={formErrors.name ? 'true' : 'false'}
                  autoComplete="name"
                  className="block w-full max-w-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm rounded-md"
                  defaultValue={data?.me?.name ?? ''}
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
                    className="block w-full max-w-lg mr-6 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm rounded-md"
                    defaultValue={data?.me?.image ?? ''}
                    id="image"
                    type="text"
                    {...register('image', { maxLength: 500 })}
                  />
                  {data?.me && <UserAvatar image={data.me.image} />}
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
                  className="block w-full max-w-lg border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  defaultValue={data?.me?.bio ?? ''}
                  id="bio"
                  rows={3}
                  {...register('bio', { maxLength: 500 })}
                />
                <p className="mt-2 text-sm text-gray-500">
                  Write a few sentences about yourself.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-5">
        <div className="flex justify-end">
          <button
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 disabled:opacity-50 disabled:cursor-text rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={queryLoading || mutationLoading || !isDirty}
            onClick={() => reset()}
            type="button"
          >
            Cancel
          </button>
          <button
            className="inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium text-white bg-indigo-600 border border-transparent shadow-sm rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-text"
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

export default UserSettingsForm;
