// Vercel API Function for language negotiation
// This function reads the Accept-Language header and redirects to the appropriate language version

export default function handler(req, res) {
  // Get the Accept-Language header
  const acceptLanguage = req.headers['accept-language'] || '';
  
  // Parse Accept-Language header and extract language preferences
  const languages = parseAcceptLanguage(acceptLanguage);
  
  // Determine the best language match
  const targetLanguage = selectBestLanguage(languages);
  
  // Redirect to the appropriate language version
  const redirectUrl = `/${targetLanguage}/`;
  
  // Set cache headers for better performance
  res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=86400');
  
  // Perform 302 redirect
  res.status(302);
  res.setHeader('Location', redirectUrl);
  res.end();
}

// Parse Accept-Language header
function parseAcceptLanguage(acceptLanguage) {
  if (!acceptLanguage) return [];
  
  return acceptLanguage
    .split(',')
    .map(lang => {
      const [languageCode, quality = '1'] = lang.trim().split(';q=');
      return {
        language: languageCode.toLowerCase(),
        quality: parseFloat(quality)
      };
    })
    .sort((a, b) => b.quality - a.quality);
}

// Select the best language based on preferences
function selectBestLanguage(languages) {
  // Chinese language patterns
  const chinesePatterns = ['zh', 'zh-cn', 'zh-hans', 'zh-hk', 'zh-tw', 'zh-sg'];
  
  // Check if any Chinese language is preferred
  for (const lang of languages) {
    if (chinesePatterns.includes(lang.language)) {
      return 'zh';
    }
  }
  
  // Default to English for all other cases
  return 'en';
}
