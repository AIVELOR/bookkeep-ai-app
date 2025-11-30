/**
 * SETUP INSTRUCTIONS:
 *
 * 1. Get your Anthropic API key from: https://console.anthropic.com/
 * 2. Create a .env file in the project root
 * 3. Add: VITE_ANTHROPIC_API_KEY=your_actual_api_key_here
 * 4. Restart the development server
 *
 * The API key will be accessed via: import.meta.env.VITE_ANTHROPIC_API_KEY
 */

/**
 * Extract data from receipt image using Claude AI Vision
 * @param {File} imageFile - The receipt image file
 * @param {string} countryCode - Country code (SE, FI, DK, NO, US, UK)
 * @returns {Promise<Object>} Extracted receipt data
 */
export async function extractReceiptData(imageFile, countryCode = 'SE') {
  try {
    const base64Image = await convertImageToBase64(imageFile);

    const imageType = imageFile.type || 'image/jpeg';

    const prompt = buildExtractionPrompt(countryCode);

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': import.meta.env.VITE_ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 1024,
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'image',
                source: {
                  type: 'base64',
                  media_type: imageType,
                  data: base64Image
                }
              },
              {
                type: 'text',
                text: prompt
              }
            ]
          }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`Claude API error: ${response.status}`);
    }

    const data = await response.json();
    const extractedText = data.content[0].text;

    const cleanedText = extractedText.replace(/```json\n?|\n?```/g, '').trim();
    const extractedData = JSON.parse(cleanedText);

    return {
      ...extractedData,
      extractedAt: new Date().toISOString(),
      countryCode: countryCode,
      confidence: calculateConfidence(extractedData)
    };

  } catch (error) {
    console.error('Receipt extraction error:', error);
    throw new Error('Failed to extract receipt data. Please try again or enter manually.');
  }
}

/**
 * Convert image file to base64
 */
async function convertImageToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * Build extraction prompt based on country
 */
function buildExtractionPrompt(countryCode) {
  const currencyInfo = {
    'SE': { currency: 'SEK', symbol: 'kr', vatName: 'Moms' },
    'FI': { currency: 'EUR', symbol: '€', vatName: 'ALV' },
    'DK': { currency: 'DKK', symbol: 'kr', vatName: 'Moms' },
    'NO': { currency: 'NOK', symbol: 'kr', vatName: 'MVA' },
    'US': { currency: 'USD', symbol: '$', vatName: 'Tax' },
    'UK': { currency: 'GBP', symbol: '£', vatName: 'VAT' }
  };

  const info = currencyInfo[countryCode] || currencyInfo['SE'];

  return `Analyze this receipt image and extract the following information. Return ONLY a valid JSON object with no additional text.

Expected currency: ${info.currency} (${info.symbol})
Tax/VAT label: ${info.vatName}

Extract these fields:
{
  "merchantName": "Name of the store/vendor (string)",
  "date": "Transaction date in YYYY-MM-DD format (string)",
  "totalAmount": "Total amount including tax as a number (number)",
  "vatAmount": "VAT/tax amount as a number, or null if not visible (number or null)",
  "vatRate": "VAT rate percentage if visible, e.g., 25 for 25% (number or null)",
  "currency": "${info.currency}",
  "receiptNumber": "Receipt/transaction number if visible (string or null)",
  "category": "Best matching category from: Office Supplies, Travel, Meals, Equipment, Services, Rent, Utilities, IT, Marketing, Insurance, Vehicles, Salaries (string)",
  "items": "Array of line items if clearly visible, otherwise empty array (array)",
  "paymentMethod": "Payment method if visible: Cash, Card, Invoice, etc (string or null)"
}

Rules:
- All amounts must be numbers (not strings)
- Date must be YYYY-MM-DD format
- If you cannot determine a field, use null
- Category must be one of the specified options
- Be as accurate as possible with amounts
- Return ONLY valid JSON, no markdown, no explanation`;
}

/**
 * Calculate confidence score based on extracted data
 */
function calculateConfidence(data) {
  let score = 0;
  const fields = [
    'merchantName',
    'date',
    'totalAmount',
    'vatAmount',
    'category'
  ];

  fields.forEach(field => {
    if (data[field] !== null && data[field] !== undefined && data[field] !== '') {
      score += 20;
    }
  });

  return Math.min(score, 100);
}

/**
 * Validate extracted data
 */
export function validateExtractedData(data) {
  const errors = [];

  if (!data.merchantName) {
    errors.push({ field: 'merchantName', message: 'Merchant name is required' });
  }

  if (!data.date) {
    errors.push({ field: 'date', message: 'Date is required' });
  } else if (!/^\d{4}-\d{2}-\d{2}$/.test(data.date)) {
    errors.push({ field: 'date', message: 'Date must be in YYYY-MM-DD format' });
  }

  if (!data.totalAmount || data.totalAmount <= 0) {
    errors.push({ field: 'totalAmount', message: 'Total amount must be greater than 0' });
  }

  if (data.vatAmount && data.vatAmount > data.totalAmount) {
    errors.push({ field: 'vatAmount', message: 'VAT amount cannot exceed total amount' });
  }

  if (!data.category) {
    errors.push({ field: 'category', message: 'Category is required' });
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Convert file to base64 for storage
 */
export async function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
