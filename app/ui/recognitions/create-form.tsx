'use client';

import {
  SparklesIcon,
  PencilSquareIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { createRecognition, State } from '@/app/lib/actions';
import { useActionState } from 'react';
import { values } from '@/app/lib/definitions';

export default function Form({
  receiverId,
  receiverName,
}: {
  receiverId: string;
  receiverName: string;
}) {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(createRecognition, initialState);

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Receiver */}
        <div className="mb-4">
          <label htmlFor="receiver" className="mb-2 block text-sm font-medium">
            Recognition for:
          </label>
          <div className="relative mt-2 rounded-md">
            <div hidden>
              <input
                id="receiverId"
                name="receiverId"
                value={receiverId}
                readOnly={true}
              />
            </div>
            <div className="relative">
              <label
                id="receiver"
                htmlFor="receiver name"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              >
                {receiverName}
              </label>
              <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Recognition */}
        <div className="mb-4">
          <label
            htmlFor="recognition"
            className="mb-2 block text-sm font-medium"
          >
            Choose a value for Recognition
          </label>
          <div className="relative">
            <select
              id="recognition"
              name="recognition"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="recognition-error"
            >
              <option value="" disabled>
                Select a value
              </option>
              {values.map((recon) => (
                <option key={recon.id} value={recon.id}>
                  {recon.name}
                </option>
              ))}
            </select>
            <SparklesIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="valueId-error" aria-live="polite" aria-atomic={true}>
            {state.errors?.recognition &&
              state.errors.recognition.map((err: string) => (
                <p className="mt-2 text-sm text-red-500" key={err}>
                  {err}
                </p>
              ))}
          </div>
        </div>

        {/* Comment */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Your Words
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="comment"
                name="comment"
                type="text"
                placeholder="Well done!"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="comment-error"
              />
              <PencilSquareIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div id="comment-error" aria-live="polite" aria-atomic={true}>
            {state.errors?.comment &&
              state.errors.comment.map((err: string) => (
                <p className="mt-2 text-sm text-red-500" key={err}>
                  {err}
                </p>
              ))}
            {state.message && (
              <p className="mt-2 text-sm text-red-500">{state.message}</p>
            )}
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/employees"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Recognition</Button>
      </div>
    </form>
  );
}
