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

    // CONFIGURATION POUR INFOMANIAK avec variables d'environnement (sécurisé)
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER || 'mail.infomaniak.com',
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.EMAIL_USER || 'contact@klikx.agency',
        pass: process.env.EMAIL_PASSWORD, // Le mot de passe est stocké dans les variables d'environnement
      },
    });

    // Construction de l'email
    const mailOptions = {
      from: process.env.EMAIL_FROM || 'contact@klikx.agency',
      to: process.env.EMAIL_USER || 'contact@klikx.agency',  // Adresse de réception
      replyTo: email,                  // Pour que les réponses aillent au contact
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
      // Tentative d'envoi d'email
      // Désactivé en développement sauf si un mot de passe SMTP est configuré
      if (process.env.EMAIL_PASSWORD) {
        await transporter.sendMail(mailOptions);
        console.log('Email envoyé avec succès');
      } else {
        console.log('Mode simulation: Email non envoyé car aucun mot de passe SMTP n\'est configuré');
        console.log('Contenu de l\'email:', mailOptions);
      }
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
