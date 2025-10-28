import connectDB from "@/config/models/connectDB";
import Theme from "@/config/utils/admin/theme/themeSchema";

export interface ThemeData {
  id: string;
  siteName: string;
  logo: string | null;
  favicon: string | null;
  primaryColor: string;
  secondaryColor: string;
  gradientDirection: string;
  isActive: boolean;
  lastUpdated: string;
}

export async function getThemeServer(): Promise<ThemeData> {
  try {
    await connectDB();
    const theme = await Theme.findOne({ isActive: true }).lean();

    if (!theme) {
      // Return default theme if none found
      return {
        id: "default",
        siteName: "Sri Jaidev Tours & Travels",
        logo: "/SriJaidev-tours-logo.png",
        favicon: null,
        primaryColor: "#EF4444",
        secondaryColor: "#1F2937",
        gradientDirection: "135deg",
        isActive: true,
        lastUpdated: new Date().toISOString(),
      };
    }

    // Type assertion for the theme object
    const themeObj = theme as any;

    return {
      id: themeObj.id || "default",
      siteName: themeObj.siteName || "Sri Jaidev Tours & Travels",
      logo: themeObj.logo || "/SriJaidev-tours-logo.png",
      favicon: themeObj.favicon || null,
      primaryColor: themeObj.primaryColor || "#EF4444",
      secondaryColor: themeObj.secondaryColor || "#1F2937",
      gradientDirection: themeObj.gradientDirection || "135deg",
      isActive: themeObj.isActive !== undefined ? themeObj.isActive : true,
      lastUpdated: themeObj.lastUpdated?.toISOString() || new Date().toISOString(),
    };
  } catch (error) {
    console.error("Error fetching theme server-side:", error);
    // Return default theme on error
    return {
      id: "default",
      siteName: "Sri Jaidev Tours & Travels",
      logo: "/SriJaidev-tours-logo.png",
      favicon: null,
      primaryColor: "#EF4444",
      secondaryColor: "#1F2937",
      gradientDirection: "135deg",
      isActive: true,
      lastUpdated: new Date().toISOString(),
    };
  }
}

// Helper function to convert hex to HSL
export function hexToHsl(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0,
    s = 0,
    l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}
