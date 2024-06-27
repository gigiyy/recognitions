'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { sql } from '@vercel/postgres';

const FormSchema = z.object({
  id: z.string(),
  receiverId: z.string({
    invalid_type_error: 'Please select a valid sender.',
  }),
  comment: z.string().min(1, 'Please input your words'),
  recognition: z.enum(['serving', 'nerdy', 'excellence', 'people', 'grow'], {
    invalid_type_error: 'Please choose a recognition.',
  }),
  date: z.string(),
});

const CreateRecognition = FormSchema.omit({ id: true, date: true });

export type State = {
  errors?: {
    receiverId?: string[];
    comment?: string[];
    recognition?: string[];
  };
  message?: string | null;
};

export async function createRecognition(prevState: State, formData: FormData) {
  console.log(formData);
  const validatedFields = CreateRecognition.safeParse({
    receiverId: formData.get('receiverId'),
    recognition: formData.get('recognition'),
    comment: formData.get('comment'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing fields. Failed to create recognition',
    };
  }

  const { receiverId, recognition, comment } = validatedFields.data;
  const date = new Date().toISOString().split('T')[0];

  // TODO need to use user id from active user
  const senderId = '47DB6BCB-4157-4B42-984A-3DC98F561970';
  try {
    await Promise.all([
      sql`
        INSERT INTO recognitions (receiver_id, sender_id, value_id, comment, date) 
        VALUES (${receiverId}, ${senderId}, ${recognition},  ${comment}, ${date})
        `,
      sendRecognition(receiverId),
    ]);
  } catch (error) {
    console.log(error);
    return {
      message: 'Database Error: Could not create recognition.',
    };
  }

  revalidatePath(`/employees/${receiverId}/recognitions`);
  redirect('/employees');
}

export async function sendRecognition(receiverId: string) {
  const notification = await sql`
  SELECT a.name, a.email, b.name as manager_name, b.email as manager_email
  FROM employees a
  JOIN employees b ON a.manager_id = b.id
  WHERE a.id = ${receiverId}
  `;

  const name = notification.rows[0].name;
  const email = notification.rows[0].email;
  const manager = notification.rows[0].manager_name;
  const managerEmail = notification.rows[0].manager_email;

  console.log(
    `sending notification to ${name} of ${email} and the manager ${manager} of ${managerEmail}`,
  );
}
