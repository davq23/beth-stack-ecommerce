const availableCurrencies = {
    'USD': 'USD',
    'EUR': 'EUR',
    'CAD': 'CAD',
};

const addBaseUrl = (url: string): string => {
    return `${process.env.base_url}${url}`
}

export  {
    availableCurrencies,
    addBaseUrl,
};