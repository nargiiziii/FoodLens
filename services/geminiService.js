import axios from 'axios';

const GEMINI_API_KEY = 'AIzaSyCSmTvKLKy9YAx2BDx4EW4cSU4sGc5Gpm8'; // Замените на ваш ключ

// Фейковые данные для демонстрации
const FAKE_DATA = {
  productName: "Coca-Cola Classic 330ml",
  ingredients: [
    {
      name: "Carbonated Water",
      eCode: null,
      explanation: "Water that has been infused with carbon dioxide gas under pressure. It creates the fizzy sensation in soft drinks.",
      risk: "Low"
    },
    {
      name: "Sugar",
      eCode: null,
      explanation: "Refined white sugar used as sweetener. High consumption linked to obesity, diabetes, and tooth decay.",
      risk: "Medium"
    },
    {
      name: "Caramel Color",
      eCode: "E150d",
      explanation: "Artificial coloring created by heating sugar with ammonia and sulfites. Some studies suggest potential carcinogenic properties.",
      risk: "Medium"
    },
    {
      name: "Phosphoric Acid",
      eCode: "E338",
      explanation: "Used to give cola its tangy flavor. May contribute to bone density loss and tooth enamel erosion with regular consumption.",
      risk: "Medium"
    },
    {
      name: "Natural Flavors",
      eCode: null,
      explanation: "Proprietary blend of natural flavor compounds. Exact composition is not disclosed by manufacturer.",
      risk: "Low"
    },
    {
      name: "Caffeine",
      eCode: null,
      explanation: "Stimulant naturally found in coffee beans. Can cause dependency, sleep disruption, and increased heart rate.",
      risk: "Medium"
    },
    {
      name: "Sodium Benzoate",
      eCode: "E211",
      explanation: "Preservative that prevents microbial growth. Can form benzene (carcinogen) when combined with vitamin C under certain conditions.",
      risk: "High"
    }
  ],
  overallRiskScore: 65,
  riskLevel: "Medium",
  recommendations: [
    "Limit consumption to occasional treats rather than daily intake due to high sugar content (39g per can)",
    "Consider sugar-free alternatives if you enjoy carbonated beverages regularly",
    "Be aware that the combination of E211 and citric acid can potentially form benzene",
    "Children and pregnant women should be especially cautious due to caffeine content",
    "Rinse your mouth with water after consuming to protect tooth enamel from phosphoric acid",
    "Check labels for total sugar content and try to stay within WHO recommended limits (25g per day)"
  ],
  summary: "This is a typical carbonated soft drink with moderate to high health concerns. The main issues are high sugar content (39g per 330ml can), presence of potentially harmful additives like E150d and E211, and acidic pH that can damage tooth enamel. Regular consumption is associated with increased risk of obesity, type 2 diabetes, and dental problems. Best consumed occasionally as a treat."
};

class GeminiService {
  constructor() {
    this.apiKey = GEMINI_API_KEY;
    this.baseURL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';
    this.useFakeData = false; // Будет автоматически переключаться при ошибке
  }

  setApiKey(key) {
    this.apiKey = key;
  }

  async analyzeFood(imageBase64) {
    // Если API ключ не установлен или пустой, используем фейковые данные
    if (!this.apiKey || this.apiKey === 'YOUR_API_KEY_HERE') {
      console.log('Using fake data - API key not set');
      return this.getFakeData();
    }

    try {
      const response = await axios.post(
        `${this.baseURL}?key=${this.apiKey}`,
        {
          contents: [
            {
              parts: [
                {
                  text: `Analyze this food product image and provide:
1. Product name
2. List of all ingredients with their E-codes
3. Detailed explanation of each additive and E-code (what it is, why it's used)
4. Health risks for each ingredient (Low/Medium/High)
5. Overall risk score (0-100, where 0 is safest)
6. Recommendations for consumers

Format your response as JSON:
{
  "productName": "string",
  "ingredients": [
    {
      "name": "string",
      "eCode": "string or null",
      "explanation": "string",
      "risk": "Low/Medium/High"
    }
  ],
  "overallRiskScore": number,
  "riskLevel": "Low/Medium/High",
  "recommendations": ["string"],
  "summary": "string"
}`
                },
                {
                  inline_data: {
                    mime_type: 'image/jpeg',
                    data: imageBase64
                  }
                }
              ]
            }
          ]
        },
        {
          timeout: 30000 // 30 секунд таймаут
        }
      );

      const text = response.data.candidates[0].content.parts[0].text;
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      
      if (jsonMatch) {
        const result = JSON.parse(jsonMatch[0]);
        console.log('API response successful');
        return result;
      }
      
      throw new Error('Failed to parse AI response');
    } catch (error) {
      console.log('API Error, using fake data:', error.message);
      // При любой ошибке возвращаем фейковые данные
      return this.getFakeData();
    }
  }

