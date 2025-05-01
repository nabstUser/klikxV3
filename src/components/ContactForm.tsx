"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { contactFormSchema, type ContactFormValues } from "@/lib/schemas";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { FoundationArrow } from "@/components/ui/FoundationArrow";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      lastName: "",
      firstName: "",
      email: "",
    },
  });

  async function onSubmit(data: ContactFormValues) {
    setIsSubmitting(true);
    setError(null);

    try {
      // Envoyer les données à notre API route
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Une erreur est survenue lors de l\'envoi du message');
      }

      setIsSuccess(true);
      form.reset();

      // Réinitialise le message de succès après 5 secondes
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (err) {
      console.error("Erreur lors de l'envoi du formulaire:", err);
      setError(err instanceof Error ? err.message : "Une erreur s'est produite. Veuillez réessayer ultérieurement.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormControl>
                  <input
                    {...field}
                    type="text"
                    placeholder="Nom"
                    className={`w-full bg-transparent border-b ${form.formState.errors.lastName ? 'border-red-400' : 'border-white/20'} text-white placeholder-white/50 pb-2 focus:outline-none focus:border-white transition-colors`}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormControl>
                  <input
                    {...field}
                    type="text"
                    placeholder="Prénom"
                    className={`w-full bg-transparent border-b ${form.formState.errors.firstName ? 'border-red-400' : 'border-white/20'} text-white placeholder-white/50 pb-2 focus:outline-none focus:border-white transition-colors`}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <div className="space-y-2 md:col-span-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormControl>
                    <input
                      {...field}
                      type="email"
                      placeholder="Email"
                      className={`w-full bg-transparent border-b ${form.formState.errors.email ? 'border-red-400' : 'border-white/20'} text-white placeholder-white/50 pb-2 focus:outline-none focus:border-white transition-colors`}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
          </div>
        </div>

        {error && (
          <div className="mt-4">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {isSuccess && (
          <div className="mt-4">
            <p className="text-green-400">Votre message a été envoyé avec succès!</p>
          </div>
        )}

        <div className="flex justify-end mt-12">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-white text-black py-3 px-6 rounded-full font-medium flex items-center justify-center group transition-all disabled:opacity-70"
          >
            <span>{isSubmitting ? "Envoi en cours..." : "Commencer"}</span>
            <div className="ml-2">
              <FoundationArrow darkMode={true} size="small" />
            </div>
          </button>
        </div>
      </form>
    </Form>
  );
}
