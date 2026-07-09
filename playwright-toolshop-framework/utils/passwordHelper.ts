export function generateStrongPassword(length: number = 12): string {
    const minLength = Math.max(8, length);

    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const specials = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    let passwordArray = [
        uppercase[Math.floor(Math.random() * uppercase.length)],
        lowercase[Math.floor(Math.random() * lowercase.length)],
        numbers[Math.floor(Math.random() * numbers.length)],
        specials[Math.floor(Math.random() * specials.length)],
    ];

    const allChars = uppercase + lowercase + numbers + specials;

    for (let i = passwordArray.length; i < minLength; i++) {
        const randomIndex = Math.floor(Math.random() * allChars.length);
        passwordArray.push(allChars[randomIndex]);
    }

    for (let i = passwordArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [passwordArray[i], passwordArray[j]] = [passwordArray[j], passwordArray[i]];
    }

    return passwordArray.join('');
}