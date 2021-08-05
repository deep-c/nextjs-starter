import { useMutation, useQuery } from '@apollo/client';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import makeSimpleNotification, {
  SimpleNotificationState,
} from 'src/components/SimpleNotification';
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
      className="space-y-8 divide-y divide-gray-200 mt-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
        <div>
          <div>
            <h2 className="text-lg leading-6 font-medium text-gray-900">
              Profile
            </h2>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
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
              <div className="mt-1 sm:mt-0 sm:col-span-2 relative">
                <input
                  aria-describedby="name-error"
                  aria-invalid={formErrors.name ? 'true' : 'false'}
                  autoComplete="name"
                  className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
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
                    className="max-w-lg block w-full mr-6 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
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
                  className="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
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

export default UserSettingsForm;
