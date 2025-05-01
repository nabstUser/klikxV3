import { z } from "zod";

// Schéma de validation pour le formulaire de contact
export const contactFormSchema = z.object({
  lastName: z.string().min(2, {
    message: "Le nom doit contenir au moins 2 caractères.",
  }),
  firstName: z.string().min(2, {
    message: "Le prénom doit contenir au moins 2 caractères.",
  }),
  email: z.string().email({
    message: "Veuillez entrer une adresse e-mail valide.",
  }),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
