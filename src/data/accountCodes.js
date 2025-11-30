// Swedish Account Codes (BAS 2024 - Bokföringsnämndens Allmänna Råd)
export const ACCOUNT_CODES_SE = [
  // Group 1: Immateriella anläggningstillgångar (Intangible Assets)
  { code: "1010", name: "Balanserade utgifter för utvecklingsarbeten", category: "Assets", type: "debit" },
  { code: "1020", name: "Balanserade utgifter för programvaror", category: "Assets", type: "debit" },
  { code: "1030", name: "Balanserade utgifter för immateriella rättigheter", category: "Assets", type: "debit" },
  { code: "1040", name: "Goodwill", category: "Assets", type: "debit" },
  { code: "1050", name: "Hyresrätter och liknande rättigheter", category: "Assets", type: "debit" },
  { code: "1060", name: "Patent", category: "Assets", type: "debit" },
  { code: "1070", name: "Licenser", category: "Assets", type: "debit" },
  { code: "1080", name: "Varumärken", category: "Assets", type: "debit" },

  // Group 10-11: Byggnader och mark (Buildings and Land)
  { code: "1010", name: "Byggnader", category: "Buildings", type: "debit" },
  { code: "1011", name: "Nedskrivningar byggnader", category: "Buildings", type: "credit" },
  { code: "1012", name: "Ackumulerade avskrivningar byggnader", category: "Buildings", type: "credit" },
  { code: "1110", name: "Mark", category: "Land", type: "debit" },

  // Group 12: Maskiner och inventarier (Machinery and Equipment)
  { code: "1210", name: "Maskiner och andra tekniska anläggningar", category: "Equipment", type: "debit" },
  { code: "1211", name: "Nedskrivningar maskiner", category: "Equipment", type: "credit" },
  { code: "1212", name: "Ackumulerade avskrivningar maskiner", category: "Equipment", type: "credit" },
  { code: "1220", name: "Inventarier, verktyg och installationer", category: "Equipment", type: "debit" },
  { code: "1221", name: "Nedskrivningar inventarier", category: "Equipment", type: "credit" },
  { code: "1222", name: "Ackumulerade avskrivningar inventarier", category: "Equipment", type: "credit" },
  { code: "1230", name: "Förbättringsutgifter på annans fastighet", category: "Equipment", type: "debit" },
  { code: "1231", name: "Nedskrivningar förbättringsutgifter", category: "Equipment", type: "credit" },
  { code: "1232", name: "Ackumulerade avskrivningar förbättringsutgifter", category: "Equipment", type: "credit" },

  // Group 13: Fordon (Vehicles)
  { code: "1310", name: "Personbilar och lätta lastbilar", category: "Vehicles", type: "debit" },
  { code: "1311", name: "Nedskrivningar personbilar", category: "Vehicles", type: "credit" },
  { code: "1312", name: "Ackumulerade avskrivningar personbilar", category: "Vehicles", type: "credit" },
  { code: "1320", name: "Lastbilar, bussar och andra tunga fordon", category: "Vehicles", type: "debit" },
  { code: "1321", name: "Nedskrivningar lastbilar", category: "Vehicles", type: "credit" },
  { code: "1322", name: "Ackumulerade avskrivningar lastbilar", category: "Vehicles", type: "credit" },

  // Group 14: Inventarier (Inventory/Equipment)
  { code: "1410", name: "Datorer och kringutrustning", category: "IT Equipment", type: "debit" },
  { code: "1411", name: "Nedskrivningar datorer", category: "IT Equipment", type: "credit" },
  { code: "1412", name: "Ackumulerade avskrivningar datorer", category: "IT Equipment", type: "credit" },
  { code: "1420", name: "Kontorsmöbler", category: "Furniture", type: "debit" },
  { code: "1421", name: "Nedskrivningar kontorsmöbler", category: "Furniture", type: "credit" },
  { code: "1422", name: "Ackumulerade avskrivningar kontorsmöbler", category: "Furniture", type: "credit" },

  // Group 15: Varulager (Inventory)
  { code: "1510", name: "Råvaror och förnödenheter", category: "Inventory", type: "debit" },
  { code: "1520", name: "Varor under tillverkning", category: "Inventory", type: "debit" },
  { code: "1530", name: "Färdiga varor och handelsvaror", category: "Inventory", type: "debit" },
  { code: "1540", name: "Pågående arbete för annans räkning", category: "Inventory", type: "debit" },
  { code: "1550", name: "Förskott till leverantörer", category: "Inventory", type: "debit" },

  // Group 16: Kundfordringar (Accounts Receivable)
  { code: "1510", name: "Kundfordringar", category: "Receivables", type: "debit" },
  { code: "1511", name: "Kundfordringar utland", category: "Receivables", type: "debit" },
  { code: "1519", name: "Kundfordringar inom koncernen", category: "Receivables", type: "debit" },
  { code: "1520", name: "Avsättning för osäkra kundfordringar", category: "Receivables", type: "credit" },

  // Group 17: Övriga fordringar (Other Receivables)
  { code: "1710", name: "Förutbetalda hyror", category: "Prepaid", type: "debit" },
  { code: "1730", name: "Upplupna intäkter", category: "Accrued Income", type: "debit" },
  { code: "1740", name: "Avräkning skatter och avgifter", category: "Tax", type: "debit" },
  { code: "1750", name: "Momsfordran", category: "VAT", type: "debit" },

  // Group 19: Kassa och bank (Cash and Bank)
  { code: "1910", name: "Kassa", category: "Cash", type: "debit" },
  { code: "1920", name: "Plusgiro", category: "Bank", type: "debit" },
  { code: "1930", name: "Bankgiro", category: "Bank", type: "debit" },
  { code: "1940", name: "Företagskonto/checkkonto", category: "Bank", type: "debit" },
  { code: "1950", name: "Avräkningskonto Swish", category: "Bank", type: "debit" },

  // Group 20: Eget kapital (Equity)
  { code: "2010", name: "Aktiekapital", category: "Equity", type: "credit" },
  { code: "2050", name: "Uppskrivningsfond", category: "Equity", type: "credit" },
  { code: "2060", name: "Reservfond", category: "Equity", type: "credit" },
  { code: "2070", name: "Överkursfond", category: "Equity", type: "credit" },
  { code: "2091", name: "Balanserad vinst eller förlust", category: "Equity", type: "credit" },
  { code: "2099", name: "Årets resultat", category: "Equity", type: "credit" },

  // Group 23: Avsättningar (Provisions)
  { code: "2310", name: "Avsättningar för pensioner", category: "Provisions", type: "credit" },
  { code: "2320", name: "Avsättningar för garantier", category: "Provisions", type: "credit" },

  // Group 24: Långfristiga skulder (Long-term Liabilities)
  { code: "2410", name: "Checkräkningskredit", category: "Liabilities", type: "credit" },
  { code: "2420", name: "Övriga banklån", category: "Liabilities", type: "credit" },
  { code: "2440", name: "Leverantörsskulder", category: "Liabilities", type: "credit" },
  { code: "2441", name: "Leverantörsskulder utland", category: "Liabilities", type: "credit" },
  { code: "2449", name: "Leverantörsskulder inom koncernen", category: "Liabilities", type: "credit" },

  // Group 26: Skatteskulder (Tax Liabilities)
  { code: "2610", name: "Skatteskuld", category: "Tax", type: "credit" },
  { code: "2640", name: "Utgående moms, 25%", category: "VAT", type: "credit" },
  { code: "2641", name: "Ingående moms, 25%", category: "VAT", type: "debit" },
  { code: "2644", name: "Utgående moms, 12%", category: "VAT", type: "credit" },
  { code: "2645", name: "Ingående moms, 12%", category: "VAT", type: "debit" },
  { code: "2650", name: "Ingående moms, 6%", category: "VAT", type: "debit" },
  { code: "2660", name: "Beräknad moms", category: "VAT", type: "credit" },

  // Group 27: Personalens skatter (Payroll Taxes)
  { code: "2710", name: "Personalens källskatt", category: "Payroll", type: "credit" },
  { code: "2730", name: "Avräkning lagstadgade sociala avgifter", category: "Payroll", type: "credit" },
  { code: "2731", name: "Avräkning särskild löneskatt", category: "Payroll", type: "credit" },

  // Group 28: Övriga kortfristiga skulder (Other Short-term Liabilities)
  { code: "2810", name: "Upplupna semesterlöner", category: "Accrued Expenses", type: "credit" },
  { code: "2820", name: "Upplupna sociala avgifter", category: "Accrued Expenses", type: "credit" },
  { code: "2890", name: "Övriga upplupna kostnader", category: "Accrued Expenses", type: "credit" },

  // Group 30-39: Intäkter (Revenue)
  { code: "3010", name: "Försäljning varor Sverige", category: "Revenue", type: "credit" },
  { code: "3011", name: "Försäljning varor EU", category: "Revenue", type: "credit" },
  { code: "3012", name: "Försäljning varor utanför EU", category: "Revenue", type: "credit" },
  { code: "3040", name: "Försäljning tjänster Sverige", category: "Revenue", type: "credit" },
  { code: "3041", name: "Försäljning tjänster EU", category: "Revenue", type: "credit" },
  { code: "3042", name: "Försäljning tjänster utanför EU", category: "Revenue", type: "credit" },
  { code: "3740", name: "Öresutjämning", category: "Revenue", type: "credit" },

  // Group 40-49: Kostnader för varor (Cost of Goods)
  { code: "4010", name: "Inköp varor Sverige", category: "COGS", type: "debit" },
  { code: "4011", name: "Inköp varor EU", category: "COGS", type: "debit" },
  { code: "4012", name: "Inköp varor utanför EU", category: "COGS", type: "debit" },

  // Group 50-53: Lokalkostnader (Premises Costs)
  { code: "5010", name: "Lokalhyra", category: "Rent", type: "debit" },
  { code: "5020", name: "El för belysning", category: "Utilities", type: "debit" },
  { code: "5030", name: "Värme", category: "Utilities", type: "debit" },
  { code: "5040", name: "Vatten och avlopp", category: "Utilities", type: "debit" },
  { code: "5050", name: "Renhållning", category: "Utilities", type: "debit" },
  { code: "5060", name: "Fastighetsförsäkring", category: "Insurance", type: "debit" },
  { code: "5070", name: "Fastighetsskatt och avgifter", category: "Property Tax", type: "debit" },
  { code: "5090", name: "Övriga lokalkostnader", category: "Rent", type: "debit" },

  // Group 54: Förbrukningsinventarier (Consumables)
  { code: "5410", name: "Förbrukningsinventarier", category: "Office Supplies", type: "debit" },
  { code: "5460", name: "Förbrukningsmaterial", category: "Office Supplies", type: "debit" },
  { code: "5480", name: "Arbetskläder och skyddsmaterial", category: "Office Supplies", type: "debit" },

  // Group 56: Resekostnader (Travel Expenses)
  { code: "5610", name: "Biljetter", category: "Travel", type: "debit" },
  { code: "5611", name: "Hyrbil", category: "Travel", type: "debit" },
  { code: "5612", name: "Milersättning", category: "Travel", type: "debit" },
  { code: "5615", name: "Övriga resekostnader", category: "Travel", type: "debit" },
  { code: "5800", name: "Resekostnader, avdragsgilla", category: "Travel", type: "debit" },

  // Group 58: Representation (Entertainment)
  { code: "5810", name: "Representation, avdragsgill", category: "Meals", type: "debit" },
  { code: "5811", name: "Representation, ej avdragsgill", category: "Meals", type: "debit" },

  // Group 60-62: Övriga kostnader (Other Costs)
  { code: "6000", name: "Kontorsmaterial", category: "Office Supplies", type: "debit" },
  { code: "6010", name: "Trycksaker", category: "Office Supplies", type: "debit" },
  { code: "6020", name: "Tidningar, tidskrifter och böcker", category: "Office Supplies", type: "debit" },
  { code: "6060", name: "Telekommunikation", category: "Services", type: "debit" },
  { code: "6070", name: "Porto", category: "Services", type: "debit" },
  { code: "6100", name: "Datakostnader", category: "IT", type: "debit" },
  { code: "6110", name: "IT-tjänster", category: "IT", type: "debit" },
  { code: "6150", name: "Bankkostnader", category: "Bank Fees", type: "debit" },
  { code: "6200", name: "Dataprogramvaror", category: "IT", type: "debit" },
  { code: "6210", name: "Licensavgifter", category: "Services", type: "debit" },
  { code: "6250", name: "Reklamkostnader", category: "Marketing", type: "debit" },
  { code: "6260", name: "Annonsering", category: "Marketing", type: "debit" },
  { code: "6310", name: "Företagsförsäkringar", category: "Insurance", type: "debit" },
  { code: "6540", name: "Konsulttjänster", category: "Services", type: "debit" },
  { code: "6550", name: "Redovisningstjänster", category: "Services", type: "debit" },
  { code: "6560", name: "Advokatarvoden", category: "Services", type: "debit" },
  { code: "6570", name: "Revisionskostnader", category: "Services", type: "debit" },
  { code: "6900", name: "Övriga externa tjänster", category: "Services", type: "debit" },

  // Group 70-73: Personalkostnader (Personnel Costs)
  { code: "7010", name: "Löner till tjänstemän", category: "Salaries", type: "debit" },
  { code: "7020", name: "Löner till arbetare", category: "Salaries", type: "debit" },
  { code: "7080", name: "Sjuklöner", category: "Salaries", type: "debit" },
  { code: "7210", name: "Arbetsgivaravgifter", category: "Payroll Tax", type: "debit" },
  { code: "7220", name: "Särskild löneskatt", category: "Payroll Tax", type: "debit" },
  { code: "7510", name: "Personalrepresentation", category: "Personnel", type: "debit" },

  // Group 78: Avskrivningar (Depreciation)
  { code: "7810", name: "Avskrivning på byggnader", category: "Depreciation", type: "debit" },
  { code: "7820", name: "Avskrivning på maskiner", category: "Depreciation", type: "debit" },
  { code: "7830", name: "Avskrivning på inventarier", category: "Depreciation", type: "debit" },

  // Group 80-84: Finansiella intäkter och kostnader (Financial Income/Expenses)
  { code: "8010", name: "Ränteintäkter från bankkonton", category: "Interest Income", type: "credit" },
  { code: "8310", name: "Räntekostnader till kreditinstitut", category: "Interest Expense", type: "debit" },
  { code: "8410", name: "Valutakursförluster", category: "FX Loss", type: "debit" },
  { code: "8420", name: "Valutakursvinster", category: "FX Gain", type: "credit" },

  // Group 88: Bokslutsdispositioner (Year-end Adjustments)
  { code: "8810", name: "Periodiseringsfond", category: "Year-end", type: "debit" },
  { code: "8830", name: "Överavskrivningar", category: "Year-end", type: "debit" },

  // Group 89: Skatt (Tax)
  { code: "8910", name: "Skatt på årets resultat", category: "Tax", type: "debit" }
];

