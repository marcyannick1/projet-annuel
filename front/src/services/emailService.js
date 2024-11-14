export const sendEmail= async(to, subject, htmlContent) => {
    try {
        const response = await fetch('http://localhost:3000/email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                to: to,
                subject: subject,
                html: htmlContent,
            }),
        });

        if (!response.ok) {
            throw new Error('Erreur lors de l\'envoi de l\'e-mail');
        }

        return await response.json();
    } catch (error) {
        console.error('Erreur:', error);
        throw error;
    }
}
