import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface Order {
  id: string;
  date: string;
  total: string;
  status: 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  canCancel: boolean;
  items: OrderItem[];
}

interface OrderContextType {
  orders: Order[];
  placeOrder: (items: OrderItem[], total: number) => string;
  cancelOrder: (orderId: string) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);

  // Load orders from localStorage on mount
  useEffect(() => {
    const storedOrders = localStorage.getItem('infinite_style_orders');
    if (storedOrders) {
      try {
        setOrders(JSON.parse(storedOrders));
      } catch (e) {
        console.error("Failed to parse orders from local storage");
      }
    }
  }, []);

  // Persist orders to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('infinite_style_orders', JSON.stringify(orders));
  }, [orders]);

  const placeOrder = (items: OrderItem[], total: number): string => {
    const orderId = Math.floor(100000 + Math.random() * 900000).toString();
    const today = new Date();
    const dateStr = today.toLocaleDateString('en-IN', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

    const newOrder: Order = {
      id: orderId,
      date: dateStr,
      total: `₹${Math.round(total)}`,
      status: 'PROCESSING',
      canCancel: true,
      items,
    };

    setOrders(prev => [newOrder, ...prev]);
    return orderId;
  };

  const cancelOrder = (orderId: string) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === orderId
          ? { ...order, status: 'CANCELLED' as const, canCancel: false }
          : order
      )
    );
  };

  return (
    <OrderContext.Provider value={{ orders, placeOrder, cancelOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};
