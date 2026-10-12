export type BookingStatus =
  | "inquiry"
  | "tentative"
  | "confirmed"
  | "completed"
  | "cancelled";

export interface Service {
  name: string;
  price: number;
}

export interface Booking {
  id: string;
  bookingId: string;
  customerId: string;
  customerName: string;
  eventType: string;
  eventDate: string;
  startTime: string;
  endTime: string;
  guests: number;
  venueId: string;
  venueName: string;
  branch: string;
  venuePrice: number;
  status: BookingStatus;
  totalAmount: number;
  paidAmount: number;
  remainingAmount: number;
  foodPackageId: string | null;
  foodPackageName: string;
  foodPricePerPerson: number;
  foodTotal: number;
  additionalServices: Service[];
  specialInstructions: string;
  createdAt: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  whatsapp: string;
  address: string;
}

export interface Venue {
  id: string;
  name: string;
  type: string;
  capacity: number;
  price: number;
  branch: string;
}

export interface Payment {
  id: string;
  bookingId: string;
  amount: number;
  method: string;
  date: string;
  reference: string;
  notes: string;
}

export type PaymentStatus = "PAID" | "PENDING";

export interface HallManager {
  id: string;
  name: string;
  email: string;
  phone: string;
  plan: string;
  status: PaymentStatus;
}

export interface SubscriptionPayment {
  id: string;
  managerId: string;
  name: string;
  transactionId: string;
  amount: number;
  date: string;
  bankName: string;
  activeTill: string;
}

export interface Dish {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  status: string;
}

export interface FoodPackage {
  id: string;
  name: string;
  pricePerPerson: number;
  description: string;
  dishes: string[];
  status: string;
}

export type FoodCategory = string;

export interface Expense {
  id: string;
  title: string;
  amount: number;
  date: string;
  category: string;
  notes: string;
}

export interface Quotation {
  id: string;
  quotationId: string;
  customerId: string;
  customerName: string;
  eventType: string;
  eventDate: string;
  venueId: string;
  venueName: string;
  guests: number;
  totalAmount: number;
  status: string;
  terms: string;
  createdAt: string;
}

export const EVENT_TYPES = [
  "Wedding",
  "Mehndi",
  "Barat",
  "Walima",
  "Birthday",
  "Engagement",
  "Other",
];

export const BOOKING_STATUSES: BookingStatus[] = [
  "inquiry",
  "tentative",
  "confirmed",
  "completed",
  "cancelled",
];

export const PAYMENT_METHODS = [
  "cash",
  "bank_transfer",
  "online",
  "card",
  "other",
];

export const EXPENSE_CATEGORIES = [
  "Utilities",
  "Staff",
  "Decoration",
  "Maintenance",
  "Food",
  "Other",
];

export const VENUE_TYPES = ["Lawn", "Hall", "Outdoor", "Other"];
