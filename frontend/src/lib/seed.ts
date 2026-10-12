import type {
  Booking,
  Customer,
  Dish,
  Expense,
  FoodCategory,
  FoodPackage,
  HallManager,
  Payment,
  SubscriptionPayment,
  Venue,
} from "./types";

export const id = (): string =>
  Date.now().toString(36) + Math.random().toString(36).substring(2, 7);

export const bookingId = (count: number): string =>
  `BK-${new Date().getFullYear()}-${String(count).padStart(4, "0")}`;

export const quotationId = (count: number): string =>
  `QT-${new Date().getFullYear()}-${String(count).padStart(4, "0")}`;

export interface SeedData {
  venues: Venue[];
  customers: Customer[];
  bookings: Booking[];
  payments: Payment[];
  foodCategories: FoodCategory[];
  dishes: Dish[];
  foodPackages: FoodPackage[];
  expenses: Expense[];
  quotations: never[];
  hallManagers: HallManager[];
  subscriptionPayments: SubscriptionPayment[];
}

export function buildSeed(): SeedData {
  const venues: Venue[] = [
    {
      id: id(),
      name: "Main Lawn",
      type: "Lawn",
      capacity: 500,
      price: 200000,
      branch: "Branch 1",
    },
    {
      id: id(),
      name: "Banquet Hall",
      type: "Hall",
      capacity: 250,
      price: 150000,
      branch: "Branch 1",
    },
    {
      id: id(),
      name: "VIP Hall",
      type: "Hall",
      capacity: 100,
      price: 100000,
      branch: "Branch 1",
    },
    {
      id: id(),
      name: "Outdoor Lawn",
      type: "Lawn",
      capacity: 800,
      price: 250000,
      branch: "Branch 2",
    },
  ];

  const customers: Customer[] = [
    {
      id: id(),
      name: "Ahmed Khan",
      phone: "0300-1234567",
      whatsapp: "0300-1234567",
      address: "Lahore, Pakistan",
    },
    {
      id: id(),
      name: "Fatima Ali",
      phone: "0300-7654321",
      whatsapp: "0300-7654321",
      address: "Islamabad, Pakistan",
    },
    {
      id: id(),
      name: "Usman Malik",
      phone: "0321-9876543",
      whatsapp: "0321-9876543",
      address: "Karachi, Pakistan",
    },
    {
      id: id(),
      name: "Sana Ahmed",
      phone: "0345-4567890",
      whatsapp: "0345-4567890",
      address: "Rawalpindi, Pakistan",
    },
  ];

  const bookings: Booking[] = [
    {
      id: id(),
      bookingId: "BK-2026-0001",
      customerId: customers[0].id,
      customerName: customers[0].name,
      eventType: "Wedding",
      eventDate: "2026-08-15",
      startTime: "18:00",
      endTime: "22:00",
      guests: 300,
      venueId: venues[0].id,
      venueName: venues[0].name,
      branch: venues[0].branch,
      venuePrice: venues[0].price,
      status: "confirmed",
      totalAmount: 700000,
      paidAmount: 200000,
      remainingAmount: 500000,
      foodPackageId: null,
      foodPackageName: "Premium Package",
      foodPricePerPerson: 1500,
      foodTotal: 450000,
      additionalServices: [
        { name: "Decoration", price: 50000 },
        { name: "DJ/Sound", price: 25000 },
      ],
      specialInstructions: "Less spicy food, extra BBQ",
      createdAt: "2026-07-20T10:00:00",
    },
    {
      id: id(),
      bookingId: "BK-2026-0002",
      customerId: customers[1].id,
      customerName: customers[1].name,
      eventType: "Mehndi",
      eventDate: "2026-08-16",
      startTime: "16:00",
      endTime: "20:00",
      guests: 150,
      venueId: venues[1].id,
      venueName: venues[1].name,
      branch: venues[1].branch,
      venuePrice: venues[1].price,
      status: "tentative",
      totalAmount: 350000,
      paidAmount: 50000,
      remainingAmount: 300000,
      foodPackageId: null,
      foodPackageName: "Standard Package",
      foodPricePerPerson: 1000,
      foodTotal: 150000,
      additionalServices: [
        { name: "Decoration", price: 30000 },
        { name: "Photography", price: 20000 },
      ],
      specialInstructions: "",
      createdAt: "2026-07-25T14:30:00",
    },
    {
      id: id(),
      bookingId: "BK-2026-0003",
      customerId: customers[2].id,
      customerName: customers[2].name,
      eventType: "Barat",
      eventDate: "2026-08-20",
      startTime: "20:00",
      endTime: "00:00",
      guests: 500,
      venueId: venues[3].id,
      venueName: venues[3].name,
      branch: venues[3].branch,
      venuePrice: venues[3].price,
      status: "confirmed",
      totalAmount: 950000,
      paidAmount: 300000,
      remainingAmount: 650000,
      foodPackageId: null,
      foodPackageName: "Premium Package",
      foodPricePerPerson: 1500,
      foodTotal: 750000,
      additionalServices: [
        { name: "Decoration", price: 60000 },
        { name: "Stage", price: 40000 },
        { name: "Generator", price: 20000 },
      ],
      specialInstructions: "Halal meat only",
      createdAt: "2026-07-28T09:15:00",
    },
  ];

  const payments: Payment[] = [
    {
      id: id(),
      bookingId: bookings[0].id,
      amount: 100000,
      method: "cash",
      date: "2026-07-20",
      reference: "Advance payment",
      notes: "",
    },
    {
      id: id(),
      bookingId: bookings[0].id,
      amount: 100000,
      method: "bank_transfer",
      date: "2026-07-25",
      reference: "TRX-12345",
      notes: "Second installment",
    },
    {
      id: id(),
      bookingId: bookings[1].id,
      amount: 50000,
      method: "cash",
      date: "2026-07-26",
      reference: "Booking fee",
      notes: "",
    },
    {
      id: id(),
      bookingId: bookings[2].id,
      amount: 300000,
      method: "online",
      date: "2026-07-28",
      reference: "ON-67890",
      notes: "50% advance",
    },
  ];

  const foodCategories: FoodCategory[] = [
    "Rice",
    "Main Course",
    "BBQ",
    "Salad",
    "Drinks",
    "Dessert",
    "Roti/Naan",
  ];

  const dishes: Dish[] = [
    {
      id: id(),
      name: "Biryani",
      category: "Rice",
      price: 300,
      description: "Fragrant rice with meat",
      status: "active",
    },
    {
      id: id(),
      name: "Pulao",
      category: "Rice",
      price: 250,
      description: "Simple rice dish",
      status: "active",
    },
    {
      id: id(),
      name: "Chicken Karahi",
      category: "Main Course",
      price: 400,
      description: "Spicy chicken curry",
      status: "active",
    },
    {
      id: id(),
      name: "Nihari",
      category: "Main Course",
      price: 500,
      description: "Slow cooked beef stew",
      status: "active",
    },
    {
      id: id(),
      name: "BBQ Platter",
      category: "BBQ",
      price: 600,
      description: "Mixed grill platter",
      status: "active",
    },
    {
      id: id(),
      name: "Seekh Kebab",
      category: "BBQ",
      price: 350,
      description: "Minced meat kebabs",
      status: "active",
    },
    {
      id: id(),
      name: "Garden Salad",
      category: "Salad",
      price: 150,
      description: "Fresh vegetables",
      status: "active",
    },
    {
      id: id(),
      name: "Raita",
      category: "Salad",
      price: 100,
      description: "Yogurt with cucumber",
      status: "active",
    },
    {
      id: id(),
      name: "Soft Drink",
      category: "Drinks",
      price: 80,
      description: "Carbonated beverages",
      status: "active",
    },
    {
      id: id(),
      name: "Kulfi",
      category: "Dessert",
      price: 150,
      description: "Traditional ice cream",
      status: "active",
    },
    {
      id: id(),
      name: "Gulab Jamun",
      category: "Dessert",
      price: 120,
      description: "Sweet milk balls",
      status: "active",
    },
    {
      id: id(),
      name: "Naan",
      category: "Roti/Naan",
      price: 30,
      description: "Bread",
      status: "active",
    },
  ];

  const foodPackages: FoodPackage[] = [
    {
      id: id(),
      name: "Premium Package",
      pricePerPerson: 1500,
      description: "Complete premium dining experience",
      dishes: [
        "Biryani",
        "Chicken Karahi",
        "BBQ Platter",
        "Garden Salad",
        "Raita",
        "Soft Drink",
        "Kulfi",
        "Naan",
      ],
      status: "active",
    },
    {
      id: id(),
      name: "Standard Package",
      pricePerPerson: 1000,
      description: "Standard wedding menu",
      dishes: [
        "Pulao",
        "Chicken Karahi",
        "Seekh Kebab",
        "Garden Salad",
        "Soft Drink",
        "Gulab Jamun",
        "Naan",
      ],
      status: "active",
    },
    {
      id: id(),
      name: "Basic Package",
      pricePerPerson: 700,
      description: "Economical event menu",
      dishes: ["Pulao", "Nihari", "Garden Salad", "Raita", "Naan"],
      status: "active",
    },
  ];

  const expenses: Expense[] = [
    {
      id: id(),
      title: "Electricity Bill",
      amount: 25000,
      date: "2026-08-01",
      category: "Utilities",
      notes: "Monthly bill",
    },
    {
      id: id(),
      title: "Staff Salaries",
      amount: 120000,
      date: "2026-08-01",
      category: "Staff",
      notes: "July salaries",
    },
    {
      id: id(),
      title: "Decoration Materials",
      amount: 15000,
      date: "2026-08-05",
      category: "Decoration",
      notes: "New decorations",
    },
  ];

  const hallManagers: HallManager[] = [
    {
      id: id(),
      name: "Ali Raza",
      email: "ali.raza@example.com",
      phone: "0300-1122334",
      plan: "BASIC",
      status: "PAID",
    },
    {
      id: id(),
      name: "Sana Iqbal",
      email: "sana.iqbal@example.com",
      phone: "0301-5566778",
      plan: "PROFESSIONAL",
      status: "PENDING",
    },
    {
      id: id(),
      name: "Bilal Hussain",
      email: "bilal.hussain@example.com",
      phone: "0321-9988776",
      plan: "BUSINESS",
      status: "PAID",
    },
    {
      id: id(),
      name: "Noor Fatima",
      email: "noor.fatima@example.com",
      phone: "0333-4455667",
      plan: "BASIC",
      status: "PENDING",
    },
    {
      id: id(),
      name: "Hamza Sheikh",
      email: "hamza.sheikh@example.com",
      phone: "0345-2233445",
      plan: "PROFESSIONAL",
      status: "PAID",
    },
    {
      id: id(),
      name: "Zainab Noor",
      email: "zainab.noor@example.com",
      phone: "0302-7788990",
      plan: "BASIC",
      status: "PENDING",
    },
  ];

  const subscriptionPayments: SubscriptionPayment[] = [
    {
      id: id(),
      managerId: hallManagers[0].id,
      name: hallManagers[0].name,
      transactionId: "TRX-884210",
      amount: 4999,
      date: "2026-09-15",
      bankName: "HBL",
      activeTill: "2026-10-15",
    },
    {
      id: id(),
      managerId: hallManagers[2].id,
      name: hallManagers[2].name,
      transactionId: "TRX-551903",
      amount: 17999,
      date: "2026-10-01",
      bankName: "Meezan Bank",
      activeTill: "2026-11-01",
    },
    {
      id: id(),
      managerId: hallManagers[4].id,
      name: hallManagers[4].name,
      transactionId: "TRX-730154",
      amount: 9999,
      date: "2026-09-28",
      bankName: "UBL",
      activeTill: "2026-10-28",
    },
  ];

  return {
    venues,
    customers,
    bookings,
    payments,
    foodCategories,
    dishes,
    foodPackages,
    expenses,
    quotations: [],
    hallManagers,
    subscriptionPayments,
  };
}