  getFakeData() {
    // Добавляем небольшую задержку для реалистичности
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(FAKE_DATA);
      }, 2000); // 2 секунды задержки
    });
  }

  // Метод для получения разных фейковых продуктов
  getRandomFakeData() {
    const products = [
      FAKE_DATA,
      {
        productName: "Lay's Classic Potato Chips 150g",
        ingredients: [
          {
            name: "Potatoes",
            eCode: null,
            explanation: "Main ingredient. Potatoes are sliced and fried to create chips.",
            risk: "Low"
          },
          {
            name: "Vegetable Oil",
            eCode: null,
            explanation: "Used for frying. High in calories and can contain trans fats depending on processing.",
            risk: "Medium"
          },
          {
            name: "Salt",
            eCode: null,
            explanation: "Sodium chloride used for flavoring. Excessive intake linked to high blood pressure.",
            risk: "Medium"
          },
          {
            name: "Monosodium Glutamate",
            eCode: "E621",
            explanation: "Flavor enhancer that makes food taste more savory. Some people report sensitivity reactions.",
            risk: "Medium"
          }
        ],
        overallRiskScore: 55,
        riskLevel: "Medium",
        recommendations: [
          "Consume in moderation due to high salt and fat content",
          "Look for baked alternatives for lower fat content",
          "Be mindful of portion sizes - one serving is about 28g (about 15 chips)",
          "Pair with vegetables or protein for more balanced snacking"
        ],
        summary: "Popular snack food high in calories, fat, and sodium. Regular consumption can contribute to weight gain and increased blood pressure. Best enjoyed occasionally as part of a balanced diet."
      },
      {
        productName: "Nutella Hazelnut Spread 400g",
        ingredients: [
          {
            name: "Sugar",
            eCode: null,
            explanation: "First ingredient by weight. Contains over 50% sugar content.",
            risk: "High"
          },
          {
            name: "Palm Oil",
            eCode: null,
            explanation: "Saturated fat used for texture. High consumption linked to cardiovascular issues.",
            risk: "Medium"
          },
          {
            name: "Hazelnuts",
            eCode: null,
            explanation: "Only 13% of product. Provides some nutritional value but minimal compared to other ingredients.",
            risk: "Low"
          },
          {
            name: "Cocoa Powder",
            eCode: null,
            explanation: "Provides chocolate flavor. Contains antioxidants but present in small amounts.",
            risk: "Low"
          },
          {
            name: "Lecithin",
            eCode: "E322",
            explanation: "Emulsifier from soy. Generally considered safe.",
            risk: "Low"
          },
          {
            name: "Vanillin",
            eCode: null,
            explanation: "Artificial vanilla flavoring. Safe in normal amounts.",
            risk: "Low"
          }
        ],
        overallRiskScore: 70,
        riskLevel: "High",
        recommendations: [
          "Use sparingly due to extremely high sugar content (21g per 37g serving)",
          "Not suitable for daily consumption, especially for children",
          "Consider natural nut butters as healthier alternatives",
          "Be aware this is more dessert than nutritious spread despite marketing",
          "Recommended serving size is 2 tablespoons - easy to exceed"
        ],
        summary: "While marketed as a breakfast spread, Nutella is essentially a sugar and palm oil mixture with some hazelnuts. With over 50% sugar content, it poses significant health concerns for regular consumers, particularly regarding obesity and dental health. Best reserved for occasional treats."
      }
    ];

    return products[Math.floor(Math.random() * products.length)];
  }
}

export default new GeminiService();