// US Account Codes (US GAAP)
export const ACCOUNT_CODES_US = [
  // 1000-1999: ASSETS

  // Current Assets - Cash & Equivalents
  { code: "1000", name: "Cash - Operating Account", category: "Cash", type: "debit" },
  { code: "1010", name: "Cash - Payroll Account", category: "Cash", type: "debit" },
  { code: "1020", name: "Petty Cash", category: "Cash", type: "debit" },
  { code: "1050", name: "Money Market Account", category: "Cash", type: "debit" },
  { code: "1060", name: "Savings Account", category: "Cash", type: "debit" },

  // Current Assets - Receivables
  { code: "1200", name: "Accounts Receivable", category: "Receivables", type: "debit" },
  { code: "1205", name: "Allowance for Doubtful Accounts", category: "Receivables", type: "credit" },
  { code: "1210", name: "Notes Receivable - Current", category: "Receivables", type: "debit" },
  { code: "1220", name: "Employee Advances", category: "Receivables", type: "debit" },
  { code: "1230", name: "Other Receivables", category: "Receivables", type: "debit" },

  // Current Assets - Inventory
  { code: "1300", name: "Raw Materials Inventory", category: "Inventory", type: "debit" },
  { code: "1310", name: "Work in Process Inventory", category: "Inventory", type: "debit" },
  { code: "1320", name: "Finished Goods Inventory", category: "Inventory", type: "debit" },
  { code: "1330", name: "Merchandise Inventory", category: "Inventory", type: "debit" },
  { code: "1340", name: "Inventory Reserve", category: "Inventory", type: "credit" },

  // Current Assets - Prepaid Expenses
  { code: "1400", name: "Prepaid Insurance", category: "Prepaid", type: "debit" },
  { code: "1410", name: "Prepaid Rent", category: "Prepaid", type: "debit" },
  { code: "1420", name: "Prepaid Expenses - Other", category: "Prepaid", type: "debit" },
  { code: "1450", name: "Supplies Inventory", category: "Inventory", type: "debit" },

  // Fixed Assets - Property, Plant & Equipment
  { code: "1500", name: "Land", category: "Fixed Assets", type: "debit" },
  { code: "1510", name: "Buildings", category: "Fixed Assets", type: "debit" },
  { code: "1511", name: "Accumulated Depreciation - Buildings", category: "Fixed Assets", type: "credit" },
  { code: "1520", name: "Leasehold Improvements", category: "Fixed Assets", type: "debit" },
  { code: "1521", name: "Accumulated Amortization - Leasehold", category: "Fixed Assets", type: "credit" },
  { code: "1530", name: "Machinery & Equipment", category: "Equipment", type: "debit" },
  { code: "1531", name: "Accumulated Depreciation - Machinery", category: "Equipment", type: "credit" },
  { code: "1540", name: "Furniture & Fixtures", category: "Equipment", type: "debit" },
  { code: "1541", name: "Accumulated Depreciation - Furniture", category: "Equipment", type: "credit" },
  { code: "1550", name: "Vehicles", category: "Vehicles", type: "debit" },
  { code: "1551", name: "Accumulated Depreciation - Vehicles", category: "Vehicles", type: "credit" },
  { code: "1560", name: "Computer Equipment", category: "IT Equipment", type: "debit" },
  { code: "1561", name: "Accumulated Depreciation - Computers", category: "IT Equipment", type: "credit" },
  { code: "1570", name: "Office Equipment", category: "Equipment", type: "debit" },
  { code: "1571", name: "Accumulated Depreciation - Office Equipment", category: "Equipment", type: "credit" },

  // Other Assets
  { code: "1700", name: "Goodwill", category: "Intangible Assets", type: "debit" },
  { code: "1710", name: "Patents", category: "Intangible Assets", type: "debit" },
  { code: "1720", name: "Trademarks", category: "Intangible Assets", type: "debit" },
  { code: "1730", name: "Software", category: "Intangible Assets", type: "debit" },
  { code: "1740", name: "Accumulated Amortization - Intangibles", category: "Intangible Assets", type: "credit" },
  { code: "1800", name: "Deposits", category: "Other Assets", type: "debit" },
  { code: "1810", name: "Long-term Investments", category: "Investments", type: "debit" },

  // 2000-2999: LIABILITIES

  // Current Liabilities - Payables
  { code: "2000", name: "Accounts Payable", category: "Payables", type: "credit" },
  { code: "2010", name: "Accrued Expenses", category: "Payables", type: "credit" },
  { code: "2020", name: "Notes Payable - Current", category: "Payables", type: "credit" },
  { code: "2030", name: "Current Portion - Long-term Debt", category: "Payables", type: "credit" },

  // Current Liabilities - Payroll
  { code: "2100", name: "Sales Tax Payable", category: "Tax", type: "credit" },
  { code: "2110", name: "Payroll Tax Payable - Federal", category: "Payroll Tax", type: "credit" },
  { code: "2111", name: "Payroll Tax Payable - State", category: "Payroll Tax", type: "credit" },
  { code: "2115", name: "FICA Payable", category: "Payroll Tax", type: "credit" },
  { code: "2116", name: "Medicare Payable", category: "Payroll Tax", type: "credit" },
  { code: "2120", name: "Federal Unemployment Tax Payable", category: "Payroll Tax", type: "credit" },
  { code: "2121", name: "State Unemployment Tax Payable", category: "Payroll Tax", type: "credit" },
  { code: "2130", name: "Employee Benefits Payable", category: "Payroll", type: "credit" },
  { code: "2140", name: "401(k) Contributions Payable", category: "Payroll", type: "credit" },
  { code: "2150", name: "Health Insurance Payable", category: "Payroll", type: "credit" },

  // Current Liabilities - Accruals
  { code: "2200", name: "Accrued Wages", category: "Accrued Expenses", type: "credit" },
  { code: "2210", name: "Accrued Vacation", category: "Accrued Expenses", type: "credit" },
  { code: "2220", name: "Accrued Interest", category: "Accrued Expenses", type: "credit" },
  { code: "2230", name: "Customer Deposits", category: "Liabilities", type: "credit" },
  { code: "2240", name: "Unearned Revenue", category: "Liabilities", type: "credit" },

  // Long-term Liabilities
  { code: "2500", name: "Notes Payable - Long-term", category: "Long-term Debt", type: "credit" },
  { code: "2510", name: "Mortgage Payable", category: "Long-term Debt", type: "credit" },
  { code: "2520", name: "Bonds Payable", category: "Long-term Debt", type: "credit" },
  { code: "2530", name: "Loans from Officers", category: "Long-term Debt", type: "credit" },

  // 3000-3999: EQUITY
  { code: "3000", name: "Common Stock", category: "Equity", type: "credit" },
  { code: "3010", name: "Preferred Stock", category: "Equity", type: "credit" },
  { code: "3100", name: "Additional Paid-in Capital", category: "Equity", type: "credit" },
  { code: "3200", name: "Retained Earnings", category: "Equity", type: "credit" },
  { code: "3300", name: "Treasury Stock", category: "Equity", type: "debit" },
  { code: "3400", name: "Dividends", category: "Equity", type: "debit" },
  { code: "3900", name: "Owner's Draw", category: "Equity", type: "debit" },
  { code: "3950", name: "Owner's Contributions", category: "Equity", type: "credit" },

  // 4000-4999: REVENUE
  { code: "4000", name: "Sales Revenue - Product A", category: "Revenue", type: "credit" },
  { code: "4010", name: "Sales Revenue - Product B", category: "Revenue", type: "credit" },
  { code: "4020", name: "Sales Revenue - Services", category: "Revenue", type: "credit" },
  { code: "4100", name: "Sales Returns & Allowances", category: "Revenue", type: "debit" },
  { code: "4200", name: "Sales Discounts", category: "Revenue", type: "debit" },
  { code: "4500", name: "Interest Income", category: "Other Income", type: "credit" },
  { code: "4600", name: "Dividend Income", category: "Other Income", type: "credit" },
  { code: "4700", name: "Rental Income", category: "Other Income", type: "credit" },
  { code: "4800", name: "Gain on Sale of Assets", category: "Other Income", type: "credit" },
  { code: "4900", name: "Miscellaneous Income", category: "Other Income", type: "credit" },

  // 5000-5999: COST OF GOODS SOLD
  { code: "5000", name: "Cost of Goods Sold - Materials", category: "COGS", type: "debit" },
  { code: "5010", name: "Cost of Goods Sold - Labor", category: "COGS", type: "debit" },
  { code: "5020", name: "Cost of Goods Sold - Overhead", category: "COGS", type: "debit" },
  { code: "5100", name: "Freight & Shipping Costs", category: "COGS", type: "debit" },
  { code: "5200", name: "Purchase Discounts", category: "COGS", type: "credit" },
  { code: "5300", name: "Inventory Adjustments", category: "COGS", type: "debit" },

  // 6000-6999: OPERATING EXPENSES

  // Selling Expenses
  { code: "6000", name: "Advertising Expense", category: "Marketing", type: "debit" },
  { code: "6010", name: "Marketing Expense", category: "Marketing", type: "debit" },
  { code: "6020", name: "Website & Digital Marketing", category: "Marketing", type: "debit" },
  { code: "6100", name: "Sales Commissions", category: "Sales", type: "debit" },
  { code: "6110", name: "Sales Salaries", category: "Sales", type: "debit" },
  { code: "6200", name: "Travel Expense", category: "Travel", type: "debit" },
  { code: "6210", name: "Meals & Entertainment - 50% Deductible", category: "Meals", type: "debit" },
  { code: "6211", name: "Meals & Entertainment - 100% Deductible", category: "Meals", type: "debit" },
  { code: "6220", name: "Lodging", category: "Travel", type: "debit" },
  { code: "6230", name: "Auto Expense - Mileage", category: "Travel", type: "debit" },
  { code: "6231", name: "Auto Expense - Gas & Fuel", category: "Travel", type: "debit" },
  { code: "6232", name: "Auto Expense - Repairs", category: "Travel", type: "debit" },
  { code: "6233", name: "Auto Expense - Insurance", category: "Travel", type: "debit" },

  // Administrative Expenses
  { code: "6300", name: "Office Supplies", category: "Office Supplies", type: "debit" },
  { code: "6310", name: "Office Equipment (under $2,500)", category: "Office Supplies", type: "debit" },
  { code: "6320", name: "Postage & Shipping", category: "Office", type: "debit" },
  { code: "6330", name: "Printing & Copying", category: "Office", type: "debit" },
  { code: "6400", name: "Rent Expense", category: "Rent", type: "debit" },
  { code: "6410", name: "Property Tax", category: "Tax", type: "debit" },
  { code: "6420", name: "Utilities - Electric", category: "Utilities", type: "debit" },
  { code: "6421", name: "Utilities - Gas", category: "Utilities", type: "debit" },
  { code: "6422", name: "Utilities - Water", category: "Utilities", type: "debit" },
  { code: "6423", name: "Utilities - Trash", category: "Utilities", type: "debit" },
  { code: "6430", name: "Telephone", category: "Utilities", type: "debit" },
  { code: "6431", name: "Internet", category: "Utilities", type: "debit" },
  { code: "6500", name: "Insurance - General Liability", category: "Insurance", type: "debit" },
  { code: "6510", name: "Insurance - Professional Liability", category: "Insurance", type: "debit" },
  { code: "6520", name: "Insurance - Workers Compensation", category: "Insurance", type: "debit" },
  { code: "6530", name: "Insurance - Property", category: "Insurance", type: "debit" },

  // Professional Services
  { code: "6600", name: "Accounting & Bookkeeping", category: "Services", type: "debit" },
  { code: "6610", name: "Legal & Professional Fees", category: "Services", type: "debit" },
  { code: "6620", name: "Consulting Fees", category: "Services", type: "debit" },
  { code: "6630", name: "IT Services & Support", category: "IT", type: "debit" },
  { code: "6640", name: "Software Subscriptions", category: "IT", type: "debit" },

  // Payroll & Benefits
  { code: "6700", name: "Salaries - Officers", category: "Salaries", type: "debit" },
  { code: "6710", name: "Salaries - Administrative", category: "Salaries", type: "debit" },
  { code: "6720", name: "Wages - Hourly", category: "Salaries", type: "debit" },
  { code: "6730", name: "Payroll Taxes - FICA", category: "Payroll Tax", type: "debit" },
  { code: "6731", name: "Payroll Taxes - Medicare", category: "Payroll Tax", type: "debit" },
  { code: "6732", name: "Payroll Taxes - FUTA", category: "Payroll Tax", type: "debit" },
  { code: "6733", name: "Payroll Taxes - SUTA", category: "Payroll Tax", type: "debit" },
  { code: "6750", name: "Employee Benefits - Health Insurance", category: "Benefits", type: "debit" },
  { code: "6751", name: "Employee Benefits - 401(k) Match", category: "Benefits", type: "debit" },
  { code: "6752", name: "Employee Benefits - Other", category: "Benefits", type: "debit" },

  // Other Operating Expenses
  { code: "6800", name: "Bank Charges & Fees", category: "Bank Fees", type: "debit" },
  { code: "6810", name: "Credit Card Processing Fees", category: "Bank Fees", type: "debit" },
  { code: "6820", name: "Merchant Fees", category: "Bank Fees", type: "debit" },
  { code: "6900", name: "Licenses & Permits", category: "Administrative", type: "debit" },
  { code: "6910", name: "Dues & Subscriptions", category: "Administrative", type: "debit" },
  { code: "6920", name: "Training & Education", category: "Administrative", type: "debit" },
  { code: "6950", name: "Repairs & Maintenance", category: "Maintenance", type: "debit" },
  { code: "6960", name: "Janitorial & Cleaning", category: "Maintenance", type: "debit" },
  { code: "6980", name: "Charitable Contributions", category: "Other", type: "debit" },
  { code: "6990", name: "Miscellaneous Expense", category: "Other", type: "debit" },

  // 7000-7999: OTHER EXPENSES
  { code: "7000", name: "Depreciation Expense", category: "Depreciation", type: "debit" },
  { code: "7010", name: "Amortization Expense", category: "Amortization", type: "debit" },
  { code: "7100", name: "Interest Expense - Bank Loans", category: "Interest", type: "debit" },
  { code: "7110", name: "Interest Expense - Credit Cards", category: "Interest", type: "debit" },
  { code: "7120", name: "Interest Expense - Other", category: "Interest", type: "debit" },
  { code: "7200", name: "Bad Debt Expense", category: "Other Expenses", type: "debit" },
  { code: "7300", name: "Loss on Sale of Assets", category: "Other Expenses", type: "debit" },

  // 8000-8999: INCOME TAX
  { code: "8000", name: "Federal Income Tax Expense", category: "Tax", type: "debit" },
  { code: "8010", name: "State Income Tax Expense", category: "Tax", type: "debit" },
  { code: "8020", name: "Local Income Tax Expense", category: "Tax", type: "debit" }
];

