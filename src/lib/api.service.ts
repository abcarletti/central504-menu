"use server";

export interface Category {
  id: string;
  slug: string;
  name: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description?: string | null;
  price: number;
  isActive: boolean;
  category: Category;
  fileUrl?: string;
  allergenIds?: string[];
}

export interface MenuData {
  items: MenuItem[];
  categories: Category[];
}

export interface DailyMenuItem {
  id: string;
  name: string;
  section: "FIRST" | "SECOND" | "DESSERT";
  servedCount: number;
}

export interface DailyMenu {
  id: string;
  date: string;
  price: number;
  items: DailyMenuItem[];
}

export const fetchMenuItems = async (): Promise<MenuItem[]> => {
  const apiBaseUrl = process.env.API_BASE_URL || "http://localhost:8090";

  const res = await fetch(`${apiBaseUrl}/central504-api/v1/menu-item/current`, {
    next: { revalidate: 900 },
  });

  if (!res.ok) {
    throw new Error("Error al obtener los items del menú");
  }

  return res.json();
};

export const fetchMenuData = async (): Promise<MenuData> => {
  const items = await fetchMenuItems();

  // Filtrar solo items activos
  const activeItems = items.filter((item) => item.isActive);

  // Extraer categorías únicas de los items
  const categoriesMap = new Map<string, Category>();
  for (const item of activeItems) {
    if (item.category && !categoriesMap.has(item.category.id)) {
      categoriesMap.set(item.category.id, item.category);
    }
  }

  // Ordenar categorías alfabéticamente por nombre
  const categories = Array.from(categoriesMap.values()).sort((a, b) =>
    a.name.localeCompare(b.name, "es")
  );

  return {
    items: activeItems,
    categories,
  };
};

export const fetchDailyMenu = async (): Promise<DailyMenu | null> => {
  const apiBaseUrl = process.env.API_BASE_URL || "http://localhost:8090";

  const res = await fetch(
    `${apiBaseUrl}/central504-api/v1/daily-menu/current`,
    {
      next: { revalidate: 900 },
    }
  );

  if (!res.ok) {
    if (res.status === 404) {
      return null;
    }
    throw new Error("Error al obtener el menú del día");
  }

  const data = await res.json();
  return data || null;
};
