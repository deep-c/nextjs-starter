import React from 'react';
import Image from 'next/image';
import { useQuery, useMutation } from '@apollo/client';
import { useForm, SubmitHandler } from 'react-hook-form';
import { me } from '@/graphql/query/user';
import { updateUser } from '@/graphql/mutation/user';
import { getDirtyValues } from '@/utils/form';

export interface GeneralSettings {}

type GeneralSettingsData = {
  name: string;
  image: string;
  bio: string;
};

const GeneralSettings: React.FC<GeneralSettings> = () => {
  const { loading: queryLoading, error, data } = useQuery(me);
  const [updateUserSettings, { loading: mutationLoading }] =
    useMutation(updateUser);
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm();
  const onSubmit: SubmitHandler<GeneralSettingsData> = async (formFields) => {
    const result = await updateUserSettings({
      variables: {
        id: data.me.id,
        fields: getDirtyValues(dirtyFields, formFields),
      },
    });
    return result;
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
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Name
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  type="text"
                  id="name"
                  autoComplete="name"
                  className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                  defaultValue={data.me.name}
                  {...register('name', { maxLength: 50 })}
                />
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
                    defaultValue={data.me.image}
                    {...register('image', { maxLength: 500 })}
                  />
                  <span className="h-14 w-14 rounded-full overflow-hidden bg-gray-100">
                    {data.me.image ? (
                      <Image
                        className="rounded-full"
                        src={data.me.image}
                        alt="User Avatar"
                        width={70}
                        height={70}
                      />
                    ) : (
                      <svg
                        className="h-full w-full text-gray-300"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    )}
                  </span>
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
                  defaultValue={data.me.bio}
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
            type="submit"
            disabled={mutationLoading || !Object.keys(dirtyFields).length}
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-text"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default GeneralSettings;