// ============================================
// FINLAND (Finnish Chart of Accounts)
// ============================================

export const ACCOUNT_CODES_FI = [
  // Group 10: Aineettomat hyödykkeet (Intangible Assets)
  { code: "1000", name: "Kehittämismenot", category: "Assets", type: "debit" },
  { code: "1010", name: "Aineettomat oikeudet", category: "Assets", type: "debit" },
  { code: "1020", name: "Liikearvo", category: "Assets", type: "debit" },
  { code: "1030", name: "Muut pitkävaikutteiset menot", category: "Assets", type: "debit" },
  { code: "1040", name: "Ennakkomaksut", category: "Assets", type: "debit" },

  // Group 11-13: Aineelliset hyödykkeet (Tangible Assets)
  { code: "1100", name: "Maa-alueet", category: "Land", type: "debit" },
  { code: "1110", name: "Rakennukset ja rakennelmat", category: "Buildings", type: "debit" },
  { code: "1111", name: "Rakennusten kertyneet poistot", category: "Buildings", type: "credit" },
  { code: "1200", name: "Koneet ja kalusto", category: "Equipment", type: "debit" },
  { code: "1201", name: "Koneiden kertyneet poistot", category: "Equipment", type: "credit" },
  { code: "1300", name: "Muut aineelliset hyödykkeet", category: "Equipment", type: "debit" },
  { code: "1301", name: "Muiden aineellisten hyödykkeiden poistot", category: "Equipment", type: "credit" },
  { code: "1400", name: "Ennakkomaksut ja keskeneräiset hankinnat", category: "Assets", type: "debit" },

  // Group 14-15: Vaihto-omaisuus (Inventory)
  { code: "1500", name: "Aineet ja tarvikkeet", category: "Inventory", type: "debit" },
  { code: "1510", name: "Keskeneräiset tuotteet", category: "Inventory", type: "debit" },
  { code: "1520", name: "Valmiit tuotteet/tavarat", category: "Inventory", type: "debit" },
  { code: "1530", name: "Muu vaihto-omaisuus", category: "Inventory", type: "debit" },
  { code: "1540", name: "Ennakkomaksut", category: "Inventory", type: "debit" },

  // Group 16-17: Saamiset (Receivables)
  { code: "1600", name: "Myyntisaamiset", category: "Receivables", type: "debit" },
  { code: "1610", name: "Lainasaamiset", category: "Receivables", type: "debit" },
  { code: "1620", name: "Muut saamiset", category: "Receivables", type: "debit" },
  { code: "1630", name: "Siirtosaamiset", category: "Prepaid", type: "debit" },
  { code: "1700", name: "Arvonlisävero saamiset", category: "VAT", type: "debit" },

  // Group 19: Rahat ja pankkisaamiset (Cash and Bank)
  { code: "1900", name: "Kassa", category: "Cash", type: "debit" },
  { code: "1910", name: "Pankkitili", category: "Bank", type: "debit" },
  { code: "1920", name: "Muut rahoitusvarat", category: "Bank", type: "debit" },

  // Group 20: Oma pääoma (Equity)
  { code: "2000", name: "Osakepääoma", category: "Equity", type: "credit" },
  { code: "2050", name: "Ylikurssirahasto", category: "Equity", type: "credit" },
  { code: "2060", name: "Arvonkorotusrahasto", category: "Equity", type: "credit" },
  { code: "2080", name: "Muut rahastot", category: "Equity", type: "credit" },
  { code: "2090", name: "Edellisten tilikausien voitto/tappio", category: "Equity", type: "credit" },
  { code: "2099", name: "Tilikauden voitto/tappio", category: "Equity", type: "credit" },

  // Group 24: Ostovelat (Accounts Payable)
  { code: "2400", name: "Ostovelat", category: "Payables", type: "credit" },
  { code: "2410", name: "Lainat rahoituslaitoksilta", category: "Liabilities", type: "credit" },
  { code: "2420", name: "Muut velat", category: "Liabilities", type: "credit" },
  { code: "2430", name: "Siirtovelat", category: "Accrued Expenses", type: "credit" },

  // Group 27-28: Verot ja maksut (Taxes)
  { code: "2700", name: "Arvonlisäverovelka", category: "VAT", type: "credit" },
  { code: "2710", name: "Ennakonpidätysvelka", category: "Payroll Tax", type: "credit" },
  { code: "2720", name: "Sosiaaliturvamaksuvelka", category: "Payroll Tax", type: "credit" },
  { code: "2800", name: "Yhteisöverovelka", category: "Tax", type: "credit" },

  // Group 30-39: Liikevaihto (Revenue)
  { code: "3000", name: "Myynti kotimaa", category: "Revenue", type: "credit" },
  { code: "3010", name: "Myynti EU", category: "Revenue", type: "credit" },
  { code: "3020", name: "Myynti EU ulkopuolelle", category: "Revenue", type: "credit" },
  { code: "3900", name: "Myyntialennukset", category: "Revenue", type: "debit" },

  // Group 40-49: Materiaalit ja tavarat (Materials and Goods)
  { code: "4000", name: "Ostot tilikauden aikana", category: "COGS", type: "debit" },
  { code: "4010", name: "Ostot EU:sta", category: "COGS", type: "debit" },
  { code: "4020", name: "Ostot EU:n ulkopuolelta", category: "COGS", type: "debit" },
  { code: "4100", name: "Varastojen muutos", category: "COGS", type: "debit" },

  // Group 50-59: Henkilöstökulut (Personnel Costs)
  { code: "5000", name: "Palkat ja palkkiot", category: "Salaries", type: "debit" },
  { code: "5100", name: "Eläkekulut", category: "Payroll Tax", type: "debit" },
  { code: "5200", name: "Muut henkilösivukulut", category: "Payroll Tax", type: "debit" },

  // Group 60-69: Liiketoiminnan muut kulut (Other Operating Expenses)
  { code: "6000", name: "Vuokrat", category: "Rent", type: "debit" },
  { code: "6100", name: "Sähkö, lämpö, vesi", category: "Utilities", type: "debit" },
  { code: "6200", name: "Toimistotarvikkeet", category: "Office Supplies", type: "debit" },
  { code: "6300", name: "Matkakulut", category: "Travel", type: "debit" },
  { code: "6310", name: "Edustuskulut", category: "Meals", type: "debit" },
  { code: "6400", name: "Auto- ja kuljetuskulut", category: "Vehicles", type: "debit" },
  { code: "6500", name: "Tietoliikennekulut", category: "IT", type: "debit" },
  { code: "6600", name: "Vakuutukset", category: "Insurance", type: "debit" },
  { code: "6700", name: "Markkinointi", category: "Marketing", type: "debit" },
  { code: "6800", name: "Ulkopuoliset palvelut", category: "Services", type: "debit" },
  { code: "6900", name: "Muut liiketoiminnan kulut", category: "Other", type: "debit" },

  // Group 70: Poistot (Depreciation)
  { code: "7000", name: "Suunnitelman mukaiset poistot", category: "Depreciation", type: "debit" },

  // Group 90-99: Rahoitustuotot ja -kulut (Financial Income/Expenses)
  { code: "9000", name: "Korkotuotot", category: "Interest Income", type: "credit" },
  { code: "9100", name: "Korkokulut", category: "Interest Expense", type: "debit" },
  { code: "9200", name: "Muut rahoitustuotot", category: "Financial Income", type: "credit" },
  { code: "9300", name: "Muut rahoituskulut", category: "Financial Expenses", type: "debit" }
];

