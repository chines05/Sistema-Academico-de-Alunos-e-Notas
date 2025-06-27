<!DOCTYPE html>
<html>

<head>
    <title>Nova Senha Temporária</title>
</head>

<body>
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #2e7d32; padding: 20px; text-align: center;">
            <h1 style="color: white; margin-top: 10px;">Redefinição de Senha</h1>
        </div>

        <div style="padding: 25px;">
            <p style="font-size: 16px;">Olá!</p>
            <p style="font-size: 16px;">Você solicitou a redefinição da sua senha no Sistema Acadêmico IFNMG.</p>

            <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0; text-align: center;">
                <p style="margin: 0; font-weight: bold; font-size: 18px;">Sua senha temporária:</p>
                <p style="margin: 10px 0 0; font-size: 24px; letter-spacing: 2px; color: #2e7d32;">{{ $tempPassword }}</p>
            </div>

            <p style="font-size: 16px;">Por segurança, recomendamos que:</p>
            <ul style="font-size: 15px; padding-left: 20px;">
                <li>Faça login imediatamente com esta senha</li>
                <li>Altere para uma senha permanente em seu perfil</li>
                <li>Não compartilhe esta senha com ninguém</li>
            </ul>

            <p style="font-size: 16px; margin-top: 25px;">Caso não tenha solicitado esta alteração, por favor ignore este email ou entre em contato com o suporte.</p>
        </div>

        <div style="background-color: #f5f5f5; padding: 15px; text-align: center; font-size: 14px; color: #666;">
            <p style="margin: 0;">Sistema Acadêmico - IFNMG</p>
            <p style="margin: 5px 0 0;">Campus Almenara</p>
        </div>
    </div>
</body>

</html>