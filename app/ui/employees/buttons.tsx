import Link from 'next/link';
import { HeartIcon } from '@heroicons/react/24/outline';

export function CreateRecognition({ id }: { id: string }) {
  return (
    <Link
      href={`/employees/${id}/recognitions/create`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <HeartIcon className="w-5" />
    </Link>
  );
}