// ============================================
// DENMARK (Danish Chart of Accounts)
// ============================================

export const ACCOUNT_CODES_DK = [
  // Group 10: Immaterielle anlægsaktiver (Intangible Assets)
  { code: "1000", name: "Udviklingsprojekter", category: "Assets", type: "debit" },
  { code: "1010", name: "Patenter", category: "Assets", type: "debit" },
  { code: "1020", name: "Goodwill", category: "Assets", type: "debit" },
  { code: "1030", name: "Software", category: "Assets", type: "debit" },

  // Group 11-14: Materielle anlægsaktiver (Tangible Assets)
  { code: "1100", name: "Grunde og bygninger", category: "Buildings", type: "debit" },
  { code: "1101", name: "Afskrivning på bygninger", category: "Buildings", type: "credit" },
  { code: "1200", name: "Produktionsanlæg og maskiner", category: "Equipment", type: "debit" },
  { code: "1201", name: "Afskrivning på maskiner", category: "Equipment", type: "credit" },
  { code: "1300", name: "Andre anlæg, driftsmateriel og inventar", category: "Equipment", type: "debit" },
  { code: "1301", name: "Afskrivning på inventar", category: "Equipment", type: "credit" },
  { code: "1400", name: "Køretøjer", category: "Vehicles", type: "debit" },
  { code: "1401", name: "Afskrivning på køretøjer", category: "Vehicles", type: "credit" },

  // Group 15: Varebeholdninger (Inventory)
  { code: "1500", name: "Råvarer og hjælpematerialer", category: "Inventory", type: "debit" },
  { code: "1510", name: "Varer under fremstilling", category: "Inventory", type: "debit" },
  { code: "1520", name: "Fremstillede varer og handelsvarer", category: "Inventory", type: "debit" },

  // Group 16-17: Tilgodehavender (Receivables)
  { code: "1600", name: "Tilgodehavender fra salg og tjenesteydelser", category: "Receivables", type: "debit" },
  { code: "1610", name: "Igangværende arbejder for fremmed regning", category: "Receivables", type: "debit" },
  { code: "1620", name: "Andre tilgodehavender", category: "Receivables", type: "debit" },
  { code: "1700", name: "Periodeafgrænsningsposter", category: "Prepaid", type: "debit" },
  { code: "1750", name: "Moms tilgodehavende", category: "VAT", type: "debit" },

  // Group 19: Likvide beholdninger (Cash and Bank)
  { code: "1900", name: "Kasse", category: "Cash", type: "debit" },
  { code: "1910", name: "Bankkonto", category: "Bank", type: "debit" },
  { code: "1920", name: "Deposita", category: "Bank", type: "debit" },

  // Group 20: Egenkapital (Equity)
  { code: "2000", name: "Selskabskapital", category: "Equity", type: "credit" },
  { code: "2050", name: "Overkurs ved emission", category: "Equity", type: "credit" },
  { code: "2080", name: "Reserve for nettoopskrivning", category: "Equity", type: "credit" },
  { code: "2090", name: "Overført overskud eller underskud", category: "Equity", type: "credit" },

  // Group 24-25: Gæld (Liabilities)
  { code: "2400", name: "Leverandører af varer og tjenesteydelser", category: "Payables", type: "credit" },
  { code: "2410", name: "Kreditinstitutter", category: "Liabilities", type: "credit" },
  { code: "2420", name: "Igangværende arbejder for fremmed regning", category: "Liabilities", type: "credit" },
  { code: "2500", name: "Skyldig løn", category: "Payroll", type: "credit" },
  { code: "2510", name: "Skyldige feriepenge", category: "Payroll", type: "credit" },

  // Group 27-28: Skatter og afgifter (Taxes)
  { code: "2700", name: "Moms", category: "VAT", type: "credit" },
  { code: "2710", name: "Skyldig A-skat", category: "Payroll Tax", type: "credit" },
  { code: "2720", name: "Skyldig AM-bidrag", category: "Payroll Tax", type: "credit" },
  { code: "2730", name: "Skyldige ATP-bidrag", category: "Payroll Tax", type: "credit" },
  { code: "2800", name: "Selskabsskat", category: "Tax", type: "credit" },

  // Group 30-39: Nettoomsætning (Revenue)
  { code: "3000", name: "Salg af varer Danmark", category: "Revenue", type: "credit" },
  { code: "3010", name: "Salg af varer EU", category: "Revenue", type: "credit" },
  { code: "3020", name: "Salg af varer uden for EU", category: "Revenue", type: "credit" },
  { code: "3100", name: "Salg af ydelser Danmark", category: "Revenue", type: "credit" },
  { code: "3110", name: "Salg af ydelser EU", category: "Revenue", type: "credit" },
  { code: "3120", name: "Salg af ydelser uden for EU", category: "Revenue", type: "credit" },
  { code: "3900", name: "Rabatter", category: "Revenue", type: "debit" },

  // Group 40-49: Vareforbrug (Cost of Goods)
  { code: "4000", name: "Indkøb af varer Danmark", category: "COGS", type: "debit" },
  { code: "4010", name: "Indkøb af varer EU", category: "COGS", type: "debit" },
  { code: "4020", name: "Indkøb af varer uden for EU", category: "COGS", type: "debit" },
  { code: "4100", name: "Vareforbrug", category: "COGS", type: "debit" },

  // Group 50-59: Personaleomkostninger (Personnel Costs)
  { code: "5000", name: "Lønninger", category: "Salaries", type: "debit" },
  { code: "5100", name: "Pension", category: "Payroll Tax", type: "debit" },
  { code: "5200", name: "Andre personaleomkostninger", category: "Payroll Tax", type: "debit" },

  // Group 60-69: Øvrige eksterne omkostninger (Other External Costs)
  { code: "6000", name: "Husleje", category: "Rent", type: "debit" },
  { code: "6100", name: "El, vand og varme", category: "Utilities", type: "debit" },
  { code: "6200", name: "Kontorartikler", category: "Office Supplies", type: "debit" },
  { code: "6300", name: "Rejseomkostninger", category: "Travel", type: "debit" },
  { code: "6310", name: "Repræsentation", category: "Meals", type: "debit" },
  { code: "6400", name: "Biler og transport", category: "Vehicles", type: "debit" },
  { code: "6500", name: "Telefon og internet", category: "IT", type: "debit" },
  { code: "6600", name: "Forsikringer", category: "Insurance", type: "debit" },
  { code: "6700", name: "Markedsføring", category: "Marketing", type: "debit" },
  { code: "6800", name: "Revisor og konsulenter", category: "Services", type: "debit" },
  { code: "6900", name: "Andre omkostninger", category: "Other", type: "debit" },

  // Group 70: Afskrivninger (Depreciation)
  { code: "7000", name: "Afskrivninger", category: "Depreciation", type: "debit" },

  // Group 80-89: Finansielle indtægter og omkostninger (Financial Income/Expenses)
  { code: "8000", name: "Renteindtægter", category: "Interest Income", type: "credit" },
  { code: "8100", name: "Renteomkostninger", category: "Interest Expense", type: "debit" },
  { code: "8200", name: "Valutakursgevinst", category: "FX Gain", type: "credit" },
  { code: "8300", name: "Valutakurstab", category: "FX Loss", type: "debit" }
];

