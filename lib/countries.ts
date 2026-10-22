export interface Country {
  name: string;
  code: string;
  iso: string;
  flag: string;
  placeholder: string;
}

export const COUNTRIES: Country[] = [
  { name: "India", code: "+91", iso: "IN", flag: "🇮🇳", placeholder: "98765 43210" },
  { name: "United States", code: "+1", iso: "US", flag: "🇺🇸", placeholder: "(555) 000-0000" },
  { name: "United Kingdom", code: "+44", iso: "GB", flag: "🇬🇧", placeholder: "7911 123456" },
  { name: "Canada", code: "+1", iso: "CA", flag: "🇨🇦", placeholder: "(555) 000-0000" },
  { name: "Australia", code: "+61", iso: "AU", flag: "🇦🇺", placeholder: "412 345 678" },
  { name: "United Arab Emirates", code: "+971", iso: "AE", flag: "🇦🇪", placeholder: "50 123 4567" },
  { name: "Saudi Arabia", code: "+966", iso: "SA", flag: "🇸🇦", placeholder: "50 123 4567" },
  { name: "Qatar", code: "+974", iso: "QA", flag: "🇶🇦", placeholder: "3312 3456" },
  { name: "Singapore", code: "+65", iso: "SG", flag: "🇸🇬", placeholder: "8123 4567" },
  { name: "Germany", code: "+49", iso: "DE", flag: "🇩🇪", placeholder: "151 12345678" },
  { name: "France", code: "+33", iso: "FR", flag: "🇫🇷", placeholder: "6 12 34 56 78" },
  { name: "Japan", code: "+81", iso: "JP", flag: "🇯🇵", placeholder: "90 1234 5678" },
  { name: "China", code: "+86", iso: "CN", flag: "🇨🇳", placeholder: "138 0013 8000" },
  { name: "Hong Kong", code: "+852", iso: "HK", flag: "🇭🇰", placeholder: "9123 4567" },
  { name: "South Korea", code: "+82", iso: "KR", flag: "🇰🇷", placeholder: "10 1234 5678" },
  { name: "Malaysia", code: "+60", iso: "MY", flag: "🇲🇾", placeholder: "12 345 6789" },
  { name: "Indonesia", code: "+62", iso: "ID", flag: "🇮🇩", placeholder: "812 3456 7890" },
  { name: "Philippines", code: "+63", iso: "PH", flag: "🇵🇭", placeholder: "917 123 4567" },
  { name: "Thailand", code: "+66", iso: "TH", flag: "🇹🇭", placeholder: "81 234 5678" },
  { name: "Vietnam", code: "+84", iso: "VN", flag: "🇻🇳", placeholder: "91 234 5678" },
  { name: "Bangladesh", code: "+880", iso: "BD", flag: "🇧🇩", placeholder: "1712 345678" },
  { name: "Nepal", code: "+977", iso: "NP", flag: "🇳🇵", placeholder: "984 1234567" },
  { name: "Sri Lanka", code: "+94", iso: "LK", flag: "🇱🇰", placeholder: "71 234 5678" },
  { name: "Pakistan", code: "+92", iso: "PK", flag: "🇵🇰", placeholder: "300 1234567" },
  { name: "Kuwait", code: "+965", iso: "KW", flag: "🇰🇼", placeholder: "5012 3456" },
  { name: "Bahrain", code: "+973", iso: "BH", flag: "🇧🇭", placeholder: "3600 1234" },
  { name: "Oman", code: "+968", iso: "OM", flag: "🇴🇲", placeholder: "9123 4567" },
  { name: "Netherlands", code: "+31", iso: "NL", flag: "🇳🇱", placeholder: "6 12345678" },
  { name: "Switzerland", code: "+41", iso: "CH", flag: "🇨🇭", placeholder: "78 123 45 67" },
  { name: "Sweden", code: "+46", iso: "SE", flag: "🇸🇪", placeholder: "70 123 45 67" },
  { name: "Norway", code: "+47", iso: "NO", flag: "🇳🇴", placeholder: "412 34 567" },
  { name: "Denmark", code: "+45", iso: "DK", flag: "🇩🇰", placeholder: "20 12 34 56" },
  { name: "Finland", code: "+358", iso: "FI", flag: "🇫🇮", placeholder: "40 123 4567" },
  { name: "Ireland", code: "+353", iso: "IE", flag: "🇮🇪", placeholder: "85 123 4567" },
  { name: "Spain", code: "+34", iso: "ES", flag: "🇪🇸", placeholder: "612 34 56 78" },
  { name: "Italy", code: "+39", iso: "IT", flag: "🇮🇹", placeholder: "312 345 6789" },
  { name: "Portugal", code: "+351", iso: "PT", flag: "🇵🇹", placeholder: "912 345 678" },
  { name: "Belgium", code: "+32", iso: "BE", flag: "🇧🇪", placeholder: "470 12 34 56" },
  { name: "Austria", code: "+43", iso: "AT", flag: "🇦🇹", placeholder: "664 1234567" },
  { name: "Poland", code: "+48", iso: "PL", flag: "🇵🇱", placeholder: "512 345 678" },
  { name: "New Zealand", code: "+64", iso: "NZ", flag: "🇳🇿", placeholder: "21 123 4567" },
  { name: "South Africa", code: "+27", iso: "ZA", flag: "🇿🇦", placeholder: "71 234 5678" },
  { name: "Nigeria", code: "+234", iso: "NG", flag: "🇳🇬", placeholder: "802 123 4567" },
  { name: "Kenya", code: "+254", iso: "KE", flag: "🇰🇪", placeholder: "712 345678" },
  { name: "Egypt", code: "+20", iso: "EG", flag: "🇪🇬", placeholder: "10 1234 5678" },
  { name: "Brazil", code: "+55", iso: "BR", flag: "🇧🇷", placeholder: "11 91234-5678" },
  { name: "Mexico", code: "+52", iso: "MX", flag: "🇲🇽", placeholder: "55 1234 5678" },
  { name: "Argentina", code: "+54", iso: "AR", flag: "🇦🇷", placeholder: "9 11 1234-5678" },
  { name: "Turkey", code: "+90", iso: "TR", flag: "🇹🇷", placeholder: "532 123 45 67" },
  { name: "Israel", code: "+972", iso: "IL", flag: "🇮🇱", placeholder: "50 123 4567" },
  { name: "Greece", code: "+30", iso: "GR", flag: "🇬🇷", placeholder: "691 234 5678" },
];

export const DEFAULT_COUNTRY = COUNTRIES[0]; // India (+91)
