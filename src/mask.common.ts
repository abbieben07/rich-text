import IMask from 'imask';

export const FormatMask = (text: string, mask: string): string => {
    const masker = IMask.createMask({
        mask,
    });

    return masker.resolve(text);
}