// ============================================
// NORWAY (Norsk Standard Kontoplan - NS 4102)
// ============================================

export const ACCOUNT_CODES_NO = [
  // Group 10: Immaterielle eiendeler (Intangible Assets)
  { code: "1000", name: "Forskning og utvikling", category: "Assets", type: "debit" },
  { code: "1010", name: "Konsesjoner, patenter, lisenser mv", category: "Assets", type: "debit" },
  { code: "1050", name: "Goodwill", category: "Assets", type: "debit" },
  { code: "1080", name: "Utsatt skattefordel", category: "Assets", type: "debit" },

  // Group 11-13: Varige driftsmidler (Fixed Assets)
  { code: "1100", name: "Tomter, grunnareal og lignende", category: "Land", type: "debit" },
  { code: "1200", name: "Bygg og anlegg", category: "Buildings", type: "debit" },
  { code: "1201", name: "Akkumulert avskrivning bygg", category: "Buildings", type: "credit" },
  { code: "1300", name: "Maskiner og anlegg", category: "Equipment", type: "debit" },
  { code: "1301", name: "Akkumulert avskrivning maskiner", category: "Equipment", type: "credit" },
  { code: "1400", name: "Driftsløsøre, inventar, verktøy og lignende", category: "Equipment", type: "debit" },
  { code: "1401", name: "Akkumulert avskrivning inventar", category: "Equipment", type: "credit" },
  { code: "1500", name: "Transportmidler", category: "Vehicles", type: "debit" },
  { code: "1501", name: "Akkumulert avskrivning transportmidler", category: "Vehicles", type: "credit" },

  // Group 14: Varelager (Inventory)
  { code: "1400", name: "Varelager", category: "Inventory", type: "debit" },
  { code: "1410", name: "Råvarer og innkjøpte halvfabrikata", category: "Inventory", type: "debit" },
  { code: "1420", name: "Varer under tilvirkning", category: "Inventory", type: "debit" },
  { code: "1430", name: "Ferdigvarer og handelsvarer", category: "Inventory", type: "debit" },

  // Group 15: Kundefordringer (Accounts Receivable)
  { code: "1500", name: "Kundefordringer", category: "Receivables", type: "debit" },
  { code: "1501", name: "Tap på krav", category: "Receivables", type: "credit" },
  { code: "1530", name: "Andre kortsiktige fordringer", category: "Receivables", type: "debit" },

  // Group 17-19: Andre omløpsmidler (Other Current Assets)
  { code: "1700", name: "Forskuddsbetalte kostnader", category: "Prepaid", type: "debit" },
  { code: "1750", name: "Merverdiavgift oppgjørskonto", category: "VAT", type: "debit" },
  { code: "1900", name: "Kasse", category: "Cash", type: "debit" },
  { code: "1920", name: "Bankkonti", category: "Bank", type: "debit" },
  { code: "1930", name: "Andre bankinnskudd", category: "Bank", type: "debit" },

  // Group 20: Egenkapital (Equity)
  { code: "2000", name: "Selskapskapital", category: "Equity", type: "credit" },
  { code: "2050", name: "Overkursfond", category: "Equity", type: "credit" },
  { code: "2080", name: "Annen egenkapital", category: "Equity", type: "credit" },
  { code: "2090", name: "Udekket tap", category: "Equity", type: "debit" },
  { code: "2099", name: "Årets resultat", category: "Equity", type: "credit" },

  // Group 24-25: Gjeld (Liabilities)
  { code: "2400", name: "Leverandørgjeld", category: "Payables", type: "credit" },
  { code: "2410", name: "Konsernleverandørgjeld", category: "Payables", type: "credit" },
  { code: "2500", name: "Betalbar skatt", category: "Tax", type: "credit" },
  { code: "2510", name: "Skyldig offentlige avgifter", category: "Tax", type: "credit" },
  { code: "2520", name: "Forskudd fra kunder", category: "Liabilities", type: "credit" },
  { code: "2530", name: "Påløpte kostnader", category: "Accrued Expenses", type: "credit" },

  // Group 27: Merverdiavgift (VAT)
  { code: "2700", name: "Utgående merverdiavgift høy sats", category: "VAT", type: "credit" },
  { code: "2701", name: "Utgående merverdiavgift middels sats", category: "VAT", type: "credit" },
  { code: "2702", name: "Utgående merverdiavgift lav sats", category: "VAT", type: "credit" },
  { code: "2710", name: "Inngående merverdiavgift", category: "VAT", type: "debit" },

  // Group 30-39: Salgsinntekter (Sales Revenue)
  { code: "3000", name: "Salgsinntekt varer og tjenester avgiftspliktig høy sats", category: "Revenue", type: "credit" },
  { code: "3100", name: "Salgsinntekt varer og tjenester avgiftspliktig middels sats", category: "Revenue", type: "credit" },
  { code: "3300", name: "Salgsinntekt varer og tjenester avgiftspliktig lav sats", category: "Revenue", type: "credit" },
  { code: "3400", name: "Salgsinntekt varer og tjenester utenfor merverdiavgiftsloven", category: "Revenue", type: "credit" },
  { code: "3900", name: "Annen driftsinntekt", category: "Revenue", type: "credit" },

  // Group 40-49: Varekostnad (Cost of Goods)
  { code: "4000", name: "Varekjøp", category: "COGS", type: "debit" },
  { code: "4005", name: "Innkjøp fra utlandet", category: "COGS", type: "debit" },
  { code: "4300", name: "Beholdningsendring", category: "COGS", type: "debit" },

  // Group 50-59: Lønnskostnad (Personnel Costs)
  { code: "5000", name: "Lønn", category: "Salaries", type: "debit" },
  { code: "5090", name: "Arbeidsgiveravgift", category: "Payroll Tax", type: "debit" },
  { code: "5400", name: "Pensjonskostnader", category: "Payroll Tax", type: "debit" },
  { code: "5900", name: "Andre ytelser", category: "Benefits", type: "debit" },

  // Group 60-69: Annen driftskostnad (Other Operating Costs)
  { code: "6000", name: "Leiekostnader lokaler", category: "Rent", type: "debit" },
  { code: "6100", name: "Strøm og fyring", category: "Utilities", type: "debit" },
  { code: "6300", name: "Reparasjon og vedlikehold", category: "Maintenance", type: "debit" },
  { code: "6340", name: "Biler og maskiner", category: "Vehicles", type: "debit" },
  { code: "6500", name: "Fremmede tjenester", category: "Services", type: "debit" },
  { code: "6540", name: "Revisjonstjenester", category: "Services", type: "debit" },
  { code: "6700", name: "Kontorkostnad", category: "Office Supplies", type: "debit" },
  { code: "6800", name: "Reisekostnad", category: "Travel", type: "debit" },
  { code: "6900", name: "Representasjon", category: "Meals", type: "debit" },
  { code: "6950", name: "Gaver og blomster", category: "Other", type: "debit" },
  { code: "7000", name: "Annonsering og reklame", category: "Marketing", type: "debit" },
  { code: "7100", name: "Frakt og transport", category: "Transport", type: "debit" },
  { code: "7140", name: "Reise gods og emballasje", category: "Transport", type: "debit" },
  { code: "7320", name: "Telefon", category: "Utilities", type: "debit" },
  { code: "7330", name: "Bredbånd, internett og datakommunikasjon", category: "IT", type: "debit" },
  { code: "7500", name: "Forsikringer", category: "Insurance", type: "debit" },
  { code: "7700", name: "Andre kostnader", category: "Other", type: "debit" },

  // Group 79: Avskrivninger (Depreciation)
  { code: "7900", name: "Ordinære avskrivninger", category: "Depreciation", type: "debit" },

  // Group 80-89: Finansinntekter og -kostnader (Financial Income/Expenses)
  { code: "8050", name: "Renteinntekt bankinnskudd", category: "Interest Income", type: "credit" },
  { code: "8070", name: "Annen renteinntekt", category: "Interest Income", type: "credit" },
  { code: "8150", name: "Rentekostnad til kredittinstitusjoner", category: "Interest Expense", type: "debit" },
  { code: "8170", name: "Annen rentekostnad", category: "Interest Expense", type: "debit" },
  { code: "8300", name: "Valutatap", category: "FX Loss", type: "debit" },
  { code: "8310", name: "Valutagevinst", category: "FX Gain", type: "credit" }
];

