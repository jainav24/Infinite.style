import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { Address } from '../context/AuthContext';
import { useOrders } from '../context/OrderContext';
import { Package, MapPin, LogOut, Settings as SettingsIcon, Plus, Trash2, Star } from 'lucide-react';

const Account: React.FC = () => {
  const { user, logout, updateUser } = useAuth();
  const { orders, cancelOrder } = useOrders();
  
  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'settings'>('orders');
  
  // Settings State
  const [name, setName] = useState(user?.name || '');
  const [password, setPassword] = useState(user?.password || '');
  const [settingsMessage, setSettingsMessage] = useState('');

  // Address State
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState<Partial<Address>>({
    firstName: '', lastName: '', phone: '', plotNo: '', addressLine1: '', addressLine2: '', city: '', state: '', pincode: '', isDefault: false
  });

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const handleCancelOrder = (orderId: string) => {
    if(window.confirm('Are you sure you want to cancel this order?')) {
      cancelOrder(orderId);
    }
  };

  const handleUpdateSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({ name, password });
    setSettingsMessage('Settings updated successfully!');
    setTimeout(() => setSettingsMessage(''), 3000);
  };

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    const addressToSave: Address = {
      ...(newAddress as Address),
      id: Math.random().toString(36).substr(2, 9),
    };
    
    let currentAddresses = user.addresses ? [...user.addresses] : [];
    
    // If this is the first address or set as default, update others to not be default
    if (addressToSave.isDefault || currentAddresses.length === 0) {
      addressToSave.isDefault = true;
      currentAddresses = currentAddresses.map(addr => ({ ...addr, isDefault: false }));
    }
    
    currentAddresses.push(addressToSave);
    updateUser({ addresses: currentAddresses });
    setShowAddressForm(false);
    setNewAddress({ firstName: '', lastName: '', phone: '', plotNo: '', addressLine1: '', addressLine2: '', city: '', state: '', pincode: '', isDefault: false });
  };

  const handleDeleteAddress = (id: string) => {
    if (user.addresses) {
      const updatedAddresses = user.addresses.filter(addr => addr.id !== id);
      // If we deleted the default, make the first remaining one default
      if (updatedAddresses.length > 0 && !updatedAddresses.some(addr => addr.isDefault)) {
        updatedAddresses[0].isDefault = true;
      }
      updateUser({ addresses: updatedAddresses });
    }
  };

  const handleSetDefaultAddress = (id: string) => {
    if (user.addresses) {
      const updatedAddresses = user.addresses.map(addr => ({
        ...addr,
        isDefault: addr.id === id
      }));
      updateUser({ addresses: updatedAddresses });
    }
  };

  return (
    <div className="min-h-screen bg-porcelain py-16 font-body">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6 border-b border-ink/20 pb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-display text-ink mb-2">My Account</h1>
            <p className="font-mono text-xs uppercase tracking-widest text-ink/50">Welcome back, {user.name}.</p>
          </div>
          <button 
            onClick={logout}
            className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-ink/50 hover:text-orchid transition-colors"
          >
            <LogOut size={14} strokeWidth={1.5} /> SIGN OUT
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          
          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-12">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-champagne/20 border border-champagne/40 rounded-full flex items-center justify-center text-ink font-display text-3xl italic">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="font-display text-xl text-ink">{user.name}</h3>
                <p className="font-mono text-[10px] uppercase tracking-widest text-ink/50 mt-1">{user.email}</p>
              </div>
            </div>

            <nav className="flex flex-col gap-2">
              <button 
                onClick={() => setActiveTab('orders')}
                className={`flex w-full items-center gap-4 px-4 py-4 font-mono text-xs uppercase tracking-widest transition-colors ${activeTab === 'orders' ? 'bg-ink text-porcelain' : 'text-ink hover:text-orchid hover:bg-champagne/10'}`}
              >
                <Package size={16} strokeWidth={1.5} /> Orders
              </button>
              <button 
                onClick={() => setActiveTab('addresses')}
                className={`flex w-full items-center gap-4 px-4 py-4 font-mono text-xs uppercase tracking-widest transition-colors ${activeTab === 'addresses' ? 'bg-ink text-porcelain' : 'text-ink hover:text-orchid hover:bg-champagne/10'}`}
              >
                <MapPin size={16} strokeWidth={1.5} /> Addresses
              </button>
              <button 
                onClick={() => setActiveTab('settings')}
                className={`flex w-full items-center gap-4 px-4 py-4 font-mono text-xs uppercase tracking-widest transition-colors ${activeTab === 'settings' ? 'bg-ink text-porcelain' : 'text-ink hover:text-orchid hover:bg-champagne/10'}`}
              >
                <SettingsIcon size={16} strokeWidth={1.5} /> Settings
              </button>
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-8">
            
            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div>
                <h2 className="font-mono text-xs uppercase tracking-[0.1em] text-ink mb-8">Recent Orders</h2>
                {orders.length === 0 ? (
                  <div className="py-16 text-center border border-dashed border-ink/20">
                    <p className="font-mono text-xs uppercase tracking-widest text-ink/50 mb-4">No orders yet.</p>
                    <Link to="/shop" className="garment-tag bg-transparent text-ink border-ink hover:border-orchid hover:text-orchid transition-colors">
                      Start Shopping
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-12">
                    {orders.map((order) => (
                      <div key={order.id} className="border-t border-ink/20 pt-6">
                        <div className="flex flex-wrap justify-between items-end gap-6 mb-8">
                          <div className="flex gap-12 font-mono text-xs uppercase tracking-widest">
                            <div>
                              <p className="text-ink/40 mb-1">Date</p>
                              <p className="text-ink">{order.date}</p>
                            </div>
                            <div>
                              <p className="text-ink/40 mb-1">Total</p>
                              <p className="text-ink">{order.total}</p>
                            </div>
                            <div>
                              <p className="text-ink/40 mb-1">Order #</p>
                              <p className="text-ink">{order.id}</p>
                            </div>
                          </div>
                          <div>
                            <span className={`garment-tag ${order.status === 'CANCELLED' ? 'bg-red-500/10 text-red-500 border-red-500' : 'bg-porcelain text-ink border-ink'}`}>
                              {order.status}
                            </span>
                          </div>
                        </div>
                        
                        <div className="space-y-6">
                          {order.items.map((item, idx) => (
                            <div key={`${order.id}-${item.id}-${idx}`} className="flex flex-col sm:flex-row gap-8">
                              <div className="w-32 aspect-[3/4] bg-champagne/10 flex-shrink-0">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale-[20%]" />
                              </div>
                              <div className="flex-1 flex flex-col justify-between py-2">
                                <div>
                                  <Link to={`/product/${item.id}`} className="font-display text-2xl text-ink hover:text-orchid transition-colors block mb-2">{item.name}</Link>
                                  <p className="font-mono text-xs uppercase tracking-widest text-ink/50">
                                    {item.selectedSize ? `Size: ${item.selectedSize}` : ''}
                                    {item.selectedSize && item.selectedColor ? ' | ' : ''}
                                    {item.selectedColor ? `Color: ${item.selectedColor}` : ''}
                                    {(item.selectedSize || item.selectedColor) && item.quantity > 1 ? ' | ' : ''}
                                    {item.quantity > 1 ? `Qty: ${item.quantity}` : ''}
                                  </p>
                                  <p className="font-mono text-xs uppercase tracking-widest text-ink/70 mt-1">₹{Math.round(item.price * item.quantity)}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 mt-6 items-start">
                          {order.status === 'DELIVERED' && (
                            <Link to="/shop" className="font-mono text-xs uppercase tracking-widest text-ink border border-ink/20 hover:border-orchid hover:text-orchid transition-colors px-4 py-2">Buy Again</Link>
                          )}
                          {order.status === 'PROCESSING' && order.canCancel && (
                            <div className="flex flex-col gap-2">
                              <p className="font-mono text-[9px] uppercase tracking-widest text-red-500/70">Order can be cancelled within 24 hours only</p>
                              <button onClick={() => handleCancelOrder(order.id)} className="font-mono text-xs uppercase tracking-widest text-red-500 border border-red-500/30 hover:border-red-500 hover:bg-red-500/10 transition-colors px-4 py-2 w-fit">Cancel Order</button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === 'addresses' && (
              <div>
                <div className="flex justify-between items-center mb-8">
                  <h2 className="font-mono text-xs uppercase tracking-[0.1em] text-ink">Saved Addresses</h2>
                  {!showAddressForm && (
                    <button 
                      onClick={() => setShowAddressForm(true)}
                      className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-orchid hover:text-ink transition-colors"
                    >
                      <Plus size={14} strokeWidth={1.5} /> Add New
                    </button>
                  )}
                </div>

                {showAddressForm ? (
                  <div className="bg-champagne/10 p-8 border border-champagne/40 mb-8">
                    <h3 className="font-display text-2xl text-ink mb-6">Add New Address</h3>
                    <form onSubmit={handleSaveAddress} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                      <div>
                        <input required type="text" placeholder="FIRST NAME" value={newAddress.firstName} onChange={(e) => setNewAddress({...newAddress, firstName: e.target.value})} className="w-full bg-transparent border-b border-ink/30 px-0 py-3 font-mono text-xs uppercase tracking-widest text-ink focus:border-orchid focus:outline-none transition-colors placeholder:text-ink/30" />
                      </div>
                      <div>
                        <input required type="text" placeholder="LAST NAME" value={newAddress.lastName} onChange={(e) => setNewAddress({...newAddress, lastName: e.target.value})} className="w-full bg-transparent border-b border-ink/30 px-0 py-3 font-mono text-xs uppercase tracking-widest text-ink focus:border-orchid focus:outline-none transition-colors placeholder:text-ink/30" />
                      </div>
                      <div className="md:col-span-2">
                        <input required type="tel" placeholder="PHONE NUMBER" value={newAddress.phone} onChange={(e) => setNewAddress({...newAddress, phone: e.target.value})} className="w-full bg-transparent border-b border-ink/30 px-0 py-3 font-mono text-xs uppercase tracking-widest text-ink focus:border-orchid focus:outline-none transition-colors placeholder:text-ink/30" />
                      </div>
                      <div>
                        <input required type="text" placeholder="PLOT / HOUSE NO." value={newAddress.plotNo} onChange={(e) => setNewAddress({...newAddress, plotNo: e.target.value})} className="w-full bg-transparent border-b border-ink/30 px-0 py-3 font-mono text-xs uppercase tracking-widest text-ink focus:border-orchid focus:outline-none transition-colors placeholder:text-ink/30" />
                      </div>
                      <div>
                        <input required type="text" placeholder="ADDRESS LINE 1" value={newAddress.addressLine1} onChange={(e) => setNewAddress({...newAddress, addressLine1: e.target.value})} className="w-full bg-transparent border-b border-ink/30 px-0 py-3 font-mono text-xs uppercase tracking-widest text-ink focus:border-orchid focus:outline-none transition-colors placeholder:text-ink/30" />
                      </div>
                      <div className="md:col-span-2">
                        <input type="text" placeholder="ADDRESS LINE 2 (OPTIONAL)" value={newAddress.addressLine2} onChange={(e) => setNewAddress({...newAddress, addressLine2: e.target.value})} className="w-full bg-transparent border-b border-ink/30 px-0 py-3 font-mono text-xs uppercase tracking-widest text-ink focus:border-orchid focus:outline-none transition-colors placeholder:text-ink/30" />
                      </div>
                      <div>
                        <input required type="text" placeholder="CITY" value={newAddress.city} onChange={(e) => setNewAddress({...newAddress, city: e.target.value})} className="w-full bg-transparent border-b border-ink/30 px-0 py-3 font-mono text-xs uppercase tracking-widest text-ink focus:border-orchid focus:outline-none transition-colors placeholder:text-ink/30" />
                      </div>
                      <div>
                        <input required type="text" placeholder="STATE" value={newAddress.state} onChange={(e) => setNewAddress({...newAddress, state: e.target.value})} className="w-full bg-transparent border-b border-ink/30 px-0 py-3 font-mono text-xs uppercase tracking-widest text-ink focus:border-orchid focus:outline-none transition-colors placeholder:text-ink/30" />
                      </div>
                      <div className="md:col-span-2">
                        <input required type="text" placeholder="PINCODE" value={newAddress.pincode} onChange={(e) => setNewAddress({...newAddress, pincode: e.target.value})} className="w-full bg-transparent border-b border-ink/30 px-0 py-3 font-mono text-xs uppercase tracking-widest text-ink focus:border-orchid focus:outline-none transition-colors placeholder:text-ink/30" />
                      </div>
                      <div className="md:col-span-2 flex items-center gap-2 mt-4">
                        <input type="checkbox" id="isDefault" checked={newAddress.isDefault} onChange={(e) => setNewAddress({...newAddress, isDefault: e.target.checked})} className="w-4 h-4 accent-orchid" />
                        <label htmlFor="isDefault" className="font-mono text-xs uppercase tracking-widest text-ink">Set as default address</label>
                      </div>
                      <div className="md:col-span-2 flex gap-4 mt-6">
                        <button type="submit" className="flex-1 bg-ink text-porcelain font-mono text-xs uppercase tracking-[0.1em] hover:bg-velvet transition-colors py-4">
                          Save Address
                        </button>
                        <button type="button" onClick={() => setShowAddressForm(false)} className="flex-1 border border-ink text-ink font-mono text-xs uppercase tracking-[0.1em] hover:bg-ink/5 transition-colors py-4">
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {user.addresses && user.addresses.length > 0 ? (
                      user.addresses.map((address) => (
                        <div key={address.id} className={`p-6 border ${address.isDefault ? 'border-orchid bg-orchid/5' : 'border-ink/20'} relative`}>
                          {address.isDefault && (
                            <span className="absolute top-4 right-4 text-orchid flex items-center gap-1 font-mono text-[9px] uppercase tracking-widest">
                              <Star size={12} fill="currentColor" /> Default
                            </span>
                          )}
                          <p className="font-display text-xl text-ink mb-2">{address.firstName} {address.lastName}</p>
                          <div className="font-mono text-xs uppercase tracking-widest text-ink/70 space-y-1 mb-6">
                            <p>{address.plotNo}, {address.addressLine1}</p>
                            {address.addressLine2 && <p>{address.addressLine2}</p>}
                            <p>{address.city}, {address.state} {address.pincode}</p>
                            <p className="mt-2 text-ink">Ph: {address.phone}</p>
                          </div>
                          <div className="flex gap-4 border-t border-ink/10 pt-4">
                            {!address.isDefault && (
                              <button onClick={() => handleSetDefaultAddress(address.id)} className="font-mono text-[10px] uppercase tracking-widest text-ink hover:text-orchid transition-colors">
                                Set as Default
                              </button>
                            )}
                            <button onClick={() => handleDeleteAddress(address.id)} className="font-mono text-[10px] uppercase tracking-widest text-red-500 hover:text-red-700 transition-colors ml-auto flex items-center gap-1">
                              <Trash2 size={12} /> Remove
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="col-span-1 md:col-span-2 py-12 text-center border border-dashed border-ink/20">
                        <p className="font-mono text-xs uppercase tracking-widest text-ink/50 mb-4">No addresses saved yet.</p>
                        <button onClick={() => setShowAddressForm(true)} className="garment-tag bg-transparent text-ink border-ink hover:border-orchid hover:text-orchid transition-colors">
                          Add Your First Address
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div>
                <h2 className="font-mono text-xs uppercase tracking-[0.1em] text-ink mb-8">Account Settings</h2>
                
                <div className="max-w-md">
                  <form onSubmit={handleUpdateSettings} className="space-y-8">
                    <div>
                      <label className="block font-mono text-[10px] uppercase tracking-widest text-ink/50 mb-2">Full Name</label>
                      <input 
                        type="text" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        className="w-full bg-transparent border-b border-ink/30 px-0 py-3 font-mono text-sm tracking-wide text-ink focus:border-orchid focus:outline-none transition-colors" 
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-[10px] uppercase tracking-widest text-ink/50 mb-2">Email Address (Cannot be changed)</label>
                      <input 
                        type="email" 
                        value={user.email} 
                        disabled 
                        className="w-full bg-transparent border-b border-ink/10 px-0 py-3 font-mono text-sm tracking-wide text-ink/50 cursor-not-allowed" 
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-[10px] uppercase tracking-widest text-ink/50 mb-2">Password</label>
                      <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        placeholder="Leave blank to keep unchanged"
                        className="w-full bg-transparent border-b border-ink/30 px-0 py-3 font-mono text-sm tracking-wide text-ink focus:border-orchid focus:outline-none transition-colors placeholder:text-ink/30 placeholder:text-xs" 
                      />
                    </div>
                    
                    {settingsMessage && (
                      <p className="font-mono text-xs text-orchid uppercase tracking-widest">{settingsMessage}</p>
                    )}

                    <button type="submit" className="w-full bg-ink text-porcelain font-mono text-xs uppercase tracking-[0.1em] hover:bg-velvet transition-colors py-4 mt-8">
                      Save Changes
                    </button>
                  </form>
                </div>
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
};

export default Account;
