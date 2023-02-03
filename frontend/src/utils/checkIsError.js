export const checkIsError = (str) => {
    const reg = /error/i;
    return reg.test(str);
}