// UK Account Codes (UK GAAP)
export const ACCOUNT_CODES_UK = [
  // 0000-0999: FIXED ASSETS

  // Intangible Assets
  { code: "0010", name: "Goodwill", category: "Intangible Assets", type: "debit" },
  { code: "0011", name: "Goodwill Amortisation", category: "Intangible Assets", type: "credit" },
  { code: "0020", name: "Patents", category: "Intangible Assets", type: "debit" },
  { code: "0021", name: "Patents Amortisation", category: "Intangible Assets", type: "credit" },
  { code: "0030", name: "Trademarks", category: "Intangible Assets", type: "debit" },
  { code: "0031", name: "Trademarks Amortisation", category: "Intangible Assets", type: "credit" },

  // Tangible Fixed Assets
  { code: "0040", name: "Freehold Land & Buildings", category: "Property", type: "debit" },
  { code: "0041", name: "Freehold Property Depreciation", category: "Property", type: "credit" },
  { code: "0050", name: "Leasehold Property", category: "Property", type: "debit" },
  { code: "0051", name: "Leasehold Property Depreciation", category: "Property", type: "credit" },
  { code: "0060", name: "Plant & Machinery", category: "Equipment", type: "debit" },
  { code: "0061", name: "Plant & Machinery Depreciation", category: "Equipment", type: "credit" },
  { code: "0070", name: "Office Equipment", category: "Equipment", type: "debit" },
  { code: "0071", name: "Office Equipment Depreciation", category: "Equipment", type: "credit" },
  { code: "0080", name: "Furniture & Fittings", category: "Furniture", type: "debit" },
  { code: "0081", name: "Furniture & Fittings Depreciation", category: "Furniture", type: "credit" },
  { code: "0090", name: "Motor Vehicles", category: "Vehicles", type: "debit" },
  { code: "0091", name: "Motor Vehicles Depreciation", category: "Vehicles", type: "credit" },
  { code: "0100", name: "Computer Equipment", category: "IT Equipment", type: "debit" },
  { code: "0101", name: "Computer Equipment Depreciation", category: "IT Equipment", type: "credit" },

  // 1000-1999: CURRENT ASSETS

  // Stock (Inventory)
  { code: "1001", name: "Stock", category: "Inventory", type: "debit" },
  { code: "1002", name: "Work in Progress", category: "Inventory", type: "debit" },
  { code: "1003", name: "Finished Goods", category: "Inventory", type: "debit" },

  // Debtors (Receivables)
  { code: "1100", name: "Debtors Control Account", category: "Receivables", type: "debit" },
  { code: "1101", name: "Provision for Bad Debts", category: "Receivables", type: "credit" },
  { code: "1102", name: "Other Debtors", category: "Receivables", type: "debit" },
  { code: "1103", name: "Prepayments", category: "Prepaid", type: "debit" },
  { code: "1104", name: "Accrued Income", category: "Receivables", type: "debit" },

  // Bank & Cash
  { code: "1200", name: "Bank Current Account", category: "Bank", type: "debit" },
  { code: "1210", name: "Bank Deposit Account", category: "Bank", type: "debit" },
  { code: "1220", name: "Building Society Account", category: "Bank", type: "debit" },
  { code: "1230", name: "Petty Cash", category: "Cash", type: "debit" },
  { code: "1240", name: "PayPal Account", category: "Bank", type: "debit" },
  { code: "1250", name: "Stripe Account", category: "Bank", type: "debit" },

  // 2000-2999: CURRENT LIABILITIES

  // Creditors (Payables)
  { code: "2100", name: "Creditors Control Account", category: "Payables", type: "credit" },
  { code: "2102", name: "Other Creditors", category: "Payables", type: "credit" },
  { code: "2109", name: "Accruals", category: "Accrued Expenses", type: "credit" },

  // VAT
  { code: "2200", name: "VAT Liability", category: "VAT", type: "credit" },
  { code: "2201", name: "VAT on Purchases", category: "VAT", type: "debit" },
  { code: "2202", name: "VAT on Sales", category: "VAT", type: "credit" },
  { code: "2210", name: "VAT Control", category: "VAT", type: "credit" },

  // PAYE & National Insurance
  { code: "2210", name: "PAYE", category: "Payroll Tax", type: "credit" },
  { code: "2211", name: "National Insurance", category: "Payroll Tax", type: "credit" },
  { code: "2220", name: "Pension Contributions Payable", category: "Payroll", type: "credit" },

  // Other Current Liabilities
  { code: "2300", name: "Corporation Tax", category: "Tax", type: "credit" },
  { code: "2310", name: "Dividends", category: "Equity", type: "credit" },
  { code: "2320", name: "Director's Loan Account", category: "Loans", type: "credit" },
  { code: "2330", name: "Hire Purchase", category: "Loans", type: "credit" },

  // 2500-2999: LONG TERM LIABILITIES
  { code: "2500", name: "Bank Loans", category: "Long-term Debt", type: "credit" },
  { code: "2510", name: "Director's Loans", category: "Long-term Debt", type: "credit" },
  { code: "2520", name: "Other Loans", category: "Long-term Debt", type: "credit" },

  // 3000-3999: CAPITAL & RESERVES
  { code: "3000", name: "Ordinary Share Capital", category: "Equity", type: "credit" },
  { code: "3010", name: "Preference Share Capital", category: "Equity", type: "credit" },
  { code: "3100", name: "Share Premium Account", category: "Equity", type: "credit" },
  { code: "3200", name: "Revaluation Reserve", category: "Equity", type: "credit" },
  { code: "3300", name: "Profit & Loss Account", category: "Equity", type: "credit" },

  // 4000-4999: SALES
  { code: "4000", name: "Sales - General", category: "Revenue", type: "credit" },
  { code: "4001", name: "Sales - Products", category: "Revenue", type: "credit" },
  { code: "4002", name: "Sales - Services", category: "Revenue", type: "credit" },
  { code: "4009", name: "Sales - Exports", category: "Revenue", type: "credit" },
  { code: "4100", name: "Sales Returns", category: "Revenue", type: "debit" },
  { code: "4200", name: "Discounts Allowed", category: "Revenue", type: "debit" },
  { code: "4900", name: "Miscellaneous Income", category: "Other Income", type: "credit" },
  { code: "4901", name: "Interest Received", category: "Other Income", type: "credit" },
  { code: "4902", name: "Rental Income", category: "Other Income", type: "credit" },

  // 5000-5999: DIRECT COSTS
  { code: "5000", name: "Materials Purchased", category: "COGS", type: "debit" },
  { code: "5001", name: "Purchases - Resale", category: "COGS", type: "debit" },
  { code: "5003", name: "Carriage Inwards", category: "COGS", type: "debit" },
  { code: "5100", name: "Direct Labour", category: "COGS", type: "debit" },
  { code: "5200", name: "Subcontractors", category: "COGS", type: "debit" },
  { code: "5400", name: "Discounts Received", category: "COGS", type: "credit" },

  // 6000-6999: OVERHEADS

  // Premises Costs
  { code: "6000", name: "Rent", category: "Rent", type: "debit" },
  { code: "6001", name: "Business Rates", category: "Rent", type: "debit" },
  { code: "6100", name: "Light & Heat", category: "Utilities", type: "debit" },
  { code: "6200", name: "Property Insurance", category: "Insurance", type: "debit" },
  { code: "6201", name: "Premises Repairs", category: "Maintenance", type: "debit" },

  // Administrative Expenses
  { code: "6300", name: "Printing & Stationery", category: "Office Supplies", type: "debit" },
  { code: "6301", name: "Postage", category: "Office", type: "debit" },
  { code: "6302", name: "Office Costs", category: "Office Supplies", type: "debit" },
  { code: "6400", name: "Telephone & Internet", category: "Utilities", type: "debit" },
  { code: "6500", name: "Computer Costs", category: "IT", type: "debit" },
  { code: "6501", name: "Software & Subscriptions", category: "IT", type: "debit" },
  { code: "6600", name: "Bank Charges", category: "Bank Fees", type: "debit" },
  { code: "6601", name: "Credit Card Charges", category: "Bank Fees", type: "debit" },

  // Professional Fees
  { code: "6700", name: "Accountancy Fees", category: "Services", type: "debit" },
  { code: "6701", name: "Legal & Professional Fees", category: "Services", type: "debit" },
  { code: "6702", name: "Consultancy Fees", category: "Services", type: "debit" },

  // Staff Costs
  { code: "6800", name: "Salaries", category: "Salaries", type: "debit" },
  { code: "6801", name: "Wages", category: "Salaries", type: "debit" },
  { code: "6810", name: "Employers NI", category: "Payroll Tax", type: "debit" },
  { code: "6811", name: "Employers Pension", category: "Payroll", type: "debit" },
  { code: "6820", name: "Staff Training", category: "Personnel", type: "debit" },
  { code: "6821", name: "Staff Welfare", category: "Personnel", type: "debit" },
  { code: "6822", name: "Recruitment Costs", category: "Personnel", type: "debit" },

  // Motor Expenses
  { code: "6900", name: "Motor Expenses", category: "Vehicles", type: "debit" },
  { code: "6901", name: "Fuel", category: "Vehicles", type: "debit" },
  { code: "6902", name: "Vehicle Repairs", category: "Vehicles", type: "debit" },
  { code: "6903", name: "Vehicle Insurance", category: "Vehicles", type: "debit" },
  { code: "6904", name: "Road Tax", category: "Vehicles", type: "debit" },
  { code: "6905", name: "Parking & Tolls", category: "Vehicles", type: "debit" },

  // 7000-7999: SELLING & DISTRIBUTION
  { code: "7000", name: "Advertising", category: "Marketing", type: "debit" },
  { code: "7001", name: "Marketing", category: "Marketing", type: "debit" },
  { code: "7002", name: "PR & Sponsorship", category: "Marketing", type: "debit" },
  { code: "7100", name: "Travel - National", category: "Travel", type: "debit" },
  { code: "7101", name: "Travel - Overseas", category: "Travel", type: "debit" },
  { code: "7102", name: "Accommodation", category: "Travel", type: "debit" },
  { code: "7200", name: "Entertainment", category: "Meals", type: "debit" },
  { code: "7201", name: "Subsistence", category: "Meals", type: "debit" },
  { code: "7300", name: "Subscriptions", category: "Services", type: "debit" },
  { code: "7400", name: "Insurance - General", category: "Insurance", type: "debit" },
  { code: "7401", name: "Insurance - Professional Indemnity", category: "Insurance", type: "debit" },
  { code: "7402", name: "Insurance - Public Liability", category: "Insurance", type: "debit" },
  { code: "7500", name: "Bad Debts", category: "Other Expenses", type: "debit" },
  { code: "7501", name: "Sundry Expenses", category: "Other Expenses", type: "debit" },
  { code: "7600", name: "Cleaning", category: "Maintenance", type: "debit" },
  { code: "7601", name: "Laundry", category: "Maintenance", type: "debit" },

  // 8000-8999: FINANCE COSTS
  { code: "8000", name: "Bank Interest Paid", category: "Interest", type: "debit" },
  { code: "8001", name: "HP Interest", category: "Interest", type: "debit" },
  { code: "8002", name: "Loan Interest", category: "Interest", type: "debit" },
  { code: "8003", name: "Other Interest Paid", category: "Interest", type: "debit" },
  { code: "8100", name: "Depreciation", category: "Depreciation", type: "debit" },
  { code: "8200", name: "Amortisation", category: "Amortization", type: "debit" }
];

