git init

test('getRandomLanguage should return a language', () => {
    const result = getRandomLanguage();

    expect(result).toBeTruthy()
    expect(result.code).toBeTruthy()
    expect(result.name).toBeTruthy()
});