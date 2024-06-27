import Image from 'next/image';
import { FormattedRecognitionsTable } from '@/app/lib/definitions';
import { values } from '@/app/lib/definitions';

export default function EmployeesTable({
  recognitions,
}: {
  recognitions: FormattedRecognitionsTable[];
}) {
  console.log(recognitions);
  return (
    <div className="w-full">
      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
              <div className="md:hidden">
                {recognitions?.map((recognition) => (
                  <div
                    key={recognition.id}
                    className="mb-2 w-full rounded-md bg-white p-4"
                  >
                    <div className="flex items-center justify-between border-b pb-4">
                      <div>
                        <div className="mb-2 flex items-center">
                          <div className="flex items-center gap-3">
                            <Image
                              src={recognition.sender_image_url}
                              className="rounded-full"
                              alt={`${recognition.sender_name}'s profile picture`}
                              width={28}
                              height={28}
                            />
                            <p>{recognition.sender_name}</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500">
                          {recognition.date}
                        </p>
                      </div>
                    </div>
                    <div className="pt-4 text-sm">
                      <p>
                        {
                          values.find((obj) => obj.id === recognition.value_id)
                            ?.name
                        }
                      </p>
                    </div>
                    <div className="pt-4 text-sm">
                      <p>{recognition.comment}</p>
                    </div>
                  </div>
                ))}
              </div>
              <table className="hidden min-w-full rounded-md text-gray-900 md:table">
                <thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
                  <tr>
                    <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                      From
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Date
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Recognition for
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Comment
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 text-gray-900">
                  {recognitions.map((recognition) => (
                    <tr key={recognition.id} className="group">
                      <td className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm text-black group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6">
                        <div className="flex items-center gap-3">
                          <Image
                            src={recognition.sender_image_url}
                            className="rounded-full"
                            alt={`${recognition.sender_name}'s profile picture`}
                            width={28}
                            height={28}
                          />
                          <p>{recognition.sender_name}</p>
                        </div>
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {recognition.date}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {
                          values.find((obj) => obj.id === recognition.value_id)
                            ?.name
                        }
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm group-first-of-type:rounded-md group-last-of-type:rounded-md">
                        {recognition.comment}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