// Category Mappings (for automatic verification generation)
export const CATEGORY_MAPPINGS = {
  SE: {
    "Office Supplies": { debit: "5410", credit: "2440", vat: "2641" },
    "Travel": { debit: "5610", credit: "2440", vat: "2641" },
    "Meals": { debit: "5810", credit: "2440", vat: "2641" },
    "Equipment": { debit: "5010", credit: "2440", vat: "2641" },
    "Services": { debit: "6000", credit: "2440", vat: "2641" },
    "Rent": { debit: "5010", credit: "2440", vat: "2641" },
    "Utilities": { debit: "5020", credit: "2440", vat: "2641" },
    "IT": { debit: "6100", credit: "2440", vat: "2641" },
    "Marketing": { debit: "6250", credit: "2440", vat: "2641" },
    "Insurance": { debit: "6310", credit: "2440", vat: "2641" },
    "Vehicles": { debit: "5610", credit: "2440", vat: "2641" },
    "Salaries": { debit: "7010", credit: "2440", vat: null }
  },
  US: {
    "Office Supplies": { debit: "6300", credit: "2000", tax: "2100" },
    "Travel": { debit: "6200", credit: "2000", tax: "2100" },
    "Meals": { debit: "6210", credit: "2000", tax: "2100" },
    "Equipment": { debit: "1570", credit: "2000", tax: "2100" },
    "Services": { debit: "6620", credit: "2000", tax: "2100" },
    "Rent": { debit: "6400", credit: "2000", tax: null },
    "Utilities": { debit: "6420", credit: "2000", tax: null },
    "IT": { debit: "6630", credit: "2000", tax: "2100" },
    "Marketing": { debit: "6000", credit: "2000", tax: "2100" },
    "Insurance": { debit: "6500", credit: "2000", tax: null },
    "Vehicles": { debit: "6230", credit: "2000", tax: "2100" },
    "Salaries": { debit: "6710", credit: "2000", tax: null }
  },
  UK: {
    "Office Supplies": { debit: "6302", credit: "2100", vat: "2201" },
    "Travel": { debit: "7100", credit: "2100", vat: "2201" },
    "Meals": { debit: "7200", credit: "2100", vat: "2201" },
    "Equipment": { debit: "0070", credit: "2100", vat: "2201" },
    "Services": { debit: "6701", credit: "2100", vat: "2201" },
    "Rent": { debit: "6000", credit: "2100", vat: null },
    "Utilities": { debit: "6100", credit: "2100", vat: "2201" },
    "IT": { debit: "6500", credit: "2100", vat: "2201" },
    "Marketing": { debit: "7000", credit: "2100", vat: "2201" },
    "Insurance": { debit: "7400", credit: "2100", vat: null },
    "Vehicles": { debit: "6900", credit: "2100", vat: "2201" },
    "Salaries": { debit: "6800", credit: "2100", vat: null }
  },
  FI: {
    "Office Supplies": { debit: "6200", credit: "2400", vat: "1700" },
    "Travel": { debit: "6300", credit: "2400", vat: "1700" },
    "Meals": { debit: "6310", credit: "2400", vat: "1700" },
    "Equipment": { debit: "1200", credit: "2400", vat: "1700" },
    "Services": { debit: "6800", credit: "2400", vat: "1700" },
    "Rent": { debit: "6000", credit: "2400", vat: "1700" },
    "Utilities": { debit: "6100", credit: "2400", vat: "1700" },
    "IT": { debit: "6500", credit: "2400", vat: "1700" },
    "Marketing": { debit: "6700", credit: "2400", vat: "1700" },
    "Insurance": { debit: "6600", credit: "2400", vat: null },
    "Vehicles": { debit: "6400", credit: "2400", vat: "1700" },
    "Salaries": { debit: "5000", credit: "2400", vat: null }
  },
  DK: {
    "Office Supplies": { debit: "6200", credit: "2400", vat: "1750" },
    "Travel": { debit: "6300", credit: "2400", vat: "1750" },
    "Meals": { debit: "6310", credit: "2400", vat: "1750" },
    "Equipment": { debit: "1300", credit: "2400", vat: "1750" },
    "Services": { debit: "6800", credit: "2400", vat: "1750" },
    "Rent": { debit: "6000", credit: "2400", vat: null },
    "Utilities": { debit: "6100", credit: "2400", vat: "1750" },
    "IT": { debit: "6500", credit: "2400", vat: "1750" },
    "Marketing": { debit: "6700", credit: "2400", vat: "1750" },
    "Insurance": { debit: "6600", credit: "2400", vat: null },
    "Vehicles": { debit: "6400", credit: "2400", vat: "1750" },
    "Salaries": { debit: "5000", credit: "2400", vat: null }
  },
  NO: {
    "Office Supplies": { debit: "6700", credit: "2400", vat: "2710" },
    "Travel": { debit: "6800", credit: "2400", vat: "2710" },
    "Meals": { debit: "6900", credit: "2400", vat: "2710" },
    "Equipment": { debit: "1400", credit: "2400", vat: "2710" },
    "Services": { debit: "6500", credit: "2400", vat: "2710" },
    "Rent": { debit: "6000", credit: "2400", vat: "2710" },
    "Utilities": { debit: "6100", credit: "2400", vat: "2710" },
    "IT": { debit: "7330", credit: "2400", vat: "2710" },
    "Marketing": { debit: "7000", credit: "2400", vat: "2710" },
    "Insurance": { debit: "7500", credit: "2400", vat: null },
    "Vehicles": { debit: "6340", credit: "2400", vat: "2710" },
    "Salaries": { debit: "5000", credit: "2400", vat: null }
  }
};

