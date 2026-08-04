import { z } from 'zod';

export const registerStep1Schema = z.object({
  name: z.string().trim().min(1, 'Nome ou apelido obrigatório'),
  email: z.string().trim().min(1, 'E-mail obrigatório').email('E-mail inválido'),
  phone: z
    .string()
    .trim()
    .regex(/^\(\d{2}\)\s?\d{4,5}-?\d{4}$/, 'Telefone inválido (DDD + número)'),
  password: z.string().min(6, 'Mínimo 6 caracteres'),
});

export type RegisterStep1Values = z.infer<typeof registerStep1Schema>;

export const loginSchema = z.object({
  email: z.string().trim().min(1, 'E-mail obrigatório').email('E-mail inválido'),
  password: z.string().min(1, 'Senha obrigatória'),
});

export type LoginValues = z.infer<typeof loginSchema>;

export const contactSchema = z.object({
  name: z.string().trim().min(1, 'Nome obrigatório'),
  phone: z
    .string()
    .trim()
    .regex(/^\(\d{2}\)\s?\d{4,5}-?\d{4}$/, 'Telefone inválido (DDD + número)'),
  relationship: z.string().trim().min(1, 'Informe a relação'),
});

export type ContactValues = z.infer<typeof contactSchema>;
