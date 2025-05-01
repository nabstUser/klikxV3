import { NextResponse } from 'next/server';
import { contactFormSchema } from '@/lib/schemas';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    // Récupérer les données du formulaire
    const data = await request.json();

    // Valider les données avec le schéma Zod
    const validationResult = contactFormSchema.safeParse(data);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Données de formulaire invalides', details: validationResult.error.format() },
        { status: 400 }
      );
    }

    // Récupérer les données validées
    const { lastName, firstName, email } = validationResult.data;

    // Configuration directe pour Infomaniak
    const transporter = nodemailer.createTransport({
      host: 'mail.infomaniak.com',
      port: 587,
      secure: false,
      auth: {
        user: 'clients@klikx.site',
        pass: '9Y9iBydy7H!EmEPt',
      },
    });

    // Construction de l'email
    const mailOptions = {
      from: 'clients@klikx.site',
      to: 'clients@klikx.site',  // Adresse de réception
      replyTo: email,            // Pour que les réponses aillent au contact
      subject: `Nouveau message de ${firstName} ${lastName}`,
      text: `
        Nom: ${lastName}
        Prénom: ${firstName}
        Email: ${email}
      `,
      html: `
        <h2>Nouveau message du formulaire de contact</h2>
        <p><strong>Nom:</strong> ${lastName}</p>
        <p><strong>Prénom:</strong> ${firstName}</p>
        <p><strong>Email:</strong> ${email}</p>
      `,
    };

    try {
      // Envoi d'email
      await transporter.sendMail(mailOptions);
      console.log('Email envoyé avec succès');
    } catch (emailError) {
      // En cas d'erreur avec le serveur SMTP, on log l'erreur mais on continue
      console.error('Erreur d\'envoi d\'email:', emailError);

      // En production, vous pourriez activer cette partie
      if (process.env.NODE_ENV === 'production') {
        return NextResponse.json(
          { error: 'Erreur lors de l\'envoi de l\'email. Veuillez réessayer plus tard.' },
          { status: 500 }
        );
      }
    }

    // Pour le développement, on affiche également les données dans la console
    console.log('Données du formulaire:', {
      lastName,
      firstName,
      email
    });

    return NextResponse.json({ success: true, message: 'Message envoyé avec succès' });
  } catch (error) {
    console.error('Erreur lors de l\'envoi du message:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de l\'envoi du message' },
      { status: 500 }
    );
  }
}