// Helper Functions
export function getAccountCodesForCountry(countryCode) {
  const codes = {
    'SE': ACCOUNT_CODES_SE,
    'US': ACCOUNT_CODES_US,
    'UK': ACCOUNT_CODES_UK,
    'FI': ACCOUNT_CODES_FI,
    'DK': ACCOUNT_CODES_DK,
    'NO': ACCOUNT_CODES_NO
  };
  return codes[countryCode] || ACCOUNT_CODES_SE;
}

export function getCategoryMapping(countryCode, category) {
  const mappings = CATEGORY_MAPPINGS[countryCode] || CATEGORY_MAPPINGS.SE;
  return mappings[category] || mappings["Office Supplies"];
}

export function getAccountName(countryCode, accountCode) {
  const codes = getAccountCodesForCountry(countryCode);
  const account = codes.find(c => c.code === accountCode);
  return account ? account.name : accountCode;
}

export function getAccountingSystemName(countryCode) {
  const systems = {
    'SE': 'Swedish BAS (Bokföringsnämndens Allmänna Råd)',
    'US': 'US GAAP (Generally Accepted Accounting Principles)',
    'UK': 'UK GAAP (Generally Accepted Accounting Practice)',
    'FI': 'Finnish Chart of Accounts (Kirjanpidon tilikartta)',
    'DK': 'Danish Chart of Accounts (Kontoplan)',
    'NO': 'Norwegian Standard Chart of Accounts (NS 4102)'
  };
  return systems[countryCode] || systems['SE'];
}

export function getCountryName(countryCode) {
  const countries = {
    'SE': 'Sweden',
    'US': 'United States',
    'UK': 'United Kingdom',
    'FI': 'Finland',
    'DK': 'Denmark',
    'NO': 'Norway'
  };
  return countries[countryCode] || countryCode;
}

export function getCountryFlag(countryCode) {
  const flags = {
    'SE': '\ud83c\uddf8\ud83c\uddea',
    'US': '\ud83c\uddfa\ud83c\uddf8',
    'UK': '\ud83c\uddec\ud83c\udde7',
    'FI': '\ud83c\uddeb\ud83c\uddee',
    'DK': '\ud83c\udde9\ud83c\uddf0',
    'NO': '\ud83c\uddf3\ud83c\uddf4'
  };
  return flags[countryCode] || '\ud83c\udf0d';
}

export function getVATRates(countryCode) {
  const rates = {
    'SE': { standard: 25, reduced: [12, 6], zero: 0 },
    'US': { standard: 0, state: 'varies', local: 'varies' },
    'UK': { standard: 20, reduced: 5, zero: 0 },
    'FI': { standard: 25.5, reduced: [14, 10], zero: 0 },
    'DK': { standard: 25, reduced: 0, zero: 0 },
    'NO': { standard: 25, reduced: [15, 12], zero: 0 }
  };
  return rates[countryCode] || rates.SE;
}
