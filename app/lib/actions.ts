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

  try {
    await sql`
    INSERT INTO recognitions (receiver_id, value_id, comment, date) 
    VALUES (${receiverId}, ${recognition}, ${comment}, ${date})
    `;
  } catch (error) {
    return {
      message: 'Database Error: Could not create recognition.',
    };
  }

  revalidatePath(`/employees/${receiverId}/recognitions`);
  redirect('/employees');
}
