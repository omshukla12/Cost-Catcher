function extractProductId(url) {
    if (!url || typeof url !== 'string') return null;

    const trimmedUrl = url.trim();
    const regex = /(?:\/dp\/|\/gp\/product\/|\/product\/)([A-Z0-9]{10})/i;
    const match = trimmedUrl.match(regex);

    return match ? match[1] : null;
}

module.exports = extractProductId;
